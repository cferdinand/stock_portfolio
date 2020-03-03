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
  user_name VARCHAR(60) NULL,
  user_password VARCHAR(1000) NULL,
  user_email VARCHAR(1000) NULL,
  sessionid INT NULL,
);

-- ---
-- Table 'User Balance'
-- 
-- ---
DROP TABLE IF EXISTS balance CASCADE;
CREATE TABLE balance (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INT NULL,
  acct_balance INT NULL,
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
  stock_price INT NULL,
  amount_owned INT NULL,
  performance INT NULL,
);

-- ---
-- Table 'Transactions'
-- 
-- ---

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NOT NULL,
  buy_price INT NULL,
  sell_price INT NULL,
  performance INT NULL,
  created_date INT NULL,
);

-- ---
-- Table 'Session'
-- 
-- ---

DROP TABLE IF EXISTS sessions_table CASCADE;
CREATE TABLE sessions_table (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER NULL,
  session_value VARCHAR(250) NULL,
);

ALTER TABLE IF EXISTS users ADD CONSTRAINT sessfk FOREIGN KEY (sessionid) REFERENCES sessions_table (id);
ALTER TABLE IF EXISTS sessions_table ADD CONSTRAINT sursfk FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE IF EXISTS transactions ADD CONSTRAINT transfk FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE IF EXISTS balance ADD CONSTRAINT balfk FOREIGN KEY (user_id) REFERENCES users (id);
ALTER TABLE IF EXISTS portfolio ADD CONSTRAINT portfk FOREIGN KEY (user_id) REFERENCES users (id);

CREATE INDEX user_id_index ON users (id);
CREATE INDEX user_index ON users (user_email);
CREATE INDEX session_id_index ON sessions_table (id);
CREATE INDEX session_value_index ON sessions_table (session_value);
CREATE INDEX balance_index ON sessions_table (user_id);
CREATE INDEX portfolio_index ON sessions_table (user_id);
CREATE INDEX transactions_index ON transactions (user_id);
