
/**
 * Represents the result from the chuck norris api.
 */
class Result {
    type:string;
    value:Joke; //Composition
}

/**
 * Represents a single joke/quote.
 */
class Joke{
    id:number;
    /**
     * The text of the joke.
     */
    joke:string;
    categories:Array<string>;
}





window.onload = function(){
    let getRandJokeBtn = <HTMLElement>document.querySelector("main > button");
    getRandJokeBtn.onclick = getRandomJoke;
}

/**
 * Gets a ransom joke from the ICNDB.com service
 */
function getRandomJoke(){
    //create request object
    let request = new XMLHttpRequest();

    //every time readystate is changed, this function is called 
    request.onreadystatechange = handleRequestChange;

    //prepare request
    let url = "http://api.icndb.com/jokes/random";
    request.open("GET", url); //get is essentially SELECT 

    //send request
    request.send();
}

/**
 * Fires every time the ready state property is changed. 
 * https://www.w3schools.com/js/js_ajax_http.asp
 */
function handleRequestChange(){
    let currRequest = <XMLHttpRequest>this;
    console.log("ReadyState: " + currRequest.readyState);
    console.log("Status: " + currRequest.status);

    //when processing is done and response/data is ready
    if(currRequest.readyState == 4 && 
       currRequest.status == 200){
        let response = <Result>JSON.parse(currRequest.responseText);
        let newJoke = response.value;
        displayJoke(newJoke);
    }
}

/**
 * Displays a joke on the webpage.
 * @param currJoke Joke to be displayed.
 */
function displayJoke(currJoke:Joke):void{
    let idElement = <HTMLElement>document.querySelector("main > span");
    // Get the first child paragraph in main
    // www.w3schools.com   ---- nth of type
    let jokeTextElem = <HTMLElement>document.querySelector("main > p:nth-of-type(1)");

    // Get the second child paragraph in main
    let categoriesElem = <HTMLElement>document.querySelector("main > p:nth-of-type(2)");

    idElement.innerText = currJoke.id.toString();
    jokeTextElem.innerText = currJoke.joke;
    categoriesElem.innerText = currJoke.categories.toString();
}