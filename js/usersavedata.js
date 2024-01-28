window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    // Check if the element exists before updating its content
    const usernameDisplay = document.getElementById("player-username-display");
    if (usernameDisplay) {
      usernameDisplay.textContent = user.username;
    }

    // Update other elements as before
    document.getElementById("player-current-planet").textContent =
      user.savedata.current_planet;
    document.getElementById("player-level").textContent = user.savedata.level;
    document.getElementById("player-fuel").textContent = user.savedata.fuel;
    document.getElementById("player-title").textContent = user.savedata.title;
    fetchDataForCurrentPlanet(user.savedata.current_planet);
  } else {
    // Redirect to login page if no session data
    window.location.href = "login.html";
  }
};

function logout() {
  // Clear session data
  sessionStorage.removeItem("currentUser");

  // Redirect to login page
  window.location.href = "login.html";
}
