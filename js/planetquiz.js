const link = `https://solarquest-7faa.restdb.io`;
const apikey = `65c48ac4e208c28a91545d88`;

const user = JSON.parse(sessionStorage.getItem("currentUser"));
let userfuel = user.savedata.fuel;
const quizPlanet = user.savedata.current_planet;

document.addEventListener("DOMContentLoaded", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const container = document.querySelector(".container");
  // fetch quiz data for the current quiz planet
  fetch(link + `/rest/quiz?q={"quiz-planet":"${quizPlanet}"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apikey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((questions) => {
      // Display quiz questions
      displayQuizQuestions(questions);
      loadingScreen.style.display = "none";
      container.style.display = "block"; /// last stopped
    })
    .catch((error) => {
      console.error("Error fetching quiz questions:", error);
    });
});

let currentQuestionIndex = 0;
let correctAnswersCount = 0;

function displayQuizQuestions(questions) {
  const quizSection = document.getElementById("quiz-section");
  const quizQuestionsContainer = document.getElementById("quiz-questions");

  // check if got questions for this current planet
  if (
    !Array.isArray(questions) ||
    questions.length === 0 ||
    !questions[0].questions
  ) {
    quizQuestionsContainer.innerHTML =
      "<p>No quiz questions available for this planet.</p>";
    return;
  }

  /// display first question
  displayQuestion(questions[0].questions[currentQuestionIndex]);
}

function displayQuestion(question) {
  const quizQuestionsContainer = document.getElementById("quiz-questions");
  quizQuestionsContainer.innerHTML = ""; // clear previus question

  const questionElement = document.createElement("div");
  questionElement.classList.add("quiz-question");

  if (currentQuestionIndex >= 0) {
    console.log("Sending message to parent window:", {
      currentQuestionIndex: currentQuestionIndex,
    });
    window.parent.postMessage(
      { currentQuestionIndex: currentQuestionIndex },
      "*"
    );
  }

  // display question
  const questionText = document.createElement("h1");
  questionText.textContent = question.question;
  questionElement.appendChild(questionText);

  // display answer options
  const answerOptions = document.createElement("ul");

  let div = null;
  for (let i = 0; i < question.answers.length; i++) {
    if (i === 0 || i === 2) {
      div = document.createElement("div");
      if (i === 0) {
        div.className = "col" + "1";
      } else {
        div.className = "col" + "2";
      }
    }
    // optionItem.appendChild(div);

    // const optionItem = document.createElement("li");
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "answer";
    radioBtn.className = "btn-check";
    radioBtn.value = i;
    radioBtn.autocomplete = "off";
    radioBtn.setAttribute("id", "option" + i);
    div.appendChild(radioBtn);

    const label = document.createElement("label");
    label.className = "btn";
    label.setAttribute("for", "option" + i);
    label.textContent = question.answers[i];
    div.appendChild(label);

    if (i === 0 || i === 2) {
      answerOptions.appendChild(div);
    }
  }

  // question.answers.forEach((answer, optionIndex) => {
  //   const optionItem = document.createElement("li");
  //   const radioBtn = document.createElement("input");
  //   radioBtn.type = "radio";
  //   radioBtn.name = "answer";
  //   radioBtn.value = optionIndex;
  //   optionItem.appendChild(radioBtn);

  //   const label = document.createElement("label");
  //   label.textContent = answer;
  //   optionItem.appendChild(label);

  //   answerOptions.appendChild(optionItem);
  // });
  questionElement.appendChild(answerOptions);

  // add submit answer for every question
  const submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.textContent = "Submit Answer";
  submitButton.className = "quiz-submitButton";
  submitButton.addEventListener("click", () => submitAnswer(question));
  questionElement.appendChild(submitButton);

  quizQuestionsContainer.appendChild(questionElement);
}

let isCorrectArray = []; // Array to store isCorrect values for each question

function submitAnswer(question) {
  const selectedOptionIndex = getSelectedOptionIndex();

  // check if got answer or na
  if (selectedOptionIndex === undefined) {
    alert("Please select an answer before submitting.");
    return;
  }

  // store selected answers if dont have any answer in the array
  if (!user.quizAnswers) {
    user.quizAnswers = [];
  }

  // update answer for the current question
  user.quizAnswers[currentQuestionIndex] = selectedOptionIndex;

  // save the new user data to sessionstorage
  sessionStorage.setItem("currentUser", JSON.stringify(user));

  // check if the selected answer is correct
  const isCorrect = selectedOptionIndex === question["correct-answer"];

  // add count to answerscount if answer is correct
  if (isCorrect) {
    correctAnswersCount++;
    userfuel++;
    console.log(correctAnswersCount);
    console.log(userfuel);
  }

  isCorrectArray[currentQuestionIndex] = isCorrect;

  console.log("1ending message to parent window:", {
    isCorrect: isCorrect,
  });

  // Send current question index and isCorrect value to parent window
  window.parent.postMessage(
    {
      isCorrect: isCorrect,
    },
    "*"
  );

  console.log("2Sending message to parent window:", {
    isCorrect: isCorrect,
  });

  // next question boom
  nextQuestion();
}

function getSelectedOptionIndex() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  return selectedOption ? parseInt(selectedOption.value) : undefined;
}

function nextQuestion() {
  currentQuestionIndex++;

  setTimeout(() => {
    fetch(link + `/rest/quiz?q={"quiz-planet":"${quizPlanet}"}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apikey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((questions) => {
        if (currentQuestionIndex < questions[0].questions.length) {
          // if less than number of questions
          // show next questoin
          displayQuestion(questions[0].questions[currentQuestionIndex]);
        } else {
          // show result after player finished all questions
          displayQuizResult();
          submitQuiz();
        }
      })
      .catch((error) => {
        console.error("Error fetching quiz questions:", error);
      });
  }, 1500); // Adjust the delay as needed (3000 milliseconds = 3 seconds)
}

