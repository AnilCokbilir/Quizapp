let questions = [{
        "question": "Wie groß ist Anil?",
        "answer_1": "180cm",
        "answer_2": "182cm",
        "answer_3": "183cm",
        "answer_4": "184cm",
        "right_answer": 3
    },
    {
        "question": "Welche Schuhgröße hat Anil?",
        "answer_1": "42/43",
        "answer_2": "43/44",
        "answer_3": "44/45",
        "answer_4": "45/46",
        "right_answer": 2
    },
    {
        "question": "Wann hat Anil Geburtstag?",
        "answer_1": "29.05.1997",
        "answer_2": "29.05.1995",
        "answer_3": "29.05.1994",
        "answer_4": "29.05.1996",
        "right_answer": 4
    },
    {
        "question": "Wann hat Anil Geburtstag?",
        "answer_1": "29.05.1997",
        "answer_2": "29.05.1995",
        "answer_3": "29.05.1994",
        "answer_4": "29.05.1996",
        "right_answer": 4
    }




]

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('sound/right.mp3');
let AUDIO_FAIL = new Audio('sound/wrong.mp3');

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();

    } else {
        updateProgressBar();
        updateToNextQuestion();

    }

}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('question-amount').innerText = questions.length;
    document.getElementById('yourAnswers').innerHTML = rightQuestions;
    document.getElementById('header-image').src = './img/trophy.png';
}

function updateToNextQuestion() {

    let question = questions[currentQuestion];
    document.getElementById('first-number').innerText = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question']
    document.getElementById('answer_1').innerHTML = question['answer_1']
    document.getElementById('answer_2').innerHTML = question['answer_2']
    document.getElementById('answer_3').innerHTML = question['answer_3']
    document.getElementById('answer_4').innerHTML = question['answer_4']
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = percent * 100;
    console.log('Fortschritt:', percent);
    document.getElementById('progress-bar').innerHTML = `${percent.toFixed(0)}%`;
    document.getElementById('progress-bar').style.width = `${percent.toFixed(0)}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;


    if (rightAnswerSelected(selectedQuestionNumber)) {
        console.log('Richtige Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        console.log('Falsche Antwort!');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }

    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == question['right_answer'];
}

function nextQuestion() {
    currentQuestion++;



    document.getElementById('next-button').disabled = true;

    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function restartGame() {
    document.getElementById('header-image').src = './img/quiz-logo.jpg';
    document.getElementById('endScreen').style = 'display:none';
    document.getElementById('questionBody').style = '';

    rightQuestions = 0;
    currentQuestion = 0;
    init();

}