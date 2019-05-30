var Result = (function () {
    function Result() {
    }
    return Result;
}());
var Joke = (function () {
    function Joke() {
    }
    return Joke;
}());
window.onload = function () {
    var getRandJokeBtn = document.querySelector("main > button");
    getRandJokeBtn.onclick = getRandomJoke;
};
function getRandomJoke() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = handleRequestChange;
    var url = "http://api.icndb.com/jokes/random";
    request.open("GET", url);
    request.send();
}
function handleRequestChange() {
    var currRequest = this;
    console.log("ReadyState: " + currRequest.readyState);
    console.log("Status: " + currRequest.status);
    if (currRequest.readyState == 4 &&
        currRequest.status == 200) {
        var response = JSON.parse(currRequest.responseText);
        var newJoke = response.value;
        displayJoke(newJoke);
    }
}
function displayJoke(currJoke) {
    var idElement = document.querySelector("main > span");
    var jokeTextElem = document.querySelector("main > p:nth-of-type(1)");
    var categoriesElem = document.querySelector("main > p:nth-of-type(2)");
    idElement.innerText = currJoke.id.toString();
    jokeTextElem.innerText = currJoke.joke;
    categoriesElem.innerText = currJoke.categories.toString();
}