function displayQuizResult() {
  document.querySelector(".container h1").style.display = "none";
  const quizSection = document.getElementById("quiz-section");
  const resultSection = document.getElementById("result-section");

  // hide quiz
  quizSection.style.display = "none";

  // display result
  resultSection.style.display = "flex";

  // update on document the number of correct ansers
  const correctCountElement = document.getElementById("correct-count");
  correctCountElement.textContent = correctAnswersCount;
  const totalQuestions = document.getElementById("questions-count");
  totalQuestions.textContent = currentQuestionIndex;
}
function planetCheck() {
  let newPlanet = quizPlanet;
  const planets = [
    "earth", // level 1
    "venus", // level 2
    "mercury", // level 3
    "mars", // level 4
    "jupiter", // level 5
    "saturn", // level 6
    "uranus", // level 7
    "neptune", // level 8
  ];
  // Check if the user has enough fuel (at least 2) to change the planet
  if (userfuel >= 2) {
    // Change the user's current planet to the next one

    const newPlanetIndex = planets.indexOf(newPlanet);
    if (newPlanetIndex < planets.length - 1) {
      newPlanet = planets[newPlanetIndex + 1];
      console.log(newPlanet);
    } else {
      // If the user is already on the last planet, go back to the first one (loop)
      currentPlanet = planets[0];
      sessionStorage.setItem("currentUser", JSON.stringify(user));
    }
    return newPlanet;
  } else {
    // If the user doesn't have enough fuel, prompt and redirect
    displayQuizResult();
    alert("You don't have enough knowledge to proceed to the next planet!");
    window.parent.location.href = "class.html"; // Redirect to explore.html
    return;
  }
}

