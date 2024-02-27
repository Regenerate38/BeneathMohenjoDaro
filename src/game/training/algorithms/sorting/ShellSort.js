import { Scene } from "phaser";

var isSorting = false;

export class ShellSort extends Scene {
  constructor() {
    super("ShellSort");
    this.array = [];
    this.barGroup = null;
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

    this.array = this.generateRandomArray(12); // Adjust the array size

    const title = this.add.text(512, 140, "Shell Sort", {
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
    await this.shellSort(this.array);
    isSorting = false;
  }

  async shellSort(arr) {
    const bars = this.barGroup.getChildren();
    let n = arr.length;

    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (let i = gap; i < n; i += 1) {
        let temp = arr[i];
        let j;

        // Visualize: Change color of bars being compared
        bars[i].setFillStyle(0xff0000); // Red
        bars[i - gap].setFillStyle(0xff0000); // Red
        await this.delay(200);

        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          arr[j] = arr[j - gap];
        }

        arr[j] = temp;

        // Reset color of all bars after insertion
        bars.forEach((bar, index) => {
          if (index !== i && index !== i - gap) {
            bar.setFillStyle(0x3498db); // Blue
          }
        });

        await this.delay(200);
        this.createBars();
      }
    }

    // Reset color of all bars at the end
    bars.forEach((bar) => {
      bar.setFillStyle(0x3498db); // Blue
    });

    return arr;
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

    this.barGroup.clear(true, true);

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
