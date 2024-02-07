let i = 0;

document.addEventListener("DOMContentLoaded", function () {
  var prevButton = document.getElementById("prevButton");
  var nextButton = document.getElementById("nextButton");

  console.log(i);
  if (i === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  prevButton.addEventListener("click", function () {
    i--;
    console.log(i);
    var iframe = document.getElementById("main-scr");
    iframe.contentWindow.prevPara();

    if (i === 0) {
      prevButton.disabled = true;
    }
    nextButton.disabled = false;
  });

  nextButton.addEventListener("click", function () {
    i++;
    console.log(i);
    var iframe = document.getElementById("main-scr");
    iframe.contentWindow.nextPara();
    if (i === 4) {
      nextButton.disabled = true;
    }
    prevButton.disabled = false;
  });
});
