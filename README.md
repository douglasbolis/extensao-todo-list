# Project Deployment Guide

This guide provides instructions on how to deploy the Todo-List MVC application to production environments like Render and Vercel.

## Table of Contents

1.  [Deploying the API to Render](#deploying-the-api-to-render)
2.  [Deploying the Frontend to Vercel](#deploying-the-frontend-to-vercel)

## 1. Deploying the API to Render

Render is a cloud platform that simplifies deploying applications. Follow these steps to deploy the backend API:

1.  **Create a Render Account:** If you don't have one, sign up at [https://render.com/](https://render.com/).
2.  **Create a New Web Service:**
    *   Navigate to your Render dashboard and click "New +" > "Web Service".
    *   Connect your GitHub repository containing this project.
    *   **Configure Build Command:** Set the build command to `npm ci && npm run build`.
    *   **Configure Start Command:** Set the start command to `npm start`.
    *   **Environment Variables:**
        *   `NODE_ENV`: Set to `production`.
        *   `PORT`: Render typically assigns a port via the `PORT` environment variable. Ensure your Node.js app respects this.
    *   Choose your plan (e.g., Free tier for testing).
    *   Click "Create Web Service".
3.  **Automatic Deployment:** Render will automatically build and deploy your API on pushes to the `main` branch (or your configured deployment branch).

## 2. Deploying the Frontend to Vercel

Vercel is a platform optimized for frontend deployments.

1.  **Create a Vercel Account:** Sign up at [https://vercel.com/](https://vercel.com/).
2.  **Import Project:**
    *   Click "Add New..." > "Project".
    *   Import your GitHub repository.
    *   Vercel should automatically detect the project as a Vite + React + TypeScript application.
    *   **Build Command:** Vercel typically uses `npm run build` automatically.
    *   **Output Directory:** Vercel usually detects `dist` automatically.
    *   **Environment Variables:** Add any necessary environment variables (e.g., `VITE_API_URL` pointing to your deployed Render API endpoint).
    *   Choose your plan.
    *   Click "Deploy".
3.  **Automatic Deployment:** Vercel will automatically build and deploy your frontend whenever you push changes to your connected Git branch.
