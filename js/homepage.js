window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  if (user) {
    /*
    const user = document.getElementById("username-display").textContent = user.username;
    const planet = document.getElementById("current-planet").textContent =
      user.savedata.current_planet;
    const level = document.getElementById("level").textContent = user.savedata.level;
    const fuel = document.getElementById("fuel").textContent = user.savedata.fuel;
    const title = document.getElementById("title").textContent = user.savedata.title;
*/
  } else {
    // if got no session data
    window.location.href = "login.html"; // Redirect to login page
  }
};

function typeWriter(element, text) {
  if (i === 0) {
    element.textContent = "";
  }

  element.textContent += text[i];

  if (i === text.length - 1) {
    return;
  }

  setTimeout(() => typeWriter(element, text, i++), 50);
}



