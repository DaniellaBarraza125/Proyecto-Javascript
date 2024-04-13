const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerButton = document.getElementsByClassName("answerButton");

const homeNav = document.getElementById("homeNav")
const quizNav = document.getElementById("quizNav")
const resultsNav = document.getElementById("resultsNav")
const homeDiv = document.getElementById("homeDiv")
const quizDiv = document.getElementById("quizDiv")
const resultsDiv = document.getElementById ("resultsDiv")
const API = "https://mocki.io/v1/e97adce9-e6cb-4ad9-8f31-0e3528b59e43";

let quiz = [];
let answer = [];
let score = 0;

// console.log(resultsNav, homeNav, quizNav);

const hideViews = (()=>{
    // console.log("working booetch");
    homeDiv.classList.add("hide")
    quizDiv.classList.add("hide")
    resultsDiv.classList.add("hide")
})
const showHome =()=>{
    hideViews()
    // console.log("working");
    homeDiv.classList.remove("hide")
}

const showQuiz =()=>{
    hideViews()
    // console.log("working");

    quizDiv.classList.remove("hide")
}

const showResults =()=>{
    hideViews()
    // console.log("working");

    resultsDiv.classList.remove("hide")
}

homeNav.addEventListener("click",showHome)
quizNav.addEventListener("click",showQuiz)
resultsNav.addEventListener("click",showResults)

axios.get(API)
.then ((res)=> {quiz = res.data
//si llega a dejar de funcionar esta API y debo cambiar a la anterior recuerda que seria res.data.response  
    // showQuestion(quiz)
    quiz.map(quiz => {
//*crear vaiables para acceder mas facilmente al contenido. 
        correctAnswer = quiz.correct_answer
        incorrectAnswers = quiz.incorrect_answers
    // console.log(correctAnswer); 
        
    });
    console.log("log en axios=", quiz)
    // console.log("trayend respuestas=", incorrectAnswers,correctAnswer);;
})
.catch((err)=>console.error(err))


let currentQuestionIndex;
const startGame = (()=>{
    // console.log("funciono!");
    // console.log("respuesta incorrecta", incorrectAnswers)
    // console.log("correcta", correctAnswer); 


    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
})

// startGame();
startButton.addEventListener("click", startGame);

const showQuestion = ((question)=>{
// console.log("acceder a una pregunta=", quiz[1]);  
questionElement.innerText= "";
questionElement.innerText = `holi ${question.question}`;
//* problema, la respuesta correcta siempre esta en el mismo lugar, he reado un array para unirlas, el problema sera asignar el valor de correcta. concatener las variables, unsar la funcion math.random para darle un orden al azar
const correctAnswer = question.correct_answer;
const incorrectAnswers = question.incorrect_answers;

    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);
    // console.log("allanswer", allAnswers);


allAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.innerText = answer;
    button.classList.add("answerButton")
    button.dataset.correct = answer === correctAnswer;
    button.addEventListener("click", selectAnswer);
    
    questionElement.appendChild(button);
});

console.log("Botón correcto: ", correctAnswer);
// console.log("current index ",currentQuestionIndex);
// no entiendia porque no funcionaba check buttons y chatGPT me dio la opcion de poner answerButtonsElement.querySelectorAll("button") como argumento de la funcion. asi se inicia correctamnte


    // checkButtons(answerButtonsElement.querySelectorAll("button"),correctAnswer);

})

//genere esta funcion porque no se asignaba inmediatamente el valor correcto o falso pero ya no es necesaria
// const checkButtons =(answerButtons, correctAnswer)=>{
//     answerButtons.forEach(button => {
//         if (button.innerText === correctAnswer) {
//             console.log("Botón correcto: ", button.innerText);
//             button.dataset.correct = true;
//         }
//     });
// }
const setNextQuestion = (()=>{
    // resetState();
    selectAnswer()
    showQuestion(quiz[currentQuestionIndex]);
})


const selectAnswer = () => {
    const selectedButton = event.target;
    countScore(selectedButton); 
        Array.from(questionElement.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }showButtons();
    }
);
};
const showButtons  = (()=>{
    if (currentQuestionIndex === quiz.length -1) {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        nextButton.classList.add("hide");
        
    } else {
        // console.log("ey why?");
        nextButton.classList.remove("hide");
    }
    console.log( "holaa");
});


const countScore=((element)=>{
    if (element.dataset.correct === "true") {
        score += 1;
        console.log("Score:", score);
    }
})


nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
    });




