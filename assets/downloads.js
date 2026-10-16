(async function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button) return;

  // Always resolve the asset attached to the "stable" tag.
  // The installer filename/version is intentionally NOT hardcoded.
  const stableReleaseApi =
    "https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/tags/stable";

  button.removeAttribute("href");
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.setAttribute("aria-disabled", "true");
  button.classList.add("download-pending");
  if (status) status.textContent = "Finding the latest stable Galileo installer…";

  try {
    const response = await fetch(stableReleaseApi, {
      headers: { "Accept": "application/vnd.github+json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Could not retrieve the stable release.");
    }

    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const installer = assets.find(asset =>
      /\.exe$/i.test(asset.name) && asset.browser_download_url
    );

    if (!installer) {
      if (status) status.textContent =
        "No Windows .exe installer was found in the stable release.";
      return;
    }

    // Point directly to the binary URL returned by GitHub's API.
    // Never redirect the user to the release/tag page.
    button.href = installer.browser_download_url;
    button.removeAttribute("aria-disabled");
    button.classList.remove("download-pending");
    if (status) status.textContent = `Stable release · ${installer.name}`;
  } catch (error) {
    if (status) status.textContent =
      "Unable to find the stable installer right now. Please try again shortly.";
    button.removeAttribute("href");
    button.setAttribute("aria-disabled", "true");
  }
})();
