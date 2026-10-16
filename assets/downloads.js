(async function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button) return;

  // Resolve the latest published GitHub Release (the release marked "Latest"),
  // discover its .exe asset regardless of filename, then point directly to it.
  // The user never navigates to the release page.
  const latestReleaseApi =
    "https://api.github.com/repos/RosevilleSoftwares/Galileo/releases/latest";

  button.removeAttribute("href");
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.setAttribute("aria-disabled", "true");
  button.classList.add("download-pending");
  if (status) status.textContent = "Finding the latest Galileo installer…";

  try {
    const response = await fetch(latestReleaseApi, {
      headers: { "Accept": "application/vnd.github+json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Latest release metadata unavailable (HTTP " + response.status + ")");
    }

    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];

    // Prefer .exe installer assets. Filename is not hardcoded.
    const exeAssets = assets.filter(asset =>
      typeof asset.name === "string" &&
      /\.exe$/i.test(asset.name) &&
      typeof asset.browser_download_url === "string"
    );

    if (exeAssets.length === 0) {
      if (status) status.textContent =
        "The latest release has no .exe installer asset attached.";
      return;
    }

    // If multiple EXEs exist, prefer names containing "setup" or "installer";
    // otherwise use the first .exe asset attached to the latest release.
    const installer = exeAssets.find(asset => /(setup|installer)/i.test(asset.name)) || exeAssets[0];

    button.href = installer.browser_download_url;
    button.removeAttribute("aria-disabled");
    button.classList.remove("download-pending");

    if (status) {
      const version = release.name || release.tag_name || "Latest release";
      status.textContent = `${version} · ${installer.name}`;
    }
  } catch (error) {
    if (status) {
      status.textContent =
        "Unable to find the latest installer. Check that the Galileo repository and its latest release are public.";
    }
    button.removeAttribute("href");
    button.setAttribute("aria-disabled", "true");
  }
})();
