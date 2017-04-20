var time = 30;
var roundTimer;
var transitionTimeOut;
var timeoutCounter = 0;
var questionIndex = 0;
var score = 0;
var triviaArr = [
	{
		question: 'q1',
		answer: 'a1',
		choices: ['a1','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q2',
		answer: 'a2',
		choices: ['a2','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q3',
		answer: 'a3',
		choices: ['a3','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q4',
		answer: 'a4',
		choices: ['a4','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q5',
		answer: 'a5',
		choices: ['a5','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q6',
		answer: 'a6',
		choices: ['a6','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q7',
		answer: 'a7',
		choices: ['a7','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q8',
		answer: 'a8',
		choices: ['a8','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q9',
		answer: 'a9',
		choices: ['a9','c2','c3','c4'],
		bg: 'img.png'
	}, {
		question: 'q10',
		answer: 'a10',
		choices: ['a10','c2','c3','c4'],
		bg: 'img.png'
	},
];

//Fisher-Yates/Don Knuth shuffle algorithm
Array.prototype.shuffle = function(){
	var input = this;
	for(var i = input.length -1;i>=0;i--){
		var randomIndex = Math.floor(Math.random()*(i+1));
		var itemAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
};

//Shuffle questions & choices
function shuffleChoices () {
	for(i=0;i<triviaArr.length;i++){
		triviaArr[i].choices.shuffle();
	}
};
// triviaArr.shuffle();
// shuffleChoices();

//timer
function timer () {
	$(".show-timer").html('<span class="timer">Time left: ' + time + ' seconds!</span>');

	roundTimer = setInterval(decrement, 1000)
};
function decrement() {
	time--;
	$(".show-timer").html('<span class="timer">Time left: ' + time + ' seconds!</span>');
	if (time === 0) {
		stop();
		timeoutCounter ++;
		console.log("Time Up!");

	}
};
function stop() {
	clearInterval(roundTimer);
};

//reset
function reset() {
	time = 30;
	score = 0;
	timeoutCounter = 0;
	triviaArr.shuffle();
	shuffleChoices();
	stop();
	timer();
};

//clear appends
function clearAppends() {
	$('.choices').remove();
	$('.question').remove();
	// $('.trivia-bottom').remove();
}

//resets to next question
function nextQuestion(){
	clearAppends();
	appendQuestion();
	appendChoices();
	time = 30;
};

//append question
function appendQuestion (){
	var question = $('<div class="col-lg-12 question">');
	question.text('Question: ' + triviaArr[questionIndex].question);
	$('.trivia-question').prepend(question);
};

//append choices
function appendChoices(){
	for(i=0;i<triviaArr[questionIndex].choices.length;i++) {
		var choices = $('<div class="col-lg-12 choices">');
		choices.html(triviaArr[questionIndex].choices[i]);
		$('.trivia-question').append(choices);
	};
	$('.choices').on('click',function() {
		var currentGuess = $(this);
		guessChecker(currentGuess);
		});
};

//guess/time checker
function guessChecker(currentGuess){
	if(triviaArr[questionIndex].answer == currentGuess.html()) {
		console.log('correct answer');
		transition('You are correct! The answer is: ' + triviaArr[questionIndex].answer);
	} else {
		transition('Sorry! That is not the correct answer.. The correct answer is: ' + triviaArr[questionIndex].answer);
	}
};

function transtionTimer (){
	var transitionTimeOut = setTimeout(nextQuestion,3000)
};

function transition(outcome){
	transtionTimer();
	clearAppends();
	$('.trivia-bottom').html(outcome);
	if(questionIndex == triviaArr.length) {
		console.log('You answered ' + score + ' questions correctly!');
	} else {
		questionIndex ++;
	}
};

function startGame(){
	reset();
	nextQuestion();
}
startGame();
