/*
 * Starts any clocks using the user's local time
 * From: css animation.rocks/clocks
 */
function localClocks() {
  digitalClock();

  document.getElementById("timeZone")!.innerHTML =
    Intl.DateTimeFormat().resolvedOptions().timeZone;

  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const hands = [
    {
      hand: "hours",
      angle: hours * 30 + minutes / 2,
    },
    {
      hand: "minutes",
      angle: minutes * 6,
    },
    {
      hand: "seconds",
      angle: seconds * 6,
    },
  ];
  // Loop through each of these hands to set their angle
  for (var j = 0; j < hands.length; j++) {
    var elements = document.querySelectorAll<HTMLElement>("." + hands[j].hand);
    for (var k = 0; k < elements.length; k++) {
      elements[k].style.webkitTransform = "rotateZ(" + hands[j].angle + "deg)";
      elements[k].style.transform = "rotateZ(" + hands[j].angle + "deg)";
      // If this is a minute hand, note the seconds position (to calculate minute position later)
      if (hands[j].hand === "minutes") {
        (<Element>elements[k].parentNode).setAttribute(
          "data-second-angle",
          String(hands[j + 1].angle)
        );
      }
    }
  }
}

function digitalClock() {
  let date: Date;
  let time: string;
  setInterval(() => {
    date = new Date();
    time =
      date.getHours() +
      " : " +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes() +
      " : " +
      (date.getSeconds() < 10 ? "0" : "") +
      date.getSeconds();

    document.getElementById("digital-clock")!.innerText = time;
  }, 1000);
}
