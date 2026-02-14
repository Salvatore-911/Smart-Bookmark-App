# Smart Bookmark App 🔖

Smart Bookmark App is a full-stack bookmark management platform built with Next.js and Supabase, featuring secure Google OAuth authentication, realtime database updates, and a modern SaaS-style UI with dark/light mode.

---

## Live Demo 🌐

https://smart-bookmark-app-self-one.vercel.app/

---

## Features ✨

- Google OAuth Login (Supabase Auth)
- Add bookmarks with title and URL
- Delete bookmarks instantly
- Private bookmarks per user
- Realtime updates
- Modern dashboard UI
- Dark / Light mode toggle
- User profile integration
- Responsive design
- Secure authentication and database

---

## Tech Stack 🛠

Frontend:
- Next.js 16
- React
- Tailwind CSS

Backend:
- Supabase
- PostgreSQL
- Supabase Auth

Deployment:
- Vercel

---

## Installation & Setup 🚀

### 1. Clone repository

```bash
git clone https://github.com/Salvatore-911/smart-bookmark-app.git
cd smart-bookmark-app
Install dependencies
npm install

. Create environment file

Create .env.local

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Run locally
npm run dev


Open:

http://localhost:3000

Database Setup (Supabase)

Create table:

bookmarks
Columns:

id (uuid, primary key)
user_id (uuid)
title (text)
url (text)
created_at (timestamp)
Enable Row Level Security and add policy:

user_id = auth.uid()

Deploy easily using Vercel:

npm run build


---

# IMPORTANT STEP

After replacing README.md, run:

```bash
git add README.md
git commit -m "Fix README"
git push
