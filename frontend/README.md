# TODO Frontend

React (Vite) frontend for the TODO app.

## Setup

```bash
cd frontend
npm install
```

## Run

```bash
npm run dev
```

App runs on `http://localhost:3000`. API requests to `/api` are proxied to `http://localhost:5000`, so the backend must be running.

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Assumptions / Limitations

- Backend is expected at `http://localhost:5000` (via Vite proxy in dev).
- No authentication; all users see the same todo list.
- Title is required when creating or editing a todo.
- Simple CSS only; no UI framework. Layout is responsive within the constraints of the assignment.
