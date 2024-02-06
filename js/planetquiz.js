const user = JSON.parse(sessionStorage.getItem("currentUser"));
let userfuel = user.savedata.fuel;
const quizPlanet = user.savedata.current_planet;

document.addEventListener("DOMContentLoaded", function () {
  // fetch quiz data for the current quiz planet
  fetch(
    `https://solarquest-5cd3.restdb.io/rest/quiz?q={"quiz-planet":"${quizPlanet}"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65c1fc8472864d1ddbdcc6bc",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((questions) => {
      // Display quiz questions
      displayQuizQuestions(questions);
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

  // display question
  const questionText = document.createElement("p");
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
  submitButton.className = "btn btn-primary";
  submitButton.addEventListener("click", () => submitAnswer(question));
  questionElement.appendChild(submitButton);

  quizQuestionsContainer.appendChild(questionElement);
}

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

  // prompt if correct or not
  alert(isCorrect ? "Correct!" : "Wrong!");

  // next question boom
  nextQuestion();
}

function getSelectedOptionIndex() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  return selectedOption ? parseInt(selectedOption.value) : undefined;
}

function nextQuestion() {
  currentQuestionIndex++;

  fetch(
    `https://solarquest-5cd3.restdb.io/rest/quiz?q={"quiz-planet":"${quizPlanet}"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65c1fc8472864d1ddbdcc6bc",
      },
    }
  )
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
}

function displayQuizResult() {
  const quizSection = document.getElementById("quiz-section");
  const resultSection = document.getElementById("result-section");

  // hide quiz
  quizSection.style.display = "none";

  // display result
  resultSection.style.display = "block";

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
    }
    return newPlanet;
  } else {
    // If the user doesn't have enough fuel, prompt and redirect
    displayQuizResult();
    alert("You don't have enough knowledge to proceed to the next planet!");
    window.location.href = "explore.html"; // Redirect to explore.html
    return;
  }
}

function fetchPlayer() {
  const newPlanet = planetCheck();

  // Log the newPlanet value to check if it's correct
  console.log("New Planet:", newPlanet);

  fetch(`https://solarquest-5cd3.restdb.io/rest/players/${user._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65c1fc8472864d1ddbdcc6bc",
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
  fetch(`https://solarquest-5cd3.restdb.io/rest/leaderboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65c1fc8472864d1ddbdcc6bc",
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
  fetch(
    `https://solarquest-5cd3.restdb.io/rest/leaderboard?q={"quiz_planet":"${quizPlanet}"}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65c1fc8472864d1ddbdcc6bc",
      },
    }
  )
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
  const leaderboardSection = document.getElementById("leaderboard-section");
  leaderboardSection.innerHTML = ""; // make sure its empty

  const leaderboardTitle = document.createElement("h2");
  leaderboardTitle.textContent = "Leaderboard";
  leaderboardSection.appendChild(leaderboardTitle);

  if (leaderboard.length > 0) {
    // sort the leaderboard array by number of correct answers higihest to low
    leaderboard.sort((a, b) => b.correct_answers - a.correct_answers);

    const leaderboardList = document.createElement("ul");
    leaderboard.forEach((entry, index) => {
      const leaderboardItem = document.createElement("li");
      leaderboardItem.textContent = `${index + 1}. ${
        entry.username
      } - Correct Answers: ${entry.correct_answers}/${currentQuestionIndex}`;
      leaderboardList.appendChild(leaderboardItem);
    });
    leaderboardSection.appendChild(leaderboardList);
  } else {
    const noDataMessage = document.createElement("p");
    noDataMessage.textContent = "No leaderboard data available.";
    leaderboardSection.appendChild(noDataMessage);
  }

  // Show the leaderboard section
  leaderboardSection.style.display = "block";
}
