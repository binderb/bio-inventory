const nav = document.querySelector('.inventory-subnav-group')

function hideAllPanels() {
  document.querySelector('#quick-search-panel').setAttribute('style','display:none;');
  document.querySelector('#create-spec-panel').setAttribute('style','display:none;');
}

nav.addEventListener('click', (e) => {
  if (e.target.getAttribute('id')) {
    hideAllPanels();
    switch (e.target.getAttribute('id')) {
      case 'search':
        document.querySelector('#quick-search-panel').setAttribute('style','');
        break;
      case 'add-spec':
        document.querySelector('#create-spec-panel').setAttribute('style','');
        break;
      default:
        break;
    }
  }
  
  // if (!e.target.matches('label')) return; // reject other buttons

  // console.log(e.target.textContent);  // show "aaa" or "bbb"

  // ...
});