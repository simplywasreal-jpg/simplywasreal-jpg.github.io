# Asset Hub — simplywasreal-jpg.github.io

This repository hosts a professional-looking downloads gallery for sharing game-ready 3D models and assets via GitHub Pages.

What changed
- A redesigned `index.html` with a polished, responsive grid layout, search, format filters, sorting, and image preview for common image types.
- A new stylesheet at `assets/styles.css` to keep presentation separate from markup.
- The uploader service and instructions remain the same — uploader runs separately and commits files into the `/files` folder.

How it works
- The site queries the GitHub Contents API to list files placed in the `files/` folder of this repository.
- Anyone can download files from the site; only a user with a repository write token (you) can upload via the separate uploader server (or push via git).

Recommended workflow for adding assets (admin-only)
1. Create or obtain your asset files (zip, fbx, obj, gltf, blend).
2. Either:
   - Run the uploader (see `uploader/`) and POST your file to it (recommended for convenience), or
   - Push files directly to `files/` via git:
     ```
     git clone https://github.com/simplywasreal-jpg/simplywasreal-jpg.github.io.git
     cd simplywasreal-jpg.github.io
     mkdir -p files
     cp /path/to/asset.zip files/
     git add files/asset.zip
     git commit -m "Add medieval-rock_1ktris.zip"
     git push
     ```

Security reminders
- Never publish your GitHub token. Keep uploader tokens in environment variables.
- Limit accepted file types and sizes if you ever expose an uploader publicly.
- Consider a separate machine user for uploads and scanning uploads before publishing.

Customization ideas
- Add per-asset metadata files (JSON) to store tags, descriptions, polycount, license, and thumbnails.
- Add pagination for very large libraries.
- Add server-side caching or a small JSON index to avoid repeated API calls for large collections.

If you'd like
- I can commit the new files to your repo now.
- I can add optional per-asset metadata support (README shows format), and a small script to generate thumbnails or a JSON index.
- I can add a minimal admin UI that talks to the uploader so you can upload from a browser (password-protected).

Tell me which of these you'd like me to do next and I will proceed.
