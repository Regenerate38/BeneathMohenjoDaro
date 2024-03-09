import { Scene } from "phaser";

export class Pathfinding extends Scene {
  constructor() {
    super("Pathfinding");
  }
  preload() {
    this.load.image("Scroll", "/assets/tvzor-lazur.png");
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
        text: "Breadth First",
        key: 1,
      },
      {
        x: 748,
        y: 200,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Depth First",
        key: 2,
      },
      {
        x: 276,
        y: 320,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Dijkstra Algorithm",
        key: 3,
      },
      {
        x: 748,
        y: 320,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Breadth First",
        key: 4,
      },
      {
        x: 276,
        y: 440,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Breadth First",
        key: 5,
      },
      {
        x: 748,
        y: 440,
        width: 300,
        height: 80,
        color: 0x60462d,
        text: "Breadth First",
        key: 6,
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
      });
    });
  }

  handleButtonClick(key) {
    switch (key) {
      case 1:
        this.scene.start("BreadthFirst");
        break;
      case 2:
        this.scene.start("DepthFirst");
        break;
      case 3:
        this.scene.start("DijkstraAlgorithm");
        break;
      case 4:
        this.scene.start("BreadthFirst");
        break;
      case 6:
        this.scene.start("BreadthFirst");
        break;
      default:
        break;
    }
  }
}
