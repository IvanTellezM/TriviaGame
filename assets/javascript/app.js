// Questions
var questions = [
    first = {
        question: "Who is the only member of ZZ Top who doesn’t have a beard?.",
        answer1: "A) Frank Beard",
        answer2: "B) Billy Gibbons",
        answer3: "C) Dusty Hill",
        answer4: "D) Lanier Greig",
        url: "https://img.discogs.com/fmkuOz_O9jUSZuXe16vGI_xX-bY=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/A-113655-1404833022-9434.jpeg.jpg"
    },
    second = {
        question: "Who were the first television couple to be shown in bed together on prime time television? ",
        answer1: "A) Lucy and Ricky",
        answer2: "B) Fred and Wilma Flinstone",
        answer3: "C) Rachel and Ross",
        answer4: "D) Corey and Topanga",
        url: "http://images2.fanpop.com/images/photos/6300000/Fred-and-Wilma-Flintstone-the-flintstones-6386213-350-424.jpg"
    },
    third = {
        question: "What singer/actor gave Marilyn Monroe a white poodle named Mafia.",
        answer1: "A) Elvis Presley",
        answer2: "B) Michael Jackson",
        answer3: "C) Frank Sinatra",
        answer4: "D) John F. Kennedy",

        url: "https://vignette.wikia.nocookie.net/sinatra/images/4/4a/Nm_Frank_Sinatra_090520_ssv.jpg/revision/latest?cb=20110213192427"
    },
    fourth = {
        question: "Name the city previously known as Byzantium and Constantinople.",
        answer1: "A) Turkey.",
        answer2: "B) Terhan.",
        answer3: "C) Alaska",
        answer4: "D) Istanbul",
        url: "",
    },

    fifth = {
        question: "This person held a party open to all, but only publicized the party after it was over so that only time-travellers would know to attend; as expected, nobody showed up to the party.",
        answer1: "A) Stephen Hawking",
        answer2: "B) Albert Einstein",
        answer3: "C) Elon Musk",
        answer4: "D) Kanye West",
        url: "",
    },

    sixth = {
        question: "The beaver is the national emblem of which country?",
        answer1: "A) France",
        answer2: "B) Canada",
        answer3: "C) Spain",
        answer4: "D) Brazil",
        url: "",
    },

    seventh = {
        question: "What is the name of Batman's butler?.'",
        answer1: "A) Tom",
        answer2: "B) Jaime",
        answer3: "C) Alfred",
        answer4: "D) Vladimir",
        url: "",
    },
];

// Correct answers
var correctAnswer = [questions[0].answer1, questions[1].answer2, questions[2].answer3, questions[3].answer4, questions[4].answer1, questions[5].answer2, questions[6].answer3];

// Variables 
var x = 0;
var qTimeOnScreen;
var correct = 0;
var incorrect = 0;
var preventClick = [];
var timeLeft;
var timerClear;
var missedQuestions;

// It will show questions left in the game 
function displayQuestions() {
    if (x === correctAnswer.length) {
        clearInterval(qTimeOnScreen);
        clearInterval(timerClear);
        console.log(x);
        $("#timer").text("");
        $('#answer').text("");
        missedQuestions = correctAnswer.length - correct - wrong;
        updateScore();
        $("#question").text("Press the start button when ready");
        $("#answer1").text("");
        $("#answer2").text("");
        $("#answer3").text("");
        $("#answer4").text("");
        $("#start").show()
    } else {
        clearInterval(timerClear);
        preventClick = [];
        timeLeft = 30;
        $("#question").text("Question " + (x + 1) + ": " + questions[x].question);
        $("#answer1").text(questions[x].answer1);
        $("#answer2").text(questions[x].answer2);
        $("#answer3").text(questions[x].answer3);
        $("#answer4").text(questions[x].answer4);
        $("#timer").text(timeLeft);
        timerClear = setInterval(timer, 1000);
    }
}

function updateScore() {
    missedQuestions = x - correct - wrong;
    $("#correct").text("Correct: " + correct);
    $("#wrong").text("Wrong: " + wrong);
    $("#misses").text("Missed: " + missedQuestions);
}

function timer() {
    timeLeft--;
    $("#timer").text(timeLeft);
}

// Shows the current question question
function currentQuestion() {
    x++;
    updateScore();
    displayQuestions();
}

// Gives time limit to guess current question 30 sec
function displayNextQuestion() {
    currentQuestion();
    qTimeOnScreen = setInterval(currentQuestion, 10000 * 3);
}

// Start the game with a 30 sec countdown
$("#start").click(function() {
    correct = 0;
    wrong = 0;
    chicken = 0;
    preventClick.push("0");
    displayQuestions();
    qTimeOnScreen = setInterval(currentQuestion, 10000 * 3);
    $("#start").hide()
})

// Select an answer and 30 sec in between questions
$(".guess").click(function() {
    selectedAnswer = $(this).text();
    preventClick.push("0");
    if (selectedAnswer === correctAnswer[x] && preventClick.length === 1) {
        clearInterval(qTimeOnScreen);
        setTimeout(displayNextQuestion, 1000 * 3);
        clearInterval(timerClear);
        timeLeft = 5;
        $("#timer").text(timeLeft);
        timerClear = setInterval(timer, 1000);
        correct++;
        $('#answer1').text("Correct! The answer was " + correctAnswer[x] + ".");
        $("#correct").text("Correct: " + correct);
        $("#correct").html("<img src=" + images[count] + " width='400px'>");
        $("#answer2").text("");
        $("#answer3").text("");
        $("#answer4").text("");
    } else if (preventClick.length === 1) {
        clearInterval(qTimeOnScreen);
        setTimeout(displayNextQuestion, 1000 * 3);
        clearInterval(timerClear)
        timeLeft = 5;
        $("#timer").text(timeLeft);
        timerClear = setInterval(timer, 1000);
        wrong++;
        $("#answer1").text("Incorrect. You chose " + selectedAnswer + ". The answer was " + correctAnswer[x] + ".");
        $("#wrong").text("Wrong: " + wrong);
        $("#answer2").text("");
        $("#answer3").text("");
        $("#answer4").text("");
    }
})