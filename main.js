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
const resultsTitle = document.getElementById("resultsTitle")
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
    if (finalScore >= 9 && finalScore <= 10) {
        resultsTitle.innerText= `Felicidades, Parece que Te Gusta Tanto Friends como a Monica Limpiar
        `
        resultText.innerText = "Enhorabuena! Te has ganado el título de maniático de Friends, igualando la dedicación de Monica a la limpieza y el orden. Conoces los episodios tan bien como Ross conoce su sándwich de pavo sobrante. Cada escena, cada línea de diálogo y cada gesto de los amigos te resultan tan familiares como el aroma a café en Central Perk. Ahora que has alcanzado el nivel de maestría en Friends, cuéntanos, ¿cuál es tu momento favorito? ¿Con qué personaje te identificas más y por qué? ¡Estamos ansiosos por escuchar tus historias y celebrar juntos tu amor por esta icónica serie de televisión!";
    } else if (finalScore >= 6 && finalScore <= 8) {
        resultsTitle.innerText= `Unagi, Parece que Tienes los Sentidos Despiertos`
        resultText.innerText = `"¡Bienvenido al club de los fans de Friends! Seguramente sabes deletrear correctamente 'Boscodictiasaur'. ¡Sí, comienza con M muda! Tu conocimiento sobre la serie es tan profundo como el amor de Joey por la pizza o la obsesión de Monica por la limpieza. Desde los momentos más divertidos hasta los más emotivos, has experimentado todas las emociones junto a Chandler, Monica, Rachel, Ross, Joey y Phoebe. Estás en sintonía con los latidos del corazón de Central Perk y te sientes como en casa en el apartamento de los amigos. Ahora que has demostrado tus habilidades en el mundo de Friends, prepárate para ser reconocido como un verdadero maestro de la serie."`;
    } else if (finalScore >= 3 && finalScore <= 5) {
        resultsTitle.innerText= `¡Parece que Has Comenzado a Ver la Luz`
        resultText.innerText = `Bienvenido a la luz, amigo! Al igual que Chandler aprendiendo a bailar o Phoebe tocando la guitarra, estás descubriendo un nuevo mundo lleno de diversión y aprendizaje. A medida que avanzas en la serie, te encontrarás con momentos tan divertidos como cuando Ross grita '¡Pivot!' mientras intenta mover un sofá. Ahora que has dado los primeros pasos, te recomendamos los episodios con las lecciones más hilarantes y los momentos más icónicos de la serie. Prepárate para reír, llorar y celebrar la amistad como nunca antes.`;
    } else {
        resultsTitle.innerText= `Necesitas Urgentemente Ver Friends`
        resultText.innerText = "Eres un verdadero novato en el mundo de Friends, tan nuevo como Joey en un juego de palabras. Pero no te preocupes, estamos aquí para guiarte en este viaje inolvidable. Sabes tanto de Friends como Phoebe de sueco o Rachel sobre capitales europeas, pero eso está a punto de cambiar. Prepárate para sumergirte en un mundo donde las referencias a Unagi y al sándwich de Ross son tan comunes como los cafés en Central Perk. Como recompensa por tu valentía al aventurarte en esta serie, te ofrecemos un masaje de Monica. Aunque, si conocieras a Monica, sabrías que no es realmente un premio, ¡sino más bien un castigo cómico! Así que, ¿estás listo para unirte a nosotros en este viaje?";
    }
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





const showImage = (()=>{
    const currentImage = images[currentImageIndex];
    questionPicture.innerHTML = `<img id="image" src="${currentImage}" />`;
    currentImageIndex++;
    if (currentQuestionIndex == 10) {
        questionPicture.innerHTML = '';
    }
});