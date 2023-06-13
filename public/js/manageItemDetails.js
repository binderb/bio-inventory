async function initializeEditor () {
  const itemData = await fetch(window.baseUrl + 'api/items/'+window.location.href.split('/').pop());
  const item = await itemData.json();
  const lotField = document.querySelector('#lot');
  lotField.value = item.lot;
  const statusSelect = document.querySelector('#status');
  const statusResponse = await fetch(window.baseUrl + '/api/items/statuses');
  if (statusResponse.ok) {
    statusSelect.innerHTML = '';
    const statusData = await statusResponse.json();
    for (let status of statusData) {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      statusSelect.append(option);
    }
    statusSelect.value = item.status;
  }
  const locationSelect = document.querySelector('#location');
  const locationResponse = await fetch(window.baseUrl + '/api/locations/top');
  if (locationResponse.ok) {
    locationSelect.innerHTML = '';
    const locationData = await locationResponse.json();
    for (let location of locationData) {
      const option = document.createElement('option');
      option.value = location.id;
      option.textContent = location.name;
      locationSelect.append(option);
    }
    locationSelect.value = item.location_id;
  }
  const sublocationSelect = document.querySelector('#sublocation');
  const sublocationResponse = await fetch(window.baseUrl + `/api/locations/${item.location_id}/children`);
  if (sublocationResponse.ok) {
    sublocationSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '(-none-)';
    sublocationSelect.append(defaultOption);
    const sublocationData = await sublocationResponse.json();
    for (let sublocation of sublocationData) {
      const option = document.createElement('option');
      option.value = sublocation.id;
      option.textContent = sublocation.name;
      sublocationSelect.append(option);
    }
    sublocationSelect.value = item.sublocation_id;
  }
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
  boxgridAlphaSelect.value = (item.boxgrid) ? item.boxgrid[0] : '';
  const boxgridNumSelect = document.querySelector('#boxgrid-num');
  const boxgridNumDisplay = ['(-none-)','1','2','3','4','5','6','7','8','9','10'];
  const boxgridNumValues = ['','1','2','3','4','5','6','7','8','9','10'];
  boxgridNumSelect.innerHTML = '';
  for (let i=0;i<boxgridNumValues.length;i++) {
    const option = document.createElement('option');
    option.value = boxgridNumValues[i];
    option.textContent = boxgridNumDisplay[i];
    boxgridNumSelect.append(option);
  }
  boxgridNumSelect.value = (item.boxgrid) ? item.boxgrid.substring(1) : '';
  const amountField = document.querySelector('#amount');
  amountField.value = item.current_amount;
  const receivedField = document.querySelector('#received');
  window.receivedPicker = null;
  window.receivedPicker = new easepick.create({
    element: receivedField,
    css: [
      'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css',
    ],
    format: 'M/D/YYYY'
  });
  const date = new Date(item.date_received).toLocaleString([],{year: 'numeric', month: 'numeric', day: 'numeric'});
  receivedField.value = date;
  // const amtThresholdField = document.querySelector('#amt-threshold');
  // amtThresholdField.value = spec.reorder_amt_threshold;
}

function editItem () {
  const detailsTable = document.querySelector('#item-details');
  detailsTable.setAttribute('style','display:none;');
  const editTable = document.querySelector('#item-edit');
  editTable.setAttribute('style','');
}

async function deleteItem () {
  if (!confirm(`Are you sure? This item and all activity logs will be permanently deleted from the database.`)) {
    return;
  }
  const deleteResponse = await fetch(window.baseUrl + '/api/items/'+window.location.href.split('/').pop(), {
    method: 'DELETE'
  });
  if (deleteResponse.ok) {
    const deleteData = await deleteResponse.json();
    document.location.replace(window.baseUrl + `/specs/${deleteData.spec_id}`);
  } else {
    const err = await deleteResponse.json();
    document.querySelector('#delete-err').textContent = err.message;
  }
}

function cancelEditItem () {
  const detailsTable = document.querySelector('#item-details');
  detailsTable.setAttribute('style','');
  const editTable = document.querySelector('#item-edit');
  editTable.setAttribute('style','display:none;');
  initializeEditor();
}

async function saveEditItem () {
  const formData = {
    lot: document.querySelector('#lot').value.trim(),
    status: document.querySelector('#status').value,
    location_id: document.querySelector('#location').value,
    sublocation_id: document.querySelector('#sublocation').value,
    boxgrid: `${document.querySelector('#boxgrid-alpha').value}${document.querySelector('#boxgrid-num').value}`,
    current_amount: document.querySelector('#amount').value.trim(),
    date_received: document.querySelector('#received').value.trim()
  }
  const saveResponse = await fetch(window.baseUrl + '/api/items/'+window.location.href.split('/').pop(), {
    method: 'PUT',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(formData)
  });
  if (saveResponse.ok) {
    const response = await saveResponse.json();
    document.location.reload();
  } else {
    const err = await saveResponse.json();
    document.querySelector('#err').textContent = err.message;
  }
}

async function updateSublocations () {
  const location_id = document.querySelector('#location').value;
  const sublocationSelect = document.querySelector('#sublocation');
  const sublocationResponse = await fetch(window.baseUrl + `/api/locations/${location_id}/children`);
  if (sublocationResponse.ok) {
    sublocationSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '(-none-)';
    sublocationSelect.append(defaultOption);
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

initializeEditor();
document.querySelector('#edit').addEventListener('click',editItem);
document.querySelector('#cancel').addEventListener('click',cancelEditItem);
document.querySelector('#save').addEventListener('click',saveEditItem);
document.querySelector('#location').addEventListener('change',updateSublocations);
if (document.querySelector('#delete')) {
  document.querySelector('#delete').addEventListener('click',deleteItem);
}