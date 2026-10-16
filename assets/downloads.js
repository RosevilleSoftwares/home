(function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button) return;

  // GitHub's built-in latest-release asset URL: no API lookup, no release page.
  // Keep this asset filename the same in every release; the version is not hardcoded.
  button.href =
    "https://github.com/RosevilleSoftwares/Galileo/releases/latest/download/Galileo-Setup.exe";
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.removeAttribute("aria-disabled");
  button.classList.remove("download-pending");

  if (status) {
    status.textContent = "Downloads the installer from the latest published release.";
  }
})();
