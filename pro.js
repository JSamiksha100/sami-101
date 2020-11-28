
/* Global variables */

let SCORE;
let RAND_QUES;
let NUMS;

/*************************** */

const scoreBoard = document.querySelector('.score-board');
const scoreVal = document.getElementById('score');
const questionBox = document.querySelector('.question-box');
const optionBox = document.querySelector('.option-wrapper');
const playBtn = document.querySelector('.play-btn');
const exitBtn = document.querySelector('.exit-btn');

/******************************* */

const optionsBtns = document.querySelectorAll('.option-text'); // for all 4 option's text

const optionsSelection = document.querySelectorAll('#opt-btn');

/********************************* */


function playSetup(){
    SCORE = 0;
    RAND_QUES = -1;
    playBtn.style.display = "block";
    questionBox.style.display = "none";
    optionBox.style.display = "none";
    exitBtn.style.display = "none";
    scoreBoard.style.display = "none";
    NUMS = numArray(0, 9); // for 10 total questions
    
}


function startGame(){
    scoreVal.innerHTML = SCORE;
    questionBox.style.display = "block";
    optionBox.style.display = "flex";
    exitBtn.style.display = "block";
    scoreBoard.style.display = "block";
    question.quizPlay();
}

playBtn.addEventListener('click', function(){
    this.style.display = "none";
    startGame();
})

exitBtn.addEventListener('click', function(){
    playSetup();
})


/*********** Question Section  */

let questionColl = [];
let optionColl = [];
const answerColl = [2, 3, 1, 2, 4, 2, 1,3,4,2]; // correct answer of the following quiz questions

/*************** questions ****** */

questionColl[0] = "Which of the following type of variable is visible everywhere in your JavaScript code?";
optionColl[0] = {
    options: ['Local variable', 'None of the above', 'Global variable', 'Both of the above']
};

questionColl[1] = "Which of the following function of Number object forces a number to display in exponential notation? ";
optionColl[1] = {
    options: ['toFixed()', 'toPrecision()', 'toLocaleString()', 'toExponential()']
};

questionColl[2] = "Which of the following is a server-side Java Script object?";
optionColl[2] = {
    options: ['Function ', 'File', ' Date', ' FileUpload']
};

questionColl[3] = "Java script can be used for Storing the form's contents to a database file on the server";
optionColl[3] = {
    options: ['True', '', 'False', '']
};

questionColl[4] = "Which of the below is used in Java script to insert special characters?";
optionColl[4] = {
    options: ['&', ' -', '%', " ` "]
};

questionColl[5] = "Which company first developed the Java programming language?";
optionColl[5] = {
    options: ['Microsoft', 'Sun Microsystems', 'Google', 'IBM']
};

questionColl[6] = "To insert a JavaScript into an HTML page, which tag is used?";
optionColl[6] = {
    options: ['< script=’java’> ', '< script>', ' < javascript>', '< js>']
};

questionColl[7] = "Javascript was created in year?";
optionColl[7] = {
    options: ['1975 ', '1895', '1985 ', '1995']
};

questionColl[8] = "Who is the founder of JavaScript?";
optionColl[8] = {
    options: ['Steve Iris ', 'Steve Brendan', ' Brendan Iris', 'Brendan Eich']
};

questionColl[9] = "Which of the following is used to capture all click events in a window?";
optionColl[9] = {
    options: ['window.routeEvents(Event.CLICK ); ', 'window.handleEvents (Event.CLICK);', 'window.captureEvents(Event.CLICK); ', 'window.raiseEvents(Event.CLICK );']
};

/********** end of questions ***** */


let quizQuestion = function(question, optionList, correctAns){
    this.question = question;
    this.optionList = optionList;
    this.correctAns = correctAns;
}

let question = new quizQuestion(questionColl, optionColl, answerColl);

/****************************** */

/************ generate unique random numbers for unique questions */


function numArray(start, end){
    let numsList = [];
    for(let i = start; i <= end; i++){
        numsList.push(i);
    }
    return numsList;
}

function randValueGen(min, max){
    let temp = Math.random() * (max - min + 1);
    let result = Math.floor(temp) + min;
    return result;
}


/***************************** */

quizQuestion.prototype.quizPlay = function(){
    
    // To check if the questions are available or not

    if(NUMS.length === 0){
        document.getElementById('question').innerHTML = "You have completed the game.";
        optionBox.style.display = "none";
        return;
    }
    
    
    let randIndex = randValueGen(0, NUMS.length - 1);
    RAND_QUES = NUMS[randIndex];

    NUMS.splice(randIndex, 1);

    // for random question dispay in the question box
    document.getElementById('question').innerHTML = this.question[RAND_QUES];

    // for displaying the options for the above question
    this.optionList[RAND_QUES].options.forEach(function(option, idx){
        optionsBtns[idx].innerHTML = option;
    })
}

optionsSelection.forEach(function(optionSelected, index){
    /*
    optionSelected.addEventListener('click', function(){
        console.log(`${optionSelected} ${index}`);
    })
    */

    optionSelected.addEventListener('click', function(){

        // answer selected by user
        let userAns = parseInt(this.textContent) - 1; // as our indexing starts from 0

        // for preventing user to click multiple times and on multiple options

        optionsSelection.forEach(function(option){
            option.disabled = true;
        })

        question.checkAnswer(userAns);
    })

})

quizQuestion.prototype.checkAnswer = function(userAns){
    optionsSelection[userAns].style.background = "white";
    optionsSelection[userAns].style.color = "black";

    // correct answer from our data collection
    let correctAns = question.correctAns[RAND_QUES];
    if(userAns === correctAns){
        correctAnsUpdate();
    } else {
        incorrectAnsUpdate();
    }
} 

// for correct answer update 
function correctAnsUpdate(){
    document.getElementById('question').style.color = "gold";
    document.getElementById('question').innerHTML = "Correct!";
    SCORE++;
    scoreVal.innerHTML = SCORE;
    
    setTimeout(contdPlay, 1000);
}

// for incorrect answer update 
function incorrectAnsUpdate(){
    document.getElementById('question').style.color = "red";
    document.getElementById('question').innerHTML = "Incorrect!";

    setTimeout(contdPlay, 1000);
}

// for continuous play

function contdPlay(){
    
    optionsSelection.forEach(function(option){
        option.disabled = false; // re-enabling our disabled buttons
        option.style.background = "black";
        option.style.color = "white";
    })

    document.getElementById('question').style.color = "black"; // to make question color white again in case the previous answer was answered incorrectly

    question.quizPlay();
}


playSetup();

// Wrap every letter in a span
var textWrapp = document.querySelector('.ml6 .letters');
textWrapp.innerHTML = textWrapp.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });




  var sec = 60;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}
