# PaperTrade Backend

Backend REST API for the M340 Paper Trading application.

## Tech Stack

- Node.js
- Express.js
- Supabase PostgreSQL
- Supabase Auth (JWT)

## Project Structure

```text
backend/
├── middleware/       # Authentication and authorization
├── routes/           # API endpoints
├── services/         # Business logic and calculations
├── db/               # Reusable database operations
├── config/           # Database configuration
├── app.js            # Express entry point
├── .env              # Environment variables
└── package.json
```

## Getting Started

### 1. Install Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file inside `backend/` and configure your database credentials:

```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

Never commit `.env` to GitHub.

### 3. Start the Server

For development:

```bash
npm run dev
```

For normal execution:

```bash
npm start
```

The server runs at `http://localhost:3000` by default.

## Backend Architecture

- **Middleware:** Verifies Supabase JWTs and handles authorization.
- **Routes:** Defines API endpoints and handles HTTP requests/responses.
- **Services:** Contains business logic such as portfolio calculations and trade validation.
- **DB:** Contains reusable PostgreSQL queries.
- **Config:** Manages the database connection.

### Example Request Flow

```text
Frontend
   ↓
Express Route
   ↓
Service
   ↓
DB Function
   ↓
Supabase PostgreSQL
```

Protected requests pass through authentication middleware before reaching their route handlers.

## Main API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/portfolio/summary` | Portfolio summary |
| GET | `/api/portfolio/holdings` | Current holdings |
| GET | `/api/portfolio/history` | Portfolio value history |
| GET | `/api/assets/search` | Search assets |
| GET | `/api/assets/:id` | Asset details |
| POST | `/api/orders` | Buy or sell assets |
| GET | `/api/transactions` | Transaction history |
| GET | `/api/watchlist` | User watchlist |
| POST | `/api/watchlist` | Add to watchlist |
| DELETE | `/api/watchlist/:assetId` | Remove from watchlist |
| POST | `/api/ai/analyze` | AI portfolio analysis |

## Authentication

Supabase Auth handles login and signup on the frontend.

Protected API requests send a JWT access token in the `Authorization` header. Express middleware verifies the token and identifies the authenticated user.