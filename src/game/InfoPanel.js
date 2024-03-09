import { Scene } from "phaser";

export class InfoPanel extends Scene {
  constructor() {
    super("InfoPanel");
  }
  content = "Hawa";

  init(data) {
    this.content = data.desc;
  }

  preload() {
    this.load.image("tv", "/assets/tvzor-lazur.png");
  }

  create() {
    this.add.image(200, 500, "tv").setOrigin(0);
    const text = this.add
      .text(520, 600, this.content, {
        fontFamily: "Arial",
        color: "#000000",
        strokeThickness: 1,
        stroke: "#000000",
        fontSize: 22,
        align: "center",
      })
      .setOrigin(0.5);

    var key_x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    key_x.on("down", () => {
      this.scene.resume("Game");
      this.scene.remove("InfoPanel");
    });
  }
}
