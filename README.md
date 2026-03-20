# SendIt Cycles — Frontend

React storefront for **SendIt Cycles**, a premium mountain bike shop selling XC, Trail, Downcountry, Enduro, and Downhill bikes.

## What is SendIt Cycles?

SendIt Cycles is a fictional e-commerce platform used to demonstrate a full modern web stack. The shop lets customers browse a catalogue of premium mountain bikes grouped by riding discipline, add bikes to a cart, register an account, check out, and track their order history. An admin panel allows staff to manage the product catalogue and view all orders.

### Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero banner, featured categories, call-to-action |
| Shop | `/shop` | Browse all bikes filtered by category |
| Product Detail | `/products/:id` | Full specs, geometry, sizing, add to cart |
| Cart | `/cart` | Review and adjust items before checkout |
| Checkout | `/checkout` | Shipping details and order placement |
| Orders | `/orders` | Logged-in user's order history |
| Register | `/register` | Create a customer account |
| Login | `/login` | Authenticate |
| Admin | `/admin` | Manage products and categories (admin users only) |

## Tech Stack

- **React 18** with React Router 6
- **Vite 4** — fast dev server with HMR
- **TailwindCSS 3** — utility-first styling
- **Zustand** — lightweight state management for auth and cart
- **Axios** — API client (proxied to backend at `/api`)

## Running Locally

The backend must be running first — see `SendItCycles-BackEnd` for instructions.

```bash
npm install
npm run dev
```

The dev server starts on **http://localhost:3000** and automatically proxies all `/api/*` requests to `http://localhost:5000`.

## Production Build

```bash
npm run build       # outputs to dist/
npm run preview     # preview the production build locally
```

## Docker

```bash
docker build -t senditcycles-frontend .
docker run -p 3000:80 senditcycles-frontend
```

The Dockerfile builds the React app with Nginx serving the static files on port 80.
```
