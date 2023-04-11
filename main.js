// Array Of Words
const words = [
    "Hello",
    "Programming",
    "Code",
    "Javascript",
    "Town",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Scala",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing"
];
//setting lvls
const lvls = {
    "Easy": 5,
    "Normal":3,
    "Hard":2
};

//default level
let defultLevel = "Normal";
let defultLevelSec = lvls[defultLevel];

//catch selector
let startButtom = document.querySelector(".start");
let lvlNamespan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total"); 
let finishMessage = document.querySelector(".finish");

//setting level name + secends + score
lvlNamespan.innerHTML = defultLevel;
secondsSpan.innerHTML = defultLevelSec;
timeLeftSpan.innerHTML = defultLevelSec;
scoreTotal.innerHTML = words.length;

//disable paste event
input.onpaste = function () {
    return false;
}

//start game
startButtom.onclick = function () {
    this.remove();
    input.focus();
    //generate word function
    genWords();
    timeLeftSpan.innerHTML = defultLevelSec + 3;
}
function genWords() {
    //get random word from array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    //get word index
    let wordIndex = words.indexOf(randomWord);
    //remove word from array
    words.splice(wordIndex, 1);
    //show the random word
    theWord.innerHTML = randomWord;
    //empty upcoming word
    upcomingWords.innerHTML = '';
    //generate words
    for(let i = 0; i<words.length; i++) {
        //create Div element
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcomingWords.appendChild(div);
    }
    //start play function
    startPlay();
}

function startPlay() {
    timeLeftSpan.innerHTML = defultLevelSec;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML == "0") {
            //stop timer
            clearInterval(start);
            //compare words
            if (theWord.innerHTML.toLocaleLowerCase() === input.value.toLocaleLowerCase()) {
                //empty input field
                input.value = '';
                //increase score 
                scoreGot.innerHTML++;
                if (words.length>0) {
                    //call generate function
                    genWords()
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    let spanText = document.createTextNode("Perfect");
                    span.appendChild(spanText);
                    finishMessage.appendChild(span);
                    //remove upcoming words box
                    upcomingWords.remove();
                }
            } else{
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000)
}