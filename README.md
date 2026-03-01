# Renewa — Setup & Run Guide

## What was fixed
1. **Auth session mismatch** — `auth.js` was saving to `localStorage` but `session.js` reads from `sessionStorage`. Fixed: now uses `Session.set()` consistently.
2. **Login response missing `name`** — Backend returned only `token` + `role`, so the navbar showed nothing. Fixed: backend now returns `name` + `email` too.
3. **No Listing model or API routes** — The marketplace was using a hardcoded JS array. Fixed: added `models/Listing.js` and `routes/listings.js` with full CRUD + purchase endpoint.
4. **No dashboard API routes** — Added `routes/dashboard.js` with stats for all three roles.
5. **No seed data** — Server now auto-seeds 12 listings on first run if the DB is empty.
6. **Frontend not served** — Backend now serves `renewa_final/` as static files at `http://localhost:5000`.

## Folder structure
```
renewa_v4/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Listing.js        ← NEW
│   ├── routes/
│   │   ├── auth.js           ← FIXED (returns name+email)
│   │   ├── listings.js       ← NEW (CRUD + purchase)
│   │   └── dashboard.js      ← NEW (stats per role)
│   ├── .env
│   ├── package.json
│   └── server.js             ← FIXED (all routes, static serve, seed)
└── renewa_final/
    ├── js/
    │   └── auth.js           ← FIXED (uses Session, not localStorage)
    └── pages/
        └── marketplace.html  ← FIXED (fetches from API, not hardcoded array)
```

## How to run

### 1. Start the backend
```bash
cd backend
node server.js
```
You should see:
```
✅ MongoDB Connected
🌱 Seeded 12 listings into MongoDB   (first run only)
🚀 Renewa backend running at http://localhost:5000
```

### 2. Open the app
Visit: **http://localhost:5000/pages/auth.html**

### 3. Log in
- **Register** a new account and choose a role (Consumer / Producer / Investor)
- Or use **Quick Demo Access** buttons (no backend needed for demo)

## API endpoints
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login → returns token, role, name, email |
| GET  | `/api/auth/me` | Get current user profile (auth required) |
| GET  | `/api/listings` | Get all active listings (public) |
| POST | `/api/listings` | Create listing (producer only) |
| POST | `/api/listings/:id/purchase` | Purchase energy (consumer only) |
| GET  | `/api/dashboard/consumer` | Consumer stats (auth required) |
| GET  | `/api/dashboard/producer` | Producer stats + listings (auth required) |
| GET  | `/api/dashboard/investor` | Investor stats (auth required) |
| GET  | `/api/health` | Server health check |
