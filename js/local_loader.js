
/**
    * Set-up onload event handler for traffic light monitoring local URLs.
*/

window.addEventListener('load', function() {

    "use strict";

    var
        sLocalURL = "http://localhost/URL-Monitor/status/index.php",
        iCheckInterval = 2000; // 2 secs

    /* normal */
    var oTrafficLight1 = new TrafficLight();
    var sTL1 = oTrafficLight1.create("traffic-light-1");
    oTrafficLight1.monitor(sLocalURL + "?status=200", iCheckInterval, sTL1);

    /* continuous errors */
    var oTrafficLight2 = new TrafficLight();
    var sTL2 = oTrafficLight2.create("traffic-light-2");
    oTrafficLight2.monitor(sLocalURL + "?status=400", iCheckInterval, sTL2);

    /* single error in time period */
    var oTrafficLight3 = new TrafficLight();
    var sTL3 = oTrafficLight3.create("traffic-light-3");
    oTrafficLight3.monitor(sLocalURL + "?status=200&create_single_error", iCheckInterval, sTL3);

}, false);
