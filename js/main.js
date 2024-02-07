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
    var initialPage = document.getElementById("loading-screen");
    initialPage.style.display = "none";
    playVideo(); // Trigger video play after hiding the initial page
    playAudio();
  }

  document
    .getElementById("loading-screen")
    .addEventListener("click", hideInitialPage);
});

document.addEventListener("DOMContentLoaded", function () {
  // Get the audio elements
  var clickSound = document.getElementById("clickSound");
  var mouseoverSound = document.getElementById("mouseoverSound");
  var keyboardSound = document.getElementById("keyboardSound");

  // Function to play the click sound
  function playClickSound() {
    clickSound.currentTime = 0; // Reset the sound to the beginning
    clickSound.play();
  }

  // Function to play the mouseover sound
  function playMouseoverSound() {
    mouseoverSound.currentTime = 0; // Reset the sound to the beginning
    mouseoverSound.play();
  }

  // Function to play the keyboard sound
  function playKeyboardSound() {
    keyboardSound.currentTime = 0; // Reset the sound to the beginning
    keyboardSound.play();
  }

  // Attach the playClickSound and playMouseoverSound functions to specific buttons
  var buttons = document.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.addEventListener("click", playClickSound);
    button.addEventListener("mouseover", playMouseoverSound);
  });

  // Attach the playKeyboardSound function to keyboard events on input elements
  var inputElements = document.querySelectorAll("input");

  inputElements.forEach(function (input) {
    input.addEventListener("input", playKeyboardSound);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Wait for the DOM to be fully loaded

  // Function to hide the loading screen and show the main content
  function hideLoadingScreen() {
    var loadingScreen = document.getElementById("loading-screen");
    var loadingMessage = document.getElementById("loading-message");
    var continueMessage = document.getElementById("continueMessage");

    // Change the h1 to "Completed"
    loadingMessage.textContent = "Loading Complete!";

    // Display the "Press anywhere to continue" message
    continueMessage.style.display = "block";

    // Add click event listener to continue after pressing anywhere
    document.addEventListener("click", continueAfterClick);

    function continueAfterClick() {
      document.removeEventListener("click", continueAfterClick);
      hideInitialPage();
    }

    function continueAfterTimeout() {
      hideInitialPage();
    }
  }

  // Function to hide the initial loading page
  function hideInitialPage() {
    var initialPage = document.getElementById("loading-screen");
    initialPage.style.display = "none";
    playVideo(); // Trigger video play after hiding the initial page
    playAudio();
  }

  // Add event listener to hide loading screen when video is loaded
  var video = document.querySelector(".bg-vid");
  video.addEventListener("loadeddata", hideLoadingScreen);

  // Add event listener to hide loading screen when user clicks anywhere
  document.addEventListener("click", hideInitialPage);

  // Function to play the video
  function playVideo() {
    var video = document.querySelector(".bg-vid");
    var cockpitVid = document.querySelector("#cockpit-vid");
    video.muted = false;
    cockpitVid.muted = true;
    cockpitVid.play();
    video.play();
  }

  function playAudio() {
    var cockpitSound = document.querySelector("#cockpitSound");
    cockpitSound.play();
    console.log("Audio");
  }
});

function explore() {
  // Get the main-screen iframe
  var mainScreen = document.querySelector(".main-screen");

  // Set the new source for the iframe
  mainScreen.src = "explore.html"; // Change 'explore.html' to the desired page
}

function liftoff() {
  // Get the main-screen iframe
  var mainScreen = document.querySelector(".main-screen");

  // Set the new source for the iframe
  mainScreen.src = "quiz.html"; // Change 'explore.html' to the desired page

  // Play a sound (optional)
  document.getElementById("clickSound").play();
}

// Call flickerOut once after a delay of 10 seconds
setTimeout(flickerOut, 10000);
// Call flickerOut every 35 seconds
setTimeout(() => {
  setInterval(flickerOut, 35000), 20000;
});

function flickerOut() {
  const animatedElement = document.querySelector(".container");
  animatedElement.classList.add("flicker-out-1");

  setTimeout(fadeIn, 2500);
}

function removeFlicker() {
  const elementFlicker = document.querySelector(".container");
  console.log("helloaddadsdasdsdada");
  elementFlicker.style.opacity = "0";
  elementFlicker.classList.remove("flicker-out-1");
  setTimeout(() => {
    //animatedElement.style.zIndex = "4";
    elementFlicker.classList.add("flicker-in-1");
  }, 3000);
}

function fadeIn() {
  console.log("hello-1");
  const elements = document.querySelectorAll("#planet");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        console.log("helllo");
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("animated")
        ) {
          console.log("hello2");
          //entry.target.classList.add("animated");

          if (entry.target.classList.contains("fadein-center")) {
            entry.target.classList.add("fadein-center-animated");
            console.log("impt");
          }

          setTimeout(() => {
            entry.target.className = "fadein-center";
          }, 10000);
          setTimeout(removeFlicker, 13000);
        }
      });
    },
    { threshold: 0.5 }
  );
  elements.forEach((element) => {
    observer.observe(element);
  });
}

function flickerIn() {
  console.log("flciker in");
  const animatedElement = document.querySelector(".container");
  animatedElement.classList.add("flicker-in-1");
}

function loadingAnim() {
  let loadingAnim = document.querySelector("#loading-animation");
  let correctAnim = document.querySelector("#correct-animation");
  let wrongAnim = document.querySelector("#wrong-animation");

  loadingAnim.style.display = "inline";
  correctAnim.style.display = "none";
  wrongAnim.style.display = "none";
  loadingAnim.currentTime = 0; // Reset loading animation to start
}

function correctAnim() {
  let loadingAnim = document.querySelector("#loading-animation");
  let correctAnim = document.querySelector("#correct-animation");
  let wrongAnim = document.querySelector("#wrong-animation");

  loadingAnim.style.display = "none";
  correctAnim.style.display = "inline";
  wrongAnim.style.display = "none";
  correctAnim.currentTime = 0; // Reset correct animation to start
}

function wrongAnim() {
  let loadingAnim = document.querySelector("#loading-animation");
  let correctAnim = document.querySelector("#correct-animation");
  let wrongAnim = document.querySelector("#wrong-animation");

  loadingAnim.style.display = "none";
  correctAnim.style.display = "none";
  wrongAnim.style.display = "inline";
  wrongAnim.currentTime = 0; // Reset wrong animation to start
}
