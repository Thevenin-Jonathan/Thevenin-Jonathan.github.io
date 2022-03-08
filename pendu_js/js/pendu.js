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

initiateGame();

//Welcome message
alert("Bienvenue dans le jeu du pendu, vous êtes pret?");

//Game loop -----
while (tryLeft >= 1) {
    console.log("Mot à trouver: " + wordToFind);
    currentLetter = askLetter();
    isLetterInWord(currentLetter);

    if (tryLeft < 1) {
        askReplay();
    }
}

//Goodbye message
alert("Merci d'avoir jouer à mon jeu :)")




function initiateGame() {
    tryLeft = 5;
    var foundLetterList = [];

    //initialisation avec un rand de l'index pour la liste de mot
    wordIndex = randWordIndex(wordsList);
    //initialisation du mot à trouver
    wordToFind = wordsList[wordIndex].toUpperCase();
    //initialisation du mot en cours de reflexion de l'utilisateur
    currentWord = initCurrentWord(wordToFind);
    return;
}

function askReplay() {
    if (confirm("Vous avez perdu, désolé ! Voulez vous rejouer ?")) {
        return initiateGame();
    }
    return;
}

function randWordIndex(list){
    var index = Math.floor(Math.random() * list.length);
    return index;
}

function initCurrentWord(word){
    var initWord = "";
    for (var i = 0; i < word.length; i++) {
        initWord += "_";
    }
    return initWord;
}

function checkEntry(letter) {
    if (letter.trim().length === 1) {
        var char = letter.charAt(0);
        return (/[a-zA-Z]/).test(char);
    } else{        
        return false;
    }
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
    for (var i = 0; i < wordToFind.length - 1; i++) { 
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