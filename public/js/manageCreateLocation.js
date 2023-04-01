async function initializeEditor () {
  const typeSelect = document.querySelector('#create-location-panel #type');
  const typeResponse = await fetch('./api/locations/types');
  if (typeResponse.ok) {
    typeSelect.innerHTML = '';
    const typeData = await typeResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Choose --';
    typeSelect.append(defaultOption);
    for (let type of typeData) {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      typeSelect.append(option);
    }
  }
  const parentSelect = document.querySelector('#create-location-panel #parent');
  const parentResponse = await fetch('./api/locations/top');
  if (parentResponse.ok) {
    parentSelect.innerHTML = '';
    const parentData = await parentResponse.json();
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '(-none-)';
    parentSelect.append(defaultOption);
    for (let parent of parentData) {
      const option = document.createElement('option');
      option.value = parent.id;
      option.textContent = parent.name;
      parentSelect.append(option);
    }
  }
}

async function createLocation () {
  const formData = {
    name: document.querySelector('#create-location #locationname').value.trim(),
    description: document.querySelector('#create-location #description').value.trim(),
    type: document.querySelector('#create-location #type').value,
    parent_id: document.querySelector('#create-location #parent').value,
  }
  const createResponse = await fetch('./api/locations/', {
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
    document.querySelector('#create-location-panel #err').textContent = err.message;
  }
}

initializeEditor();
document.querySelector('#create-location-panel #create').addEventListener('click',createLocation);