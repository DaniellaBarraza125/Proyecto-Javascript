const startPersonalityButton = document.getElementById("personalityStartBtn");
const nextPersonalityButton = document.getElementById("personalityNextBtn");
const questionPersonalityContainerElement = document.getElementById(
    "personalityTestContainer",
);
const questionPersonalityElement = document.getElementById(
    "personalityQuestions",
);
const answerPersonalityButtonsElement = document.getElementById(
    "personalityAnswerButtons",
);
const resultsPersonalityButton = document.getElementById(
    "resultsPersonalityButton",
);
const graficDiv = document.getElementById("graficDiv");
const personalityResult = document.getElementById("personalityResult");

const personalityAPI =
    "https://mocki.io/v1/ccd5365c-9e98-4d3a-aa0d-6fc0db893260";
let myChart;
let ross = 0;
let monica = 0;
let rachel = 0;
let phoebe = 0;
let joey = 0;
let chandler = 0;

let questions = [];

axios
    .get(personalityAPI)
    .then((res) => {
        questions = res.data.preguntas;
        questions.forEach((question) => {
            answers = question.answers;
        });
    })
    .catch((err) => console.error(err));

let currentPersonalityIndex;

const startPersonalityGame = () => {
    ross = 0;
    monica = 0;
    rachel = 0;
    joey = 0;
    chandler = 0;
    phoebe = 0;
    startPersonalityButton.classList.add("hide");
    resultsPersonalityButton.classList.add("hide");
    currentPersonalityIndex = 0;
    questionPersonalityContainerElement.classList.remove("hide");
    setNextPersonalityQuestion();
};

const showPersonalityQuestion = (question) => {
    questionPersonalityElement.innerText = question.question;

    // console.log(phoebe, ross, joey, rachel, monica, chandler);

    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.value = answer.character;
        button.innerText = `${answer.answer} `;
        button.classList.add("personalitybutton");
        button.addEventListener("click", selectPersonalityAnswer);
        answerPersonalityButtonsElement.appendChild(button);
    });
};

const resetPersonalityState = () => {
    nextPersonalityButton.classList.add("hide");
    answerPersonalityButtonsElement.innerHTML = "";
};

const setNextPersonalityQuestion = () => {
    resetPersonalityState();
    showPersonalityQuestion(questions[currentPersonalityIndex]);
};

const setPersonalityScores = (character) => {
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
};
const selectPersonalityAnswer = (event) => {
    const selectedPersonalityButton = event.target;
    const character = selectedPersonalityButton.value;
    setPersonalityScores(character);
    // console.log(questions.length, currentPersonalityIndex + 1);

    if (questions.length === currentPersonalityIndex + 1) {
        resultsPersonalityButton.classList.remove("hide");
        answerPersonalityButtonsElement.innerHTML = "";
        questionPersonalityElement.innerText = "";
        startPersonalityButton.innerText = "Restart";
        startPersonalityButton.classList.remove("hide");
        resetChart();
        graficarPuntajes();
    } else {
        currentPersonalityIndex++;
        setNextPersonalityQuestion();
    }
};

startPersonalityButton.addEventListener("click", startPersonalityGame);
nextPersonalityButton.addEventListener("click", () => {
    currentPersonalityIndex++;
    setNextPersonalityQuestion();
});
let resultCharacter;
let finalPersonalityScore;

const setCharater = () => {
    if (questions.length === currentPersonalityIndex + 1)
        console.log(
            "rachel",
            rachel,
            "ross",
            ross,
            "joey",
            joey,
            "chandler",
            chandler,
            "monica",
            monica,
            "phoebe",
            phoebe,
        );
    switch (true) {
        case ross >= rachel &&
            ross >= joey &&
            ross >= monica &&
            ross >= chandler &&
            ross >= phoebe:
            console.log("ross");
            break;
        case rachel >= ross &&
            rachel >= joey &&
            rachel >= monica &&
            rachel >= chandler &&
            rachel >= phoebe:
            console.log("rachel");
            break;
        case monica >= ross &&
            monica >= joey &&
            monica >= rachel &&
            monica >= chandler &&
            monica >= phoebe:
            console.log("monica");
            break;
        case chandler >= ross &&
            chandler >= joey &&
            chandler >= rachel &&
            chandler >= monica &&
            chandler >= phoebe:
            console.log("chandler");
            break;
        case phoebe >= ross &&
            phoebe >= joey &&
            phoebe >= rachel &&
            phoebe >= chandler &&
            phoebe >= monica:
            console.log("phoebe");
            break;

        default:
            console.log("joey");
            break;
    }
};
// graficas
let chartIdCounter = 0;

const graficarPuntajes = () => {
    resetChart();

    const chartId = `myChart-${chartIdCounter}`;
    chartIdCounter++;

    const labels = ["Phoebe", "Ross", "Rachel", "Chandler", "Monica", "Joey"];
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Pho",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [phoebe, ross, rachel, chandler, monica, joey],
            },
        ],
    };

    const config = {
        type: "radar",
        data: data,
        options: {},
    };

    const canvas = document.createElement("canvas");
    canvas.id = chartId;
    graficDiv.appendChild(canvas);

    const myChart = new Chart(canvas, config);
};

const resetChart = () => {
    if (graficDiv.children.length > 0) {
        graficDiv.removeChild(graficDiv.children[0]);
    }
};
const showPersonalityResultsDiv = () => {
    setCharater();
    showResultsDiv();
    resultsPersonalityButton.classList.add("hide");

    // console.log("working");
};

startPersonalityButton.addEventListener("click", startPersonalityGame);

resultsPersonalityButton.addEventListener("click", showPersonalityResultsDiv);
