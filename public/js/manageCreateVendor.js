async function createVendor () {
  const formData = {
    name: document.querySelector('#create-vendor #vendorname').value.trim(),
  }
  const createResponse = await fetch('/api/vendors/', {
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
    document.querySelector('#create-vendor-panel #err').textContent = err.message;
  }
}

initializeEditor();
document.querySelector('#create-vendor-panel #create').addEventListener('click',createVendor);