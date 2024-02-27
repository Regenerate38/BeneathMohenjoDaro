import { Scene } from "phaser";

export class Sorting extends Scene {
  constructor() {
    super("Sorting");
  }
  preload() {
    this.load.image("Scroll", "../../../../public/assets/tvzor-lazur.png");
  }
  create() {
    this.cameras.main.setBackgroundColor(0x00ff00);
    this.add.image(512, 384, "background").setAlpha(0.4);
    this.add.image(512, 384, "Scroll").setDisplaySize(900, 600);

    // Create a container to hold the buttons
    var buttonContainer = this.add.container(0, 0);

    var buttonData = [
      {
        x: 276,
        y: 200,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Bubble Sort",
        key: 1,
        // sceneKey: "BubbleSort",
      },
      {
        x: 748,
        y: 200,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Quick Sort",
        key: 2,
      },
      {
        x: 276,
        y: 320,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Merge sort",
        key: 3,
      },
      {
        x: 748,
        y: 320,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Heap sort",
        key: 4,
      },
      {
        x: 276,
        y: 440,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Radix sort",
        key: 5,
      },
      {
        x: 748,
        y: 440,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Selection sort",
        key: 6,
      },
      {
        x: 276,
        y: 560,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Insertion sort",
        key: 7,
      },
      {
        x: 748,
        y: 560,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Shell sort",
        key: 8,
      },
    ];

    // Iterate through buttonData to create buttons
    buttonData.forEach((data) => {
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
        this.handleButtonClick(data.key);
        // this.scene.start("BubbleSort");
      });
    });
  }

  handleButtonClick(key) {
    switch (key) {
      case 1:
        this.scene.start("BubbleSort");
        break;
      case 2:
        this.scene.start("QuickSort");
        break;
      case 3:
        this.scene.start("MergeSort");
        break;
      case 4:
        this.scene.start("HeapSort");
        break;
      case 6:
        this.scene.start("SelectionSort");
        break;
      case 7:
        this.scene.start("InsertionSort");
        break;
      case 8:
        this.scene.start("ShellSort");
        break;
    }
  }
}
