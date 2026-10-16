(async function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button || !status) return;

  const fallbackText = "Checking the latest Galileo installer…";
  const unavailableText = "The latest release does not currently have a downloadable .exe installer.";

  // Keep the link from navigating to a release page while checking the latest release.
  button.removeAttribute("href");
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.setAttribute("aria-disabled", "true");
  button.classList.add("download-pending");
  status.textContent = fallbackText;

  // This API endpoint returns the latest published release, not a GitHub Actions artifact.
  const api = "https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/latest";

  try {
    const response = await fetch(api, {
      headers: { "Accept": "application/vnd.github+json" },
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(response.status === 404
        ? "No public published release was found."
        : "Could not check the latest release.");
    }

    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const installer = assets.find(asset => /\.exe$/i.test(asset.name) && asset.browser_download_url);

    if (!installer) {
      status.textContent = unavailableText;
      button.setAttribute("aria-disabled", "true");
      return;
    }

    // Link directly to the binary asset. No release-page fallback is used.
    button.href = installer.browser_download_url;
    button.removeAttribute("aria-disabled");
    button.classList.remove("download-pending");
    button.addEventListener("click", function (event) {
      if (button.getAttribute("aria-disabled") === "true") {
        event.preventDefault();
      }
    });

    status.textContent = `Ready to download: ${installer.name}`;
  } catch (error) {
    status.textContent = "Unable to find the latest installer right now. Please try again shortly.";
    button.removeAttribute("href");
    button.setAttribute("aria-disabled", "true");
  }
})();
