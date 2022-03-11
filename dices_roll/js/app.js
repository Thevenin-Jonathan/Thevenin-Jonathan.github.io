/*************************************************/
/***********************GAME**********************/
/*************************************************/
initGame();

/*************************************************/
/********************FUNCTIONS********************/
/*************************************************/
function initGame() {
    const divApp = document.getElementById("app");
    const divDealer = document.createElement("div");
    divDealer.id = "dealer";
    divDealer.classList.add("board");
    divApp.appendChild(divDealer);
    const playButton = document.getElementById("play-button");
    playButton.addEventListener("click", start);
}

function start() {
    emptyBoard("dealer");
    emptyBoard("player");

    let diceNumber = 6;

    for (let i = 0; i < diceNumber; i++) {
        generateDice("player");
    }
    for (let i = 0; i < diceNumber; i++) {
        generateDice("dealer");
    }
}

function emptyBoard(iD) {
    const boardElement = document.getElementById(iD);
    while(boardElement.firstChild) {
        boardElement.removeChild(boardElement.lastChild);
    }

}

function generateDice(parent) {
    const dice = {
        minFace: 1,
        maxFace: 6,
        element: document.createElement("div"),
        parent: document.getElementById(parent),
    }
    dice.element.classList.add("dice");
    dice.parent.appendChild(dice.element);
    moveDiceFaceOnX(dice);
}

function generateMinMaxNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function moveDiceFaceOnX(dice) {
    let diceBgPosition = generateMinMaxNumber(dice.minFace, dice.maxFace);
    diceBgPosition = ((diceBgPosition * 100) - 100) * -1;
    diceBgPosition += "px";
    dice.element.style.backgroundPositionX = diceBgPosition;
}


