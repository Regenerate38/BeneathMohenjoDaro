import { Scene } from "phaser";

export class LinearSearch extends Scene {
  constructor() {
    super("LinearSearch");
    this.array = [];
    this.barGroup = null;
  }

  preload() {
    this.load.image("Scroll", "/assets/tvzor-lazur.png");
  }

  create() {
    this.add.image(512, 384, "background").setAlpha(0.8);
    this.cameras.main.setBackgroundColor(0x330000);
    this.add.image(512, 384, "Scroll").setDisplaySize(900, 600);
    const closeButton = this.add
      .image(120, 140, "closeButton")
      .setDisplaySize(50, 50);
    closeButton.setInteractive();
    closeButton.on("pointerdown", () => {
      closeButton.setAlpha(0.8);
    });

    this.array = this.generateRandomArray(12);

    const title = this.add.text(512, 140, "Linear Search", {
      fontFamily: "Broken Console",
      fontSize: "30px",
      fill: "#ffffff",
    });
    title.setOrigin(0.5, 0.5);

    this.createButtons();

    this.barGroup = this.add.group();
    this.createBars();
  }
}
