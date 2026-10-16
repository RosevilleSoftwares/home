(async function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button || !status) return;

  // The repository must be public for this browser-side lookup to work without authentication.
  const api = "https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/latest";
  try {
    const response = await fetch(api, { headers: { "Accept": "application/vnd.github+json" } });
    if (!response.ok) throw new Error(response.status === 404 ? "No published release was found." : "GitHub release lookup failed.");
    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const installer = assets.find(asset => /\.exe$/i.test(asset.name));
    if (installer) {
      button.href = installer.browser_download_url;
      button.removeAttribute("target");
      button.removeAttribute("rel");
      status.textContent = `Latest release: ${release.tag_name || release.name || "published release"} · ${installer.name}`;
    } else {
      button.href = release.html_url || "https://github.com/RosevilleSoftwares/Galileo/releases";
      button.target = "_blank";
      button.rel = "noopener";
      status.textContent = "A release exists, but no .exe asset was found. Open the release page to see available downloads.";
    }
  } catch (error) {
    button.href = "https://github.com/RosevilleSoftwares/Galileo/releases/latest";
    button.target = "_blank";
    button.rel = "noopener";
    status.textContent = "Could not detect an installer automatically. You can open the latest release page instead.";
  }
})();
