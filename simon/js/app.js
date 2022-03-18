/**
 * 
 * Code fourni
 */
const app = {
  // just a utility var to remember all the colors
  colors: ['red','green','blue','yellow'],

  // this var will contain the sequence said by Simon
  sequence: [],

  drawCells: function () {
    const playground = document.getElementById('playground');
    for (const color of app.colors) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = color;
      cell.style.backgroundColor = color;
      playground.appendChild(cell);
    }
  },

  bumpCell: function (color) {
    // let's modify the syle directly
    document.getElementById(color).style.borderWidth = '45px';
    // play sound
    app.sound.play();
    // and reset the same style, after a small pause (150 ms)
    setTimeout( () => {
      document.getElementById(color).style.borderWidth = '0';
    }, 150);

  },

  newGame: function () {
    // start by reseting the sequence 
    app.sequence = [];
    // make it 3 times :
    for (let index = 0; index < 3; index++) {
      // get a random number between 0 and 3
      let random = Math.floor(Math.random()*4);
      // add the corresponding color to the sequence
      app.sequence.push( app.colors[random] );
    }

    // start the "Simon Says" sequence
    app.simonSays(app.sequence);
  },

  simonSays: function (sequence) {
    app.showMessage("Mémorisez la séquence")
    if (sequence && sequence.length) {
      // after 500ms, bump the first cell
      setTimeout( app.bumpCell, 500, sequence[0] );
      // plays the rest of the sequence after a longer pause
      setTimeout( app.simonSays, 850, sequence.slice(1));
    } else {
      app.showMessage("Reproduisez la séquence")
      app.isClickIsAvaiblé = true;
      app.timeoutOn();
    }
  },

  init: function () {
    console.log('init');
    app.drawCells();

    // listen click on the "go" button
    document.getElementById('go').addEventListener('click', app.newGame );
    app.addEventOnCell();    
  },

  /** Fin du code fourni. Après, c'est à toi de jouer! */

  indice: 0,
  isClickIsAvaiblé: false,
  timeout: null,
  sound: new Audio("./sound/sound.ogg"),

  showMessage: function (message) {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = message;
    messageElement.classList.remove("hidden");
    document.getElementById('go').classList.add("hidden");    
  },

  hideMessage: function () {
    document.getElementById('message').classList.add("hidden");
    document.getElementById('go').classList.remove("hidden");    
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

  endGame: function () {
    app.timeoutOff();
    alert(`Partie terminée. Votre score : ${app.sequence.length}`);
    app.hideMessage();
    app.sequence = [];
    app.indice = 0;
    app.isClickIsAvaiblé = false;
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

  nextMove: function () {
    app.timeoutOff();
    app.indice = 0;
    app.isClickIsAvaiblé = false;
    const color = app.colors[Math.floor(Math.random() * 4)];
    app.sequence.push(color);
    app.simonSays(app.sequence);
  }

};


document.addEventListener('DOMContentLoaded', app.init);