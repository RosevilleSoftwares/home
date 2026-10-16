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

It finds the first `.exe` asset attached to the latest published release and points the button directly to that binary's download URL. It never falls back to opening the release page. If no `.exe` asset is found or the lookup fails, the button stays disabled and displays a status message. The Galileo repository must be public.

A GitHub Actions build artifact is not automatically a published Release asset. Your Galileo workflow must upload the installer `.exe` to a GitHub Release, or you must attach it manually. When you publish a newer release with an `.exe` asset, the site will detect it on the next page load.

If your Galileo repository name or owner differs, update the `api` constant in `assets/downloads.js`, and update the links in `releases/index.html` and `help/index.html`.

## Before publishing

- Replace the placeholder founder biography with the details you want public.
- Review Galileo feature descriptions so they match the actual shipped software.
- GitHub Pages websites are publicly accessible. Do not put secrets, tokens, or private information in this repository.


## Stable Galileo download

The Downloads page points directly to this installer URL:

`https://github.com/RosevilleSoftwares/Galileo/releases/download/stable/Galileo-Setup-1.6.36.exe`

The `stable` tag is treated as the stable download channel. When you publish a newer stable binary, keep the tag `stable` and ensure the release asset uses the same filename, or update the URL in both `assets/downloads.js` and `downloads/index.html`. The button does not open a release page.


## Stable tag download (installer filename is not hardcoded)

The Downloads page queries the release for the fixed `stable` tag:

`https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/tags/stable`

It then finds the `.exe` asset attached to that tagged release and points the button directly to the asset's `browser_download_url`. The visitor is not sent to the release page, and the installer filename/version is not hardcoded.

For each new stable build, update or move the `stable` tag to the release containing the new installer and ensure that release has an `.exe` asset attached. The website will resolve the current asset name automatically on page load. The Galileo repository/release must be public.


## Stable direct download (no API lookup)

The download button uses this direct binary URL:

`https://github.com/RosevilleSoftwares/Galileo/releases/download/stable/Galileo-Setup.exe`

For version-independent downloads, **attach the installer to the `stable` release with the exact asset name `Galileo-Setup.exe` every time**. The version can still be included in the release title/tag notes, but keep this release asset filename constant. When updating the stable release, replace the asset with the new build using the same filename. The website then needs no changes and does not call the GitHub Releases API or open a release page.

**Repository visibility:** The GitHub screenshot appears to show a lock icon beside `Galileo`, which usually indicates a private repository. GitHub's unauthenticated API returns 404 for private resources, and visitors cannot download private release assets without signing in and having access. For public website visitors to download the installer, make the Galileo repository/public release publicly accessible (or host the binary somewhere public).

The previous version-specific asset (`Galileo-Setup-1.6.36.exe`) will not match this fixed URL. Rename the attached asset to `Galileo-Setup.exe` in the stable release, or upload the new build under that name when you publish the next stable release.


## Latest published release: direct EXE download

The download button calls the GitHub API endpoint:

`https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/latest`

It discovers the `.exe` asset attached to the release GitHub marks as **Latest**, regardless of the EXE filename, and links directly to that asset's `browser_download_url`. If several `.exe` files are attached, it prefers one whose filename contains `setup` or `installer`, otherwise it uses the first `.exe`. It does not send visitors to the release page.

For this to work for public visitors, the Galileo repository and release must be public. If GitHub returns 404, verify repository visibility and that the API endpoint works when signed out. Also make sure the latest published release has an `.exe` attached under its Assets section; an Actions artifact alone is not enough.


## Download from GitHub's Latest release (no API)

The download button points to:

`https://github.com/RosevilleSoftwares/Galileo/releases/latest/download/Galileo-Setup.exe`

This uses GitHub's built-in `releases/latest/download/<asset-name>` route. It follows the release marked **Latest** and directly downloads the asset; it does not call the Releases API or open the release page.

Requirements:
- The Galileo repository and release must be public for anonymous visitors to download it.
- Keep the installer asset filename exactly `Galileo-Setup.exe` in each release. GitHub's latest-download route needs the asset name, but not the version number.
- If the repository remains private, public website visitors cannot download its release asset anonymously. Make it public or host the installer on another public download service.


## Latest release download — RosevilleSoftwares/home

The Downloads page now queries:

`https://api.github.com/repos/RosevilleSoftwares/home/releases/latest`

It discovers the `.exe` asset attached to the release GitHub marks **Latest**, regardless of the installer filename, then links directly to the asset's `browser_download_url`. The download button does not open the release page.

For public visitors, `RosevilleSoftwares/home` must be public and the latest published release must have an `.exe` attached under Assets. If GitHub returns 404, check repository visibility and confirm the API URL opens while signed out.


## Current Galileo download link

The website uses this fixed direct download URL (no GitHub API lookup):

`https://github.com/RosevilleSoftwares/home/releases/download/galileo/Galileo-Setup.exe.exe`
