# Mini Service Request Board — Complete Beginner Tutorial (Part 2)

## Frontend, Seed Script, Testing, README & Submission

### For: GlobalTNA Full-Stack Developer Intern Assessment

> **Part 1** covered: environment setup, GitHub, project init, Mongoose schema, and Express REST API.  
> **Part 2** covers: Next.js frontend pages, seed script, tests, README, and submission.

---

# Table of Contents (Part 2)

9. Frontend — Next.js App  
10. Frontend — Home Page  
11. Frontend — New Job Form  
12. Frontend — Job Detail Page  
13. Seed Script — Bonus  
14. Testing — Bonus  
15. Git Workflow and README  
16. Interview Preparation  

---

# 9. Frontend — Next.js App

## 9.1 Branch

```bash
git checkout develop
git checkout -b feature/frontend-setup
```

## 9.2 What you already have

Your `frontend/` folder uses:

- Next.js **App Router** (`src/app/`)
- **Tailwind CSS** + **shadcn/ui** components
- **Axios** API client in `src/lib/api.ts`
- **Navbar** layout component

## 9.3 API helper (`src/lib/api.ts`)

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
```

> **Windows:** Use port **5001** in `.env.local`, not 5000.

Functions: `getJobs`, `getJobById`, `createJob`, `updateJobStatus`, `deleteJob`

## 9.4 Environment

**`frontend/.env.local`:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

**`frontend/.env.example`** (commit this):

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 9.5 Commit

```bash
git add frontend/
git commit -m "feat: set up shadcn/ui, axios, layout and API helper"
git push origin feature/frontend-setup
git checkout develop
git merge feature/frontend-setup
```

---

# 10. Frontend — Home Page

## 10.1 Branch

```bash
git checkout -b feature/home-page
```

## 10.2 Requirements

- List all jobs as **cards** (`JobCard` component)
- **Category** filter dropdown
- **Status** filter dropdown
- **Bonus:** keyword search (debounced)

## 10.3 File: `src/app/page.tsx`

Key patterns:

- Call `getJobs({ category, status, search })` from `@/lib/api`
- Show loading spinner while fetching
- Show user-friendly error if backend is down
- **One** `useEffect` with debounced search (avoid double-fetch on mount)

## 10.4 Commit

```bash
git commit -m "feat: add home page with job listings, search and category filter"
```

---

# 11. Frontend — New Job Form

## 11.1 Branch

```bash
git checkout develop
git checkout -b feature/new-job-form
```

## 11.2 Requirements

- Route: `/new`
- Fields: title, description, category, location, contactName, contactEmail
- **Client-side validation** before submit
- On success → redirect to home or job detail

## 11.3 Validation rules

| Field | Rule |
|-------|------|
| title | required |
| description | required |
| contactEmail | optional; if present, valid email format |

## 11.4 Commit

```bash
git commit -m "feat: add new job form page with client-side validation"
```

---

# 12. Frontend — Job Detail Page

## 12.1 Branch

```bash
git checkout -b feature/job-detail
```

## 12.2 Requirements

- Route: `/job/[id]`
- Show full job details
- **Status dropdown** → `PATCH /api/jobs/:id`
- **Delete button** → `DELETE /api/jobs/:id` with confirm dialog
- Show errors if API calls fail

## 12.3 Commit

```bash
git commit -m "feat: add job detail page with status update and delete"
```

---

# 13. Seed Script — Bonus

## 13.1 Branch

```bash
git checkout develop
git checkout -b feature/seed-script
```

## 13.2 Create `backend/src/scripts/seed-jobs.ts`

- Connect to MongoDB using `MONGO_URI`
- Insert **8 sample jobs** (mixed categories and statuses)
- Skip if database already has jobs (avoid duplicates)

## 13.3 Collection name

In `jobRequest.model.ts`, use explicit collection name:

```typescript
export default mongoose.model<IJobRequest>(
  'JobRequest',
  jobRequestSchema,
  'jobRequests'
);
```

## 13.4 Run seed

```bash
cd backend
npm run seed
```

## 13.5 Commit

```bash
git commit -m "feat: add seed script with sample job requests"
git commit -m "fix: use jobRequests collection and port 5001 for Windows"
```

---

# 14. Testing — Bonus

## 14.1 Branch

```bash
git checkout develop
git checkout -b feature/api-tests
```

## 14.2 Install dependencies

```bash
cd backend
npm install --save-dev jest supertest @types/jest @types/supertest ts-jest
```

## 14.3 Create `backend/jest.config.js`

Use `ts-jest` preset with `testEnvironment: 'node'`.

## 14.4 Create `backend/src/__tests__/jobs.test.ts`

Test at minimum:

1. `POST /api/jobs` — valid body → **201**
2. `POST /api/jobs` — missing title → **400**
3. `GET /api/jobs` — returns jobs
4. `PATCH /api/jobs/:id` — updates status

Uses a separate test database: `tradelink_test`

## 14.5 Run tests

```bash
cd backend
npm test
```

Requires working `MONGO_URI` in `backend/.env`.

## 14.6 Commit

```bash
git commit -m "test: add Jest tests for jobs API endpoints"
```

---

# 15. Git Workflow and README

## 15.1 Branch

```bash
git checkout -b feature/readme
```

## 15.2 Root `README.md` must include

- Project description
- Tech stack table
- Prerequisites
- Environment variables (backend + frontend)
- Setup steps (`npm install`, `npm run dev`)
- Seed instructions (`npm run seed`)
- API endpoint table
- Screenshot placeholders
- Live demo URLs (after deployment)

## 15.3 Final merge to master

```bash
git checkout develop
git merge feature/seed-script
git merge feature/api-tests
git merge feature/readme

git checkout master
git merge develop
git push origin master develop
```

## 15.4 Submission checklist

- [ ] Public GitHub repo
- [ ] README with setup + env vars + screenshots
- [ ] At least **8–10 meaningful commits**
- [ ] `.env` files NOT committed
- [ ] App runs locally (backend 5001 + frontend 3000)
- [ ] Email by **18 May 2026, 12:00 pm**
- [ ] CC: nimeshsago@gmail.com
- [ ] To: shimarasago@gmail.com

## 15.5 Submission email

**Subject:** Full-Stack Developer Intern Assignment — [Your Name] — TradeLink

```
Dear Shimara,

GitHub: https://github.com/YOUR_USERNAME/TradeLink
Live demo: https://your-app.vercel.app

README includes setup instructions and environment variables.

Best regards,
[Your Name]
```

---

# 16. Interview Preparation

## Elevator pitch

"I built TradeLink, a mini service request board with Next.js and a separate Express API. Homeowners post jobs; tradespeople browse and update status. Data is stored in MongoDB with Mongoose. I used feature branches and conventional commits."

## Common questions

| Question | Answer outline |
|----------|----------------|
| Why separate Express from Next.js? | Assignment requirement; clear API boundary; matches production |
| How does validation work? | Mongoose schema + controller checks; client-side for UX |
| Why port 5001? | Windows reserves port 5000 |
| How do filters work? | Query params → MongoDB `find()` with filters and `$regex` search |
| What next? | Auth, pagination, deployment, email notifications |

---

> **You are done with Part 2 when:** all three pages work, seed runs, README is complete, and code is pushed to a public GitHub repo.

*Continue from Part 1 — GlobalTNA Mini Service Request Board Tutorial*
