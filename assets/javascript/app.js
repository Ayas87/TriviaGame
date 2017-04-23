var time;
var roundTimer;
var transitionTimeOut;
var timeoutCounter = 0;
var questionIndex = 0;
var score = 0;
var triviaArr = [
	{
		question: 'What dog was bred to hunt badgers?',
		answer: 'Dachshund',
		choices: ['Dachshund','Afghan Hound','German Pinscher','German Shepherd Dog'],
		bg: 'img.png'
	}, {
		question: 'What dog hunts lions?',
		answer: 'Rhodesian Ridgeback',
		choices: ['Rhodesian Ridgeback','Mastiff','Maltese','French Bulldog'],
		bg: 'img.png'
	}, {
		question: 'What dog was not bred to heard cattle?',
		answer: 'Pitbull',
		choices: ['Pitbull','Australian Shepherd','Welsh Corgi','Bearded Collie'],
		bg: 'img.png'
	}, {
		question: 'Which dog was a popular courier during World War I?',
		answer: 'Airedale Terrier',
		choices: ['Airedale Terrier','German Shepherd','Chihuahua','American Bandogge'],
		bg: 'img.png'
	}, {
		question: 'How many teeth does an average adult dog have?',
		answer: '42',
		choices: ['42','32','18','26'],
		bg: 'img.png'
	}, {
		question: 'What is the tallest dog breed?',
		answer: 'Irish Wolfhound',
		choices: ['Irish Wolfhound','Great Dane','Mastiff','Bernese Mountain Dog'],
		bg: 'img.png'
	}, {
		question: 'What color are dogs not able to see?',
		answer: 'Red',
		choices: ['Red','Green','Blue','Yellow'],
		bg: 'img.png'
	}, {
		question: 'What is the heaviest breed of dog?',
		answer: 'Mastiff',
		choices: ['Mastiff','Irish Wolfhound','Great Dane','Bernese Mountain Dog'],
		bg: 'img.png'
	}, {
		question: 'Bansenji is the only dog breed that can not ____?',
		answer: 'Bark',
		choices: ['Bark','Smell','Sit','Walk Backwards'],
		bg: 'img.png'
	}, {
		question: 'What breed is most cat-like?',
		answer: 'Shiba Inu',
		choices: ['Shiba Inu','Welsh Corgi','Poodle','Alaskan Malamute'],
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
		timeoutCounter ++;
		transition("Time Up! The correct answer is: " + triviaArr[questionIndex].answer);
		stop();
	}
};
function stop() {
	clearInterval(roundTimer);
};

//reset
function reset() {
	time = 10;
	score = 0;
	timeoutCounter = 0;
	questionIndex = 0;
	triviaArr.shuffle();
	shuffleChoices();
	stop();
	timer();
	$('.trivia-question').empty();

};

//clear appends
function clearAppends() {
	$('.choices').remove();
	$('.question').remove();
	// $('.trivia-bottom').remove();
}

//resets to next question
function nextQuestion(){
	stop();
	timer();
	clearAppends();
	appendQuestion();
	appendChoices();
	$('.trivia-bottom').empty();
	time = 10;
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
		score ++;
		transition('You are correct! The answer is: ' + triviaArr[questionIndex].answer);
	} else {
		transition('Sorry! That is not the correct answer.. The correct answer is: ' + triviaArr[questionIndex].answer);
	}
};

function transtionTimer (){
	var transitionTimeOut = setTimeout(nextQuestion,1000)
};

function transition(outcome){

	clearAppends();
	if(questionIndex == triviaArr.length - 1) {
		stop();
		$('.show-timer').empty();
		$('.trivia-question').append('You answered ' + score + ' questions correctly!<br>');
		$('.trivia-question').append('You had  ' + (triviaArr.length - timeoutCounter - score) + ' incorrect answers!<br>');
		$('.trivia-question').append('You did not answer ' + timeoutCounter + ' questions!');
		restartBtn();
	} else {
		transtionTimer();
		$('.trivia-bottom').html(outcome);
		questionIndex ++;
	}
};

function startGame(){
	reset();
	nextQuestion();
}

function restartBtn() {
	var restartBtn = $('<button class="btn-primary">');
	restartBtn.text("Play Again!").on('click', function(){
		startGame();
	})
	$('.show-timer').append(restartBtn);
}
startGame();
