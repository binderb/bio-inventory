const logout = async (e) => {
  e.preventDefault();
  const response = await fetch(basePath + 'api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    }
  });
  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click',logout);