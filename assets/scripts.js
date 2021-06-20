var startPage = document.querySelector("#startPage");
var questionPage = document.querySelector("#questionPage");
var endgamePage = document.querySelector("#endgamePage");
var scorecardPage = document.querySelector("#scorecardPage");

//variable to log what should be visible at the current time
var activePage = startPage;







//function to update the display
function changeDisplay(currentPage, destinationPage){
    currentPage.setAttribute("style", "display: none;");
    destinationPage.setAttribute("style", "display: flex;");
    //update our active page
    activePage = destinationPage;
}