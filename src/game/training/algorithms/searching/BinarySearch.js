import { Scene } from "phaser";

var isSearching = false;
var boxStatus = [];

export class BinarySearch extends Scene {
  constructor() {
    super("BinarySearch");
    this.array = [];
    this.rectGroup = null;
    this.currentNumber = 0;
    this.index = -1;
    this.numberText = null;
    this.displayIndex = null;
    this.low = 0;
    this.high = 35;
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("Scroll", "assets/tvzor-lazur.png");
  }

  create() {
    this.add.image(512, 384, "background").setAlpha(0.8);
    this.cameras.main.setBackgroundColor(0x330000);
    this.add.image(512, 384, "Scroll").setDisplaySize(900, 600);

    const title = this.add.text(512, 140, "Binary Search", {
      fontFamily: "Broken Console",
      fontSize: "30px",
      fill: "#ffffff",
    });
    title.setOrigin(0.5, 0.5);

    const searchButton = this.add
      .rectangle(748, 570, 300, 40, 0x60462d)
      .setInteractive();
    const searchButtonText = this.add
      .text(748, 570, "Search", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    const randomizeButton = this.add
      .rectangle(748, 620, 300, 40, 0x60462d)
      .setInteractive();
    const randomizeButtonText = this.add
      .text(748, 620, "Randomize", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    const indexButton = this.add.rectangle(300, 570, 100, 40, 0x60462d);
    const indexDisplay = this.add.rectangle(400, 570, 100, 40, 0x42a5f5);

    this.displayIndex = this.add
      .text(400, 570, "", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    const indexText = this.add
      .text(300, 570, "Index", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    const numberRectangle = this.add.rectangle(400, 620, 200, 40, 0x42a5f5);
    numberRectangle.setInteractive();
    this.numberText = this.add
      .text(400, 620, this.currentNumber.toString(), {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    const increaseButton = this.add
      .rectangle(300, 620, 100, 40, 0x66bb6a)
      .setInteractive();
    const decreaseButton = this.add
      .rectangle(500, 620, 100, 40, 0xef5350)
      .setInteractive();

    const increaseButtonText = this.add
      .text(300, 620, "+", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    const decreaseButtonText = this.add
      .text(500, 620, "-", {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
    searchButton.on("pointerover", () => {
      searchButton.setFillStyle(0x3c2920);
    });
    searchButton.on("pointerout", () => {
      searchButton.setFillStyle(0x60462d);
    });
    searchButton.on("pointerup", () => {
      if (!isSearching) {
        this.searchButtonClicked();
      }
    });
    randomizeButton.on("pointerover", () => {
      randomizeButton.setFillStyle(0x3c2920);
    });
    randomizeButton.on("pointerout", () => {
      randomizeButton.setFillStyle(0x60462d);
    });
    randomizeButton.on("pointerup", () => {
      if (!isSearching) {
        this.loadArray();
      }
    });
    increaseButton.on("pointerup", () => {
      if (!isSearching) {
        this.currentNumber++;
        this.updateNumberText();
      }
    });

    decreaseButton.on("pointerup", () => {
      if (!isSearching) {
        this.currentNumber--;
        this.updateNumberText();
      }
    });

    increaseButton.on("pointerover", () => {
      increaseButton.setFillStyle(0x3c2920);
    });

    increaseButton.on("pointerout", () => {
      increaseButton.setFillStyle(0x66bb6a);
    });
    decreaseButton.on("pointerover", () => {
      decreaseButton.setFillStyle(0x3c2920);
    });

    decreaseButton.on("pointerout", () => {
      decreaseButton.setFillStyle(0xef5350);
    });
    this.rectGroup = this.add.group();
    this.loadArray();

    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('down', () => {
      isSearching = false;
      this.currentNumber = 0;
      this.scene.start("Searching");
    })
  }

  async updateNumberText() {
    this.numberText.setText(this.currentNumber.toString());
  }

  async loadArray() {
    this.array = this.generateRandomArray(36);

    // Initialize the boxStatus array with the initial color
    boxStatus = Array.from({ length: 36 }, () => 0x00ff);

    this.loadArrayBoxes();
  }

  generateRandomArray(size) {
    const arr = Array.from({ length: size }, () =>
      Phaser.Math.Between(-99, 99)
    );
    return arr.sort((a, b) => a - b);
  }

  updateIndex() {
    if (this.displayIndex) {
      this.displayIndex.destroy();
    }

    this.displayIndex = this.add
      .text(400, 570, this.index.toString(), {
        fontSize: "20px",
        fontFamily: "Broken Console",
        fill: "#ffffff",
      })
      .setOrigin(0.5);
  }

  loadArrayBoxes() {
    const arrayRows = 3;
    const arrayStartY = 270;
    const arraySpacing = 80;
    const rectWidth = 40;
    const rectHeight = 20;
    this.rectGroup.clear(true, true);

    for (let j = 0; j < arrayRows; j++) {
      for (let i = 0; i < 12; i++) {
        const x = 200 + i * 60;
        const y = arrayStartY + j * arraySpacing;

        const rect = this.add.rectangle(
          x,
          y,
          rectWidth + 10,
          rectHeight + 10,
          boxStatus[i + j * 12] // Use the boxStatus array for color
        );
        rect.setOrigin(0.5);
        this.rectGroup.add(rect);
        const valueText = this.add
          .text(x, y, this.array[i + j * 12].toString(), {
            fontSize: "20px",
            fontFamily: "Broken Console",
            fill: "#ffffff",
          })
          .setOrigin(0.5);

        const indexText = this.add
          .text(x, y + 25, (i + j * 12).toString(), {
            fontSize: "16px",
            fontFamily: "Broken Console",
            fill: "#ffffff",
          })
          .setOrigin(0.5);
      }
    }
  }

  async searchButtonClicked() {
    isSearching = true;

    for (let i = 0; i <= 35; i++) {
      this.rectGroup.getChildren()[i].setFillStyle(0x00ff);
      boxStatus[i] = 0x00ff;
    }
    this.searchResultIndex = await this.binarySearch(this.currentNumber);
    this.low = 0;
    this.high = 35;
    isSearching = false;
    return;
  }

  async binarySearch(target) {
    const boxes = this.rectGroup.getChildren();

    while (this.low <= this.high) {
      const mid = Math.floor((this.low + this.high) / 2);
      const midValue = this.array[mid];
      boxes[this.low].setFillStyle(0x00ff00);
      boxes[this.high].setFillStyle(0x00ff00);
      await this.delay(100);

      boxes[mid].setFillStyle(0x000000);
      this.index = mid;
      this.updateIndex();
      await this.delay(100);
      this.loadArrayBoxes();

      if (midValue === target) {
        this.index = mid;
        this.updateIndex();
        for (let i = 0; i <= 35; i++) {
          boxes[i].setFillStyle(0xaabbcc);
          boxStatus[i] = 0xaabbcc;
        }
        boxes[mid].setFillStyle(0xaa0000);
        return mid;
      } else if (midValue < target) {
        for (let i = 0; i <= mid; i++) {
          boxes[i].setFillStyle(0xaabbcc);
          boxStatus[i] = 0xaabbcc; // Update the boxStatus array
        }
        this.low = mid + 1;
      } else {
        for (let i = 35; i >= mid; i--) {
          boxes[i].setFillStyle(0xaabbcc);
          boxStatus[i] = 0xaabbcc; // Update the boxStatus array
        }
        this.high = mid - 1;
      }
    }

    this.index = -1;
    for (let i = 0; i <= 35; i++) {
      boxes[i].setFillStyle(0xaabbcc);
      boxStatus[i] = 0xaabbcc;
    }
    this.updateIndex();
    return -1;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
