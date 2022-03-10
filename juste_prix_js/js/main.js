/*************************************************/
/********************VARIABLES********************/
/*************************************************/

const game = {
    nbToFind: 0,
    userNb: 0,
    tryNumber: 0,
    min: 100,
    max: 1000,
    scores: []
}

/*************************************************/
/********************GAME LOOP********************/
/*************************************************/

init();
play();
displayScore();

/*************************************************/
/********************FUNCTIONS********************/
/*************************************************/

function randNumber(min, max) {
    return Math.round((Math.random() * (max - min)) + min);
}

function init() {
    game.nbToFind = randNumber(game.min, game.max);
    game.tryNumber = 0;
    console.log(game.nbToFind);
}

function play() {
    game.userNb = prompt(`Veuillez saisir un nombre entre ${game.min} et ${game.max} :`);
    game.userNb = parseInt(game.userNb);
    game.tryNumber++;
    if (game.userNb < game.nbToFind) {
        alert("Non, c'est plus !")
        return play();
    } else if (game.userNb > game.nbToFind) {
        alert("Non, c'est moins !")
        return play();
    } else {
        const s = game.tryNumber <= 1 ? "" : "s";
        alert(`Bravo, vous avez trouvé en ${game.tryNumber} essai${s} !`)
        game.scores.push(game.tryNumber);
        if (confirm("Voulez vous rejouer ?")) {
            init();
            return play();
        }
    }
}

function displayScore() {
    console.log("SCORES :")
    for (let i = 0; i < game.scores.length; i++) {
        const s = i === 0 ? "" : "s";
        console.log(`Partie ${i + 1} : ${game.scores[i]} essai${s}`);
    }
}