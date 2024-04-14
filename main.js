const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerButton = document.getElementsByClassName("answerButton");
const resultsButton = document.getElementById("results-btn")
const questionContainer =document.getElementById("question-container")
const scoreDiv = document.getElementById("score")
const homeNav = document.getElementById("homeNav")
const quizNav = document.getElementById("quizNav")
const resultsNav = document.getElementById("resultsNav")
const homeDiv = document.getElementById("homeDiv")
const quizDiv = document.getElementById("quizDiv")
const resultsDiv = document.getElementById ("resultsDiv")
const resultText = document.getElementById("resultText")
const API = "https://mocki.io/v1/e97adce9-e6cb-4ad9-8f31-0e3528b59e43";

let quiz = [];
let answer = [];
let score;
let finalScore;

// console.log(resultsNav, homeNav, quizNav);

const hideViews = (()=>{
    // console.log("working booetch");
    homeDiv.classList.add("hide")
    questionContainer.classList.add("hide")
    resultsDiv.classList.add("hide")
})
hideViews();

const showHome =()=>{
    hideViews();
    homeDiv.classList.remove("hide");
    // console.log("working");
}

const showQuiz =()=>{
    hideViews();
    questionContainer.classList.remove("hide");
    // console.log("working");
}

const showResultsDiv =()=>{
    hideViews();
    resultsDiv.classList.remove("hide");
    // console.log("working");
}

axios.get(API).then ((res)=> {quiz = res.data
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
    }).catch((err)=>console.error(err))


let currentQuestionIndex;
const startGame = (()=>{
    score = 0
    // console.log("funciono!");
    // console.log("respuesta incorrecta", incorrectAnswers)
    // console.log("correcta", correctAnswer); 
    resultsButton.classList.add("hide");
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();

})
const showQuestion = ((question)=>{
    resetState();
    showScore();

    
// console.log("acceder a una pregunta=", quiz[1]);  
questionElement.innerText= "";
questionElement.innerText = question.question;
//posicion al azar
let correctAnswer = question.correct_answer;

    let allAnswers = [correctAnswer, ...incorrectAnswers];
    allAnswers.sort(() => Math.random() - 0.5);
    // console.log("allanswer", allAnswers);

allAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("answerButton")
    button.dataset.correct = answer === correctAnswer;
    button.addEventListener("click", selectAnswer);
    
    answerButtonsElement.appendChild(button);
});
console.log("Botón correcto: ", correctAnswer);
console.log("current index ",currentQuestionIndex);
})
const setNextQuestion = (()=>{
    selectAnswer()
    showQuestion(quiz[currentQuestionIndex]);
})
const selectAnswer = () => {
    const selectedButton = event.target;
    countScore(selectedButton); 
    showButtons();
        Array.from(answerButtonsElement.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
        }
    );
};
const showButtons  = (()=>{    
    if (quiz.length+1  > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
    } else {
    resultsButton.classList.remove("hide")
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
    }
});
const showScore = (()=>{
        let questionCount = currentQuestionIndex + 1;
        let totalQuestions = quiz.length;
        let questionDisplay = questionCount <= totalQuestions ? questionCount : totalQuestions;
        scoreDiv.innerText = `Score = ${score}/10
    Question = ${questionDisplay}/10`;
    
})
const countScore=((element)=>{
    if (element.dataset.correct === "true") {
        score ++;
        console.log("Score:", score);
    }
})
const resetState =(()=>{
    nextButton.classList.add("hide");
    answerButtonsElement.innerHTML = "";
})
const showResults =(()=>{
   showResultsDiv()
    finalScore = score; // Asigna el valor de score a finalScore
    resultText.innerText = `Tu puntaje final es ${finalScore} . `; 
    //  if (score == 9) {console.log("yeeeeii");
    // }
    // else {
    //     console.log("owww");
    // }
})

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
    });
    
resultsButton.addEventListener("click", showResults)
homeNav.addEventListener("click",showHome)
quizNav.addEventListener("click",showQuiz)
resultsNav.addEventListener("click",showResultsDiv)
startButton.addEventListener("click", startGame);

//genere esta funcion porque no se asignaba inmediatamente el valor correcto o falso pero ya no es necesaria
// const checkButtons =(answerButtons, correctAnswer)=>{
//     answerButtons.forEach(button => {
//         if (button.innerText === correctAnswer) {
//             console.log("Botón correcto: ", button.innerText);
//             button.dataset.correct = true;
//         }
//     });
// }



