// buttons

const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerButton = document.getElementsByClassName("answerButton");
const resultsButton = document.getElementById("results-btn")

// containers

const questionContainerElement = document.getElementById("question-container");
const questionContainer =document.getElementById("question-container")

// divs
const homeDiv = document.getElementById("homeDiv")
const quizDiv = document.getElementById("quizDiv")
const scoreDiv = document.getElementById("score")
const resultsDiv = document.getElementById ("resultsDiv")
const resultsTextDiv = document.getElementById("resultsTextDiv")

// nav
const homeNav = document.getElementById("homeNav")
const quizNav = document.getElementById("quizNav")
const resultsNav = document.getElementById("resultsNav")
const questionElement = document.getElementById("question");
const resultsTitle = document.getElementById("resultsTitle")
const questionImg = document.getElementById("questionPicture")



const API = "https://mocki.io/v1/53f21f08-a2a4-413b-bf34-aa11d35f7654";
// variables
let quiz = [];
let answer = [];
let score;
let finalScore;

// console.log(resultsNav, homeNav, quizNav);

const hideViews = (()=>{
    // console.log("working booetch");
    homeDiv.classList.add("hide")
    questionContainer.classList.add("hide")
    quizDiv.classList.add("hide")
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
    quizDiv.classList.remove("hide")
    // console.log("working");
}

const showResultsDiv =()=>{
    hideViews();
    resultsDiv.classList.remove("hide");
    // console.log("working");
}

axios.get(API).then ((res)=> {quiz = res.data

    quiz.map(quiz => {
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
    currentQuestionIndex = 0;
    resultsButton.classList.add("hide");
    startButton.classList.add("hide");
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
    

})
const showQuestion = ((question)=>{
    showScore();
    questionElement.innerText= "";
    questionElement.innerText = question.question;
    const randomOrder = question.answers.sort(() => Math.random() - 0.5);
    question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = ` value="${answer.value}">`
    button.innerText =`${answer.answer}`;
    questionImg.innerHTML= ` <img src="${question.image}" alt="Friends picture" id="image">`
    if (answer.value) {
        button.dataset.correct = true;
}
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
    });
})


const resetState =(()=>{
    nextButton.classList.add("hide");
    answerButtonsElement.innerHTML = "";
})

const setNextQuestion = (()=>{
    resetState();
    showQuestion(quiz[currentQuestionIndex]);
})
const setScore  = (button)=>{  
    if (button.dataset.correct == "true") {
    score ++;
console.log("score", score);}
}

const setStatusClass  = ((element)=>{  
        if (element.dataset.correct == "true") {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
    });

const selectAnswer = (event) => {
    const selectedButton = event.target;
    setScore(selectedButton)

    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button);
    })
        if (quiz.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
        } else {
            question.innerHTML = "";
            questionImg.innerHTML = " ",
            answerButtonsElement.innerHTML = "",
            
        resultsButton.classList.remove("hide")
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        }
        
};

const showScore = (()=>{
        let questionCount = currentQuestionIndex + 1;
        let totalQuestions = quiz.length;
        let questionDisplay = questionCount
        scoreDiv.innerText = `
    Question = ${questionDisplay}/10`;
    
})

const showResults = () => {
    showResultsDiv();
    resultsButton.classList.add("hide")

    finalScore = score; // Asigna el valor de score a finalScore
    resultsTextDiv.innerHTML = "<h2>holaaaaa que existo bueno?!</h2>";

    switch (true) {
        case finalScore >= 9 && finalScore <= 10:
            console.log("del 0 al 10");
            resultsTextDiv.innerHTML = `<h2 class=resultTitle>Felicidades, Parece que Te Gusta Tanto Friends como a Monica Limpiar</h2>
                <p class=resultP>Enhorabuena! Te has ganado el título de maniático de Friends, igualando la dedicación de Monica a la limpieza y el orden. Conoces los episodios tan bien como Ross conoce su sándwich de pavo sobrante. Cada escena, cada línea de diálogo y cada gesto de los amigos te resultan tan familiares como el aroma a café en Central Perk. Ahora que has alcanzado el nivel de maestría en Friends, cuéntanos, ¿cuál es tu momento favorito? ¿Con qué personaje te identificas más y por qué? ¡Estamos ansiosos por escuchar tus historias y celebrar juntos tu amor por esta icónica serie de televisión!</p>`;
            break;
        case finalScore >= 6 && finalScore <= 8:
            console.log("del 6 al 8");
            resultsTextDiv.innerHTML = `<h2 class=resultTitle>Unagi, Parece que Tienes los Sentidos Despiertos</h2>
                <p class=resultP>¡Bienvenido al club de los fans de Friends! Seguramente sabes deletrear correctamente 'Boscodictiasaur'. ¡Sí, comienza con M muda! Tu conocimiento sobre la serie es tan profundo como el amor de Joey por la pizza o la obsesión de Monica por la limpieza. Desde los momentos más divertidos hasta los más emotivos, has experimentado todas las emociones junto a Chandler, Monica, Rachel, Ross, Joey y Phoebe. Estás en sintonía con los latidos del corazón de Central Perk y te sientes como en casa en el apartamento de los amigos. Ahora que has demostrado tus habilidades en el mundo de Friends, prepárate para ser reconocido como un verdadero maestro de la serie.</p>`;
            break;
        case finalScore >= 3 && finalScore <= 5:
            console.log("del 3 al 5");
            resultsTextDiv.innerHTML = `<h2 class=resultTitle>¡Parece que Has Comenzado a Ver la Luz</h2>
                <p class=resultP>Bienvenido a la luz, amigo! Al igual que Chandler aprendiendo a bailar o Phoebe tocando la guitarra, estás descubriendo un nuevo mundo lleno de diversión y aprendizaje. A medida que avanzas en la serie, te encontrarás con momentos tan divertidos como cuando Ross grita '¡Pivot!' mientras intenta mover un sofá. Ahora que has dado los primeros pasos, te recomendamos los episodios con las lecciones más hilarantes y los momentos más icónicos de la serie. Prepárate para reír, llorar y celebrar la amistad como nunca antes.</p>`;
            break;
        default:
            console.log("vale");
            resultsTextDiv.innerHTML = `<h2 class=resultTitle >Necesitas Urgentemente Ver Friends</h2>
                <p class=resultP>Eres un verdadero novato en el mundo de Friends, tan nuevo como Joey en un juego de palabras. Pero no te preocupes, estamos aquí para guiarte en este viaje inolvidable. Sabes tanto de Friends como Phoebe de sueco o Rachel sobre capitales europeas, pero eso está a punto de cambiar. Prepárate para sumergirte en un mundo donde las referencias a Unagi y al sándwich de Ross son tan comunes como los cafés en Central Perk. Como recompensa por tu valentía al aventurarte en esta serie, te ofrecemos un masaje de Monica. Aunque, si conocieras a Monica, sabrías que no es realmente un premio, ¡sino más bien un castigo cómico! Así que, ¿estás listo para unirte a nosotros en este viaje?</p>`;
    }
};



nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
    });
    
resultsButton.addEventListener("click", showResults)
homeNav.addEventListener("click",showHome)
quizNav.addEventListener("click",showQuiz)
resultsNav.addEventListener("click",showResultsDiv)
startButton.addEventListener("click", startGame);