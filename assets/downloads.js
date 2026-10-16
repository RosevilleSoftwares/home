(async function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button) return;

  // Use the public RosevilleSoftwares/home repository.
  // Find the .exe attached to GitHub's latest published release, regardless of filename.
  const latestReleaseApi =
    "https://api.github.com/repos/RosevilleSoftwares/home/releases/latest";

  button.removeAttribute("href");
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.setAttribute("aria-disabled", "true");
  button.classList.add("download-pending");
  if (status) status.textContent = "Finding the latest Roseville Softwares installer…";

  try {
    const response = await fetch(latestReleaseApi, {
      headers: { "Accept": "application/vnd.github+json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("GitHub latest-release lookup failed (HTTP " + response.status + ")");
    }

    const release = await response.json();
    const assets = Array.isArray(release.assets) ? release.assets : [];
    const exeAssets = assets.filter(asset =>
      typeof asset.name === "string" &&
      /\.exe$/i.test(asset.name) &&
      typeof asset.browser_download_url === "string"
    );

    if (!exeAssets.length) {
      if (status) status.textContent =
        "The latest release does not contain a Windows .exe installer.";
      return;
    }

    // Prefer an installer/setup-named EXE; otherwise use the first EXE asset.
    const installer =
      exeAssets.find(asset => /(setup|installer)/i.test(asset.name)) || exeAssets[0];

    button.href = installer.browser_download_url;
    button.removeAttribute("aria-disabled");
    button.classList.remove("download-pending");

    if (status) {
      status.textContent =
        `${release.name || release.tag_name || "Latest release"} · ${installer.name}`;
    }
  } catch (error) {
    if (status) {
      status.textContent =
        "Unable to find the latest installer. Verify that RosevilleSoftwares/home is public and has a published release with an .exe asset.";
    }
    button.removeAttribute("href");
    button.setAttribute("aria-disabled", "true");
  }
})();
