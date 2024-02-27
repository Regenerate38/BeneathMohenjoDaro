import { Scene } from "phaser";

var isSorting = false;
export class SelectionSort extends Scene {
  constructor() {
    super("SelectionSort");
    this.array = [];
    this.barGroup = null;
    // this.randomizeArray();
  }

  preload() {
    this.load.image("Scroll", "../../../../../public/assets/tvzor-lazur.png");
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
      this.scene.start("Sorting");
    });

    // this.createVisualizer(this.generateRandomArray(12));
    // this.randomizeArray();
    this.array = this.generateRandomArray(12);

    const title = this.add.text(512, 140, "Selection Sort", {
      fontFamily: "Broken Console",
      fontSize: "30px",
      fill: "#ffffff",
    });
    title.setOrigin(0.5, 0.5);

    this.createButtons();

    this.barGroup = this.add.group();
    this.createBars();
  }

  createButtons() {
    var buttonContainer = this.add.container(0, 0);
    var buttonData = [
      {
        x: 276,
        y: 620,
        width: 300,
        height: 40,
        color: 0x60462d,
        text: "Sort",
      },
      {
        x: 748,
        y: 620,
        width: 300,
        height: 40,
        color: 0x60462d,
        text: "Randomize",
      },
    ];
    buttonData.forEach((data, index) => {
      var button = this.add.rectangle(
        data.x,
        data.y,
        data.width,
        data.height,
        data.color
      );
      button.setInteractive();

      var buttonText = this.add.text(data.x, data.y, data.text, {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      });
      buttonText.setOrigin(0.5, 0.5);

      buttonContainer.add([button, buttonText]);

      button.on("pointerover", () => {
        button.fillColor = 0x3c2920;
      });

      button.on("pointerout", () => {
        button.fillColor = data.color;
      });
      button.on("pointerdown", () => {
        if (index === 0 && !isSorting) {
          this.sortArray();
        } else if (index === 1 && !isSorting) {
          this.randomizeArray();
        }
      });
    });
  }

  async sortArray() {
    isSorting = true;
    const bars = this.barGroup.getChildren();

    for (let i = 0; i < 12; i++) {
      for (let j = i + 1; j < 12; j++) {
        this.createBars();

        bars[i].setFillStyle(0xaa0000);
        if (bars[j]) bars[j].setFillStyle(0xaa0000);
        await this.delay(200);

        if (this.array[i] > this.array[j]) {
          [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }

        this.createBars();
        // if (bars[j]) {
        //   bars[i].setFillStyle(0xaa0000);

        //   bars[j].setFillStyle(0xaa0000);
        // }
        await this.delay(200);
      }
      for (let k = 0; k <= i; k++) {
        bars[k].setFillStyle(0x27ae60);
      }
    }
    isSorting = false;
  }

  randomizeArray() {
    this.array = this.generateRandomArray(12);
    this.createBars();
  }

  generateRandomArray(size) {
    return Array.from({ length: size }, () => Phaser.Math.Between(10, 100));
  }

  createBars() {
    const barWidth = 40;
    const barSpacing = 10;
    const startX =
      (this.sys.game.config.width -
        (barWidth + barSpacing) * this.array.length) /
      2;

    const maxHeight = Math.max(...this.array);
    const startY = this.sys.game.config.height - maxHeight;

    this.barGroup.clear(true, true); // Clear existing bars

    this.array.forEach((value, index) => {
      const rect = this.add.rectangle(
        startX + (barWidth + barSpacing) * index,
        580,
        barWidth,
        value * 4,
        0x3498db
      );
      rect.setOrigin(0.5, 1);
      this.barGroup.add(rect);

      const text = this.add.text(rect.x, rect.y, value.toString(), {
        fontSize: "16px",
        fill: "#ffffff",
      });
      text.setOrigin(0.5, 1);
      rect.setData("index", index);
      rect.setData("value", value);
    });
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
