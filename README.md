# 🎯 InterviewPrep — Technical Interview Practice App

A full-stack web application for practicing technical interview questions, tracking your answers, and visualizing your progress.

> **Portfolio Project** · React + Supabase · Built in 3–5 days

---

## ✨ Features

- **55 curated questions** across 6 categories: Algorithms, Data Structures, Web Development, Databases, OOP, and System Design
- **Random question picker** with category filter
- **Live timer** with pause/resume/reset and color-coded urgency (green → yellow → red)
- **Answer input** — type and save your own answers
- **Confidence rating** — 1–5 star rating after each answer
- **Supabase backend** — answers saved to a real database, scoped per user
- **Auth** — email/password sign up and sign in
- **Answer history** — searchable, filterable, sortable list of all saved answers
- **Progress stats** — KPI tiles, bar charts by category, confidence distribution, recent activity feed
- **Responsive design** — works on mobile, tablet, and desktop

---

## 🛠 Tech Stack

| Layer      | Technology            |
|------------|-----------------------|
| Frontend   | React 18 + Vite       |
| Styling    | Pure CSS (no framework) |
| Database   | Supabase (PostgreSQL) |
| Auth       | Supabase Auth         |
| Hosting    | Vercel (recommended)  |
| Fonts      | Google Fonts (Syne, DM Sans, JetBrains Mono) |

---

## 📁 Project Structure

```
interview-prep-app/
├── index.html
├── vite.config.js
├── package.json
├── .env.example          ← copy to .env and fill in your Supabase keys
├── supabase/
│   └── schema.sql        ← run this once in the Supabase SQL Editor
└── src/
    ├── main.jsx          ← React entry point
    ├── App.jsx           ← root component, wires auth + routing
    ├── data/
    │   └── questions.js  ← all 55 questions + category metadata
    ├── hooks/
    │   ├── useAuth.js    ← Supabase auth (signUp, signIn, signOut)
    │   ├── useAnswers.js ← Supabase CRUD (fetch, save, delete, update)
    │   └── useToast.js   ← lightweight toast notification
    ├── components/
    │   ├── Icons.jsx         ← inline SVG icons (no icon library needed)
    │   ├── Sidebar.jsx       ← navigation sidebar + user info
    │   ├── Toast.jsx         ← toast notification display
    │   ├── Timer.jsx         ← live timer component
    │   ├── StarRating.jsx    ← 1–5 star confidence selector
    │   ├── CategoryBadge.jsx ← colored category pill
    │   └── CategoryFilter.jsx← category pill filter group
    ├── pages/
    │   ├── AuthPage.jsx      ← sign in / sign up
    │   ├── HomePage.jsx      ← hero, KPIs, category cards, recent activity
    │   ├── PracticePage.jsx  ← main practice interface
    │   ├── HistoryPage.jsx   ← saved answer history
    │   └── StatsPage.jsx     ← progress dashboard
    └── styles/
        └── global.css        ← all styles (CSS variables, layout, components)
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/interview-prep-app.git
cd interview-prep-app
npm install
```

### 2. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a **New Project**
3. Once it's ready, go to **SQL Editor → New Query**
4. Paste the contents of `supabase/schema.sql` and click **Run**
5. Go to **Settings → API** and copy:
   - **Project URL** (`VITE_SUPABASE_URL`)
   - **anon / public key** (`VITE_SUPABASE_ANON_KEY`)

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🔐 Authentication

This app uses **Supabase Auth with email/password**.

- Sign up creates a new user; Supabase may send a confirmation email (configurable in your Supabase dashboard under **Authentication → Settings**)
- To disable email confirmation during development: go to **Authentication → Providers → Email** and turn off "Confirm email"
- All answers are scoped to the authenticated user via **Row Level Security (RLS)**

---

## 🗄️ Database Schema

```sql
table: answers
├── id          UUID         PK, auto-generated
├── user_id     UUID         FK → auth.users, cascade delete
├── question    TEXT         the question text
├── category    TEXT         one of: Algorithms, Data Structures, etc.
├── answer      TEXT         the user's typed answer
├── confidence  SMALLINT     1–5
├── elapsed     INTEGER      seconds spent on answer
└── created_at  TIMESTAMPTZ  default: now()
```

RLS policies ensure each user can only read/write their own rows.

---

## 🌍 Deploying to Vercel

```bash
npm run build
```

Then push to GitHub and connect the repo to [vercel.com](https://vercel.com).

Add your environment variables in Vercel:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

---

## 🔮 Future Improvements

- [ ] Google OAuth sign-in
- [ ] Spaced repetition (re-surface low-confidence questions)
- [ ] Export history to PDF / CSV
- [ ] Daily practice streak with calendar heatmap
- [ ] AI-powered hints using the Claude API
- [ ] Question bookmarking / favorites
- [ ] Timed interview simulator mode (45-min session)
- [ ] Dark/light mode toggle

---

## 📄 License

MIT — free to use and modify for your own portfolio.

---

## 👤 Author

Built by **[Your Name]** · [yourwebsite.com](https://yourwebsite.com) · [LinkedIn](https://linkedin.com/in/yourprofile) · [GitHub](https://github.com/yourusername)
