import {
  Scene
} from 'phaser';
import {
  Player
} from '../player';
import {
  Direction
} from '../direction';
import {
  GridControls
} from "../GridControls";
import {
  GridPhysics
} from "../GridPhysics";
import {
  InfoPanel
} from '../InfoPanel';
import {
  InventoryScreen
} from './InventoryScreen';
import {
  MapScreen
} from './MapScreen';


export class Game extends Scene {
  constructor() {
      super('Game');
  }

  player_x = 10;
  player_y = 10;

  init(data) {
      if (data.fromRoom) {
          this.player_x = data.currentX;
          this.player_y = data.currentY;
      }
  }

  preload() {

      this.load.image("tiles", "assets/Beneath_Mohenjodaro_Tiles.png");
      this.load.tilemapTiledJSON("starting-room", "assets/starting_room.tmj");
      this.load.spritesheet("player", "assets/characters.png", {
          frameWidth: 26,
          frameHeight: 36,
      });
  }

  create() {

      const startingRoomTileMap = this.make.tilemap({
          key: 'starting-room',
          tileHeight: 16,
          tileWidth: 16
      })

      const tileset = startingRoomTileMap.addTilesetImage("Beneath_Mohenjodaro_Tiles", "tiles");
      // console.log(startingRoomTileMap.layers.length.toString());
      for (let i = 0; i < startingRoomTileMap.layers.length; i++) {
          const layer = startingRoomTileMap
              .createLayer(i, "Beneath_Mohenjodaro_Tiles", 0, 0)
          layer.setDepth(i);
          layer.scale = 3;
      }





      const playerSprite = this.add.sprite(0, 0, "player");
      playerSprite.setDepth(4);
      playerSprite.scale = 3;

      this.cameras.main.startFollow(playerSprite, true, 0.5, 0.5);
      this.player = new Player(playerSprite, new Phaser.Math.Vector2(this.player_x, this.player_y));

      this.gridPhysics = new GridPhysics(this.player, startingRoomTileMap)
      this.gridControls = new GridControls(this.input, this.gridPhysics)

      this.createPlayerAnimation(Direction.UP, 94, 95);
      this.createPlayerAnimation(Direction.RIGHT, 82, 83);
      this.createPlayerAnimation(Direction.DOWN, 58, 59);
      this.createPlayerAnimation(Direction.LEFT, 70, 71);



      // if(this.gridPhysics.collision_with_artifact) {console.log('works');}
      //console.log(this.gridPhysics.collision_with_artifact)


      var key_x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
      key_x.on('down', () => {
          if (this.gridPhysics.isFacingObject) this.load_artifact_information();

      })
      var key_i = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
      key_i.on('down', () => {
          this.load_inventory();

      })

      var key_t = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
      key_t.on('down', () => {
          this.teleport();

      })
      var key_tab = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
      key_tab.on('down', () => {
          this.show_map();
      })

  }


  createPlayerAnimation(name, startFrame, endFrame) {
      this.anims.create({
          key: name,
          frames: this.anims.generateFrameNumbers("player", {
              start: startFrame,
              end: endFrame,
          }),
          frameRate: 10,
          repeat: -1,
          yoyo: true,
      });
  }




    load_artifact_information() {
        const newScene = this.scene.add('InfoPanel', InfoPanel, false);
        //        newScene.cameras.main.centerOn(this.cameras.main.centerX, this.cameras.main.centerY);
        this.scene.pause('Game')
        this.scene.launch('InfoPanel', {
            desc: this.gridPhysics.getFacingObjectDesc(),
            retScreen: 'Game',
        });



  }


    load_inventory() {
        this.scene.add('InventoryScreen', InventoryScreen, false);
        this.scene.pause('Game')
        this.scene.launch('InventoryScreen', {retScreen: 'Game'})
    }

    show_map() {
        this.scene.add('MapScreen', MapScreen, false);
        this.scene.pause('Game')
        this.scene.launch('MapScreen', {isTeleporting: false, sourceRoom: "Game"});
    }

    teleport() {
        this.scene.add('MapScreen', MapScreen, false);
        this.scene.pause('Game')
        this.scene.launch('MapScreen', {isTeleporting: true, sourceRoom: "Game"});
    }

  update(_time, delta) {
      this.gridControls.update();
      this.gridPhysics.update(delta);
        if (this.player.getTilePos().x === 20 && this.player.getTilePos().y === 7 && this.gridPhysics.facingDirection === Direction.UP) this.scene.start('Room0', {
            SourceRoom: "Game"
        });



      //  console.log(this.player.getTilePos())

  }
}