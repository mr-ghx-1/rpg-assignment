# rePurpose Blog Application

A full-stack blog application built with Vue 3, NestJS, and GraphQL, featuring user authentication, blog creation, and real-time notifications.

## Project Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1.  Clone the repository.
2.  Install dependencies for the entire project (root, frontend, and backend):
    ```bash
    npm run install:all
    ```
    *Alternatively, you can run `npm install` in the root, `frontend`, and `backend` directories separately.*

## Running the Application

To start both the backend and frontend servers concurrently:

```bash
npm start
```

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:3000/graphql

## Features

- **User Authentication**: Secure Signup and Login functionality using JWT.
- **Blog Management**: Create and view blog posts.
- **Real-time Notifications**: Instant notifications for new posts using GraphQL Subscriptions.
- **Modern UI**: Clean, responsive interface styled with CSS Flexbox and Grid.
- **End-to-End Type Safety**: TypeScript used across the full stack.

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Vite, Apollo Client, Pinia
- **Backend**: NestJS, GraphQL (Code First), TypeORM, SQLite
- **Database**: SQLite (Zero-config SQL database)

## Testing

To run tests/checks for both projects:

```bash
npm test
```



