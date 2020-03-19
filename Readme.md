# Stock Portfolio App

An application that simulates a stock portfolio with custom user authentication middleware.

## Deployed (Heroku with a postgres DB) Existing Accounts Below (Feel free to create an account and utilize the application):

### Chris Test

E-mail: chris@gmail.com

Password: test

### Ferd Test

E-mail: ferd@gmail.com

Password: test2

## User Stories:

### As a user, I want to create a new account with my name, email, and password so that I can buy and trade stocks.

- [x] Default the user's cash account balance to \$5000.00 USD.
- [x] A user can only register once with any given email.

### As a user, I want to authenticate via email and passwords so that I can access my account.

- [x] E-mail/password authentication implemented.

### As a user, I want to buy shares of stock at its current price by specifying its ticker symbol and the number of shares so that I can invest.

- [x] A user can only buy whole number quantities of shares.
- [x] A user can only buy shares if they have enough cash in their account for a given purchase.
- [x] A user can only buy shares if the ticker symbol is valid.

### As a user, I want to view a list of all transactions I've made to date (trades) so that I can perform an audit.

- [x] Transactions page implemented.

### As a user, I want to view my portfolio (a list of all the stocks I own along with their current values) so that I can review performance.

- [x] Current values should be based on the latest price and quantity owned for a given stock.
- [x] Each stock owned should only appear once.

### As a user, I'd like to see the front color of stock symbols and current prices in my portfolio change dynamically to indicate performance.

- [x] Display red when the current price is less than the day's open price.
- [x] Display grey when the current price is equal to the day's open price.
- [x] Display green when the current price is greater than the day's open price.

### Things I would have liked to Implement:

- [ ] E2E testing with puppeteer+jest
- [ ] Server Side Pagination
- [ ] Styling of the frontend components
- [ ] General code cleanup

## How to get started:

- [ ] Fork this repo and `git clone` your forked Repo.
- [ ] Install dependencies with `npm install`.
- [ ] Get your IEXToken(IEX) to utilize the IEX API.

Please contact the project administrators if you have any questions or concerns.

### For development environments:

- Start the Postgres Server.

  - [ ] If using a local Postgres Server, run `npm run create-db` to intialize the database.

- Run the following `npm` scripts to start the application:

  - [ ] `npm run build-dev` to compile the client application and watch for changes.
  - [ ] `npm run start-dev` to run the server using `nodemon`.

- Create an env file to store your environment variables and API Keys
