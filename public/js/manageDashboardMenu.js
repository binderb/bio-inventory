const nav = document.querySelector('.inventory-subnav-group')

function hideAllPanels() {
  try {
    window.html5QrCode.stop();
  } catch (err) {
    // QR scanner is not running, no need to stop it.
  }
  document.querySelector('#quick-search-panel').setAttribute('style','display:none;');
  document.querySelector('#scan-panel').setAttribute('style','display:none;');
  document.querySelector('#create-spec-panel').setAttribute('style','display:none;');
  document.querySelector('#create-item-panel').setAttribute('style','display:none;');
  document.querySelector('#create-location-panel').setAttribute('style','display:none;');
  document.querySelector('#create-vendor-panel').setAttribute('style','display:none;');
}

nav.addEventListener('click', (e) => {
  if (e.target.getAttribute('id')) {
    switchToPanel(e.target.getAttribute('id'));
  }
});

function switchToPanel (id) {
  hideAllPanels();
    switch (id) {
      case 'search':
        document.querySelector('#quick-search-panel').setAttribute('style','');
        break;
      case 'scan':
        document.querySelector('#scan-panel').setAttribute('style','');
        window.html5QrCode.start({facingMode: 'environment'}, config, window.qrCodeSuccessCallback);
        break;
      case 'add-spec':
        document.querySelector('#create-spec-panel').setAttribute('style','');
        break;
      case 'add-item':
        document.querySelector('#create-item-panel').setAttribute('style','');
        break;
      case 'add-location':
        document.querySelector('#create-location-panel').setAttribute('style','');
        break;
      case 'add-vendor':
        document.querySelector('#create-vendor-panel').setAttribute('style','');
        break;
      default:
        break;
    }
}

switchToPanel('search');