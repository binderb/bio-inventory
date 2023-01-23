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
}

document.querySelector('#edit').addEventListener('click',editSpec);
document.querySelector('#cancel').addEventListener('click',cancelEditSpec);