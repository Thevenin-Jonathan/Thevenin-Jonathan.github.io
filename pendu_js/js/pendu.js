//Challenge Pendu
//--------------------

var wordsList = ['crayon', 'stylo', 'feutre', 'pointe', 'mine', 'gomme', 'dessin', 'coloriage', 'rayure', 'peinture', 'pinceau', 'couleur', 'craie', 'papier', 'feuille',
                'cahier', 'carnet', 'carton', 'ciseaux', 'découpage', 'pliage', 'colle', 'affaire', 'casier', 'caisse', 'trousse', 'cartable', 'jouet', 'pion', 'domino']
var wordIndex = 0;
var wordToFind = "";
var foundLetterList = [];
var currentWord = "";
var currentLetter = "";
var tryLeft = 5;


//Game initialisation
wordIndex = randWordIndex(wordsList);
wordToFind = wordsList[wordIndex];
currentWord = initCurrentWord(wordToFind);

alert("Bienvenue dans le jeu du pendu, vous êtes pret?");

//Game loop
currentLetter = askLetter();

console.log("currentWord: " + currentWord);
console.log("wordIndex: " + wordIndex);
console.log("wordToFind: " + wordToFind);
console.log("currentLetter: " + currentLetter);







function randWordIndex(list){
    var index = Math.floor(Math.random() * list.length);
    return index;
}

function initCurrentWord(word){
    var initWord = ".";
    for (var i = 0; i < word.length; i++) {
        initWord += "_.";
    }
    return initWord;
}

function updateCurrentWord(){

}

function askLetter(){
    var letter = prompt("Mot à deviner: " + currentWord + " - Quel lettre voulez vous essayez? - " + tryLeft + " essais restant");
    return letter;
}