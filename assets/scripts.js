var startPageEl = document.querySelector("#startPage");
var questionPageEl = document.querySelector("#questionPage");
var endgamePageEl = document.querySelector("#endgamePage");
var scorecardPageEl = document.querySelector("#scorecardPage");
var goToHighscoresEl = document.querySelector("#highscores");
var returnToStartEl = document.querySelector("#returnToStart");
var timerEl = document.querySelector("#timer")
var startQuizEl = document.querySelector("#startQuiz")
var submitScoreEl = document.querySelector("#submitScore");
var checkAnswerEl = document.querySelector("#checkAnswer");
var questionTextEl = document.querySelector("#question");
var answerTextEl = document.querySelectorAll(".answer"); //select all and access indivdually to populate answer fields

var highScores = document.querySelector("#highscores");

//variable to log what should be visible at the current time
var activePage = startPageEl;

var leaderboard = [];
var questions =[
    {question:"Q1: Data in an array is stored in...?", answer1: "Elements", answer2: "Compounds", answer3: "Solutions", answer4: "Boxes", actualAnswer: "answer1"},
    {question:"Q2: If we want to apply the same style to a group of html elements we would use...?", answer1: "ID", answer2: "A Class", answer3: "A Variable", answer4: "The DOM", actualAnswer: "answer2"},
    {question:"Q3: If we wanted to perform the same action multiple times we can use...?", answer1: "An Array", answer2: "An Object", answer3: "A Loop", answer4: "Logical Operators", actualAnswer: "answer3"},
    {question:"Q4: The body tag is used to contain...?", answer1: "The content of the page", answer2: "The links to external CSS", answer3: "The value of any variables", answer4: "An If... Else statement", actualAnswer: "answer1"},
    {question:"Q5: If we want to look at the code in the browers we right click and select...?", answer1: "Lookout", answer2: "Police", answer3: "Detect", answer4: "Inspect", actualAnswer: "answer4"},
    {question:"Q6: Which of the following is not a data type in Javascript?", answer1: "Object", answer2: "Long", answer3: "Undefined", answer4: "Number", actualAnswer: "answer2"},
    {question:"Q7: Which company developed Javascript?", answer1: "Google", answer2: "Facebook", answer3: "Starbucks", answer4: "Netscape", actualAnswer: "answer4"},
    {question:"Q8: How do we access an element of an array?", answer1: "arrayName.elementNumber", answer2: "arrayName[elementNumber]", answer3: "arrayName,elementNumber", answer4: "arrayName + elementNumber", actualAnswer: "answer2"},
    {question:"Q9: What is the latest version of CSS?", answer1: "CSS1", answer2: "CSS4", answer3: "CSS2", answer4: "CSS3", actualAnswer: "answer4"},
    {question:"Q10: main, header, and footer are examples of...?", answer1: "Semantic HTML elements", answer2: "Element IDs", answer3: "Inline elements", answer4: "Element classes", actualAnswer: "answer1"}];

var secondsLeft = 75;
var playerScore = 0;
var questionNumber = 0;



//function to update the display
function changeDisplay(currentPage, destinationPage){
    currentPage.setAttribute("style", "display: none;");
    destinationPage.setAttribute("style", "display: flex;");
    //update our active page
    activePage = destinationPage;
}

//function to update the scores on local storrage
function storeScore(initials, currentScore){
    var submission = {
        name: initials.trim(),
        score: currentScore
    };
    //check if we have anything in local storage
    if(localStorage.getItem("leaderboard") === null){
        leaderboard[0] = submission;
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }else{
        leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
        leaderboard[leaderboard.length] = submission;
        
        //sorts the leaderboard from highest to lowest score
        leaderboard.sort(function(a, b){
            return b.score - a.score;
        });

        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
}


//print the leaderboard
function populateLeaderboard(){
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    //print our leaderboard
    for(i = 0; i < leaderboard.length; i++){
        var content = leaderboard[i];
        var li = document.createElement("li");
        li.textContent = content.name + ": " + content.score;
        highScores.appendChild(li);
    }
}

function changeQuestion(){
    questionTextEl.innerHTML = questions[questionNumber].question;
    answerTextEl[0].innerHTML = questions[questionNumber].answer1;
    answerTextEl[1].innerHTML = questions[questionNumber].answer2;
    answerTextEl[2].innerHTML = questions[questionNumber].answer3;
    answerTextEl[3].innerHTML = questions[questionNumber].answer4;
}



//event listeners
startQuizEl.addEventListener("click", function(event){
    event.preventDefault();
    changeDisplay(startPageEl, questionPageEl);
    startGame();
    changeQuestion();
})


submitScoreEl.addEventListener("click", function(event){
    event.preventDefault();
    //Variable stored locally to refresh on click
    var initials = document.querySelector('#initials').value;
    if(initials === ""){
        confirm("You have not entered your initials. Please enter these to submit your score.");
        return;
    }else{
        storeScore(initials, playerScore);
        changeDisplay(endgamePageEl, scorecardPageEl);
        populateLeaderboard();
    }
});


goToHighscoresEl.addEventListener("click",function(event){
    event.preventDefault();
    changeDisplay(activePage, scorecardPageEl);
})

returnToStartEl.addEventListener("click",function(event){
    event.preventDefault();
    changeDisplay(activePage, startPageEl);
})


//our timer 
function startGame(){
    secondsLeft = 75;
    playerScore = 0;
    questionNumber = 0;

    var timerInterval = setInterval(function(){
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        
        if(secondsLeft <= 0){
            clearInterval(timerInterval);
            changeDisplay(activePage, endgamePageEl);

        }
        console.log(secondsLeft);
    },1000)
}

function checkAnswer(playerAnswer){
    if(playerAnswer === questions[questionNumber].actualAnswer){
        if(questionNumber === 9){
            secondsLeft = 0;
            playerScore++;
        }else{        
            playerScore++;
            questionNumber++;
            changeQuestion();
            checkAnswerEl.innerHTML = "Correct!";
        }
    }else{
        checkAnswerEl.innerHTML = "Incorrect!";
        secondsLeft = secondsLeft - 10;
    }
}


questionPageEl.addEventListener("click",function(event){
    event.preventDefault();
    var element = event.target;

    if (element.matches("li")){
        var state = element.getAttribute("data-answer");
        console.log(state);
        checkAnswer(state);
    }

})