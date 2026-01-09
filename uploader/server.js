// Simple uploader: receives multipart/form-data and writes file into the repo via GitHub REST API.
// Usage:
//   set environment variables: GITHUB_TOKEN, REPO_OWNER, REPO_NAME, BRANCH (optional, default main)
//   node server.js
//
// POST /upload with form field "file" (multipart) to upload.

const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } }); // 50 MB limit

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER || 'simplywasreal-jpg';
const REPO_NAME = process.env.REPO_NAME || 'simplywasreal-jpg.github.io';
const BRANCH = process.env.BRANCH || 'main';
const TARGET_DIR = 'files';

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN environment variable is required');
  process.exit(1);
}

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided (form field name must be "file")' });

    const filename = path.basename(req.file.originalname);
    const repoPath = `${TARGET_DIR}/${filename}`;
    const contentBase64 = req.file.buffer.toString('base64');

    // Check if file exists to get its sha (for updates)
    const getUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(repoPath)}?ref=${BRANCH}`;
    const getRes = await fetch(getUrl, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'github-uploader'
      }
    });

    let sha;
    if (getRes.status === 200) {
      const getJson = await getRes.json();
      sha = getJson.sha;
    }

    const putUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${encodeURIComponent(repoPath)}`;
    const message = sha ? `Update file ${repoPath}` : `Add file ${repoPath}`;
    const body = {
      message,
      content: contentBase64,
      branch: BRANCH
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(putUrl, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'User-Agent': 'github-uploader',
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const putJson = await putRes.json();
    if (!putRes.ok) {
      console.error('GitHub API error:', putJson);
      return res.status(500).json({ error: 'GitHub API error', details: putJson });
    }

    return res.json({
      message: 'File uploaded',
      path: putJson.content.path,
      download_url: putJson.content.download_url
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Uploader running. POST /upload with field "file".');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Uploader listening on ${port}`));
