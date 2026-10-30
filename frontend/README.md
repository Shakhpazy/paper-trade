# PaperTrade Frontend

The frontend for a paper-trading school project. It uses React, TypeScript, Vite, Tailwind CSS, Shadcn UI, and Supabase authentication.

## Requirements

- Node.js `22.12.0` or newer
- npm
- A Supabase project

## Setup

Run all commands from the `frontend` directory:

```bash
cd frontend
npm ci
```

Create a `.env` file inside `frontend`:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

Do not commit `.env` or place a Supabase service-role key in the frontend.

## Run the project

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

If PowerShell blocks npm scripts, use:

```powershell
npm.cmd run dev
```

## Check the project

```bash
npm run lint
npm run build
npm run preview
```

## Routes

- `/login` – Sign in
- `/signup` – Create an account
- `/dashboard` – Account overview
- `/portfolio` – Portfolio
- `/trade` – Place paper trades
- `/history` – Trading history

The dashboard routes require a signed-in Supabase user.