function fetchPlayer() {
  const newPlanet = planetCheck();

  // Log the newPlanet value to check if it's correct
  console.log("New Planet:", newPlanet);

  fetch(link + `/rest/players/${user._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apikey,
    },
    body: JSON.stringify({
      _id: user._id,
      password: user.password,
      username: user.username,
      savedata: {
        current_planet: newPlanet,
        level: 1,
        fuel: 20,
        title: "Space Cadet",
      },
      creationdate: user.creationdate,
    }),
  })
    .then((response) => response.json())
    .then((updatedPlayer) => {
      // Handle the response if needed
      console.log("Player updated:", updatedPlayer);

      // Update user's data in-memory
      user.savedata.current_planet = newPlanet;
      user.savedata.fuel = 0;

      // Save the updated user data to sessionStorage
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      // Use updatedPlayer to access the updated data
      console.log("User new planet", updatedPlayer.savedata.current_planet);
      console.log("User new fuel", updatedPlayer.savedata.fuel);
    })
    .catch((error) => console.error("Error updating player:", error));
}

function submitQuiz() {
  planetCheck();
  // Prepare data for leaderboard post
  const leaderboardData = {
    username: user.username,
    correct_answers: correctAnswersCount,
    quiz_planet: quizPlanet,
  };

  console.log("Leaderboard Data:", leaderboardData); // Log the data to the console

  // Post results to the leaderboard
  fetch(link + `/rest/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apikey,
    },
    body: JSON.stringify(leaderboardData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(() => {
      // after posting to leaderboard, fetch and display the leaderboard
      fetchLeaderboard();
      fetchPlayer();
    })
    .catch((error) => {
      // log error
      console.error("Error posting to leaderboard:", error);
    });
}

function fetchLeaderboard() {
  // fetch leaderboard data
  fetch(link + `/rest/leaderboard?q={"quiz_planet":"${quizPlanet}"}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": apikey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((leaderboard) => {
      // display leaderboard
      displayLeaderboard(leaderboard);
    })
    .catch((error) => {
      console.error("Error fetching leaderboard:", error);
    });
}

function displayLeaderboard(leaderboard) {
  //document.querySelector(".container h1").style.display = "none";
  const leaderboardSection = document.getElementById("leaderboard-section");
  leaderboardSection.innerHTML = ""; // make sure its empty

  const leaderboardTitle = document.createElement("h2");
  leaderboardTitle.textContent = "Leaderboard";
  leaderboardSection.appendChild(leaderboardTitle);

  //h2
  //leader container
  //  div title
  //      3 divs/p
  //  div player 1
  //      3 divs/p
  //create leader container
  // const leader_container = document.createElement("div");
  // leader_container.className = "leader-container";

  // const title_container = document.createElement("div");
  // title_container.className = "title_container";

  // const ranking = document.createElement("div");
  // const name = document.createElement("div");
  // const correct = document.createElement("div");

  // title_container.appendChild(ranking);
  // title_container.appendChild(name);
  // title_container.appendChild(correct);

  // ranking.className = "Ranking";
  // name.className = "Name";
  // correct.className = "Correct Answers";
  const thead = document.createElement("thead");
  const toprow = document.createElement("tr");

  const r_title = document.createElement("th");
  const n_title = document.createElement("th");
  const c_title = document.createElement("th");

  r_title.scope = "col";
  n_title.scope = "col";
  c_title.scope = "col";
  r_title.innerHTML = "Ranking";
  n_title.innerHTML = "Name";
  c_title.innerHTML = "Coins";

  toprow.appendChild(r_title);
  toprow.appendChild(n_title);
  toprow.appendChild(c_title);

  thead.appendChild(toprow);
  leaderboardSection.appendChild(thead);

  const tbody = document.createElement("tbody");
  if (leaderboard.length > 0) {
    // sort the leaderboard array by number of correct answers higihest to low
    leaderboard.sort((a, b) => b.correct_answers - a.correct_answers);

    //const leaderboardList = document.createElement("ul");

    leaderboard.forEach((entry, index) => {
      let player_container = document.createElement("tr");
      let number = index + 1;
      //player_container.className = "player" + number;

      let ranking_value = document.createElement("th");
      ranking_value.scope = "row";
      let name_value = document.createElement("td");
      let correct_value = document.createElement("td");

      ranking_value.innerHTML = number;
      name_value.innerHTML = entry.username;
      correct_value.innerHTML = entry.correct_answers;

      player_container.appendChild(ranking_value);
      player_container.appendChild(name_value);
      player_container.appendChild(correct_value);

      tbody.appendChild(player_container);
      //const leaderboardItem = document.createElement("li");
      // leaderboardItem.textContent = `${index + 1}. ${
      //   entry.username
      // } - Correct Answers: ${entry.correct_answers}/${currentQuestionIndex}`;
      // leaderboardList.appendChild(leaderboardItem);
    });
    //leaderboardSection.appendChild(leaderboardList);
  } else {
    const noDataMessage = document.createElement("p");
    noDataMessage.textContent = "No leaderboard data available.";
    leaderboardSection.appendChild(noDataMessage);
  }

  leaderboardSection.appendChild(tbody);

  // Show the leaderboard section
  leaderboardSection.style.display = "flex";
}
