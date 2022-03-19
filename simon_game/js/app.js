/**
 * 
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: {
    easy: {red: "#BA4343", green: "#2ECC71", yellow: "#FFCF4B"},
    normal: {red: "#BA4343", green: "#2ECC71", purple: "#9B59B6", yellow: "#FFCF4B"},
    herd: {red: "#BA4343", green: "#2ECC71", purple: "#9B59B6", yellow: "#FFCF4B"},
},

  // this var will contain the sequence said by Simon
  sequence: [],

  drawCells: function () {
    const easyElement = document.querySelector(".boardgame__playground-easy");
    const normalElement = document.querySelector(".boardgame__playground-normal");
    const hardElement = document.querySelector(".boardgame__playground-hard");
    const colors = app.colors[app.difficulty];
    for (const color in colors) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = colors[color];
      normalElement.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    console.log(color);
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
      // start by reseting the sequence 
      app.sequence = [];
      // make it 3 times :
      for (let index = 0; index < 3; index++) {
        // add the corresponding color to the sequence
        app.sequence.push(app.randomColor());
      }
      // start the "Simon Says" sequence
      app.simonSays(app.sequence);
    }
  },

  simonSays: function (sequence) {
    app.showMessage("MEMORISEZ la séquence..")
    if (sequence && sequence.length) {
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    } else {
      app.showMessage("A vous !")
      app.isClickIsAvaiblé = true;
      app.timeoutOn();
    }
  },

  init: function () {
    console.log('init');
    app.drawCells();
    app.addEventOnCell();
    app.addEventToMuteSound();
    app.setDifficulty();
    app.addEventToDifficulytButton();
    document.getElementById("start").addEventListener('click', app.newGame);
    document.getElementById("restart").addEventListener('click', app.restartGame);
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  indice: 0,
  isGameStarted: false,
  isClickIsAvaiblé: false,
  isSoundActive: true,
  timeout: null,
  score: 0,
  difficulty: "normal",
  sndBump: new Audio("./sound/sound.ogg"),
  sndGameover: new Audio("./sound/gameover.ogg"),

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
    app.isClickIsAvaiblé = false;
    app.indice = 0;
    app.score = 0;
    app.newGame();
    app.timeoutOff();
  },

  setDifficulty: function () {
    const difficultyBtnElements = document.querySelectorAll("#easy, #normal, #hard");
    for (let buttonElement of difficultyBtnElements) {      
      buttonElement.addEventListener("click", () => {
        if (!app.isGameStarted) {          
          document.querySelector(".active").classList.remove("active");
          buttonElement.classList.add("active");
          app.difficulty = buttonElement.id;
        }
      })
    }
  },

  endGame: function () {
    app.timeoutOff();
    app.showMessage(`Partie terminée. Votre série la plus longue : ${app.score}`, true);
    app.sequence = [];
    app.indice = 0;
    app.isClickIsAvaiblé = false;
    app.isGameStarted = false;
    // play sound
    app.isSoundActive ? app.sndGameover.play() : null;
  },

  addEventOnCell: function () {
    const cells = document.querySelectorAll(".cell");
    for (let cell of cells) {
      cell.addEventListener("click", () => {
        if (app.isClickIsAvaiblé) {
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

  addEventToDifficulytButton: function () {

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
    app.score = app.sequence.length;
    const scoreTextElement = document.getElementsByClassName("score");
    scoreTextElement.innerHTML = `Score de série : ${app.score}`;
  },

  nextMove: function () {
    app.timeoutOff();
    // app.updateScoreAndDisplay();
    app.indice = 0;
    app.isClickIsAvaiblé = false;
    const color = app.randomColor();
    app.sequence.push(color);
    setTimeout(app.simonSays, 1000, app.sequence);
  }

};


document.addEventListener('DOMContentLoaded', app.init);