/*************************************************/
/***********************LOOP**********************/
/*************************************************/
initGame();
start();

/*************************************************/
/********************FUNCTIONS********************/
/*************************************************/
function initGame() {
    const divApp = document.getElementById("app");
    const divDealer = document.createElement("div");
    divDealer.id = "dealer";
    divDealer.classList.add("board");
    divApp.appendChild(divDealer);
}

function start() {
    let diceNumber = parseInt(prompt("Combien voulez vous lancer de dé ?"));
    for (let i = 0; i < diceNumber; i++) {
        generateDice("player");
    }
    for (let i = 0; i < diceNumber; i++) {
        generateDice("dealer");
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
    let positionBgDice = generateMinMaxNumber(dice.minFace, dice.maxFace);
    positionBgDice = ((positionBgDice * 100) - 100) * -1;
    positionBgDice += "px";
    dice.element.style.backgroundPositionX = positionBgDice;
}


