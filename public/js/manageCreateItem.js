async function initializeEditor () {
  const specList = document.querySelector('#create-item-panel #specList');
  specList.innerHTML = '';
  const specResponse = await fetch('/api/specs');
  if (specResponse.ok) {
    const specData = await specResponse.json();
    for (spec of specData) {
      const option = document.createElement('option');
      option.value = `${spec.pn} - ${spec.name}`;
      specList.append(option);
    }
  }
  const statusSelect = document.querySelector('#create-item-panel #status');
  const statusResponse = await fetch('/api/items/statuses');
  if (statusResponse.ok) {
    statusSelect.innerHTML = '';
    const statusData = await statusResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose --';
    statusSelect.append(defaultOption);
    for (let status of statusData) {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      statusSelect.append(option);
    }
  }
  const locationSelect = document.querySelector('#create-item-panel #location');
  const locationResponse = await fetch('/api/locations/top');
  if (locationResponse.ok) {
    locationSelect.innerHTML = '';
    const locationData = await locationResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose --';
    locationSelect.append(defaultOption);
    for (let location of locationData) {
      const option = document.createElement('option');
      option.value = location.id;
      option.textContent = location.name;
      locationSelect.append(option);
    }
  }
  const sublocationSelect = document.querySelector('#create-item-panel #sublocation');
  sublocationSelect.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '(-none-)';
  sublocationSelect.append(defaultOption);
  const boxgridAlphaSelect = document.querySelector('#boxgrid-alpha');
  const boxgridAlphaDisplay = ['(-none-)','A','B','C','D','E','F','G','H','I','J'];
  const boxgridAlphaValues = ['','A','B','C','D','E','F','G','H','I','J'];
  boxgridAlphaSelect.innerHTML = '';
  for (let i=0;i<boxgridAlphaValues.length;i++) {
    const option = document.createElement('option');
    option.value = boxgridAlphaValues[i];
    option.textContent = boxgridAlphaDisplay[i];
    boxgridAlphaSelect.append(option);
  }
  const boxgridNumSelect = document.querySelector('#create-item-panel #boxgrid-num');
  const boxgridNumDisplay = ['(-none-)','1','2','3','4','5','6','7','8','9','10'];
  const boxgridNumValues = ['','1','2','3','4','5','6','7','8','9','10'];
  boxgridNumSelect.innerHTML = '';
  for (let i=0;i<boxgridNumValues.length;i++) {
    const option = document.createElement('option');
    option.value = boxgridNumValues[i];
    option.textContent = boxgridNumDisplay[i];
    boxgridNumSelect.append(option);
  }
  const receivedField = document.querySelector('#create-item-panel #received');
  window.receivedPicker = null;
  window.receivedPicker = new easepick.create({
    element: receivedField,
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
    ],
    format: 'M/D/YYYY'
  });
}

async function createItem () {
  const formData = {
    spec_pn: document.querySelector('#create-item #spec').value.trim(),
    lot: document.querySelector('#create-item #lot').value.trim(),
    status: document.querySelector('#create-item #status').value,
    location_id: document.querySelector('#create-item #location').value,
    sublocation_id: document.querySelector('#create-item #sublocation').value,
    boxgrid: `${document.querySelector('#create-item #boxgrid-alpha').value}${document.querySelector('#create-item #boxgrid-num').value}`,
    current_amount: document.querySelector('#create-item #amount').value.trim(),
    date_received: document.querySelector('#create-item #received').value.trim()
  }
  const createResponse = await fetch('/api/items/', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(formData)
  });
  if (createResponse.ok) {
    document.location.reload();
  } else {
    const err = await createResponse.json();
    document.querySelector('#create-item-panel #err').textContent = err.message;
  }
}

async function updateSublocations () {
  const location_id = document.querySelector('#location').value;
  const sublocationSelect = document.querySelector('#sublocation');
  sublocationSelect.innerHTML = '';
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.textContent = '(-none-)';
  sublocationSelect.append(defaultOption);
  if (location_id) {
    const sublocationResponse = await fetch(`/api/locations/${location_id}/children`);
    if (sublocationResponse.ok) {
      
      const sublocationData = await sublocationResponse.json();
      for (let sublocation of sublocationData) {
        const option = document.createElement('option');
        option.value = sublocation.id;
        option.textContent = sublocation.name;
        sublocationSelect.append(option);
      }
      sublocationSelect.value = '';
    }
  }
}

initializeEditor();
document.querySelector('#create-item-panel #create').addEventListener('click',createItem);
document.querySelector('#location').addEventListener('change',updateSublocations);