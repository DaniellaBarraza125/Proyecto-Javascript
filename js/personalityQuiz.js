const startPersonalityButton = document.getElementById("personalityStartBtn");
const nextPersonalityButton = document.getElementById("personalityNextBtn");
const questionPersonalityContainerElement = document.getElementById("personalityTestContainer");
const questionPersonalityElement = document.getElementById("personalityQuestions");
const answerPersonalityButtonsElement = document.getElementById("personalityAnswerButtons");
const resultsPersonalityButton = document.getElementById("resultsPersonalityButton")
const graficDiv = document.getElementById("graficDiv")


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

    const startPersonalityGame = () => {
    startPersonalityButton.classList.add("hide");
    resultsPersonalityButton.classList.add("hide");
    currentPersonalityIndex = 0;
    questionPersonalityContainerElement.classList.remove("hide");
    setNextPersonalityQuestion();
    }

    const showPersonalityQuestion = (question) => {
        questionPersonalityElement.innerText = question.question;
        console.log(phoebe,ross,joey,rachel,monica,chandler);
        question.answers.forEach((answer) => {
            const button = document.createElement("button");
            button.value = answer.character; 
            button.innerText = `${answer.answer} `;
            button.classList.add("personalitybutton")
            button.addEventListener("click", selectPersonalityAnswer);
            answerPersonalityButtonsElement.appendChild(button);
        });
    }
    
const resetPersonalityState = ()=> {
    nextPersonalityButton.classList.add("hide");
    answerPersonalityButtonsElement.innerHTML = "";
}

const setNextPersonalityQuestion = () => {
    resetPersonalityState();
    showPersonalityQuestion(questions[currentPersonalityIndex]); 
  }

const setPersonalityScores= (character)=> {

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
const selectPersonalityAnswer = (event) => {
    const selectedPersonalityButton = event.target; 
    const character = selectedPersonalityButton.value; 
    setPersonalityScores(character);
    console.log(questions.length, currentPersonalityIndex + 1);
    if (questions.length === currentPersonalityIndex + 1) { 
        resultsPersonalityButton.classList.remove("hide"); 
        answerPersonalityButtonsElement.innerHTML = "";
        questionPersonalityElement.innerText = "";
        startPersonalityButton.innerText = "Restart";
        startPersonalityButton.classList.remove("hide");

        graficarPuntajes();
    } else {
        currentPersonalityIndex++; 
        setNextPersonalityQuestion(); 
    }
}


startPersonalityButton.addEventListener("click", startPersonalityGame);
nextPersonalityButton.addEventListener("click", () => {
  currentPersonalityIndex++;
  setNextPersonalityQuestion();
});


// graficas
const graficarPuntajes = ()=> {
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
const showPersonalityResultsDiv =()=>{
    hideViews();
    resultsDiv.classList.remove("hide");
    graficDiv.classList.remove("hide")
    // console.log("working");
}

resultsPersonalityButton.addEventListener("click",showPersonalityResultsDiv)