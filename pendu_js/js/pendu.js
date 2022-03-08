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

//Fonction qui initialise les variables du jeu
initiateGame();

//Message de bienvenue
alert("Bienvenue dans le jeu du pendu, vous êtes pret?");

//Game loop -----
//On boucle tant qu'on a au moisn 1 essai
while (tryLeft >= 1) {
    //On demande une lettre à l'utilisateur et on la stocke dans uen variable
    currentLetter = askLetter();
    //On vérifie que la lettre est dans le mot à trouver
    isLetterInWord(currentLetter);

    //On vérifie si il reste des essais à l'utilisateur
    //Si il en a moins de 1..
    if (tryLeft < 1) {
        //On affiche un message de défaite
        displayLooseMessage();
        //On lui demande si il veut rejouer
        askReplay();
    //...Sinon
    } else {
        //On vérifie si toute les lettres ont été trouvé
        //Si oui..
        if (isWordFound(currentWord, wordToFind)) {
            //On affiche un message de victoire
            displayWinMessage();
            //On lui demande si il veut rejouer
            askReplay();
        }
    }
}

//Goodbye message - FIN DU JEU
alert("Merci d'avoir jouer à mon jeu :)")

//---------------------------------

//Initialise les variables du jeu
function initiateGame() {
    maxTry = 5;
    tryLeft = 5;
    //Reset de l'array
    foundLetterList = [];

    //initialisation avec un rand de l'index pour la liste de mot
    wordIndex = randWordIndex(wordsList);
    //initialisation du mot à trouver
    wordToFind = wordsList[wordIndex].toUpperCase();
    //initialisation du mot en cours de reflexion de l'utilisateur
    currentWord = initCurrentWord(wordToFind);
}

//Compare deux string et return true ou false
function isWordFound(word1, word2) {
    return (word1 === word2);
}

//Affiche une alerte
function displayWinMessage() {
    alert("Bravo, vous avez trouvé le mot ! Bien joué !");
}

//Affiche une alerte
function displayLooseMessage() {
    alert("Vous avez perdu, désolé ! Le mot à trouver était: " + wordToFind + " !");
}

//Demande au joueur si il veut rejouer, si oui, lance la fonction d'initialisation
function askReplay() {
    if (confirm("Voulez vous rejouer ?")) {
        return initiateGame();
    }
    return;
}

//Retourne un nombre aléatoire entre 0 et la taille de l'array passé en parametre
function randWordIndex(list){
    return index = Math.floor(Math.random() * list.length);
}

//Initialise une variable avec autant de symbole underscore _ que de lettres que comporte le mot à trouver
function initCurrentWord(word){
    //Declaration du variable de type string vide
    var initWord = "";
    //Boucle auant de fois que de nombre de lettre que contient le mot à trouver
    for (var i = 0; i < word.length; i++) {
        //Ajoute un underscore a la variable initWord à chaque itération de la boucle
        initWord += "_";
    }
    //Renvoie la variable avec le nombre d'underscores nécessaires
    return initWord;
}

//Vérifie si l'utilisateur tape bien une seule lettre et rien d'autre
function checkEntry(letter) {
    //Vérifie qu'il y est qu'un seul caractere dans la string
    if (letter.length === 1) {
        //Declare un variable et l'initialise avec le caractere contenu dans letter
        var char = letter.charAt(0);
        //Renvoie true si char contient uniquement des lettre min ou maj. Test avec un regex
        return (/[a-zA-Z]/).test(char);
    }
}

//Ajoute une lettre dans un array
function addToLetterList(letter) {
    foundLetterList.push(letter);
}

//Affiche à l'utilisateur qu'il à rentré autre chose qu'une lettre puis lui redemande de rentrer une nouvelle lettre
function notALetter() {
    alert("Mauvaise entrée ! Merci de taper uniquement une lettre :)");
    askLetter();
}

//Verifie si la lettre est dans le mot à trouver
function isLetterInWord(letter) {
    //Verifie si la lettre a déjà été testé par l'utilisateur
    if (foundLetterList.includes(letter)) {
        return alreadyTriedLetter();
    }
    //Verifie si la lettre est dans le mot à trouver
    else if (wordToFind.includes(letter)) {
        //Si oui, ajoute la lettre aux lettres déjà testé
        addToLetterList(letter);
        //Retourne la fonction qui met à jour le mot à trou
        return updateCurrentWord(letter);
    //Sinon, renvoie une fonction si l'utilisateur donne une mauvaise réponse
    } else {
        return wrongLetter(letter);
    }
}

//Affiche une alerte
function alreadyTriedLetter() {
    alert("Vous avez déjà éssayé cette lettre !");
}

//Met à jour le mot à trou avec la lettre testé par l'utilisateur
function updateCurrentWord(letter) {
    //Boucle autant de fois qu'il y a de lettre dans le mot à trouver
    for (var i = 0; i < wordToFind.length; i++) {
        //Compare si la lettre testé corespond à la lettre contenu à l'index i du mot à trouver
        if (wordToFind[i] === letter) {
            //Si oui, remplace l'underscore par la lettre à l'index i du mot à trou.         
            currentWord = currentWord.substring(0, i) + letter + currentWord.substring(i + 1, currentWord.length);
        }       
    }
}

//Affiche une alerte puis fait descendre de 1 la variable du nom d'essai de l'utilisateur
function wrongLetter(letter) {
    alert("Faux, cette lettre n'est pas dans le mot !")
    tryLeft--;
}

//Demande à l'utilisateur une lettre
function askLetter(){
    var letter = prompt("Mot à deviner: " + currentWord + " - Quel lettre voulez vous essayez? - " + tryLeft + " essais restant");
    //Verifie que l'utilisateur tape bien une seule lettre et rien d'autre
    if (checkEntry(letter)) {
        //Si oui, retourne la lettre en majuscule
        return letter.toUpperCase();
    } else {
        //Sinon retourne la fonction 
        return notALetter();
    }
}