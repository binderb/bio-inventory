
async function biotrackerDownload () {
  window.open(baseUrl + '/api/admin/biotracker');
}

document.querySelector('#biotracker-download').addEventListener('click',biotrackerDownload);