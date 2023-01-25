async function initializeEditor () {
  const specData = await fetch('/api/specs/'+window.location.href.split('/').pop());
  const spec = await specData.json();
  const nameField = document.querySelector('#name');
  nameField.value = spec.name;
  const categorySelect = document.querySelector('#category');
  const categoryResponse = await fetch('/api/categories');
  if (categoryResponse.ok) {
    categorySelect.innerHTML = '';
    const categoryData = await categoryResponse.json();
    for (let category of categoryData) {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.append(option);
    }
    categorySelect.value = spec.category_id;
  }
  const vendorSelect = document.querySelector('#vendor');
  const vendorResponse = await fetch('/api/vendors');
  if (vendorResponse.ok) {
    vendorSelect.innerHTML = '';
    const vendorData = await vendorResponse.json();
    for (let vendor of vendorData) {
      const option = document.createElement('option');
      option.value = vendor.id;
      option.textContent = vendor.name;
      vendorSelect.append(option);
    }
    vendorSelect.value = spec.vendor_id;
  }
  const statusSelect = document.querySelector('#status');
  const statusResponse = await fetch('/api/specs/statuses');
  if (statusResponse.ok) {
    statusSelect.innerHTML = '';
    const statusData = await statusResponse.json();
    for (let status of statusData) {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      statusSelect.append(option);
    }
    statusSelect.value = spec.status;
  }
  const amountField = document.querySelector('#amount');
  amountField.value = spec.amount;
  const unitSelect = document.querySelector('#units');
  const unitResponse = await fetch('/api/specs/units');
  if (unitResponse.ok) {
    unitSelect.innerHTML = '';
    const unitData = await unitResponse.json();
    for (let unit of unitData) {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      unitSelect.append(option);
    }
    unitSelect.value = spec.units;
  }
  const qtyThresholdField = document.querySelector('#qty-threshold');
  qtyThresholdField.value = spec.reorder_qty_threshold;
  const amtThresholdField = document.querySelector('#amt-threshold');
  amtThresholdField.value = spec.reorder_amt_threshold;
}

function editSpec () {
  const detailsTable = document.querySelector('#spec-details');
  detailsTable.setAttribute('style','display:none;');
  const editTable = document.querySelector('#spec-edit');
  editTable.setAttribute('style','');
}

function cancelEditSpec () {
  const detailsTable = document.querySelector('#spec-details');
  detailsTable.setAttribute('style','');
  const editTable = document.querySelector('#spec-edit');
  editTable.setAttribute('style','display:none;');
  initializeEditor();
}

async function saveEditSpec () {
  const formData = {
    name: document.querySelector('#name').value.trim(),
    category_id: document.querySelector('#category').value,
    vendor_id: document.querySelector('#vendor').value,
    status: document.querySelector('#status').value,
    amount: document.querySelector('#amount').value.trim(),
    units: document.querySelector('#units').value,
    reorder_qty_threshold: (document.querySelector('#qty-threshold').value.trim() == '') ? null : document.querySelector('#qty-threshold').value.trim(),
    reorder_amt_threshold: (document.querySelector('#amt-threshold').value.trim() == '') ? null : document.querySelector('#amt-threshold').value.trim()
  }
  const saveResponse = await fetch('/api/specs/'+window.location.href.split('/').pop(), {
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

initializeEditor();
document.querySelector('#edit').addEventListener('click',editSpec);
document.querySelector('#cancel').addEventListener('click',cancelEditSpec);
document.querySelector('#save').addEventListener('click',saveEditSpec);