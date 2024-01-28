document.addEventListener("DOMContentLoaded", function () {
  // get user save data and its current planet
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const currentPlanet = user.savedata.current_planet;

  // fetch quiz data for the current planet
  fetch(
    `https://solarquest-81a1.restdb.io/rest/quiz?quiz-planet=${currentPlanet}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65ab680be8b7cbe259ce52fd",
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
  question.answers.forEach((answer, optionIndex) => {
    const optionItem = document.createElement("li");
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = "answer";
    radioBtn.value = optionIndex;
    optionItem.appendChild(radioBtn);

    const label = document.createElement("label");
    label.textContent = answer;
    optionItem.appendChild(label);

    answerOptions.appendChild(optionItem);
  });
  questionElement.appendChild(answerOptions);

  // add submit answer for every question
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Answer";
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

  const user = JSON.parse(sessionStorage.getItem("currentUser"));

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

  // get quiz questions for planet rn
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const currentPlanet = user.savedata.current_planet;

  fetch(
    `https://solarquest-81a1.restdb.io/rest/quiz?quiz-planet=${currentPlanet}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65ab680be8b7cbe259ce52fd",
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
}

function submitQuiz() {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const currentPlanet = user.savedata.current_planet;

  const leaderboardData = {
    username: user.username,
    correct_answers: correctAnswersCount,
    quiz_planet: currentPlanet,
  };

  // post results to the leaderboard
  fetch("https://solarquest-81a1.restdb.io/rest/leaderboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65ab680be8b7cbe259ce52fd",
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
      // fetch and display leaderboard after post
      fetchLeaderboard();
    });
}

function fetchLeaderboard() {
  // fetch leaderboard data
  fetch("https://solarquest-81a1.restdb.io/rest/leaderboard", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-apikey": "65ab680be8b7cbe259ce52fd",
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
      } - Correct Answers: ${entry.correct_answers}`;
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
