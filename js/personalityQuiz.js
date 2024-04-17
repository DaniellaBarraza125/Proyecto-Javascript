const startPersonalityButton = document.getElementById("personalityStartBtn");
const nextPersonalityButton = document.getElementById("personalityNextBtn");
const questionPersonalityContainerElement = document.getElementById("personalityTestContainer");
const questionPersonalityElement = document.getElementById("personalityQuestions");
const answerPersonalityButtonsElement = document.getElementById("personalityAnswerButtons");
const resultsPersonalityButton = document.getElementById("results-btn")

const personalityAPI = "https://mocki.io/v1/ccd5365c-9e98-4d3a-aa0d-6fc0db893260"

let ross=0;
let monica = 0;
let rachel = 0;
let phoebe = 0;
let joey = 0;
let chandler = 0;

let questions = [];


axios.get(personalityAPI)
.then((res) => {
    questions = res.data.preguntas; 
questions.forEach(question => {
answers = question.answers;
});
})
.catch((err) => console.error(err));



let currentPersonalityIndex;

    function startPersonalityGame() {
    startPersonalityButton.classList.add("hide");
    currentPersonalityIndex = 0;
    questionPersonalityContainerElement.classList.remove("hide");
    setNextPersonalityQuestion();
    }

function showPersonalityQuestion(question) {
    questionPersonalityElement.innerText = question.question;
    console.log(phoebe,ross,joey,rachel,monica,chandler);
    question.answers.forEach((answer) => {
        // console.log(answer);
        const button = document.createElement("button");
        button.innerHTML = `value="${answer.character}`;
        button.innerText = `${answer.answer} `
    
        button.addEventListener("click", selectPersonalityAnswer);
        answerPersonalityButtonsElement.appendChild(button);
    });
    }
function resetPersonalityState() {
    nextPersonalityButton.classList.add("hide");
    answerPersonalityButtonsElement.innerHTML = "";
}

function setNextPersonalityQuestion() {
    resetPersonalityState();
    showPersonalityQuestion(questions[currentPersonalityIndex]); 
  }

function setPersonalityScoress(character) {

// console.log(character); 
switch (character) {
case "ross":
    ross++;


    break;
case "monica":
    monica++;
 
    break;
case "rachel":
    rachel++;

    break;
case "phoebe":
    phoebe++;

    break;
case "joey":
    joey++;
 
    break;
case "chandler":
    chandler++;
  
    break;
default:
    break;
}
    // console.log(rachel,ross,joey,chandler,monica,phoebe);
}
function selectPersonalityAnswer(event) {
const selectedPersonalityButton = event.target; 
const character = selectedPersonalityButton.value; 
setPersonalityScoress(character); console.log(questions.length, currentPersonalityIndex+1);
if (questions.length > currentPersonalityIndex + 1) {
    nextPersonalityButton.classList.remove("hide");
} else {
    answerPersonalityButtonsElement.innerHTML="";
    questionPersonalityElement.innerText = "";
    startPersonalityButton.innerText = "Restart";
    startPersonalityButton.classList.remove("hide");
    graficarPuntajes();
}
}

startPersonalityButton.addEventListener("click", startPersonalityGame);
nextPersonalityButton.addEventListener("click", () => {
  currentPersonalityIndex++;
  setNextPersonalityQuestion();
});


// graficas
function graficarPuntajes() {
    // Definir los datos para la gráfica
    const labels = ['Phoebe', 'Ross', 'Rachel', 'Chandler', 'Monica', 'Joey'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'Pho',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [phoebe, ross, rachel, chandler, monica, joey], 
        }]
    };

    // Configurar la gráfica
    const config = {
        type: 'radar',
        data: data,
        options: {}
    };

    // Crear la gráfica
    const myChart = new Chart('myChart', config);
}