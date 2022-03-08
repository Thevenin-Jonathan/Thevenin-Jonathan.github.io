//Challenge Pendu
//--------------------

//Game initialisation -----
var wordsList = ['crayon', 'stylo', 'feutre', 'pointe', 'mine', 'gomme', 'dessin', 'coloriage', 'rayure', 'peinture', 'pinceau', 'couleur', 'craie', 'papier', 'feuille',
                'cahier', 'carnet', 'carton', 'ciseaux', 'découpage', 'pliage', 'colle', 'affaire', 'casier', 'caisse', 'trousse', 'cartable', 'jouet', 'pion', 'domino']
var wordIndex;
var wordToFind = "";
var foundLetterList = [];
var currentWord = "";
var currentLetter = "";
var tryLeft;
var maxTry;

initiateGame();

//Welcome message
alert("Bienvenue dans le jeu du pendu, vous êtes pret?");

//Game loop -----
while (tryLeft >= 1) {
    console.log("Mot à trouver: " + wordToFind);
    currentLetter = askLetter();
    isLetterInWord(currentLetter);

    if (tryLeft < 1) {
        displayLooseMessage();
        askReplay();
    } else {
        if (isWordFound(currentWord, wordToFind)) {
            displayWinMessage();
            askReplay();
        }
    }
}

//Goodbye message
alert("Merci d'avoir jouer à mon jeu :)")




function initiateGame() {
    maxTry = 5;
    tryLeft = 5;
    foundLetterList = [];

    //initialisation avec un rand de l'index pour la liste de mot
    wordIndex = randWordIndex(wordsList);
    //initialisation du mot à trouver
    wordToFind = wordsList[wordIndex].toUpperCase();
    //initialisation du mot en cours de reflexion de l'utilisateur
    currentWord = initCurrentWord(wordToFind);
}

function isWordFound(word1, word2) {
    if (word1 === word2) {
        return true;
    }
    return;
}

function displayWinMessage() {
    alert("Bravo, vous avez trouvé le mot ! Bien joué !");
}

function displayLooseMessage() {
    alert("Vous avez perdu, désolé ! Le mot à trouver était: " + wordToFind + " !");
}

function askReplay() {
    if (confirm("Voulez vous rejouer ?")) {
        return initiateGame();
    }
    return;
}

function randWordIndex(list){
    return index = Math.floor(Math.random() * list.length);
}

function initCurrentWord(word){
    var initWord = "";
    for (var i = 0; i < word.length; i++) {
        initWord += "_";
    }
    return initWord;
}

function checkEntry(letter) {
    if (letter.length === 1) {        
        var char = letter.charAt(0);
        return (/[a-zA-Z]/).test(char);
    }
    return;
}

function addToLetterList(letter) {
    foundLetterList.push(letter);
}

function notALetter() {
    alert("Mauvaise entrée ! Merci de taper une lettre uniquement :)");
    askLetter();
}

function isLetterInWord(letter) {
    if (foundLetterList.includes(letter)) {
        return alreadyTriedLetter();
    }
    else if (wordToFind.includes(letter)) {
        addToLetterList(letter);
        return updateCurrentWord(letter);
    } else {
        return wrongLetter(letter);
    }
}

function alreadyTriedLetter() {
    alert("Vous avez déjà éssayé cette lettre !");
}

function updateCurrentWord(letter) {
    for (var i = 0; i < wordToFind.length; i++) {
        if (wordToFind[i] === letter) {              
            currentWord = currentWord.substring(0, i) + letter + currentWord.substring(i + 1, currentWord.length);
        }       
    }
}

function wrongLetter(letter) {
    alert("Faux, cette lettre n'est pas dans le mot !")
    tryLeft--;
}

function askLetter(){
    var letter = prompt("Mot à deviner: " + currentWord + " - Quel lettre voulez vous essayez? - " + tryLeft + " essais restant");
    if (checkEntry(letter)) {
        return letter.toUpperCase();
    } else {
        return notALetter();
    }
}