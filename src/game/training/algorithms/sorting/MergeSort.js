import { Scene } from "phaser";

var isSorting = false;

export class MergeSort extends Scene {
  constructor() {
    super("MergeSort");
    this.array = [];
    this.barGroup = null;
    this.colorArray = []; // Added color array to track bar colors
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

    this.array = this.generateRandomArray(14);
    this.colorArray = new Array(14).fill(0x3498db); // Default color

    const title = this.add.text(512, 140, "Merge Sort", {
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

    await this.mergeSort(this.array, 0, this.array.length - 1);
    for (var i = 0; i < 14; i++) {
      bars[i].setFillStyle(0x27ae60);
    }
    isSorting = false;
  }

  async mergeSort(arr, l, r) {
    if (l < r) {
      var m = l + parseInt((r - l) / 2);
      await this.mergeSort(arr, l, m);
      await this.mergeSort(arr, m + 1, r);
      await this.merge(arr, l, m, r);
      await this.delay(200);
      this.createBars();
    }
  }

  async merge(arr, l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = new Array(n1);
    var R = new Array(n2);

    for (var i = 0; i < n1; i++) L[i] = arr[l + i];
    for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    var i = 0;
    var j = 0;
    var k = l;

    while (i < n1 && j < n2) {
      // Change color for bars being compared
      this.colorArray[l + i] = 0xff0000; // Red
      this.colorArray[m + 1 + j] = 0xff0000; // Red
      await this.delay(100);
      this.createBars();

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }

    // Reset colors after merging
    for (let x = l; x <= r; x++) {
      this.colorArray[x] = 0x3498db; // Default color
    }
  }

  randomizeArray() {
    this.array = this.generateRandomArray(14);
    this.colorArray = new Array(14).fill(0x3498db); // Default color
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

    this.barGroup.clear(true, true);

    this.array.forEach((value, index) => {
      const rect = this.add.rectangle(
        startX + (barWidth + barSpacing) * index,
        580,
        barWidth,
        value * 4,
        this.colorArray[index] // Use color from colorArray
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
