const nav = document.querySelector('.inventory-subnav-group')

nav.addEventListener('click', (e) => {
  if (!e.target.matches('label')) return; // reject other buttons

  console.log(e.target.textContent);  // show "aaa" or "bbb"

  // ...
  }
);