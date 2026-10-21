# RecipeSearch (Full-Stack Monorepo)

A full-stack application built with an **Express MVC (Model-View-Controller)** backend and a **Feature-Based React client**, powered by **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🏗️ Architecture Overview

```
ReciepSearch/
├── pnpm-workspace.yaml          # Monorepo workspace configuration
├── package.json                 # Monorepo scripts
│
├── server/                      # Express MVC Backend (TypeScript)
│   ├── src/
│   │   ├── models/              # Models: Data schemas and store operations
│   │   │   └── recipe.model.ts
│   │   ├── controllers/         # Controllers: Request handling, validation & responses
│   │   │   └── recipe.controller.ts
│   │   ├── routes/              # Routes: URL routing mapped to controllers
│   │   │   ├── recipe.routes.ts
│   │   │   └── index.ts
│   │   ├── middleware/          # Middleware: 404 & Centralized error handler
│   │   │   └── errorHandler.ts
│   │   ├── app.ts               # Express configuration, CORS, parsers
│   │   └── index.ts             # Server entrypoint & port listener
│   ├── tsconfig.json
│   └── package.json
│
└── client/                      # Feature-Based Frontend (React + Vite + Tailwind CSS)
    ├── src/
    │   ├── features/
    │   │   └── recipes/         # Recipes Feature Module
    │   │       ├── api/         # Feature API service (recipeApi.ts)
    │   │       ├── hooks/       # Custom hooks (useRecipes.ts)
    │   │       ├── types/       # Feature TypeScript types (recipe.types.ts)
    │   │       ├── components/  # Feature UI components:
    │   │       │   ├── RecipeList.tsx
    │   │       │   ├── RecipeCard.tsx
    │   │       │   ├── RecipeSearchFilter.tsx
    │   │       │   ├── RecipeDetailModal.tsx
    │   │       │   ├── RecipeCreateModal.tsx
    │   │       │   └── RecipeStats.tsx
    │   │       └── index.ts     # Feature public interface
    │   ├── components/          # Shared layout components (Navbar.tsx)
    │   ├── services/            # Shared apiClient fetch wrapper
    │   ├── types/               # Shared API contract types
    │   ├── App.tsx              # Main page orchestration
    │   ├── index.css            # Tailwind CSS v4 styling
    │   └── main.tsx
    ├── vite.config.ts           # Configured with @tailwindcss/vite & API proxy
    ├── tsconfig.json
    └── package.json
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Run Development Servers
From the root directory, you can run:

```bash
# Start backend server (http://localhost:5000)
pnpm dev:server

# In a separate terminal, start client (http://localhost:5173)
pnpm dev:client
```

Or run them individually inside their folders:
```bash
# Server
cd server && pnpm dev

# Client
cd client && pnpm dev
```

---

## 🔌 API Endpoints (Express MVC)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health check |
| `GET` | `/api/recipes` | Fetch recipes (supports query params: `search`, `category`, `difficulty`, `maxPrepTime`) |
| `GET` | `/api/recipes/categories` | Retrieve available recipe categories |
| `GET` | `/api/recipes/:id` | Fetch single recipe by ID |
| `POST` | `/api/recipes` | Create a new recipe |
| `PUT` | `/api/recipes/:id` | Update an existing recipe |
| `DELETE` | `/api/recipes/:id` | Delete a recipe |

---

## 🎨 Client Features

- **Live Search & Filter**: Real-time search across titles, descriptions, tags, and ingredients.
- **Filter Pills & Slider**: Filter by Category (`Breakfast`, `Lunch`, `Dinner`, `Dessert`, `Snack`, `Beverage`), Difficulty, and Max Prep Time.
- **Interactive Recipe Detail Modal**:
  - Interactive cooking ingredient checklist (check items off as you prepare!).
  - Step-by-step instructions with numbered badges.
- **Recipe Creation Modal**: Add new recipes with preset food photography or custom URLs, dynamic ingredient and step inputs.
- **Tailwind CSS v4 with Vite Plugin**: Styled using `@tailwindcss/vite`.
