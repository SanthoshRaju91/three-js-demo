/**
* Main application JS file, with connection to socket IO and filling the canvas, uses IIFE for scope isolation.
*/
(function() {
  //checking if the browser supports device orientaion HTML5 API.
  if (window.DeviceOrientationEvent) {

    //connecting to socket IO.
    var socket = io();
    var connected = false;

    //establishing connection to Socket IO for real-time data.
    socket.on('connected', function() {
        console.log('Conection established');
        connected = true;
    });

    // adding deviceorientation event listener to the application and creating canvas based on alphs, beta, gamma axes
    // Please use a device oriented device to see the result such as mobile, tablet.
    window.addEventListener("deviceorientation", function(event) {

      //sending device axes on socket 'orient' channel
      socket.emit('orient', JSON.stringify({
        alpha: event.alpha,
        beta: event.beta,
        gamma: event.gamma
      }));

      //listening to device axes on orient channel
      // creating the canvas based on device axes.
      socket.on('orient', function(data) {
        data = JSON.parse(data);
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillStyle = "#FF7777";
        ctx.font = "14px Verdana";
        ctx.fillText("Alpha: " + Math.round(data.alpha), 10, 20);
        ctx.beginPath();
        ctx.moveTo(180, 75);
        ctx.lineTo(210, 75);
        ctx.arc(180, 75, 60, 0, data.alpha * Math.PI / 180);
        ctx.fill();

        ctx.fillStyle = "#FF6600";
        ctx.fillText("Beta: " + Math.round(data.beta), 10, 140);
        ctx.beginPath();
        ctx.fillRect(180, 150, data.beta, 90);

        ctx.fillStyle = "#FF0000";
        ctx.fillText("Gamma: " + Math.round(data.gamma), 10, 270);
        ctx.beginPath();
        ctx.fillRect(90, 340, 180, data.gamma);
      });
    });
  } else {
    //alerts the user if the browser does not support Device Orientation
    alert("Sorry, your browser doesn't support Device Orientation");
  }
})();
