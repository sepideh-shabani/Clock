/*
 * Starts any clocks using the user's local time
 * From: css animation.rocks/clocks
 */
function localClocks() {
    digitalClock();
    document.getElementById("timeZone").innerHTML =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
    var date = new Date();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();
    var hands = [
        {
            hand: "hours",
            angle: hours * 30 + minutes / 2
        },
        {
            hand: "minutes",
            angle: minutes * 6
        },
        {
            hand: "seconds",
            angle: seconds * 6
        },
    ];
    // Loop through each of these hands to set their angle
    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll("." + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = "rotateZ(" + hands[j].angle + "deg)";
            elements[k].style.transform = "rotateZ(" + hands[j].angle + "deg)";
            // If this is a minute hand, note the seconds position (to calculate minute position later)
            if (hands[j].hand === "minutes") {
                elements[k].parentNode.setAttribute("data-second-angle", String(hands[j + 1].angle));
            }
        }
    }
}
function digitalClock() {
    var date;
    var time;
    setInterval(function () {
        date = new Date();
        time =
            date.getHours() +
                " : " +
                (date.getMinutes() < 10 ? "0" : "") +
                date.getMinutes() +
                " : " +
                (date.getSeconds() < 10 ? "0" : "") +
                date.getSeconds();
        document.getElementById("digital-clock").innerText = time;
    }, 1000);
}
