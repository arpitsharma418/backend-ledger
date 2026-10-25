# Double-Entry Financial Ledger System

A RESTful API for managing financial accounts and processing transactions using a double-entry ledger system. Built with Node.js, Express, and MongoDB.

## Features

- Double-entry bookkeeping where every transfer creates a matching debit and credit entry
- Account balances derived from ledger aggregation instead of storing a mutable balance field
- ACID-compliant transactions using MongoDB sessions with automatic rollback on failure
- Idempotent transaction processing to prevent duplicate transfers
- Immutable ledger entries enforced at the schema level
- JWT-based authentication with token blacklisting for secure logout
- Role-based access control for system-level operations
- Email notifications for registration and transactions using Gmail OAuth 2.0

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens
- bcrypt
- Nodemailer

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB instance (local or Atlas)
- Gmail OAuth 2.0 credentials for email notifications

### Installation

```bash
git clone https://github.com/<your-username>/Backend-ledger.git
cd Backend-ledger
npm install
```

### Environment Variables

Create a `.env` file in the project root with the following variables:

```
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=3000
CLIENT_ID=<google-oauth-client-id>
CLIENT_SECRET=<google-oauth-client-secret>
REFRESH_TOKEN=<google-oauth-refresh-token>
EMAIL_USER=<your-email@gmail.com>
```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive a JWT
- `POST /api/auth/logout` - Logout and blacklist the token

### Accounts (Protected)

- `POST /api/accounts/` - Create a new account
- `GET /api/accounts/` - List all accounts of the logged-in user
- `GET /api/accounts/balance/:accountId` - Get account balance

### Transactions (Protected)

- `POST /api/transactions/` - Transfer funds between accounts
- `POST /api/transactions/system/initial-funds` - Seed initial funds (system users only)
