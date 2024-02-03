const colorCodeContainer = document.getElementById("color-code");
const optionContainer = document.getElementById("options-container");
const scoreContainer = document.getElementById("score");

let randomColor = null;
let score = 0;

function generateRandomNumberBetween(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function generateRandomColorRGB() {
    const generateComponent = () => generateRandomNumberBetween(0, 255);
    return `rgb(${generateComponent()}, ${generateComponent()}, ${generateComponent()})`;
}

function incrementScore() {
    score += 1;
    scoreContainer.innerText = score;
    startGame();
}

function validateResult(el) {
    const selectColor = el.target.style.backgroundColor;
    score = selectColor === randomColor ? score + 1 : 0;
    window.localStorage.setItem("score", score);
    startGame();
}

function createOptionDiv(isCorrectAnswer) {
    const div = document.createElement("div");
    div.addEventListener("click", validateResult);
    div.style.backgroundColor = isCorrectAnswer ? randomColor : generateRandomColorRGB();
    return div;
}

function startGame() {
    score = Number(window.localStorage.getItem("score")) || 0;
    scoreContainer.innerText = score;
    optionContainer.innerHTML = "";

    randomColor = generateRandomColorRGB();
    colorCodeContainer.innerText = randomColor;

    const ansIndex = generateRandomNumberBetween(0, 5);

    for (let i = 0; i < 6; i++) {
        const isCorrectAnswer = i === ansIndex;
        const div = createOptionDiv(isCorrectAnswer);
        optionContainer.append(div);
    }
}

window.addEventListener("load", startGame);
