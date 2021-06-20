var startPage = document.querySelector("#startPage");
var questionPage = document.querySelector("#questionPage");
var endgamePage = document.querySelector("#endgamePage");
var scorecardPage = document.querySelector("#scorecardPage");

//variable to log what should be visible at the current time
var activePage = startPage;
var leaderboard = []








//function to update the display
function changeDisplay(currentPage, destinationPage){
    currentPage.setAttribute("style", "display: none;");
    destinationPage.setAttribute("style", "display: flex;");
    //update our active page
    activePage = destinationPage;
}

//function to update the scores on local storrage
function submitScore(initials, currentScore){
    var submission = {
        name: initials.trim(),
        score: currentScore
    };
    //check if we ahve anything in local storage
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