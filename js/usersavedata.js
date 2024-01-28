window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    document.getElementById("player-username-display").textContent =
      user.username;
    document.getElementById("player-current-planet").textContent =
      user.savedata.current_planet;
    document.getElementById("player-level").textContent = user.savedata.level;
    document.getElementById("player-fuel").textContent = user.savedata.fuel;
    document.getElementById("player-title").textContent = user.savedata.title;
  } else {
    // if got no session data
    window.location.href = "login.html"; // Redirect to login page
  }
};
