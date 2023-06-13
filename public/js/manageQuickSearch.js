
async function initializeSearch () {
  const specsData = await fetch(window.baseUrl + '/api/specs');
  const specs = await specsData.json();
  window.specs = specs;
}

function updateResults (e) {
  const userText = this.value;
  let filteredSpecs = [];
  if (userText.trim().length > 0) {
    const regex = new RegExp(`${userText}`,'gi');
    filteredSpecs = window.specs.filter(e => e.name.match(regex));
  }
  const template = document.querySelector('#quick-search-li-template');
  const list = document.querySelector('#quick-search-results');
  list.innerHTML = '';
  if (filteredSpecs.length > 0) {
    filteredSpecs.forEach( (spec, i) => {
      const template_i = template.cloneNode(true);
      template_i.setAttribute('style','');
      template_i.setAttribute('id','');
      template_i.querySelector('#name').textContent = spec.name;
      template_i.querySelector('#sub').innerHTML = `<small>${spec.vendor.name} | <span style="font-family:monospace;">PN-${spec.pn}</span></small>`;
      template_i.querySelector('#unopened').innerHTML = `<i class="fa-solid fa-box"></i> ${spec.total_unopened}`;
      template_i.querySelector('#opened').innerHTML = `<i class="fa-solid fa-box-open"></i> ${spec.total_opened}`;
      template_i.setAttribute('href',`/specs/${spec.id}`);
      list.append(template_i);
    });
  } else {
    const template_i = template.cloneNode();
    template_i.setAttribute('style','');
    template_i.setAttribute('id','');
    template_i.textContent = "No results.";
    template_i.classList.add('disabled');
    list.append(template_i);
  }
}

initializeSearch();
document.querySelector('#quick-search').addEventListener('input',updateResults);