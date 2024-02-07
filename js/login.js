// login form

const link = `https://solarquest-cd0c.restdb.io`;
const apikey = `65c3d16c8fe3ef61a17a32f1`;

document.getElementById("login-button").addEventListener("click", function () {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  fetch(link + `/rest/players`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apikey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let user = data.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        document.getElementById("login-message").textContent =
          "Login Successful!";
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        window.parent.location.href = "class.html";
      } else {
        document.getElementById("login-message").textContent =
          "Invalid credentials!";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("login-message").textContent =
        "Login failed due to an error.";
    });
});

// registration form
document
  .getElementById("register-button")
  .addEventListener("click", function () {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username === "" || password === "") {
      document.getElementById("register-message").textContent =
        "Username and password are required!";
      return;
    }
    // user data
    const newUser = {
      username: username,
      password: password,
      savedata: {
        current_planet: "earth",
        level: 1,
        fuel: 0,
        title: "Space Cadet",
      },
      creationdate: new Date().toISOString(), // current date and time
    };

    fetch(link + `/rest/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apikey,
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("register-message").textContent =
            "Registration successful!";
        } else {
          throw new Error("Registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("register-message").textContent =
          "Registration failed!";
      });
  });

// toggle between registration and login form
function showRegistration() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("registration-form").style.display = "block";
}

function showLogin() {
  document.getElementById("registration-form").style.display = "none";
  document.getElementById("login-form").style.display = "block";
}
