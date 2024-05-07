const url = 'https://api.mcsrvstat.us/3/mc.tobiasdault.com';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const serverUpElement = document.getElementById("serverUp");
    serverUpElement.innerHTML = data.online ? "ONLINE" : "OFFLINE";
    serverUpElement.style.color = data.online ? "green" : "red";
  })
  .catch(error => {
    console.error('Fetch operation failed', error);
  });