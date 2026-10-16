# Roseville Softwares — GitHub Pages website

Static website inspired by the GitHub Desktop download page. It includes:
- Home page
- Downloads page with an application sidebar
- Galileo Photo Viewer download page
- Release Notes
- Help
- Automatic lookup of the latest public GitHub Release and its first `.exe` asset

## Important: repository name determines the website URL

Your current repository is:

`https://github.com/RosevilleSoftwares/RosevilleSoftwares`

That repository will normally publish as a **project site** at:

`https://rosevillesoftwares.github.io/RosevilleSoftwares/`

To publish at the exact root address you requested:

`https://rosevillesoftwares.github.io/`

rename the repository to:

`RosevilleSoftwares.github.io`

You can rename it under the repository's **Settings → General → Repository name**. GitHub Pages settings may need to be enabled or checked again after renaming.

## Publish at https://rosevillesoftwares.github.io/

1. Download and extract this ZIP.
2. Open your repository: `https://github.com/RosevilleSoftwares/RosevilleSoftwares`
3. If you want the exact root URL `https://rosevillesoftwares.github.io/`, rename the repository to `RosevilleSoftwares.github.io` in **Settings → General**. If you keep the name `RosevilleSoftwares`, the site will instead be under `/RosevilleSoftwares/`.
4. Upload the **contents** of the extracted folder into the repository root. Do not upload the enclosing folder. `index.html`, `assets/`, `downloads/`, `releases/`, and `help/` must be at the root.
5. Commit the files to the `main` branch.
6. Open **Settings → Pages**.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select branch `main` and folder `/(root)`, then click **Save**.
9. Open the repository's **Actions** tab and wait for the Pages deployment to complete.
10. Visit `https://rosevillesoftwares.github.io/`.

No Node.js build step or backend is needed.

## Galileo EXE download behavior

The download script queries:

`https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/latest`

It finds the first `.exe` asset attached to the latest published release and makes the website button download that file directly. The Galileo repository must be public.

A GitHub Actions build artifact is not automatically a published Release asset. Your Galileo workflow must upload the installer `.exe` to a GitHub Release, or you must attach it manually. When you publish a newer release with an `.exe` asset, the site will detect it on the next page load.

If your Galileo repository name or owner differs, update the `api` constant in `assets/downloads.js`, and update the links in `releases/index.html` and `help/index.html`.

## Before publishing

- Replace the placeholder founder biography with the details you want public.
- Review Galileo feature descriptions so they match the actual shipped software.
- GitHub Pages websites are publicly accessible. Do not put secrets, tokens, or private information in this repository.
