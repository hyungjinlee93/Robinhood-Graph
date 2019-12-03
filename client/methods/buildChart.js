import * as d3 from 'd3';
import * as fc from 'd3fc';

const timeIntervals = [300000, 3600000, 90000000, 90000000, 86400000, 604800000]; //FIX
const timeIds = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

const buildChart = (prices, view, updateTicker) => {
  let data = [];
  let time = Date.now();
  let timeInterval = timeIntervals[timeIds.indexOf(view)];
  for (let i = prices.length-1; i >= 0; i--) {
    data[i] = { date: time, price: prices[i] };
    time -= timeInterval;
  }
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = window.innerWidth - margin.left - margin.right;
  const height = window.innerHeight - margin.top - margin.bottom;
  // add SVG to the page
  const svg = d3
    .select('#chart')
    .append('svg')
    .attr('width', width + margin['left'] + margin['right'])
    .attr('height', height + margin['top'] + margin['bottom'])
    .append('g')
    .attr('transform', `translate(${margin['left']},  ${margin['top']})`);

  // find data range
  const xMin = d3.min(data, d => {
    return d['date'];
  });
  const xMax = d3.max(data, d => {
    return d['date'];
  });
  const yMin = d3.min(data, d => {
    return d['price'];
  });
  const yMax = d3.max(data, d => {
    return d['price'];
  });
  // scales for the charts
  const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([0, width]);
  const yScale = d3
    .scaleLinear()
    .domain([yMin - 5, yMax])
    .range([height, 0]);


  // svg
  //   .append('g')
  //   .attr('id', 'xAxis')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(d3.axisBottom(xScale));
  // svg
  //   .append('g')
  //   .attr('id', 'yAxis')
  //   .attr('transform', `translate(${width}, 0)`)
  //   .call(d3.axisRight(yScale));

  const line = d3
    .line()
    .x(d => {
      return xScale(d['date']);
    })
    .y(d => {
      return yScale(d['price']);
    });
  // Append the path and bind data
  svg
    .append('path')
    .data([data])
    .style('fill', 'none')
    .attr('id', 'priceChart')
    .attr('stroke', '#21ce99')
    .attr('stroke-width', '1.5')
    .attr('d', line);


  //HOVER OVER WITH MOUSE FUNCTUIONALITY
  const bisectDate = (data, matcher) => {
    for(let i = 0; i < data.length; i++) {
      if(data[i].date > matcher) {
        return i;
      }
    }
    return 1;
  }
  
  function generateCrosshair() {
    //returns corresponding value from the domain
    const correspondingDate = xScale.invert(d3.mouse(this)[0]);
    //gets insertion point
    const i = bisectDate(data, correspondingDate.getTime());
    updateTicker(data[i].price);
    // const d0 = data[20];
    // const d1 = data[21];
    const d0 = data[i - 1];
    const d1 = data[i];
    const currentPoint =  d1;

    focus.attr('transform', `translate(${xScale(currentPoint['date'])},     ${yScale(currentPoint['price'])})`);
    
    focus
      .select('line.y')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', height - height - yScale(currentPoint['price']))
      .attr('y2', height - yScale(currentPoint['price']));
  }
  const focus = svg
    .append('g')
    .attr('class', 'focus')
    .attr('fill', '#21ce99')
    .style('display', 'none');
  focus.append('circle').attr('r', 4.5);
  focus.append('line').classed('x', true);
  focus.append('line').classed('y', true);
  svg
    .append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', () => focus.style('display', null))
    .on('mouseout', () => { updateTicker(prices[0]); focus.style('display', 'none')})
    .on('mousemove', generateCrosshair);
  d3.select('.overlay').style('fill', 'none');
  d3.select('.overlay').style('pointer-events', 'all');
  d3.selectAll('.focus line').style('fill', 'none');
  d3.selectAll('.focus line').style('stroke', '#ababab');
  d3.selectAll('.focus line').style('stroke-width', '1.5px');
}

//Provide mouseover functionality


export default buildChart;
