(function () {
  const downloadUrl = "https://github.com/RosevilleSoftwares/home/releases/download/galileo/Galileo-Setup.exe";
  const button = document.getElementById("download-button");
  const status = document.getElementById("release-status");
  if (!button) return;

  // Use the fixed direct GitHub Release asset URL; no API lookup is required.
  button.href = downloadUrl;
  button.removeAttribute("aria-disabled");
  button.classList.remove("download-pending");
  if (status) status.textContent = "Windows installer · Direct download";
})();
