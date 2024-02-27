import { Scene } from "phaser";

var isSorting = false;
export class QuickSort extends Scene {
  constructor() {
    super("QuickSort");
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

    this.array = this.generateRandomArray(12);

    const title = this.add.text(512, 140, "Quick Sort", {
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
    const bars = this.barGroup.getChildren();

    isSorting = true;
    await this.quickSort(this.array, 0, 11);
    // this.createBars();
    for (var i = 0; i < 12; i++) {
      bars[i].setFillStyle(0x27ae60);
    }
    isSorting = false;
  }

  async quickSort(arr, low, high) {
    if (low < high) {
      let pi = await this.partition(arr, low, high);
      await this.quickSort(arr, low, pi - 1);
      await this.quickSort(arr, pi + 1, high);
    }
  }

  async partition(arr, low, high) {
    const bars = this.barGroup.getChildren();

    let pivot = arr[high];
    let i = low - 1;
    await this.delay(200);

    this.createBars(pivot);

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        // bars[i].setFillStyle(0xffe441);
        bars[j].setFillStyle(0x22ee11);
        await this.delay(200);

        this.createBars(pivot);
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        bars[j].setFillStyle(0xffe441);
        bars[i].setFillStyle(0x22ee11);
        await this.delay(50);
        this.createBars(pivot);
      } else {
        bars[j].setFillStyle(0xffffff);
        await this.delay(50);
        this.createBars(pivot);
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await this.delay(200);
    this.createBars(i + 1);

    return i + 1;
  }

  randomizeArray() {
    this.array = this.generateRandomArray(12);
    this.createBars();
  }

  generateRandomArray(size) {
    return Array.from({ length: size }, () => Phaser.Math.Between(10, 100));
  }

  createBars(pivotIndex) {
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
        index === pivotIndex ? 0xff0000 : 0x3498db
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
  isSorted() {
    const bars = this.barGroup.getChildren();
    for (var i = 0; i < 11; i++) {
      if (this.array[i] > this.array[i + 1]) {
        return false;
      }
    }
    return true;
  }
}
