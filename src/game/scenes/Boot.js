import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
    this.load.image("background", "assets/bg.png");
    this.load.audio("main_menu_theme", ["assets/main_menu_music.mp3"]);
  }
    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        this.load.image('background', 'assets/bg.png');
        this.load.audio('main_menu_theme', [
            'assets/main_menu_music.mp3'
        ]);
        this.load.audio('success', [
            'assets/success.mp3'
        ]);
          this.load.image("closeButton", "/assets/ClosedScroll.png");

       
    }

  create() {
    this.scene.start("Pathfinding");
  }
}
