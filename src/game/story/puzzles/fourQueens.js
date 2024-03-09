import {
  Scene
} from "phaser";

export class FourQueens extends Scene {
  constructor() {
    super("FourQueens");
    this.queens = [];
    this.isValidLength = true;
  }

  preload() {
    this.load.image("inventory-bg", "assets/inventory/inventory_background.png");
  }

  create() {
    this.add.image(512, 384, "inventory-bg").setAlpha(0.8);
    this.cameras.main.setBackgroundColor(0x330000);

    const title = this.add.text(512, 140, "Puzzle...III", {
      fontFamily: "Broken Console",
      fontSize: "30px",
      fill: "#000000",
    });
    title.setOrigin(0.5, 0.5);

    this.displayBoard();
    const rect = this.add
      .rectangle(512, 600, 200, 40, 0x604626)
      .setInteractive();
    this.add
      .text(512, 600, "Check", {
        fontFamily: "Broken Console",
        fontSize: "20px",
        fontStyle: "bold",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    rect.on("pointerover", () => {
      rect.setFillStyle(0x3c2920);
    });
    rect.on("pointerout", () => {
      rect.setFillStyle(0x604626);
    });
    rect.on("pointerup", () => {
      this.checkSolution();
    });
  }

  displayBoard() {
    const cellSize = 65;
    const chessboardOffsetX = 415;
    const chessboardOffsetY = 284;

    const colors = [0xf8e1c2, 0x5a321e]; // Alternating colors for the checkered board

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const colorIndex = (i + j) % 2;
        const cell = this.add
          .rectangle(
            chessboardOffsetX + i * cellSize,
            chessboardOffsetY + j * cellSize,
            cellSize,
            cellSize,
            colors[colorIndex]
          )
          .setOrigin(0.5)
          .setInteractive();

        const text = this.add
          .text(
            cell.x,
            cell.y,
            "Q", // Displaying cell coordinates
            {
              fontFamily: "Matura MT Script Capitals",
              fontSize: "30px",
              fill: "#281715",
            }
          )
          .setOrigin(0.5);
        text.setVisible(false);

        cell.on("pointerup", () => {
          text.setVisible(!text.visible);
          this.updateQueensArray(i, j, text.visible); // Update the queens array
        });
      }
    }
  }

  updateQueensArray(row, col, visible) {
    // Update the queens array based on the visibility of the queen in a cell
    const queenIndex = this.queens.findIndex(
      (queen) => queen.row === row && queen.col === col
    );

    if (visible && queenIndex === -1) {
      this.queens.push({
        row,
        col
      });
    } else if (!visible && queenIndex !== -1) {
      this.queens.splice(queenIndex, 1);
    }
  }

  checkSolution() {
    const isSolutionValid = this.isPlacementValid();

    if (isSolutionValid) {
      console.log("Solution is valid!");
      STATES.trident = true;
      STATES.gem1 = true;
      STATES.gem2 = true
      STATES.gem3 = true
      STATES.gem4 = true
      STATES.gem5 = true
      STATES.gem6 = true
      STATES.gem7 = true
      STATES.gem8 = true
      STATES.gem9 = true
      STATES.key2 = true
      STATES.key3 = true
      this.scene.start("RewardScreen", {
        sourceRoom: "Room1",
        sourcePuzzle: "Puzzle3",
        rewardsrc: "assets/inventory/key2.png",
        rewardName: "Unique Key",
        rewardDesc: "Use this key to open some special doors in the inner area"
      })
    } else if (!this.isValidLength) {
      console.log("Invalid Length");
    } else {
      console.log("Solution is not valid!");
    }
  }

  isPlacementValid() {
    // Implement logic to check if the placement of queens is valid
    if (this.queens.length > 4) {
      this.isValidLength = false;
    } else if (this.queens.length === 4) {
      this.isValidLength = true;
      for (let i = 0; i < this.queens.length; i++) {
        for (let j = i + 1; j < this.queens.length; j++) {
          if (
            this.queens[i].row === this.queens[j].row ||
            this.queens[i].col === this.queens[j].col ||
            Math.abs(this.queens[i].row - this.queens[j].row) ===
            Math.abs(this.queens[i].col - this.queens[j].col)
          ) {
            // Two queens threaten each other
            return false;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  }
}