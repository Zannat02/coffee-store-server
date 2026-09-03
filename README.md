# ☕ Espresso Emporium — Server

The backend REST API for **Espresso Emporium**, a full-stack coffee shop web application. Built with Express.js and MongoDB, it powers coffee product management and user data for the client app.

**Live API:** _[coffee-store-server-iota-topaz.vercel.app]_
**Client Repository:** _[https://github.com/Zannat02/coffee-store-client-with-auth]_

---

## 🚀 Tech Stack

- **Node.js** + **Express.js** — REST API framework
- **MongoDB** (Atlas) — database, via the native `mongodb` driver
- **CORS** — cross-origin request handling
- **dotenv** — environment variable management
- Deployed as a serverless function (Vercel-ready via `module.exports = app`)

---

## 📁 Project Structure

```
├── index.js          # main server file (routes, DB connection, middleware)
├── .env               # environment variables (not committed)
├── package.json
└── vercel.json         # Vercel deployment config (if applicable)
```

---

## 🔑 Environment Variables

Create a `.env` file in the root with:

```
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=3000
```

---

## 🛠️ Getting Started

```bash
npm install
npm run dev     # or: node index.js
```

Server runs at `http://localhost:3000` by default (or your configured `PORT`).

---

## 🗄️ Database

**Database name:** `coffeeDB`

| Collection | Description                     |
|------------|----------------------------------|
| `coffees`  | Stores all coffee product data   |
| `users`    | Stores registered user data      |

---

## 📡 API Endpoints

### Coffees

| Method | Endpoint         | Description                  |
|--------|-------------------|--------------------------------|
| GET    | `/coffees`        | Get all coffees                |
| GET    | `/coffees/:id`    | Get a single coffee by ID      |
| POST   | `/coffees`        | Add a new coffee                |
| PUT    | `/coffees/:id`    | Update a coffee (upsert)       |
| DELETE | `/coffees/:id`    | Delete a coffee                 |

### Users

| Method | Endpoint       | Description                          |
|--------|-----------------|----------------------------------------|
| GET    | `/users`        | Get all users                          |
| POST   | `/users`        | Add a new user                          |
| PATCH  | `/users`        | Update a user's `lastSignInTime` (matched by `email`) |
| DELETE | `/users/:id`    | Delete a user                           |

---

## 🌐 Deployment

The server is structured for **Vercel** serverless deployment — `app.listen()` only runs when `NODE_ENV !== "production"`, and `module.exports = app` allows Vercel to treat the Express app as a serverless function.

---

## 🔗 Related

This is the backend for the [Espresso Emporium client](#) (React + Vite frontend).