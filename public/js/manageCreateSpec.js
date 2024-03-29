async function updatePN () {
  const newPNResponse = await fetch(window.baseUrl + '/api/specs/next-pn');
  if (newPNResponse.ok) {
    const newPN = await newPNResponse.json();
    const pnField = document.querySelector('#pn');
    pnField.textContent = newPN.pn;
  }
}

async function initializeEditor () {
  updatePN();
  const categorySelect = document.querySelector('#create-spec-panel #category');
  const categoryResponse = await fetch(window.baseUrl + '/api/categories');
  if (categoryResponse.ok) {
    const categoryData = await categoryResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose --';
    categorySelect.append(defaultOption);
    for (let category of categoryData) {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.append(option);
    }
  }
  const vendorSelect = document.querySelector('#create-spec-panel #vendor');
  const vendorResponse = await fetch(window.baseUrl + '/api/vendors');
  if (vendorResponse.ok) {
    const vendorData = await vendorResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose --';
    vendorSelect.append(defaultOption);
    for (let vendor of vendorData) {
      const option = document.createElement('option');
      option.value = vendor.id;
      option.textContent = vendor.name;
      vendorSelect.append(option);
    }
  }
  const statusSelect = document.querySelector('#create-spec-panel #status');
  const statusResponse = await fetch(window.baseUrl + '/api/specs/statuses');
  if (statusResponse.ok) {
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
  const unitSelect = document.querySelector('#create-spec-panel #units');
  const unitResponse = await fetch(window.baseUrl + '/api/specs/units');
  if (unitResponse.ok) {
    const unitData = await unitResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose --';
    unitSelect.append(defaultOption);
    for (let unit of unitData) {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      unitSelect.append(option);
    }
  }
}

async function createSpec () {
  const formData = {
    name: document.querySelector('#create-spec #specname').value.trim(),
    category_id: document.querySelector('#create-spec #category').value,
    vendor_id: document.querySelector('#create-spec #vendor').value,
    status: document.querySelector('#status').value,
    amount: document.querySelector('#create-spec #amount').value.trim(),
    units: document.querySelector('#create-spec #units').value,
    reorder_qty_threshold: (document.querySelector('#create-spec #qty-threshold').value.trim() == '') ? null : document.querySelector('#qty-threshold').value.trim(),
    reorder_amt_threshold: (document.querySelector('#create-spec #amt-threshold').value.trim() == '') ? null : document.querySelector('#amt-threshold').value.trim()
  }
  const createResponse = await fetch(window.baseUrl + '/api/specs/', {
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
    document.querySelector('#create-spec-panel #err').textContent = err.message;
  }
}

initializeEditor();
document.querySelector('#create-spec-panel #create').addEventListener('click',createSpec);