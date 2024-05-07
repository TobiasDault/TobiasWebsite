if(!localStorage.getItem("lastServertime")){
    localStorage.setItem("lastServertime", 0);
}
if(!localStorage.getItem("mc-online")){
    localStorage.setItem("mc-online", "true");
}

var timerInterval;
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
        var serverStatus = data.online ? "online" : "offline"; //checking JSON for online condition
        var statusElement = document.getElementById('serverStatus');
        statusElement.innerText = 'Server Status: ';
        if (serverStatus === 'online') {
            statusElement.innerHTML += '<span class="online">ONLINE</span>';
        } else {
            statusElement.innerHTML += '<span class="offline">OFFLINE</span>';
        }
        // Update timer
        var timerElement = document.getElementById('timer');
        if (serverStatus === 'online') {
            if(localStorage.getItem("mc-online")==="false"){
               localStorage.setItem("lastServertime", new Date().getTime());
                localStorage.setItem("mc-online", "true");
            }
            startTimer(timerElement, true);
        } else {
            if(localStorage.getItem("mc-online")==="true"){
                localStorage.setItem("lastServertime", new Date().getTime());
                localStorage.setItem("mc-online", "false");
            }
            startTimer(timerElement, false);
        }
  })
  .catch(error => {
    console.error('Fetch operation failed', error);
  });
}
function startTimer(timerElement, up) {
    var startTime = new Date(parseInt(localStorage.getItem("lastServertime")));
    function updateTimer() {
        console.log("startTime: " + startTime);
        var currentTime = new Date().getTime();
        console.log("currentTime: " + currentTime);
        var elapsedTime = currentTime - startTime;
        console.log("elapsedTime: " + elapsedTime);
        var seconds = Math.floor(elapsedTime / 1000);
        var minutes = Math.floor(seconds / 60);
        seconds %= 60;
        if(up){
            timerElement.innerText = 'Server Uptime: ' + minutes + 'm ' + seconds + 's\n';
        }else{
            timerElement.innerText = 'Server Downtime: ' + minutes + 'm ' + seconds + 's\n';
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
setInterval(updateServerStatus, 10000);
