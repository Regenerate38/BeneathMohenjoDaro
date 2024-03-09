import { Scene } from "phaser";
export class Searching extends Scene {
  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("Scroll", "assets/tvzor-lazur.png");
  }
  constructor() {
    super("Searching");
  }

  create() {
    this.add.image(512, 384, "background").setAlpha(0.8);
    this.cameras.main.setBackgroundColor(0x330000);
    this.add.image(512, 384, "Scroll").setDisplaySize(900, 600);

    const title = this.add.text(512, 140, "Searching", {
      fontFamily: "Broken Console",
      fontSize: "30px",
      fill: "#ffffff",
    });
    title.setOrigin(0.5, 0.5);
    this.addButtons();
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
      key_ESC.on('down', () => {
            
          this.scene.start("TrainingRoom");

    })
  }
  addButtons() {
    const rect1 = this.add
      .rectangle(512, 350, 300, 50, 0x60462d)
      .setInteractive();
    const rect2 = this.add
      .rectangle(512, 430, 300, 50, 0x60462d)
      .setInteractive();
    const rect1Text = this.add
      .text(512, 350, "Linear Search", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    const rect2Text = this.add
      .text(512, 430, "Binary Search", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    rect1.on("pointerover", () => {
      rect1.setFillStyle(0x3c2920);
    });
    rect1.on("pointerout", () => {
      rect1.setFillStyle(0x60462d);
    });
    rect1.on("pointerdown", () => {
      this.scene.start("LinearSearch");
    });
    rect2.on("pointerover", () => {
      rect2.setFillStyle(0x3c2920);
    });
    rect2.on("pointerout", () => {
      rect2.setFillStyle(0x60462d);
    });
    rect2.on("pointerdown", () => {
      this.scene.start("BinarySearch");
    });
  }
}