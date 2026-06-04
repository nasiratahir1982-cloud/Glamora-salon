# GLAMORA - Deployment Guide

This document outlines how to deploy the Glamora Salon Management System across various platforms.

## 1. WordPress Subdomain (Static Deployment)
Since you have no cPanel access but have File Manager/FTP:

1.  **Build the Project**:
    ```bash
    # Set environment variable for static export
    $env:STATIC_EXPORT="true" # Windows PowerShell
    npm run build
    ```
2.  **Locate Build Files**:
    - The build will generate an `out` folder in the root directory.
3.  **Upload**:
    - Use your WordPress File Manager or FTP client.
    - Upload the contents of the `out` folder to your subdomain root (e.g., `salon.yourdomain.com`).
4.  **Note**: Ensure your `.htaccess` (if using Apache) handles client-side routing.

## 2. Vercel (Recommended)
1.  Push your code to a GitHub repository.
2.  Connect the repository to Vercel.
3.  Vercel will automatically detect Next.js and deploy.
4.  Add your Environment Variables in the Vercel Dashboard.

## 3. Netlify
1.  Connect your GitHub repo to Netlify.
2.  Build Command: `npm run build`
3.  Publish Directory: `.next` (or `out` if using static export).

## 4. Supabase (Backend/Database)
1.  Create a new project on [Supabase](https://supabase.com).
2.  Run the SQL scripts provided in `DATABASE_SETUP.md`.
3.  Copy the `SUPABASE_URL` and `SUPABASE_ANON_KEY` to your `.env`.

## 5. Docker Deployment
1.  Build the image: `docker build -t glamora-salon .`
2.  Run: `docker run -p 3000:3000 glamora-salon`

## 6. Shared Hosting (Node.js)
If your shared hosting supports Node.js:
1.  Upload the entire project folder (excluding `node_modules`).
2.  Run `npm install` on the server (if terminal access is available).
3.  Run `npm run build` and `npm start`.
4.  If no terminal is available, build locally and upload the `.next`, `public`, and `package.json` files.
