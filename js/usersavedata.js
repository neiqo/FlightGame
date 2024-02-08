window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    // Check if the element exists before updating its content

    const usernameDisplay = document.getElementById("player-username-display");
    if (usernameDisplay) {
      //  usernameDisplay.textContent = user.username;
      typeWriter(usernameDisplay, user.username);
    }

    // Update other elements as before
    const currentPlanetDisplay = document.getElementById(
      "player-current-planet"
    );
    if (currentPlanetDisplay) {
      //currentPlanetDisplay.textContent = user.savedata.current_planet;
      typeWriter(currentPlanetDisplay, user.savedata.current_planet);
    }

    updateCockpitVideo(user.savedata.current_planet);
    updateRotatingPlanet(user.savedata.current_planet);

    const levelDisplay = document.getElementById("player-level");
    if (levelDisplay) {
      //levelDisplay.textContent = user.savedata.level;
      let level = user.savedata.level.toString();
      typeWriter(levelDisplay, level);
    }

    const fuelDisplay = document.getElementById("player-fuel");
    if (fuelDisplay) {
      //fuelDisplay.textContent = user.savedata.fuel;
      let fuel = user.savedata.fuel.toString();
      typeWriter(fuelDisplay, fuel);
    }

    const titleDisplay = document.getElementById("player-title");
    if (titleDisplay) {
      //titleDisplay.textContent = user.savedata.title;
      typeWriter(titleDisplay, user.savedata.title);
    }

    if (typeof fetchDataForCurrentPlanet === "function") {
      fetchDataForCurrentPlanet(user.savedata.current_planet);
    }
  } else {
    // Redirect to login page if no session data
    window.location.href = "index.html";
  }
};

function logout() {
  // clear session data
  sessionStorage.removeItem("currentUser");
  // redirect to landing page
  window.location.href = "index.html";
}

function orbit() {
  console.log("Orbit function called!");
  window.location.href = "homepage.html";
}

function liftoff() {
  // Get the main-screen iframe
  var mainScreen = document.querySelector(".main-screen");

  // Set the new source for the iframe
  mainScreen.src = "quiz.html"; // Change 'explore.html' to the desired page

  // Play a sound (optional)
  document.getElementById("clickSound").play();
}
function map() {
  // Get the main-screen iframe
  var mainScreen = document.querySelector(".side-screen");

  // Set the new source for the iframe
  mainScreen.src = "map.html"; // Change 'explore.html' to the desired page

  // Play a sound (optional)
  document.getElementById("clickSound").play();
}

function status() {
  // Get the main-screen iframe
  var mainScreen = document.querySelector(".side-screen");

  // Set the new source for the iframe
  mainScreen.src = "status.html"; // Change 'explore.html' to the desired page

  // Play a sound (optional)
  document.getElementById("clickSound").play();
}
function classroom() {
  window.parent.location.href = "class.html";
}

function typeWriter(element, text, i = 0) {
  if (i === 0) {
    element.textContent = "";
  }
  element.textContent += text[i];

  if (i === text.length - 1) {
    return;
  }

  if (text === undefined) {
    return;
  }

  setTimeout(() => typeWriter(element, text, i + 1), 150);
}

function updateCockpitVideo(planet) {
  const cockpitVideo = document.getElementById("cockpit-vid");
  if (cockpitVideo) {
    // Construct the video source based on the planet
    const videoSource = `images/bg/${planet.toLowerCase()}-vid.webm`;
    cockpitVideo.src = videoSource;
    cockpitVideo.muted = true;
    console.log(cockpitVideo.muted);
  }
}

function updateRotatingPlanet(planet) {
  console.log("runadsadsdadas");
  const elements = document.querySelectorAll("#planet");
  console.log(elements.length);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      //console.log("helllo");
      if (entry.isIntersecting) {
        console.log("imdadasdadadadas adasdab");
        let url = `./images/${planet.toLowerCase()}-rectangle.jpg`;
        entry.target.setAttribute("style", `background-image: url('${url}')`);
      }
    });
  });
  elements.forEach((element) => {
    observer.observe(element);
  });
}

cockpitVideo.addEventListener("loadedmetadata", function () {
  cockpitVideo.muted = true;
});
