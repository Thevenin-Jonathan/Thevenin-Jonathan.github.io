const app = {
  init: () => {
    app.drawBoard();
    app.listenKeyboardEvents();
  },  

  MAX_ROW: 4,
  MAX_CELL: 6,

  gameOver: false,
  boardElement: document.querySelector(".board"),
  playerElement: null,

  player :{
    x: 0,
    y: 0,
    direction: "right",
    moveCount: 0,
  },

  targetCell: {
    x: 5,
    y: 3,
  },

  drawBoard: () => {
    for (let i = 0; i < app.MAX_ROW; i++) {
      const rowElement = document.createElement("div");
      rowElement.classList.add("row");
      app.boardElement.appendChild(rowElement);
      for (let j = 0; j < app.MAX_CELL; j++) {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        if (i === app.targetCell.y && j === app.targetCell.x) {
          cellElement.classList.add("target-cell");
        }
        if (i === app.player.y && j === app.player.x) {
          playerElement = document.createElement("div");
          playerElement.classList.add("player", app.player.direction);
          cellElement.appendChild(playerElement);
        }
        rowElement.appendChild(cellElement);
      }
    }
  },

  isGameOver: () => {
    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.gameOver = true;
      setTimeout(() => {
        alert(`Bien joué ! Vous avez atteind la sortie en ${app.player.moveCount} mouvement${app.player.moveCount > 1 ? "s" : ""} !`);
      }, 0);
    }
  },

  listenKeyboardEvents: () => {
    document.addEventListener("keyup", event => {
      if (!app.gameOver) {
        switch (event.key) {
          case "ArrowUp":
            app.moveForward();
            break;
          case "ArrowLeft":
            app.turnLeft();
            break;
          case "ArrowRight":
            app.turnRight();
            break;
        }
      }
    });
  },

  clearBoard: () => {
    app.boardElement.innerHTML = "";
  },

  redrawBoard: () => {
    app.clearBoard();
    app.drawBoard();
    app.isGameOver();
  },

  turnRight: () => {
    if (!app.gameOver) {
      switch (app.player.direction) {
        case "right":
          app.player.direction = "down";
          break;
        case "down":
          app.player.direction = "left";
          break;
        case "left":
          app.player.direction = "up";
          break;
        case "up":
          app.player.direction = "right";
          break;
      }
    }
    app.player.moveCount++;
    app.redrawBoard();
  },

  moveForward: () => {
    if (!app.gameOver) {
      switch (app.player.direction) {
        case "right":
          if (app.player.x < app.MAX_CELL-1) {
            app.player.x++;
          }
          break;
        case "down":
          if (app.player.y < app.MAX_ROW-1) {
            app.player.y++;
          }
          break;
        case "left":
          if (app.player.x > 0) {
            app.player.x--;
          }
          break;
        case "up":
          if (app.player.y > 0) {
            app.player.y--;
          }
          break;
      }
    }
    app.player.moveCount++;
    app.redrawBoard();
  },

  turnLeft: () => {
    switch (app.player.direction) {
      case "right":
        app.player.direction = "up";
        break;
      case "down":
        app.player.direction = "right";
        break;
      case "left":
        app.player.direction = "down";
        break;
      case "up":
        app.player.direction = "left";
        break;
    }
    app.player.moveCount++;
    app.redrawBoard();
  }
}

document.addEventListener('DOMContentLoaded', app.init);