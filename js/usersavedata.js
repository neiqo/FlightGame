window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    // Check if the element exists before updating its content
    const usernameDisplay = document.getElementById("player-username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = user.username;
    }

    // Update other elements as before
    const currentPlanetDisplay = document.getElementById(
      "player-current-planet"
    );
    if (currentPlanetDisplay) {
      currentPlanetDisplay.textContent = user.savedata.current_planet;
    }

    const levelDisplay = document.getElementById("player-level");
    if (levelDisplay) {
      levelDisplay.textContent = user.savedata.level;
    }

    const fuelDisplay = document.getElementById("player-fuel");
    if (fuelDisplay) {
      fuelDisplay.textContent = user.savedata.fuel;
    }

    const titleDisplay = document.getElementById("player-title");
    if (titleDisplay) {
      titleDisplay.textContent = user.savedata.title;
    }

    fetchDataForCurrentPlanet(user.savedata.current_planet);
  } else {
    // Redirect to login page if no session data
    window.location.href = "login.html";
  }
};

function logout() {
  // clear session data
  sessionStorage.removeItem("currentUser");
  // redirect to landing page
  window.location.href = "index.html";
}
