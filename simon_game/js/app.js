const app = {
  // just a utility var to remember all the colors
  colors: {
    easy: {red: "#BA4343", green: "#2ECC71", yellow: "#FFCF4B"},
    normal: {red: "#BA4343", green: "#2ECC71", yellow: "#FFCF4B", blue: "#0E3EDA"},
    hard: {red: "#BA4343", green: "#2ECC71", yellow: "#FFCF4B", blue: "#0E3EDA", orange: "#F0A500", purple: "#9B59B6"},
},

  // this var will contain the sequence said by Simon
  sequence: [],
  indice: 0,
  nbOfSequenceCellAtStart: 1,
  isGameStarted: false,
  isClickIsAvaible: false,
  isSoundActive: true,
  timeout: null,
  currentScore: 0,
  difficulty: "normal",
  sndBump: new Audio("./sound/sound.ogg"),
  sndGameover: new Audio("./sound/gameover.ogg"),
  scores: [
    {name: "---", score: 0},
    {name: "---", score: 0},
    {name: "---", score: 0}
  ],

  init: function () {
    console.log('init');
    app.drawCells();
    app.addEventOnCell();
    app.addEventToMuteSound();
    app.setDifficulty();
    document.getElementById("start").addEventListener('click', app.newGame);
    document.getElementById("restart").addEventListener('click', app.restartGame);
  },

  drawCells: function () {
    const playgroundElement = document.querySelector(".boardgame__playground");
    for (const color in app.colors[app.difficulty]) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = app.colors[app.difficulty][color];
      playgroundElement.appendChild(cell);
    }
  },

  reDrawCellsAndAddEvent: function () {
    const playgroundElement = document.querySelector(".boardgame__playground");
    playgroundElement.innerHTML = "";
    app.drawCells();
    app.addEventOnCell();
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '55px';
    // play sound
    app.isSoundActive ? app.sndBump.play() : null;
    // and reset the same style, after a small pause (150 ms)
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);

  },

  newGame: function () {
    if (!app.isGameStarted) {
      app.isGameStarted = true;
      app.createSequence();
      // start the "Simon Says" sequence
      app.simonSays(app.sequence);
    }
  },

  createSequence: function () {
    // start by reseting the sequence 
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < app.nbOfSequenceCellAtStart; index++) {
      // add the corresponding color to the sequence
      app.sequence.push(app.randomColor());
    }
  },

  simonSays: function (sequence) {
    app.showMessage("MEMORIZE the sequence..")
    if (sequence && sequence.length) {
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    } else {
      app.showMessage("Your turn !")
      app.isClickIsAvaible = true;
      app.timeoutOn();
    }
  },

  showMessage: function (message, isRed = false) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
    if (isRed) {
      messageElement.classList.add("boardgame__message--red");
    } else {      
      messageElement.classList.remove("boardgame__message--red");
    }
  },

  randomColor: function () {
    const colors = Object.keys(app.colors[app.difficulty]);
    const indexRandom = Math.floor(Math.random() * colors.length);
    console.log('color: ' + colors[indexRandom]);
    return colors[indexRandom];
  },

  timeoutOn: function () {
    app.timeout = setTimeout( app.endGame, 5000);
  },

  timeoutOff: function () {
    clearTimeout(app.timeout);
  },

  timeoutReset: function () {
    app.timeoutOff();
    app.timeoutOn();
  },

  restartGame: function () {
    app.isGameStarted = false;
    app.isClickIsAvaible = false;
    app.indice = 0;
    app.currentScore = 0;
    app.newGame();
    app.timeoutOff();
  },

  setDifficulty: function () {
    const difficultyBtnElements = document.querySelectorAll("#easy, #normal, #hard");
    const playgroungElement = document.querySelector("#playground");
    for (let buttonElement of difficultyBtnElements) {      
      buttonElement.addEventListener("click", () => {
        if (!app.isGameStarted) {
          // modifie la difficulté du jeu
          app.difficulty = buttonElement.id;
          // modifie quel bouton est allumé
          document.querySelector(".active").classList.remove("active");          
          buttonElement.classList.add("active");
          // affiche le playground de la difficulté en cours et cache les autres
          playgroungElement.classList = `boardgame__playground ${app.difficulty}`;
          app.reDrawCellsAndAddEvent();
          app.createSequence();
        }
      })
    }
  },

  endGame: function () {
    app.timeoutOff();
    app.showMessage(`Gameover ! Your longest streak: ${app.currentScore}`, true);
    app.checkBetterScore();
    app.sequence = [];
    app.indice = 0;
    app.isClickIsAvaible = false;
    app.isGameStarted = false;
    app.isSoundActive ? app.sndGameover.play() : null;
  },

  addEventOnCell: function () {
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
      cell.addEventListener("click", () => {
        if (app.isClickIsAvaible) {
          app.clickOnCell(cell.id);
        }
      })
    }
  },

  addEventToMuteSound: function () {
    const soundBtnElement = document.getElementById("sound");
    soundBtnElement.addEventListener('click', () => {
      soundBtnElement.classList.toggle("menu__sound-button--mute");
      app.isSoundActive = !app.isSoundActive;
    })
  },

  clickOnCell: function (color) {
    app.timeoutReset();
    app.bumpCell(color);
    if (app.sequence[app.indice] === color) {
      app.indice++;
      if (app.indice === app.sequence.length) {
        app.nextMove();
      }
    } else {
      app.endGame();
    }
  },

  updateScoreAndDisplay: function () {    
    app.currentScore = app.sequence.length;
  },

  nextMove: function () {
    app.timeoutOff();
    app.updateScoreAndDisplay();
    app.indice = 0;
    app.isClickIsAvaible = false;
    const color = app.randomColor();
    app.sequence.push(color);
    setTimeout(app.simonSays, 1000, app.sequence);
  },

  checkBetterScore: function () {
    const minScore = app.scores[app.scores.length - 1].score;
    if (app.currentScore > minScore) {
      app.displayPopupUsername();
    }
  },

  displayPopupUsername: function () {
    const popupUsernameElement = document.querySelector(".popup-score");
    popupUsernameElement.classList.remove("hidden");
    const inputUsernameElement = document.querySelector(".popup-score__input");
    inputUsernameElement.focus();
    document.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        popupUsernameElement.classList.add("hidden");
        const username = inputUsernameElement.value;
        inputUsernameElement.value = "";
        app.updBetterScores(username);
      }
    })
  },

  updBetterScores: function (username) {
    const lenght = app.scores.length;
    for (let index = 0; index < lenght; index++) {
      let bestUser = app.scores[index];
      if (app.currentScore > bestUser.score) {
        const newScore = {name: username, score: app.currentScore};
        app.scores.splice(index, 0, newScore);
        app.scores.pop();
        app.currentScore = 0;
        return;
      }
    }
  },
};


document.addEventListener('DOMContentLoaded', app.init);