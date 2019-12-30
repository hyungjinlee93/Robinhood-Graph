COPY businesses (symbol, bname, analysthold, robinhoodowners, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/symbols.csv' DELIMITER '|' CSV HEADER;
COPY prices_1d (ticker, timest, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_prices_1d.csv' DELIMITER '|' CSV HEADER;
COPY prices_1w (ticker, timest, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_prices_1w.csv' DELIMITER '|' CSV HEADER;
COPY prices_1m (ticker, timest, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_prices_1m.csv' DELIMITER '|' CSV HEADER;
COPY prices_3m (ticker, timest, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_prices_3m.csv' DELIMITER '|' CSV HEADER;
COPY prices_1y (ticker, timest, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_prices_1y.csv' DELIMITER '|' CSV HEADER;
COPY prices_5y (ticker, timest, price) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_prices_5y.csv' DELIMITER '|' CSV HEADER;
COPY tags (ticker, tag) from '/Users/hyungjinlee/Documents/hackreactor/mrlllabs/Robinhood-Graph/Seeding/csvs/sql_tags.csv' DELIMITER '|' CSV HEADER;