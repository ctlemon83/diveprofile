// Constants
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const CORRECT_BONUS = 6.25;
const MAX_QUESTIONS = 16;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
	{
		question: "Which of the following is an essential feature of a diving mask?",
		choice1: "Purge valve",
		choice2: "High internal volume",
		choice3: "Tempered glass or optically correct shatterproof lenses",
		choice4: "Silicon material",
		answer: 3
	},
	{
		question: "Very long snorkels are not recommended primarily because:",
		choice1: "They have too much dead air space",
		choice2: "They are likely to become tangled",
		choice3: "They are not economical to manufacture",
		choice4: "They are top-heavy and difficult to use",
		answer: 1
	},
	{
		question: "When buying or renting equipment for diving, what is the most important consideration?",
		choice1: "Its cost",
		choice2: "Its fit and comfort on your body",
		choice3: "How recently it was developed",
		choice4: "Its style",
		answer: 2
	},
	{
		question: "When rinsing a regulator, it is best to:",
		choice1: "Leave the regulator attached to the cylinder or have the protective cap in place.",
		choice2: "Depress the purge button several times",
		choice3: "Use ionized water",
		choice4: "Have the first stage lower than the second stage",
		answer: 1
	},
	{
		question: "Three features that are common to all buoyancy compensators (BCs) are:",
		choice1: "An integrated weight system, bright color, inflation/deflation hose",
		choice2: "An overpressure relief valve, CO2 inflation cartridge, alternate air source",
		choice3: "An alternate air source, low pressure inflator, overpressure relief valve",
		choice4: "An overpressure relief valve, inflation/deflation hose, low pressure inflator",
		answer: 4
	},
	{
		question: "Three types of alternate air sources that are in common use today are:",
		choice1: "Full face masks, completely redundant scuba systems, “octopus” second stages",
		choice2: "Octopus second stages, completely redundant scuba systems, an integrated BC inflation/second stage system",
		choice3: "Titanium cylinders, full face masks, “octopus” second stages",
		choice4: "Integrated BC inflation/second stage systems, “octopus” second stages, dual cylinders with an isolation manifold",
		answer: 2
	},
	{
		question: "To be consistent with scuba industry practice, scuba tanks should be visually inspected at least every:",
		choice1: "5 years",
		choice2: "3 years",
		choice3: "1 year",
		choice4: "10 years",
		answer: 3
	},
	{
		question: "The most important functional feature of a weight belt or weight system is:",
		choice1: "A means for releasing the weights quickly with one hand.",
		choice2: "Comfort",
		choice3: "The capability of the belt or system to use average weight media",
		choice4: "Bright color for ease of identification",
		answer: 1
	},
	{
		question: "The primary purpose of the exposure suit is:",
		choice1: "To preserve body heat during dives",
		choice2: "To look good while diving",
		choice3: "To provide buoyancy during dives",
		choice4: "To prevent scrapes and cuts during dives",
		answer: 1
	},

	{
		question: "At a minimum, during a dive, most dive computers display:",
		choice1: "Maximum depth, actual dive time, water temperature",
		choice2: "Current depth, actual dive time, remaining allowable dive time",
		choice3: "Maximum depth, remaining allowable dive time, water temperature",
		choice4: "Minimum depth, current depth, decompression depth",
		answer: 2
	},
	{
		question: "Diving instruments that are required for safe scuba diving include:",
		choice1: "Submersible pressure gauge, depth gauge, timing device",
		choice2: "Depth gauge, thermometer, strain gauge",
		choice3: "Timing device, altimeter, logarithm",
		choice4: "J-valve, submersible pressure gauge, distance calculator",
		answer: 1
	},
	{
		question: "Which stage of the regulator reduces cylinder pressure to intermediate pressure?",
		choice1: "The second stage",
		choice2: "The first stage",
		choice3: "The intermediate stage",
		choice4: "The alternate stage",
		answer: 2
	},
	{
		question: "What two materials are used for the manufacture of scuba cylinders?",
		choice1: "Steel and aluminum",
		choice2: "Titanium and aluminum",
		choice3: "Stainless steel and graphite",
		choice4: "Aluminum and graphite",
		answer: 1
	},
	{
		question: "The “direction of travel” line on a compass is the:",
		choice1: "Index/tick mark line",
		choice2: "Lubber line",
		choice3: "Degree line",
		choice4: "Heading line",
		answer: 2
	},
	{
		question: "What is the primary use of a dive knife?",
		choice1: "A weapon",
		choice2: "A file",
		choice3: "A tool",
		choice4: "A measuring device",
		answer: 3
	},
	{
		question: "Stamped (engraved) markings on scuba cylinders include:",
		choice1: "Serial number, name, rank",
		choice2: "Date of hydrostatic test, serial number, type of material",
		choice3: "Type of material, physical length, weight",
		choice4: "Visual inspection information, serial number, date of hydrostatic test",
		answer: 2
	}
];

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		localStorage.setItem("mostRecentEquipScore", score);
		return window.location.assign("end.html");
	}
	questionCounter++;
	// Update the progress bar
	progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
	// Get new question
	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
		currentQuestion = availableQuestions[questionIndex];
		question.innerText = currentQuestion.question;
		choices.forEach(choice => {
			const number = choice.dataset["number"];
			choice.innerText = currentQuestion["choice" + number];
		});
		availableQuestions.splice(questionIndex, 1);
		acceptingAnswers = true;
};

choices.forEach(choice => {
	choice.addEventListener("click", e => {
		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		// Increase score if answered correctly
		// Depending on correct or incorrect, change the color of the question selected
		if(classToApply == 'correct') {
			incrementScore(CORRECT_BONUS);
		}
		selectedChoice.parentElement.classList.add(classToApply);
		// After answer is selected, reset to original class
		setTimeout ( () => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 1000);
	});
});

// With correct answer, increase the score by CORRECT_BONUS
incrementScore = num => {
	score += num;
	scoreText.innerText = score;
}

startGame();