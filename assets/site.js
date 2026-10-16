document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

const tabContent = {
  features: `<h2>Designed for everyday photo browsing</h2><p>Galileo Photo Viewer is a Windows desktop application currently under development. Product capabilities and supported formats may change between releases.</p><ul><li>Photo-viewing experience focused on the image itself</li><li>Designed for Windows desktop use</li><li>Release downloads served from the Galileo GitHub repository</li></ul>`,
  requirements: `<h2>System requirements</h2><ul><li>Windows 10 or Windows 11</li><li>64-bit Windows system</li><li>Available disk space for the installer and application</li></ul><p>Exact requirements will be documented as the application reaches stable releases.</p>`,
  release: `<h2>Latest published release</h2><p>The download button checks the Galileo repository for its latest published GitHub Release and links to the first Windows executable asset it finds.</p><p><a class="text-link" href="https://github.com/RosevilleSoftwares/Galileo/releases/latest" target="_blank" rel="noopener">Open latest release ↗</a></p>`
};
document.querySelectorAll("[data-tab]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-tab]").forEach(item => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });
    const panel = document.getElementById("tab-content");
    if (panel) panel.innerHTML = tabContent[button.dataset.tab];
  });
});
