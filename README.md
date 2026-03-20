# SendIt Cycles — Frontend

React storefront for **SendIt Cycles**.

## Start Here (Recommended)

Most users should not run this repo by itself.

Use the Infra repo to start the full app (frontend + backend + database) with Docker Compose:

- Infra repo: https://github.com/virtualmonster/SendItCycles-Infra
- Infra quick start: `README.md`
- Infra deployment script: `scripts/deploy.sh`

SendIt Cycles is a 3-repo setup:

1. `SendItCycles-FrontEnd` (this repo)
2. `SendItCycles-BackEnd`
3. `SendItCycles-Infra` (entry point for running the stack)

If you only want to launch the app, follow the Infra README first.

## What This Repo Contains

Frontend pages include:

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Hero banner and categories |
| Shop | `/shop` | Bike listing and filters |
| Product Detail | `/products/:id` | Product specs and add-to-cart |
| Cart | `/cart` | Cart management |
| Checkout | `/checkout` | Order placement |
| Orders | `/orders` | User order history |
| Register | `/register` | Account creation |
| Login | `/login` | Authentication |
| Admin | `/admin` | Product/category management |

## Local Frontend-Only Dev (Optional)

Use this only when you are actively developing the UI. The backend must already be running.

```bash
npm install
npm run dev
```

Dev server: `http://localhost:3000`

## Build Frontend Image Only (Optional)

```bash
docker build -t senditcycles-frontend .
docker run -p 3000:80 senditcycles-frontend
```
