<h1 align="center">📝 Task Sync Social</h1>

<p align="center">
  A full-stack collaborative <b>Todo Task Management App</b> built with <b>React + TypeScript</b> and <b>Supabase</b>. Sign in with Google, manage personal and shared tasks, and collaborate in real time!
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React-blue?logo=react" />
  <img src="https://img.shields.io/badge/Backend-Supabase-3FCF8E?logo=supabase" />
  <img src="https://img.shields.io/badge/TypeScript-Enabled-blue?logo=typescript" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel" />
</p>

---

## 🌍 Live Demo

🔗 **Frontend:** [Click to open](https://your-frontend.vercel.app)  
🎥 **Loom Demo:** [Watch now](https://loom.com/share/your-demo-link)

---

## 🧰 Tech Stack

| Layer       | Technologies                                   |
|-------------|------------------------------------------------|
| Frontend    | React (Vite), TypeScript, TailwindCSS, Zustand |
| Backend     | Supabase (PostgreSQL, Realtime, Auth)          |
| Auth        | Google OAuth (via Supabase)                    |
| Deployment  | Vercel (Frontend) + Supabase (Backend + DB)    |

---

## 🚀 Features

- 🔐 **Google OAuth** for secure login
- ✅ **Full CRUD** for task management
- 🔁 **Real-time updates** with Supabase Realtime
- 👥 **Task sharing** by email
- 📱 **Responsive design** (mobile + desktop)
- 🔔 **Toast notifications** for actions
- 📦 **Offline fallback** using localStorage
- 📂 **Filters:** Due Today, Overdue, Priority, Status

---

## 🖼️ Architecture Diagram

> ![Architecture](./architecture.png)

---

## 📁 Project Structure

<pre> task-sync-social/ ├── public/ # Static assets (favicon, etc.) ├── src/ │ ├── components/ # Reusable UI components (TaskCard, Button) │ ├── contexts/ # Global state (auth, tasks) using Zustand or React Context │ ├── hooks/ # Custom hooks (e.g. useTasks, useUser) │ ├── integrations/ # Supabase client and API methods │ ├── lib/ # Utility functions (e.g. date utils, validators) │ ├── pages/ # Pages (Login, Dashboard, etc.) │ ├── types/ # TypeScript types and interfaces │ ├── App.tsx # Root component │ ├── main.tsx # App entry point │ ├── index.css / App.css # Global styles ├── supabase/ # SQL dump, RLS policy notes, config ├── .env # Supabase URL and keys ├── .gitignore ├── tailwind.config.ts ├── vite.config.ts ├── tsconfig.json / node.json / app.json ├── bun.lockb / package-lock.json └── README.md </pre>

yaml
Copy
Edit

---

## 🛢️ Supabase Database Schema

### Table: `tasks`

| Column      | Type      | Description                      |
|-------------|-----------|----------------------------------|
| `id`        | UUID      | Primary Key                      |
| `user_id`   | UUID      | Owner (foreign key to auth.users)|
| `title`     | Text      | Task title                       |
| `description` | Text    | Task details                     |
| `status`    | Enum      | pending / in_progress / done     |
| `priority`  | Integer   | 1=High, 2=Medium, 3=Low           |
| `due_date`  | Timestamp | Optional                         |
| `shared_with` | Text[]  | Array of email strings            |
| `created_at` | Timestamp| Default: now()                   |

✅ **RLS Policies**
- Read: `user_id = auth.uid()` OR current user in `shared_with`
- Write: Only task owner

---

## ⚙️ Local Development Setup

### 🧾 Prerequisites
- Node.js v18+
- Supabase account

### 📦 Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/task-sync-social.git
cd task-sync-social

# 2. Setup env
touch .env
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

# 3. Install dependencies
npm install

# 4. Run dev server
npm run dev
🌐 .env Format
env
Copy
Edit
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
🧪 Key Screens
/login → Google Sign In

/dashboard → Task list with filters

/task/:id → Edit & manage task

Modal → Share task by email

📌 Assumptions
Only Google OAuth is implemented (GitHub/Facebook skipped for time)

Shared users must already exist in Supabase auth.users

Basic offline support is implemented using localStorage

🎯 Future Enhancements
✅ GitHub/Facebook OAuth

✅ Reminders via email/SMS

✅ Task analytics dashboard

✅ Drag & drop sorting

✅ Role-based permissions (viewer, editor)

📽️ Loom Video
🎥 Click here to watch the full demo

🧑‍⚖️ License
MIT
