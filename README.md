# MVC_APPLICATION_BK
Model view controller application. This project is an online bartender ordering application built with JavaScript using the MVC pattern. Patrons can browse the cocktail menu and place orders, while bartenders can view the order queue and mark drinks ready for pickup. 

# Bartender App (MVC)

An online bartender ordering application built with Node.js, Express, and EJS, following the Model-View-Controller (MVC) architectural pattern. Built for CIS 4327 – IS Senior Project I.

## Overview

Bar patrons can view the cocktail menu and place drink orders. Bartenders can view the order queue and mark orders as ready for pickup once prepared.

## Tech Stack

- Node.js / Express** — server and routing (Controller layer)
- EJS — templating engine (View layer)
- SQL (via better-sqlite3) — persistent data storage (Model layer)

## Project Structure

bartender-app/
├── controllers/ # Handle HTTP requests, call models, render views
├── models/ # Data access logic (SQLite queries)
├── views/ # EJS templates
├── routes/ # Express route definitions
├── public/ # Static assets (CSS)
├── app.js # Entry point
└── bartender.db # SQLite database (auto-created, gitignored)


## MVC Flow

1. Index page (`/`) — homepage with links for patrons ("Order a Drink") and bartenders ("View Order Queue").
2. Patron flow: `GET /menu` → controller asks model for cocktail list → renders `menu.ejs`. Patron submits order → `POST /order` → controller passes data to model → order saved in SQLite.
3. Bartender flow: `GET /order-queue` → controller asks model for all orders → renders `orderQueue.ejs`. Bartender marks an order ready → `POST /order-queue/:id/ready` → controller updates order status via model.

## Setup & Run

```bash
npm install
npm run dev
```

The app runs on port 3000 or the port Codespaces forwards. Visit the forwarded URL to use the app.

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Homepage |
| GET | `/menu` | View cocktail menu |
| POST | `/order` | Submit a new order |
| GET | `/order-confirmation` | Confirmation after ordering |
| GET | `/order-queue` | Bartender's order queue |
| POST | `/order-queue/:id/ready` | Mark an order ready for pickup |

## Author

[Brandon Kramer] — CIS 4327, Fall 2026
