/*
 * Roseville Softwares analytics
 * Setup: replace G-XXXXXXXXXX with the Measurement ID from your GA4 web data stream.
 * The Measurement ID is public; never put a service-account key or private API token here.
 */
(function () {
  const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';
  const isConfigured = /^G-[A-Z0-9]+$/.test(GA4_MEASUREMENT_ID) && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX';

  const analyticsStatus = document.getElementById('analytics-status');
  if (analyticsStatus && isConfigured) analyticsStatus.textContent = 'GA4 configured';

  if (isConfigured) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, { anonymize_ip: true });
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(GA4_MEASUREMENT_ID);
    document.head.appendChild(script);

    document.addEventListener('click', function (event) {
      const link = event.target.closest('#download-button');
      if (!link) return;
      window.gtag('event', 'galileo_download_click', {
        app_name: 'Galileo Photo Viewer',
        file_name: 'Galileo-Setup.exe',
        link_url: link.href,
        transport_type: 'beacon'
      });
    }, true);
  }
})();
