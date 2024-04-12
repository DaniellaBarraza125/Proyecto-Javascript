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
//*crear vaiables para acceder mas facilmente al contenido. 
        correctAnswer = quiz.correct_answer
        incorrectAnswers = quiz.incorrect_answers
    // console.log(correctAnswer); 
        
    });
    console.log("log en axios=", quiz)
    console.log("trayend respuestas=", incorrectAnswers,correctAnswer);;
})
.catch((err)=>console.error(err))


let currentQuestionIndex;
const startGame = (()=>{
    console.log("funciono!");
    console.log("respuesta incorrecta", incorrectAnswers)
    console.log("correcta", correctAnswer); 


    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
})
// startGame();
startButton.addEventListener("click", startGame);

const showQuestion = ((question)=>{
console.log("acceder a una pregunta=", quiz[1]);  
questionElement.innerText = `holi ${question.question}`;
//* problema, la respuesta correcta siempre esta en el mismo lugar, he reado un array para unirlas, el problema sera asignar el valor de correcta. concatener las variables, unsar la funcion math.random para darle un orden al azar

let allAnswers = [correctAnswer, ...incorrectAnswers];
allAnswers.sort(() => Math.random() - 0.5);
console.log("allanswer", allAnswers);

    correctAnswer = quiz.correct_answer
    incorrectAnswers = quiz.incorrect_answers

    allAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = `${answer}`;

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

