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

    const storedCurrentQuestionIndex = localStorage.getItem(
      "currentQuestionIndex"
    );
    console.log(storedCurrentQuestionIndex);
    if (storedCurrentQuestionIndex !== null) {
      // If there's a stored value, parse it to integer and assign to currentQuestionIndex
      currentQuestionIndex = parseInt(storedCurrentQuestionIndex);
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
function classroom() {
  window.location.href = "class.html";
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

cockpitVideo.addEventListener("loadedmetadata", function () {
  cockpitVideo.muted = true;
});
