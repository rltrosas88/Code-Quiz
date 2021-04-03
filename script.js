var chosenQuestion;
var resultTimer = 1;
var gameTimer = 30;
var score = 0;
var gameOverFlag = false;
var playerHighScores = [];
var highScore;
var quizArray = [
    {
    question: "1",
    answer1: "1.",
    answer2: "2.",
    answer3: "3.",
    answer4: "4.",
    correctAnswer: "3."
    },
    {
    question: "2",
    answer1: "1.",
    answer2: "2.",
    answer3: "3.",
    answer4: "4.",
    correctAnswer: "4."
    },
    {
    question: "3",
    answer1: "1.",
    answer2: "2.",
    answer3: "3.",
    answer4: "4.",
    correctAnswer: "2."
    },
    {
    question: "4",
    answer1: "1.",
    answer2: "2.",
    answer3: "3.",
    answer4: "4.",
    correctAnswer: "4."
    },
    {
    question: "5",
    answer1: "1.",
    answer2: "2.",
    answer3: "3.",
    answer4: "4.",
    correctAnswer: "1."
    },
];
var showHighScoresButton = document.querySelector("#view-highscores");
var highScoresDiv = document.querySelector("#high-scores-div");
var eraseHighScoresButton = document.querySelector("#erase-highscores-button");
var startButtonTag = document.querySelector("#start-button");
var gameTimerTag = document.querySelector("#game-timer");
var questionText = document.querySelector("#question-text");
var answerText = document.querySelector("#answer-text");
var answer1Button = document.querySelector("#answer1-button");
var answer2Button = document.querySelector("#answer2-button");
var answer3Button = document.querySelector("#answer3-button");
var answer4Button = document.querySelector("#answer4-button");
var answerResult = document.querySelector("#answer-result");
var gameOverTag = document.querySelector("#game-over-tag");
var initialsLabel = document.querySelector("#initials-label");
var initialsInput = document.querySelector("#initials-input");
var intialsInputButton = document.querySelector("#initials-input-button");

function getHighScoresFromStorage() {
    var storedHighScores = JSON.parse(localStorage.getItem("highscores"));

    if (playerHighScores !== null) {
        playerHighScores = storedHighScores;
    }
    else {
        playerHighScores = [];
    }
};

function loadGame() {
    getHighScoresFromStorage();
    questionText.textContent = "Coding Quiz Challenge";
    answerText.textContent = "Try to answer the follwoing questions within the time"
    gameTimerTag.textContent = "Time: " + gameTimer;

    eraseHighScoresButton.style.display = "none";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
};

function clearScreen() {
    questionText.textContent = "";
    answer1Button.style.display = "none";
    answer2Button.style.display = "none";
    answer3Button.style.display = "none";
    answer4Button.style.display = "none";
    gameOverTag.textContent = "";
};

function enterInitials() {
    questionText.textContent = "All Done!";
    answerText.textContent = "Your final score is: " + score;

    initialsLabel.style.display = "inline";
    initialsInput.style.display = "inline";
    initialsInputButton.style.display = "inline";
};

function gameOver() {
    var displayGameOverTimer = 2;
    gameOVerFlag = true;

    gameTimer = 0;
    gameTimerTag.textContent = "Time: 0";
    gameOverTag.textContent = "Game Over!"

    Var gameOverInterval = setInterval(function() {
        displayGameOverTimer--;
        if(displayGameOverTimer === 0) {
            clearInterval(gameOverInterval);
            displayGameOverTimer = 3;
            clearScreen();
            enterInitials();
        }
    }, 1000);
};

function displayQuestions() {
    if (quizArray.length === 0) {
        gameOver();
    }
    else {
        var questionIndex = Math.floor(Math.random() * quizArray.length);

        showHighScoresButton.style.visibility = "hidden";
        chosenQuestion = quizArray[questionIndex];
        quizArray.splice(questionIndex, 1);
        questionText.textContent = chosenQuestion.question;
        answer1Button.style.display = "block";
        answer2Button.style.display = "block";
        answer3Button.style.display = "block";
        answer4Button.style.display = "block";
        answer1Button.textContent = chosenQuestion.answer1;
        answer2Button.textContent = chosenQuestion.answer2;
        answer3Button.textContent = chosenQuestion.answer3;
        answer4Button.textContent = chosenQuestion.answer4;
    }
};

function displayAnswerResult(correct) {
    if (correct) {
        answerResult.textContent = "Correct!";
    }
    else {
        answerResult.textContent = "Wrong!";
    }

    var timerInterval = setInterval(function() {
        resultTimer--;
        if (resultTimer === 0) {
            clearInterval(timerInterval);
            resultTimer = 1;
            answerResult.textContent = "";
            if (!gameOverFlag) {
                displayQuestions();
            }
        }
    }, 1000);
};

function startQuiz() {
    clearScreen();

    score = 0;

    var startButtonTag = document.querySelector("#start-button");
    eraseHighScoresButton.style.display = "none";
    startButtonTag.style.display = "none";

    initialsLabel.style.display = "none";
    initialsInput.style.display = "none";
    gameOverFlag = false;

    displayQuestions();
};

function startGameTimer() {
    var gameTimerInterval = setInterval(function() {
        gameTimerTag.textContent = "Time: " + gameTimer;
        gamerTimer--;

        if (gameTimer <= 0) {
            gameTimerTag.textContent = "Time: " + gameTimer;
            clearInterval(gameTimerInterval);
            if (!gameOverFlag) {
                gameOver();
            }
        }
    }, 1000);
};

function saveHighScore() {
    highScore = {
        playerIntials: initialsInput.value,
        playerScore: score
    }

    if (playerHighScores == null) {
        playerHighScores = [{playerIntials: initialsInput.value, playerScore: score}];
    }
    else {
        playerHighScores.push(highScore);
    }

    localStorage.setItem("highscores", JSON.stringify(playerHighScores));
};

function showHighScores() {
    highScoresDiv.style.display = "block";
    questionText.textContent = "High Scores";
    answerText.style.display = "none";
    showHighScoresButton.style.visibility = "hidden";

    var tb1 = document.createElement("table");
    var tb1Body = document.createElement("tbody");
    var row, cell1, cell2, cell1Text, cell2Text;

    if (playerHighScores != null) {
        for (i = 0; i < playerHighScores.length; i++) {
            row = document.createElement("tr");
            cell1 = document.createElement("td");
            cell1Text = document.createTextNode(playerHighScores[i].playerIntials);
            cell2 = document.createElement("td");
            cell2Text = document.createTextNode(playerHighScores[i].playerScore);
            
            cell1.appendChild(cell1Text);
            row.appendChild(cell1);
            cell2.appendChild(cell2Text);
            row.appendChild(cell2);
            tb1Body.appendChild(row);

            cell2.style.textAlign = "right";
            tb1.style.marginBottom = "20px";
        }
        tb1.appendChild(tb1Body);
        highScoresDiv.appendChild(tb1);
        cell1.style.columnWidth = "200px";
        cell2.style.columnWidth = "20px";
        tb1.style.fontSize = "20px";
        tb1.setAttribute("id", "highscore-table");
    }
    else if (document.querySelector("#high-scores-div").innerHTML != null) {
        document.querySelector("#high-scores-div").innerHTML = "";
    }

    eraseHighScoresButton.style.display = "block";

    startButtonTag.style.display = "block";
};