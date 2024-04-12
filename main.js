const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

const API = "https://opentdb.com/api.php?amount=10&category=20&type=multiple";

let quiz = [];
let correctAnswer= [];
let incorrectAnswers;
let answer = [];

axios.get(API)
.then ((res)=> {quiz = res.data.results
    // showQuestion(quiz)
    quiz.map(quiz => {
        correctAnswer = quiz.correct_answer
        incorrectAnswers = quiz.incorrect_answers
    // console.log(correctAnswer); 
        
    });
    console.log("log en axios=", quiz)
    console.log(correctAnswer)
    console.log(incorrectAnswers);;
})
.catch((err)=>console.error(err))


let currentQuestionIndex;
const startGame = (()=>{
    console.log("funciono!");
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
})
// startGame();
startButton.addEventListener("click", startGame);

const showQuestion = ((question)=>{
    console.log("acceder a una pregunta=", quiz[1]);  //! quiz es el questions
    questionElement.innerText = `holi ${question.question}`;
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);
    correctAnswer = quiz.correct_answer
    incorrectAnswers = quiz.incorrect_answers

    allAnswers.forEach(answer => {
    // console.log(correctAnswer); 
    const button = document.createElement("button");
    button.innerText = `respu ${answer}`;

    console.log("respuesta correcta", correctAnswer)
    console.log("respuesta incorrecta", incorrectAnswers)
    ;

    // if (answer.correct) {
    // button.dataset.correct = true;
    // }
    // button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
})
})


function setNextQuestion() {
    // resetState();
    showQuestion(quiz[currentQuestionIndex]);
}

