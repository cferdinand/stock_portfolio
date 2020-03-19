SELECT 'CREATE DATABASE portfoli'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'portfoli')\gexec
\c portfoli;

-- ---
-- Table 'Users'
-- 
-- ---
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(60) UNIQUE NULL,
  user_password VARCHAR(1000) NULL,
  user_email VARCHAR(1000) UNIQUE NULL,
  sessionid INT NULL
);

-- ---
-- Table 'User Balance'
-- 
-- ---
DROP TABLE IF EXISTS balance CASCADE;
CREATE TABLE balance (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT UNIQUE NULL,
  acct_balance DECIMAL NULL
);

-- ---
-- Table 'Portfolio'
-- 
-- ---

DROP TABLE IF EXISTS portfolio;
CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  stock_symbol VARCHAR(60) NULL,
  stock_name VARCHAR(60) NULL,
  amount_owned INT NULL
  );

-- ---
-- Table 'Transactions'
-- 
-- ---

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  stock_sym VARCHAR NOT NULL,
  stock_name VARCHAR NOT NULL,
  amount INTEGER NOT NULL,
  buy_price DECIMAL NULL,
  sell_price DECIMAL NULL,
  total DECIMAL NULL,
  created_date VARCHAR NULL
);

-- ---
-- Table 'Session'
-- 
-- ---

DROP TABLE IF EXISTS sessions_table CASCADE;
CREATE TABLE sessions_table (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER UNIQUE NULL,
  session_value VARCHAR(250) NULL
);

-- ALTER TABLE IF EXISTS sessions_table ADD CONSTRAINT sursfk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS users ADD CONSTRAINT usrfk FOREIGN KEY (sessionid) REFERENCES sessions_table (id) ON DELETE SET NULL;
ALTER TABLE IF EXISTS transactions ADD CONSTRAINT transfk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS balance ADD CONSTRAINT balfk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;
ALTER TABLE IF EXISTS portfolio ADD CONSTRAINT portfk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

CREATE INDEX user_id_index ON users (id);
CREATE INDEX user_index ON users (user_email);
CREATE INDEX session_id_index ON sessions_table (id);
CREATE INDEX session_value_index ON sessions_table (session_value);
CREATE INDEX balance_index ON sessions_table (user_id);
CREATE INDEX portfolio_index ON sessions_table (user_id);
CREATE INDEX transactions_index ON transactions (user_id);
