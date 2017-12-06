
/**
    * Set-up onload event handler for traffic light monitoring an external URL.
*/

window.addEventListener('load', function() {

    "use strict";

    var
        sRemoteURL = "http://www.bbc.co.uk/",
        iCheckInterval = 2000, // 2 secs
        oTrafficLight1 = new TrafficLight(),
        sTL1 = oTrafficLight1.create("traffic-light-1");

    oTrafficLight1.monitor(sRemoteURL, iCheckInterval, sTL1);

}, false);
