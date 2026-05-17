# TradeLink — Complete Project Plan
## GlobalTNA Full-Stack Developer Intern Technical Assessment

**Candidate project:** Mini Service Request Board  
**Deadline:** 18 May 2026, 12:00 pm  
**Submission:** Public GitHub repo + demo link → email shimarasago@gmail.com (CC: nimeshsago@gmail.com)

---

## Table of Contents

1. [What Is TradeLink?](#1-what-is-tradelink)
2. [Assignment Requirements (Checklist)](#2-assignment-requirements-checklist)
3. [What You Will Learn](#3-what-you-will-learn)
4. [What the Final Result Looks Like](#4-what-the-final-result-looks-like)
5. [Your Current Progress](#5-your-current-progress)
6. [Environment Setup](#6-environment-setup)
7. [GitHub & Git Workflow (Branches + Commits)](#7-github--git-workflow-branches--commits)
8. [Phase-by-Phase Build Plan](#8-phase-by-phase-build-plan)
9. [Backend — Database Schema](#9-backend--database-schema)
10. [Backend — REST API](#10-backend--rest-api)
11. [Frontend — Next.js App](#11-frontend--nextjs-app)
12. [Bonus Features (Optional)](#12-bonus-features-optional)
13. [Testing](#13-testing)
14. [Deployment](#14-deployment)
15. [README & Submission](#15-readme--submission)
16. [Interview Preparation](#16-interview-preparation)
17. [Quick Reference — Commit Messages](#17-quick-reference--commit-messages)

---

## 1. What Is TradeLink?

TradeLink is a small web app where:

- **Homeowners** post a service request (e.g. *"Need a plumber for a leaking kitchen tap in Glasgow"*).
- **Tradespeople** browse open requests, view details, and mark jobs as **In Progress** or **Closed**.

It is a stripped-down, single-page-style version of the platform GlobalTNA is building. The assignment is intentionally small — they want a **working slice** and a **clear README**, not an over-engineered product.

### Required Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router) |
| Backend | Node.js + Express (separate from Next.js) |
| Database | MongoDB (Atlas or local) |
| ODM | Mongoose (recommended) |
| Styling | Tailwind CSS (your choice) |

**Important:** The frontend must talk to your **Express API** — not directly to MongoDB and not only via Next.js API routes.

---

## 2. Assignment Requirements (Checklist)

Use this as your submission checklist. Mark each item before you email GlobalTNA.

### Core (Must Have)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | MongoDB collection `jobRequests` with all required fields | ☐ |
| 2 | `GET /api/jobs` — list + `?category=` and `?status=` filters | ☐ |
| 3 | `GET /api/jobs/:id` — single job | ☐ |
| 4 | `POST /api/jobs` — create with validation | ☐ |
| 5 | `PATCH /api/jobs/:id` — update **status only** | ☐ |
| 6 | `DELETE /api/jobs/:id` — delete job | ☐ |
| 7 | Proper HTTP status codes + JSON responses | ☐ |
| 8 | Global error handler + obvious 404 for missing routes/resources | ☐ |
| 9 | Home page — job cards/table + category filter | ☐ |
| 10 | New job form — client-side validation | ☐ |
| 11 | Job detail page — full details, status dropdown, delete | ☐ |
| 12 | Root `README.md` — setup, env vars, run instructions | ☐ |
| 13 | Public GitHub repository | ☐ |
| 14 | Demo link (local or deployed) | ☐ |

### Bonus (Only If Core Is Solid)

| # | Feature | Status |
|---|---------|--------|
| B1 | Keyword search (title + description) | ☐ |
| B2 | JWT auth (post/delete protected) | ☐ |
| B3 | Deploy frontend (Vercel) + backend (Render/Railway) | ☐ |
| B4 | Unit tests (Jest/Vitest) on 1–2 endpoints | ☐ |
| B5 | Seed script (5–10 sample jobs) | ☐ |

---

## 3. What You Will Learn

| Area | Skills |
|------|--------|
| Frontend | Next.js App Router, React, forms, client validation, API integration |
| Backend | Node.js, Express, REST APIs, middleware, validation |
| Database | MongoDB, Mongoose, schema design, enums |
| DevOps | Git branches, commits, GitHub, env variables, deployment |
| Professional practice | README writing, demo preparation, internship submission |

---

## 4. What the Final Result Looks Like

When finished, you will have:

1. **Home page** (`/`) — list of job requests as cards, filters for category and status, optional search.
2. **New job page** (`/new`) — form to create a request with validation.
3. **Job detail page** (`/job/[id]`) — full details, change status, delete.
4. **Express REST API** on port **5001** (Windows blocks port 5000).
5. **MongoDB Atlas** storing `jobRequests` documents.
6. **GitHub repo** with `develop` branch, feature branches, and clear commit history.
7. **README** evaluators can follow without asking you questions.

---

## 5. Your Current Progress

Based on your repository (as of this plan):

### Already completed (on feature branches)

| Branch | Work | Commit style |
|--------|------|--------------|
| `develop` | Base integration branch | — |
| `feature/database-schema` | JobRequest model + DB connection | `feat: add JobRequest Mongoose schema...` |
| `feature/backend-api` | Express routes, controllers, validation | `feat: add Express server with REST API...` |
| `feature/frontend-setup` | Next.js, shadcn, axios, layout, api.ts | `feat: set up shadcn/ui, axios, layout...` |
| `feature/home-page` | Home list, filters, search | `feat: add home page with job listings...` |
| `feature/new-job-form` | Create job form | `feat: add new job form page...` |
| `feature/job-detail` | Detail, status, delete | `feat: add job detail page...` |
| `feature/seed-script` | *(current branch — in progress)* | — |

### Still to do (recommended order)

1. **Finish seed script** → merge `feature/seed-script` → `develop`
2. **Root README** → branch `feature/readme`
3. **Polish & fixes** (port 5001, CORS, double-fetch on home) → `fix/home-fetch` or include in README branch
4. **Tests** (bonus) → `feature/api-tests`
5. **Deploy** (bonus) → `feature/deployment`
6. **Merge `develop` → `master`** and push for submission

---

## 6. Environment Setup

### 6.1 Tools you need

- Node.js 20+ LTS (`node --version`, `npm --version`)
- Git (`git --version`)
- MongoDB Atlas free cluster (recommended)
- VS Code + ESLint / Prettier extensions

### 6.2 MongoDB Atlas

1. Create account at https://www.mongodb.com/atlas  
2. Create M0 free cluster  
3. Database user + password  
4. Network access: allow your IP (or `0.0.0.0/0` for dev only)  
5. Copy connection string → `MONGO_URI` in `backend/.env`

### 6.3 Environment files

**`backend/.env`** (never commit):

```env
PORT=5001
MONGO_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/tradelink
NODE_ENV=development
```

> **Windows note:** Port **5000** is reserved by Windows (`Microsoft-HTTPAPI/2.0`). Use **5001** or the browser will show `AxiosError: Network Error`.

**`backend/.env.example`** (commit this):

```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/tradelink
NODE_ENV=development
```

**`frontend/.env.local`** (never commit):

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### 6.4 Run locally (every day)

**Terminal 1 — Backend:**

```powershell
cd backend
npm run dev
```

Expected: `MongoDB connected successfully` and `Server running on port 5001`

**Terminal 2 — Frontend:**

```powershell
cd frontend
npm run dev
```

Open: http://localhost:3000

**Verify API:**

```powershell
curl.exe http://localhost:5001/api/health
curl.exe http://localhost:5001/api/jobs
```

---

## 7. GitHub & Git Workflow (Branches + Commits)

This mirrors your FeedPulse workflow — professional and easy for reviewers to follow.

### 7.1 Branch structure

```
master          ← submission-ready, stable
  └── develop   ← integration branch (merge features here)
        ├── feature/database-schema      ✅ done
        ├── feature/backend-api          ✅ done
        ├── feature/frontend-setup       ✅ done
        ├── feature/home-page            ✅ done
        ├── feature/new-job-form         ✅ done
        ├── feature/job-detail           ✅ done
        ├── feature/seed-script          ← you are here
        ├── feature/readme               ← next
        ├── feature/api-tests            ← bonus
        └── feature/deployment           ← bonus
```

### 7.2 Branch naming rules

- Lowercase, hyphens: `feature/job-detail`
- Prefixes: `feature/`, `fix/`, `chore/`, `test/`, `docs/`
- Short and descriptive

### 7.3 Workflow for each feature

```powershell
# 1. Start from develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/seed-script

# 3. Work, test, commit (small commits)
git add backend/src/scripts/seed-jobs.ts
git commit -m "feat: add seed script with sample job requests"

# 4. Push and merge (local or PR on GitHub)
git push -u origin feature/seed-script
git checkout develop
git merge feature/seed-script
git push origin develop
```

### 7.4 Commit message format

```
type: short description in present tense
```

| Type | When to use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat: add seed script with 8 sample jobs` |
| `fix` | Bug fix | `fix: use port 5001 to avoid Windows port conflict` |
| `docs` | README, comments | `docs: add root README with setup instructions` |
| `test` | Tests | `test: add Jest tests for POST and GET /api/jobs` |
| `chore` | Config, deps | `chore: add jest and supertest dev dependencies` |
| `refactor` | Code restructure | `refactor: extract fetchJobs into custom hook` |
| `style` | Formatting only | `style: format job controller with prettier` |

**Good examples:**

- `feat: add home page with job listings and category filter`
- `fix: prevent duplicate fetchJobs on page mount`
- `docs: add environment variables table to README`

**Bad examples:**

- `update`
- `fixed stuff`
- `WIP`

### 7.5 Minimum commits for submission

Aim for **at least 8–12 meaningful commits** across the project (you already have 7 — add 3–5 more for README, seed, polish, optional tests/deploy).

### 7.6 Final merge before submission

```powershell
git checkout develop
git status   # ensure clean
git checkout master
git merge develop
git push origin master
git push origin develop
```

---

## 8. Phase-by-Phase Build Plan

Each phase = one feature branch. **Do not skip README and testing before submission.**

| Phase | Branch | Goal | Est. time |
|-------|--------|------|-----------|
| 0 | `chore/initial-setup` | Repo, folders, .gitignore, .env.example | ✅ Done |
| 1 | `feature/database-schema` | JobRequest model + connectDB | ✅ Done |
| 2 | `feature/backend-api` | All REST endpoints + error handling | ✅ Done |
| 3 | `feature/frontend-setup` | Next.js, Tailwind, api.ts, Navbar | ✅ Done |
| 4 | `feature/home-page` | List jobs, category/status/search filters | ✅ Done |
| 5 | `feature/new-job-form` | Create job + client validation | ✅ Done |
| 6 | `feature/job-detail` | View, PATCH status, DELETE | ✅ Done |
| 7 | `feature/seed-script` | 5–10 sample jobs in MongoDB | **Now** |
| 8 | `feature/readme` | Root README + screenshots | **Next** |
| 9 | `fix/polish` | Port 5001, CORS, UX errors | 1 hr |
| 10 | `feature/api-tests` | Jest + Supertest (bonus) | 2–3 hrs |
| 11 | `feature/deployment` | Vercel + Render + demo URLs | 2–3 hrs |
| 12 | — | Merge to `master`, submit email | 30 min |

---

## 9. Backend — Database Schema

### 9.1 JobRequest fields (assignment spec)

| Field | Type | Rules |
|-------|------|-------|
| title | string | required |
| description | string | required |
| category | string | e.g. Plumbing, Electrical, Painting, Joinery |
| location | string | e.g. Glasgow |
| contactName | string | optional in UI; schema can allow empty |
| contactEmail | string | validate email format |
| status | enum | `Open` \| `In Progress` \| `Closed`, default `Open` |
| createdAt | Date | auto (`timestamps: true`) |

### 9.2 Collection name

Assignment asks for collection **`jobRequests`**. In Mongoose, set explicitly:

```typescript
export default mongoose.model<IJobRequest>(
  'JobRequest',
  jobRequestSchema,
  'jobRequests'  // exact collection name
);
```

**Branch:** `fix/collection-name` — commit: `fix: use jobRequests as MongoDB collection name`

---

## 10. Backend — REST API

### 10.1 Endpoints summary

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/jobs` | List all; query: `category`, `status`, `search` |
| GET | `/api/jobs/:id` | One job |
| POST | `/api/jobs` | Create job |
| PATCH | `/api/jobs/:id` | Update `{ status }` only |
| DELETE | `/api/jobs/:id` | Delete job |
| GET | `/api/health` | Health check (extra) |

### 10.2 Response shape (keep consistent)

```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

Error:

```json
{
  "success": false,
  "error": "Not found",
  "message": "Job not found"
}
```

### 10.3 Status codes

| Code | When |
|------|------|
| 200 | OK (GET, PATCH, DELETE) |
| 201 | Created (POST) |
| 400 | Validation failed |
| 404 | Job or route not found |
| 500 | Server error |

---

## 11. Frontend — Next.js App

### 11.1 Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Job list + filters |
| `/new` | `src/app/new/page.tsx` | Create form |
| `/job/[id]` | `src/app/job/[id]/page.tsx` | Detail + status + delete |

### 11.2 API helper (`src/lib/api.ts`)

All HTTP calls go through axios with `NEXT_PUBLIC_API_URL`.

Functions: `getJobs`, `getJobById`, `createJob`, `updateJobStatus`, `deleteJob`

### 11.3 Polish tasks (Phase 9)

1. **Fix double fetch on home** — combine filter + search into one `useEffect` or debounce inside a single effect.
2. **Show errors on detail page** — toast or inline message when update/delete fails.
3. **Use `http://localhost:3000`** in browser (CORS allows localhost in dev).

---

## 12. Bonus Features (Optional)

### 12.1 Keyword search — ✅ Already done

Backend: `?search=` with `$regex` on title and description.  
Frontend: debounced search input on home page.

### 12.2 Seed script — Phase 7

**Branch:** `feature/seed-script`

**File:** `backend/src/scripts/seed-jobs.ts`

**Run:**

```powershell
cd backend
npm run seed
```

**Commit:** `feat: add seed script with sample job requests`

Sample data ideas (8 jobs):

- Plumber — leaking tap — Glasgow — Open  
- Electrician — fuse box — Edinburgh — In Progress  
- Painter — living room — Aberdeen — Closed  
- etc.

### 12.3 JWT auth (optional)

Only if core + README + seed are done. Protect `POST` and `DELETE`; keep `GET` public for browsing.

### 12.4 Deployment (optional)

| Service | App | Env |
|---------|-----|-----|
| Vercel | frontend | `NEXT_PUBLIC_API_URL=https://your-api.onrender.com/api` |
| Render / Railway | backend | `MONGO_URI`, `PORT`, `NODE_ENV=production` |
| Atlas | database | allow `0.0.0.0/0` for Render IP or use Atlas VPC |

Update production CORS in `app.ts` to your real Vercel URL.

---

## 13. Testing

**Branch:** `feature/api-tests`

```powershell
cd backend
npm install --save-dev jest supertest @types/jest @types/supertest ts-jest
```

Test at minimum:

1. `POST /api/jobs` — valid body → 201  
2. `POST /api/jobs` — missing title → 400  
3. `GET /api/jobs` — returns array  

**Commit:** `test: add Jest tests for jobs API endpoints`

---

## 14. Deployment

**Branch:** `feature/deployment`

1. Push repo to GitHub (public).  
2. Deploy backend to Render → copy URL.  
3. Deploy frontend to Vercel → set `NEXT_PUBLIC_API_URL`.  
4. Test live demo: create job, list, update status, delete.  
5. Put both URLs in README and submission email.

---

## 15. README & Submission

### 15.1 Root README must include

- Project title and one-paragraph description  
- Tech stack table  
- Prerequisites  
- Clone + install steps (backend + frontend)  
- Environment variables table  
- How to run (`npm run dev` both)  
- How to run seed (`npm run seed`)  
- API endpoints list  
- Screenshots (home, new form, detail)  
- Live demo links (if deployed)  
- Your name / GitHub username  

### 15.2 Submission email template

**To:** shimarasago@gmail.com  
**CC:** nimeshsago@gmail.com  

**Subject:** Full-Stack Developer Intern Assignment — [Your Name] — TradeLink

**Body:**

```
Dear Shimara,

Please find my submission for the Full-Stack Developer Intern technical assessment.

GitHub Repository: https://github.com/YOUR_USERNAME/TradeLink
Live Demo: https://your-frontend.vercel.app (backend: https://your-api.onrender.com)

The README includes setup instructions and environment variables.

Thank you for the opportunity.

Best regards,
[Your Name]
```

### 15.3 Pre-submission checklist

- [ ] Repo is **public** (test in incognito)  
- [ ] `.env` and `.env.local` are **not** in Git  
- [ ] `npm install` + `npm run dev` works on a fresh clone  
- [ ] README has setup + env + screenshots  
- [ ] At least 8 meaningful commits  
- [ ] Deadline: **18 May 2026, 12:00 pm**

---

## 16. Interview Preparation

### Elevator pitch

"TradeLink is a mini service request board built with Next.js and a separate Express API. Homeowners post jobs; tradespeople browse and update status. Data lives in MongoDB via Mongoose. I used feature branches and conventional commits, and documented setup in the README."

### Likely questions

1. **Why separate Express from Next.js?** — Matches production architecture; clear API boundary; assignment requirement.  
2. **How does validation work?** — Mongoose schema + controller checks; client-side on forms for UX.  
3. **Why port 5001?** — Windows reserves port 5000.  
4. **How do filters work?** — Query params → MongoDB `find({ category, status })` and `$or` regex for search.  
5. **What would you add next?** — Auth, pagination, image uploads, notifications.

---

## 17. Quick Reference — Commit Messages

Copy-paste for remaining work:

```text
feat: add seed script with 8 sample job requests
docs: add root README with setup and API documentation
fix: use jobRequests as explicit MongoDB collection name
fix: use port 5001 and update env examples for Windows
fix: prevent duplicate job fetch on home page mount
fix: show error message on job detail status update failure
test: add Jest tests for POST and GET jobs endpoints
chore: configure Render deployment for backend API
chore: deploy frontend to Vercel and document demo URLs
```

---

## Appendix A — Suggested timeline (deadline 18 May 2026)

| Date | Task |
|------|------|
| Day 1 | Finish seed script, merge to develop |
| Day 2 | Write README + screenshots, fix polish |
| Day 3 | Optional: tests + deploy |
| Day 4 | Final test, merge master, submit email |

---

## Appendix B — Project folder structure (target)

```
TradeLink/
├── README.md                 ← YOU NEED THIS
├── .gitignore
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.ts
│       ├── app.ts
│       ├── config/database.ts
│       ├── models/jobRequest.model.ts
│       ├── routes/job.routes.ts
│       ├── controllers/job.controller.ts
│       └── scripts/seed-jobs.ts
└── frontend/
    ├── .env.local              (not committed)
    ├── package.json
    └── src/
        ├── app/
        │   ├── page.tsx
        │   ├── new/page.tsx
        │   └── job/[id]/page.tsx
        ├── components/
        └── lib/api.ts
```

---

*Document version: 1.0 — TradeLink / GlobalTNA Assignment Plan*  
*Generated for step-by-step implementation with `develop` + feature branches.*
