import { Scene } from "phaser";

var isSorting = false;

export class HeapSort extends Scene {
  constructor() {
    super("HeapSort");
    this.array = [];
    this.barGroup = null;
    this.fillColors = []; // Track the fill colors
    // this.randomizeArray();
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
      this.scene.start("Sorting");
    });

    this.array = this.generateRandomArray(12); // Adjust the array size

    const title = this.add.text(512, 140, "Heap Sort", {
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
    await this.heapSort(this.array);
    isSorting = false;
  }

  async heapSort(arr) {
    var N = arr.length;

    // Initialize fill colors to default color (0x3498db)
    this.fillColors = Array(N).fill(0x3498db);

    // Build heap (rearrange array)
    for (var i = Math.floor(N / 2) - 1; i >= 0; i--) {
      await this.heapify(arr, N, i);
      await this.delay(200);
      this.createBars();
    }

    // One by one extract an element from heap
    for (var i = N - 1; i > 0; i--) {
      // Move current root to end
      var temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      // call max heapify on the reduced heap
      await this.heapify(arr, i, 0);
      await this.delay(200);
      this.createBars();
    }
  }

  async heapify(arr, N, i) {
    var largest = i; // Initialize largest as root
    var l = 2 * i + 1; // left = 2*i + 1
    var r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < N && arr[l] > arr[largest]) largest = l;

    // If right child is larger than largest so far
    if (r < N && arr[r] > arr[largest]) largest = r;

    // If largest is not root
    if (largest != i) {
      // Change fill color to indicate comparison
      this.fillColors[i] = 0xff0000; // Red
      this.fillColors[largest] = 0xff0000; // Red
      this.createBars(); // Update visualization
      await this.delay(200);

      // Swap values
      var swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      // Reset fill colors
      this.fillColors[i] = 0x3498db; // Default color
      this.fillColors[largest] = 0x3498db; // Default color
      this.createBars(); // Update visualization
      await this.delay(200);

      // Recursively heapify the affected sub-tree
      await this.heapify(arr, N, largest);
    }
  }

  randomizeArray() {
    this.array = this.generateRandomArray(12); // Adjust the array size
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
        this.fillColors[index] || 0x3498db // Use fill color from fillColors array
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
