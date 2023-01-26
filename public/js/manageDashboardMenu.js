const nav = document.querySelector('.inventory-subnav-group')

function hideAllPanels() {
  document.querySelector('#quick-search-panel').setAttribute('style','display:none;');
  document.querySelector('#create-spec-panel').setAttribute('style','display:none;');
  document.querySelector('#create-item-panel').setAttribute('style','display:none;');
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
      case 'add-spec':
        document.querySelector('#create-spec-panel').setAttribute('style','');
        break;
      case 'add-item':
        document.querySelector('#create-item-panel').setAttribute('style','');
        break;
      default:
        break;
    }
}

switchToPanel('add-item');