# TODO Backend

Express.js REST API for the TODO app.

## Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**

   Copy `.env.example` to `.env` and set your values:
   ```bash
   cp .env.example .env
   ```

   Example `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todo-app
   ```

   For **MongoDB Atlas:** use your connection string, e.g.:
   ```
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/todo-app
   ```

## MongoDB Setup

- **Docker (from backend folder):** `docker-compose up -d`. MongoDB runs on `localhost:27017`; your `.env` already points there.
- **Local:** Install MongoDB and start the service. Use `mongodb://localhost:27017/todo-app` (or your port).
- **Atlas:** Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas), get the connection string, and set `MONGODB_URI` in `.env`.

## Run the Server

```bash
npm run dev
```

Server runs on `http://localhost:5000`. Use `npm start` for production (no file watching).

## API Endpoints

- `GET /api/todos` — Return all todos
- `POST /api/todos` — Create a todo (body: `{ title, description? }`)
- `PUT /api/todos/:id` — Update title/description
- `PATCH /api/todos/:id/done` — Toggle done
- `DELETE /api/todos/:id` — Delete a todo

## Assumptions / Limitations

- Title is required when creating a todo; description is optional.
- Invalid or missing MongoDB `id` returns 404 for update/toggle/delete.
- CORS is enabled for all origins (suitable for local/dev use).
