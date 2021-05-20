var questions = [
    {
        title: "Which of these languages have we not used up this point?",
        choices: ["JavaScript", "HTML", "PYTHON", "CSS"],
        answer: "PYTHON"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Coding Style Sheets", "Cascading Style Source", "Nothing at all"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "Which of these is not a git command we have learned?",
        choices: ["git add", "git pull", "git copy", "git clone"],
        answer: "git copy"
    },
    {
        title: "What is not a resource for this bootcamp?",
        choices: ["google", "bootcampspot", "gitlab", "all are resources"],
        answer: "all are resources"
    },
    {
        title: "In an array what is the correct number to identify the second item?",
        choices: ["0", "1", "2", "none of the above"],
        answer: "1"
    },

];
// Declare more variables
var score = 0;
var questionIndex = 0;

var timeNow = document.querySelector("#timeNow");
var timeClock = document.querySelector("#startTime");
var questionBox = document.querySelector("#questionBox");
var container = document.querySelector("#container");

var timeRemains = 76;

var interval = 0;

var penalty = 10;

var createUl = document.createElement("ul");


timeClock.addEventListener("click", function () {
 
    if (interval === 0) {
        interval = setInterval(function () {
            timeRemains--;
            timeNow.textContent = "Time: " + timeRemains;

            if (timeRemains <= 0) {
                clearInterval(interval);
                allDone();
                timeNow.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});


function render(questionIndex) {
  
    questionBox.innerHTML = "";
    createUl.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionBox.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionBox.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            timeRemains = timeRemains - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }

    questionIndex++;

    if (questionIndex >= questions.length) {
  
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionBox.appendChild(createDiv);

}

function allDone() {
    questionBox.innerHTML = "";
    timeNow.innerHTML = "";


    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionBox.appendChild(createH1);


    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionBox.appendChild(createP);

 
    if (timeRemains >= 0) {
        var timeRemaining = timeRemains;
        var createP2 = document.createElement("p");
        clearInterval(interval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionBox.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionBox.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionBox.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionBox.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./index2.html");
        }
    });

}