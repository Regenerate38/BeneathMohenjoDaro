import { Scene } from "phaser";
import {STATES} from '../../states'

export class Puzzle3 extends Scene {
  constructor() {
    super("Puzzle3");
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
    this.displayProblemStatement();
    const nextButton = this.add
      .rectangle(512, 520, 150, 40, 0x60462d)
      .setInteractive();
    this.add
      .text(512, 520, "Next", {
        fontFamily: "Broken Console",
        fontSize: "20px",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    nextButton.on("pointerover", () => {
      nextButton.setFillStyle(0x3c2920);
    });
    nextButton.on("pointerout", () => {
      nextButton.setFillStyle(0x60462d);
    });
    nextButton.on("pointerdown", () => {
      this.scene.start("FourQueens");
      //   console.log("4 queens begin");
    });
  }
  displayProblemStatement() {
    this.add
      .text(
        512,
        370,
        "Problem: Place four queens on a 4x4 chessboard in such\na way that no two queens threaten each other.\nA queen can attack any piece in the\nsame row, column, or diagonal.\nFind a valid arrangement for the queens.",
        {
          fontFamily: "Chiller",
          fontSize: "40px",
          fontStyle: "bold",
          fill: "#8a0303",
        }
      )
      .setOrigin(0.5);
  }
}
