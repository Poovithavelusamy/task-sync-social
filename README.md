# ✅ Todo Task Management Web Application

A full-stack collaborative task manager built using **React (Vite) + TypeScript** and **Supabase**. Users can sign in with Google, create tasks, manage their status, and collaborate in real time. Designed with clean UI, responsive layout, and real-time updates.

---

## 🌐 Live Demo

🔗 [Frontend - Vercel Deployment](https://your-frontend.vercel.app)  
🎥 [Loom Demo Video](https://loom.com/share/your-demo-link)

---

## 🛠️ Tech Stack

**Frontend:**
- React + Vite (TypeScript)
- Tailwind CSS
- Zustand for global state
- React Router DOM
- React Toastify

**Backend:**
- Supabase (Auth, Realtime DB, and Storage)
- PostgreSQL (via Supabase)

**Deployment:**
- Frontend: Vercel
- Backend/Auth/DB: Supabase

---

## ✨ Features

### Authentication
- Google OAuth via Supabase
- JWT-based session management

### Task Management
- Full CRUD for tasks
- Filter by status, priority, due date
- Share tasks with other users by email
- Status: Pending, In Progress, Completed

### Real-time Collaboration
- Instant updates using Supabase Realtime (Postgres changes)
- Auto-refresh task list on changes

### User Experience
- Fully responsive (mobile-first)
- Toast messages for user actions
- Error boundaries and fallback UI
- Offline fallback with localStorage (basic)

---

## 📐 Architecture Diagram

![Architecture](./architecture.png)

---

## 📂 Project Structure

task-sync-social/
├── public/ # Static assets
├── src/
│ ├── components/ # UI Components (Buttons, TaskCards, etc.)
│ ├── contexts/ # Zustand or React Contexts (e.g., Auth)
│ ├── hooks/ # Custom hooks (e.g., useTasks, useAuth)
│ ├── integrations/ # Supabase client, API wrappers
│ ├── lib/ # Utility functions (e.g., date utils)
│ ├── pages/ # Page components (Dashboard, Login)
│ ├── types/ # Global TypeScript types/interfaces
│ ├── App.tsx # Root component
│ └── main.tsx # Entry point
├── supabase/ # SQL schema, RLS policies, config
├── tailwind.config.ts # Tailwind setup
├── vite.config.ts # Vite config
├── package.json / bun.lockb # Project dependencies
└── tsconfig.*.json # TS config files

pgsql
Copy
Edit

---

## ⚙️ Supabase Database Schema

### Table: `tasks`
| Column        | Type      | Description                        |
|---------------|-----------|------------------------------------|
| id            | UUID      | Primary key                        |
| user_id       | UUID      | Foreign key to auth.users          |
| title         | Text      | Task title                         |
| description   | Text      | Optional details                   |
| status        | Enum      | 'pending', 'in_progress', 'done'   |
| priority      | Integer   | 1 (High) to 3 (Low)                |
| due_date      | Timestamp | Optional                           |
| shared_with   | Text[]    | Array of user emails               |
| created_at    | Timestamp | Auto-generated                     |

**RLS Policies:**
- `user_id = auth.uid()` OR user is in `shared_with`

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/task-sync-social.git
cd task-sync-social
2. Environment Setup
Create a .env file in the root:

ini
Copy
Edit
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
3. Install Dependencies
bash
Copy
Edit
npm install
# or bun install if using bun
4. Start Dev Server
bash
Copy
Edit
npm run dev
🧪 Core Screens
/login: Google Sign In

/dashboard: Task list, filters, add/edit/share

/task/:id: Detailed task view & editing

✅ Assumptions Made
Google login is the only social auth implemented

Shared tasks work by inviting via email (must exist in auth.users)

Basic offline functionality uses localStorage only

Supabase real-time used for syncing updates (no WebSockets manually)

📽️ Demo Video
🎥 Loom Recording

📈 Future Enhancements
Add reminder notifications (email/SMS)

Enable GitHub and Facebook logins

Role-based access control (read/write)

Add drag-and-drop task sorting

PWA (Progressive Web App) support

📝 License
MIT License

This project is a part of a hackathon run by https://www.katomaran.com

yaml
Copy
Edit

---

✅ Next step: Just update the **live URLs**, **Loom video link**, and if needed, add your actual **`architecture.png`**.

Want me to help generate a polished [architecture diagram](f) or [RL policies](f) for Supabase?
