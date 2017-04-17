var owTrivia = {
	q1 : 
	{
		question: 'What hero can heal themselves?',
		choices: ['Zennyata', 'Soldier: 76', 'Hanzo', 'D.Va'],
		answer: 'Solider: 76'
	}
	q2 : 
	{
		question: 'What hero does not have different damage values?',
		choices: ['Ana', 'Soldier: 76', 'Pharah', 'McCree'],
		answer: 'Solider: 76'
	}
}
function makeQuestion () {
	var makeTriviaQuestion = $('<div class="col-lg-12 triviaQuestion text-center">' + owTrivia.q1.question +'</div>');
	$('.trivia-question').append(makeTriviaQuestion);
	for (i=0; i<owTrivia.q1.choices.length; i++) {
		var makeTriviaChoices = $('<div class="col-lg-12 trivia-choices text-center">');
		makeTriviaChoices.html(owTrivia.q1.choices[i])
		$('.triviaQuestion').append(makeTriviaChoices);
		$('.trivia-choices').on('click', function() {
			if('click' == owTrivia.q1.answer ) {
				console.log('You are correct! The answer is : ' + owTrivia.q1.answer)
			}
		})
	}
}

function timer () {
	var roundTimer = setInterval()
}
makeQuestion();