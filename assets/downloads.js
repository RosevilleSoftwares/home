(function () {
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button) return;

  /*
   * Stable-channel direct download.
   * Keep the installer asset name identical across stable releases:
   * Galileo-Setup.exe
   *
   * This avoids the GitHub Releases API (which returns 404 for private
   * repositories to unauthenticated visitors) and never opens a release page.
   */
  button.href =
    "https://github.com/RosevilleSoftwares/Galileo/releases/download/stable/Galileo-Setup.exe";
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.removeAttribute("aria-disabled");
  button.classList.remove("download-pending");

  if (status) status.textContent = "Stable release · Galileo-Setup.exe";
})();
