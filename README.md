# Files + Uploader for simplywasreal-jpg.github.io

This repository hosts a simple download site (GitHub Pages) and an optional uploader service that commits uploaded files into the repo under `/files` so they become available for download.

Security note
- Never commit or expose your GitHub token in the repository.
- Only run the uploader on a trusted host or keep it private and accessible only to you.
- If you want public uploads from anyone, read the "Public upload" notes below — that requires extra protections.

Contents
- `index.html` — the GitHub Pages front-end that lists files in `/files`.
- `uploader/` — a small Node.js Express app that receives uploads and writes them to the repo via GitHub API.
- `/files` — (create this folder) uploaded files will be placed here by the uploader or git.

Quick start — using GitHub Pages (site)
1. Add `index.html` to the repo root (or `docs/`) and enable GitHub Pages from `main` branch (Repository Settings → Pages).
2. Create a `files/` folder in the repo. Upload at least one file (via git or uploader) so the index shows content.

Manual upload via git (easiest, safest)
1. Clone the repo locally:
   git clone https://github.com/simplywasreal-jpg/simplywasreal-jpg.github.io.git
2. Copy files into `files/`, then:
   git add files/*
   git commit -m "Add files"
   git push

Uploader (server) — overview
- The uploader accepts multipart/form-data file uploads and uses a GitHub Personal Access Token to create a file in `files/{filename}` in this repo.
- You should store the token as an environment variable and deploy the uploader to a private host (Render, Fly, Railway, Heroku, etc.).

Uploader setup
1. Create a GitHub token (repo scope or `repo.contents`) for an account that can push to this repository.
2. Deploy the uploader with the following environment variables:
   - GITHUB_TOKEN (the token)
   - REPO_OWNER (simplywasreal-jpg)
   - REPO_NAME (simplywasreal-jpg.github.io)
   - BRANCH (optional, default `main`)
3. Example: run locally
   cd uploader
   npm install
   export GITHUB_TOKEN=ghp_...
   export REPO_OWNER=simplywasreal-jpg
   export REPO_NAME=simplywasreal-jpg.github.io
   export BRANCH=main
   node server.js
   # POST files to http://localhost:3000/upload

Security recommendations
- Never put the token into client-side code.
- Consider creating a separate GitHub machine user for uploads.
- Limit upload size and filetypes on the uploader.
- Scan uploaded files if you plan to accept uploads from the public.

Public upload notes
If you want anyone to upload files:
- You must add authentication/verification (captcha, account sign-ins).
- Add content moderation (manual review) and virus scanning.
- Consider using a managed file storage (S3, Google Cloud Storage) and a separate database referencing files.

If you want, I can:
- Add the `uploader/` code below and a GitHub Actions workflow that builds/deploys it to a chosen provider, or
- Implement a full serverless solution (Netlify Functions / Cloudflare / AWS Lambda) to handle uploads securely, or
- Make the site allow uploads with GitHub OAuth (more setup).

Tell me:
- Confirm GitHub Pages hosting on this repo is ok.
- Who should be allowed to upload (only you, specific people, or anyone).
