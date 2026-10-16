(function () {
  const totalNode = document.getElementById('total-downloads');
  const latestNode = document.getElementById('latest-downloads');
  const latestLabel = document.getElementById('latest-release-label');
  const statusNode = document.getElementById('github-status');
  if (!totalNode) return;

  const api = 'https://api.github.com/repos/RosevilleSoftwares/home/releases?per_page=100';
  fetch(api, { headers: { Accept: 'application/vnd.github+json' } })
    .then(response => {
      if (!response.ok) throw new Error('GitHub returned HTTP ' + response.status);
      return response.json();
    })
    .then(releases => {
      let total = 0;
      let latestExeCount = 0;
      let latestName = 'No published EXE release found';
      let latestDate = '';
      let newestRelease = null;
      releases.forEach(release => {
        if (release.draft || release.prerelease) return;
        const exeAssets = (release.assets || []).filter(asset => /\.exe$/i.test(asset.name));
        exeAssets.forEach(asset => { total += Number(asset.download_count || 0); });
        if (!newestRelease && exeAssets.length) {
          newestRelease = release;
          latestExeCount = exeAssets.reduce((sum, asset) => sum + Number(asset.download_count || 0), 0);
          latestName = release.name || release.tag_name;
          latestDate = release.published_at ? new Date(release.published_at).toLocaleDateString() : '';
        }
      });
      totalNode.textContent = total.toLocaleString();
      latestNode.textContent = latestExeCount.toLocaleString();
      latestLabel.textContent = latestName + (latestDate ? ' · Published ' + latestDate : '');
      statusNode.textContent = 'Counts loaded from the public GitHub Releases API. Last checked: ' + new Date().toLocaleString() + '.';
    })
    .catch(error => {
      totalNode.textContent = 'Unavailable';
      latestNode.textContent = 'Unavailable';
      latestLabel.textContent = 'Could not read public release assets.';
      statusNode.textContent = 'Could not load GitHub release data (' + error.message + '). Check that RosevilleSoftwares/home is public and has published releases.';
    });
})();
