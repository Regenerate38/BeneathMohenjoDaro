import { Scene } from "phaser";

var isSearching = false;

export class LinearSearch extends Scene {
  constructor() {
    super("LinearSearch");
    this.array = [];

    this.rectGroup = null;
    this.currentNumber = 0;
    this.index = -1;
    this.numberText = null;
    this.displayIndex = null;
  }

  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("inventory-bg", "assets/inventory/inventory_background.png");

  }

  create() {
    this.add.image(512, 384, "background").setAlpha(0.8);
    this.cameras.main.setBackgroundColor(0x330000);
    this.add.image(512, 384, "inventory-bg").setDisplaySize(900, 600);


    this.array = this.generateRandomArray(12);


    const title = this.add.text(512, 180, "Linear Search", {
      fontFamily: "Broken Console",
      fontSize: "30px",
      fill: "#000000",
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
    // this.loadArrayBoxes();
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('down', () => {
      isSearching = false;
      this.currentNumber = 0
      this.scene.start("Searching");
    })
  }

  updateNumberText() {
    this.numberText.setText(this.currentNumber.toString());
  }
  loadArray() {
    this.array = this.generateRandomArray(36);
    this.loadArrayBoxes();
  }
  generateRandomArray(size) {
    return Array.from({ length: size }, () => Phaser.Math.Between(-99, 99));
  }
  updateIndex() {
    // Destroy the existing displayIndex if it exists
    if (this.displayIndex) {
      this.displayIndex.destroy();
    }

    // Create a new text element
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
          0x00ff
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
            fill: "#000000",
          })
          .setOrigin(0.5);
      }
    }
  }

  async searchButtonClicked() {
    isSearching = true;
    this.searchResultIndex = await this.linearSearch(this.currentNumber);
    console.log("Index = ", this.searchResultIndex);
    // const boxes = this.rectGroup.getChildren();
    isSearching = false;
  }
  async linearSearch(target) {
    const boxes = this.rectGroup.getChildren();

    for (let i = 0; i < this.array.length; i++) {
      boxes[i].setFillStyle(0x00ff00);
      this.index = i;
      this.updateIndex();
      await this.delay(100);
      this.loadArrayBoxes();
      if (this.array[i] === target) {
        boxes[i].setFillStyle(0xaa0000);
        // this.loadArrayBoxes();
        return i;
      }
    }
    this.index = -1;
    this.updateIndex();
    return -1;
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
