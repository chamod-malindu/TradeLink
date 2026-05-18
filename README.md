# TradeLink — Mini Service Request Board

A full-stack modern web application connecting homeowners with skilled local tradespeople. Homeowners can quickly post service requests, and tradespeople can browse open jobs, manage their workflow, and update job statuses in real-time.

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| Backend  | Node.js, Express 5, TypeScript      |
| Database | MongoDB Atlas, Mongoose             |

## Features

- List job requests with **category**, **status**, and **keyword search** filters
- Create new service requests with validation
- View job details, update status (`Open` → `In Progress` → `Closed`), delete jobs
- REST API with proper HTTP status codes and JSON error responses

## Prerequisites

- Node.js 20+ and npm
- MongoDB Atlas account (free tier) or local MongoDB
- Git

## Environment Variables

### Backend (`backend/.env`)

| Variable   | Description                          | Example        |
|------------|--------------------------------------|----------------|
| `PORT`     | API server port                      | `5001`         |
| `MONGO_URI`| MongoDB connection string            | `mongodb+srv://...` |
| `NODE_ENV` | Environment                          | `development`  |

> **Windows:** Use port **5001**, not 5000. Windows reserves port 5000 and API calls will fail with a network error.

Copy the template:

```bash
cp backend/.env.example backend/.env
```

### Frontend (`frontend/.env.local`)

| Variable               | Description              | Example                          |
|------------------------|--------------------------|----------------------------------|
| `NEXT_PUBLIC_API_URL`  | Backend API base URL     | `http://localhost:5001/api`      |

## Setup & Run

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/TradeLink.git
cd TradeLink
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MONGO_URI
npm run dev
```

Server runs at `http://localhost:5001`  
Health check: `http://localhost:5001/api/health`

### 3. Seed sample data (optional)

```bash
cd backend
npm run seed
```

Inserts 8 sample jobs if the database is empty.

### 4. Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local if your API port differs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

| Method | Endpoint           | Description                    |
|--------|--------------------|--------------------------------|
| GET    | `/api/health`      | Health check                   |
| GET    | `/api/jobs`        | List jobs (`?category`, `?status`, `?search`) |
| GET    | `/api/jobs/:id`    | Get one job                    |
| POST   | `/api/jobs`        | Create job                     |
| PATCH  | `/api/jobs/:id`    | Update status only             |
| DELETE | `/api/jobs/:id`    | Delete job                     |

## Running Tests (Bonus)

```bash
cd backend
npm test
```

Requires `MONGO_URI` in `backend/.env`. Tests use a separate `tradelink_test` database.

## Project Structure

```
TradeLink/
├── backend/          Express API + Mongoose
├── frontend/         Next.js App Router UI
├── docs/             Tutorial Part 1 & Part 2 plans
└── README.md
```

## Tutorial Guides

- [Part 2 — Frontend, Seed, Testing, README](./docs/Part-2-Frontend-Seed-Testing-README.md)
- [Complete project plan](./docs/TradeLink-Complete-Plan.md)

## Git Workflow

- `master` — submission-ready
- `develop` — integration branch
- `feature/*` — one branch per feature (see `docs/TradeLink-Complete-Plan.md`)

## Live Demo

<!-- Add after deployment -->
- Frontend: _pending_
- Backend API: _pending_

## Author

Your Name — [GitHub](https://github.com/YOUR_USERNAME)

## License

ISC
