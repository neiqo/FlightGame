window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    document.getElementById("username-display").textContent = user.username;
    document.getElementById("current-planet").textContent =
      user.savedata.current_planet;
    document.getElementById("level").textContent = user.savedata.level;
    document.getElementById("fuel").textContent = user.savedata.fuel;
    document.getElementById("title").textContent = user.savedata.title;
  } else {
    // if got no session data
    window.location.href = "login.html"; // Redirect to login page
  }
};
