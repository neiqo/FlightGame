document.addEventListener("DOMContentLoaded", function () {
  var playButton = document.getElementById("scroll-button");

  playButton.addEventListener("click", function () {
    var terminal = document.querySelector(".terminal");
    var terminalBottom = terminal.offsetTop + terminal.offsetHeight;

    // Calculate the distance to scroll
    var distanceToScroll = terminalBottom - window.scrollY;

    // Set the scroll duration (in milliseconds)
    var scrollDuration = 1500;

    // Calculate the number of frames based on the duration
    var frames = Math.ceil(scrollDuration / 16.67); // 60 frames per second

    // Calculate the distance to scroll per frame
    var distancePerFrame = distanceToScroll / frames;

    // Perform smooth scroll animation
    function scrollAnimation(currentFrame) {
      if (currentFrame <= frames) {
        window.scrollTo(0, window.scrollY + distancePerFrame);
        currentFrame++;
        requestAnimationFrame(function () {
          scrollAnimation(currentFrame);
        });
      }
    }

    // Start the animation
    scrollAnimation(0);
  });

  function hideInitialPage() {
    var initialPage = document.getElementById("initialPage");
    initialPage.style.display = "none";
    playVideo(); // Trigger video play after hiding the initial page
  }

  document
    .getElementById("initialPage")
    .addEventListener("click", hideInitialPage);

  function playVideo() {
    var video = document.querySelector(".bg-vid");
    video.muted = false;
    video.play();
  }
});
