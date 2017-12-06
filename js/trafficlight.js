
var TrafficLight = function() {

    /**
        * Traffic Light 'class'.
        *
        * @author         Martin Latter
        * @copyright      Martin Latter 10/11/2017
        * @version        0.03
        * @license        GNU GPL version 3.0 (GPL v3); http://www.gnu.org/licenses/gpl.html
        * @link           https://github.com/Tinram/URL-Monitor.git
    */


    "use strict";


    this.iPeriodInterval = 20000; // 20 secs

    /**
        * Traffic Light constructor
        *
        * @param   string sElementName, name of element
        * @return  string, attribute name
    */

    this.create = function(sElementName) {

        var
            oContainer,
            oDiv,
            oSpanRed,
            oSpanGreen,
            sRndID = Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 8);

        oContainer = document.createDocumentFragment();
        oDiv = document.createElement("div");
        oDiv.setAttribute("id", sRndID);
        oDiv.setAttribute("class", "traffic-light");

        oSpanRed = document.createElement("span");
        oSpanRed.setAttribute("class", "red");
        oSpanGreen = document.createElement("span");
        oSpanGreen.setAttribute("class", "green");

        oDiv.appendChild(oSpanRed);
        oDiv.appendChild(oSpanGreen);
        oContainer.appendChild(oDiv);

        document.getElementById(sElementName).appendChild(oContainer);

        return oDiv.getAttribute("id");
    };


    /**
        * Monitoring method.
        *
        * @param   string sURL, the endpoint URL
        * @param   integer iCheckInterval, interval in milliseconds
        * @param   string sID, id of element
        * @return  void
    */

    this.monitor = function(sURL, iCheckInterval, sID) {

        var aRecords = [];

        /* simple arguments error check */
        if (arguments.length < 3) {
            alert("Wrong number of arguments passed to monitor() method!");
            return;
        }

        /* push HTTP status code onto aRecords[] */
        function captureStatus(iStatus) {
            aRecords.push(iStatus);
        }

        /* traffic light colour changes */
        function errorResponse() {

            if (aRecords.length > 3) {
                $('span[class^="green"]', "#" + sID).addClass("dimgreen");
                $('span[class^="red"]', "#" + sID).addClass("blinker");
            }
            else if (aRecords.length < 2) {
                $('span[class^="red"]', "#" + sID).removeClass("blinker");
                $('span[class^="red"]', "#" + sID).addClass("reddim");
                $('span[class^="green"]', "#" + sID).removeClass("greendim");
                $('span[class^="green"]', "#" + sID).addClass("greenbright");
            }

            aRecords = []; // empty the array
        }

        /* check the URL status with jQuery AJAX and add error codes to aRecords[] */
        function checkStatus() {

            $.ajax({

                url: sURL,
                type: "GET",
                cache: false,
                crossDomain: true,
                dataType: "jsonp",
                jsonp: false,
                processData: false,

                error: function(xhr) {
                    if (xhr.status !== 200) {
                        captureStatus(xhr.status);
                    }
                }

            });
        }

        /* set the method call intervals */
        setInterval(checkStatus, iCheckInterval);
        setInterval(errorResponse, this.iPeriodInterval);
    };
}
