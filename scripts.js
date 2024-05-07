var timerInterval;
var uptime = localStorage.getItem('uptime') ? parseInt(localStorage.getItem('uptime')) : 0;
var downtime = localStorage.getItem('downtime') ? parseInt(localStorage.getItem('downtime')) : 0;

  function updateServerStatus() {
    const url = 'https://api.mcsrvstat.us/3/mc.tobiasdault.com';

    fetch(url)
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
        var serverStatus = data.online ? "ONLINE" : "OFFLINE";
        console.log("serverStatus" + serverStatus);
        var statusElement = document.getElementById('serverStatus');
        statusElement.innerText = 'Server Status: ';
        if (serverStatus === 'online') {
            statusElement.innerHTML += '<span class="online">ONLINE</span>';
            uptime++;
        } else {
            statusElement.innerHTML += '<span class="offline">OFFLINE</span>';
        }
    
        // Update timer
        var timerElement = document.getElementById('timer');
        if (serverStatus === 'online') {
            stopTimer();
            startTimer(timerElement, true);
        } else {
            stopTimer();
            startTimer(timerElement, false);
        }
  })
  .catch(error => {
    console.error('Fetch operation failed', error);
  });
}
function startTimer(timerElement, up) {
    var startTime = new Date().getTime();

    function updateTimer() {
        var currentTime = new Date().getTime();
        var elapsedTime = currentTime - startTime;
        var seconds = Math.floor(elapsedTime / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds %= 60;
        if(up){
            timerElement.innerText = 'Server Uptime: ' + minutes + 'm ' + seconds + 's\n';
        }else{
            timerElement.innerText = 'Server Downtime: ' + downtime++ + 's';  
        }
    }

    updateTimer(); // Update immediately
    timerInterval = setInterval(updateTimer, 1000); // Update every second
}
function stopTimer() {
    clearInterval(timerInterval);
    var timerElement = document.getElementById('timer');
    timerElement.innerText = ''; // Clear timer display
}

// Update server status initially and every 10 seconds
updateServerStatus();
setInterval(updateServerStatus, 50000);
