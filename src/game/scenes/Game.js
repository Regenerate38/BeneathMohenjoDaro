import { Scene} from 'phaser';
import { Player } from '../player';
import { Direction } from '../direction';
import { GridControls} from "../GridControls";
import { GridPhysics } from "../GridPhysics";
import { InfoPanel } from '../InfoPanel';


export class Game extends Scene {
    constructor() {
        super('Game');
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

        const startingRoomTileMap = this.make.tilemap({ key: 'starting-room',  tileHeight: 16, tileWidth: 16 })

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
        this.player = new Player(playerSprite, new Phaser.Math.Vector2(10, 10));

        this.gridPhysics = new GridPhysics(this.player, startingRoomTileMap)
        this.gridControls = new GridControls(this.input, this.gridPhysics)

        this.createPlayerAnimation(Direction.UP, 94, 95);
        this.createPlayerAnimation(Direction.RIGHT, 82, 83);
        this.createPlayerAnimation(Direction.DOWN, 58, 59);
        this.createPlayerAnimation(Direction.LEFT, 70, 71);

       
        // if(this.gridPhysics.collision_with_artifact) {console.log('works');}
       //console.log(this.gridPhysics.collision_with_artifact)
       var key_x = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
         key_x.on('down', ()=> {
            if (this.gridPhysics.isFacingObject) this.load_artifact_information();
            
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
        const newScene =this.scene.add('InfoPanel', InfoPanel, false);
//        newScene.cameras.main.centerOn(this.cameras.main.centerX, this.cameras.main.centerY);
        this.scene.pause('Game')
        this.scene.launch('InfoPanel',  {desc: this.gridPhysics.getFacingObjectDesc()});
           
      
    }

    update(_time, delta) {
        this.gridControls.update();
        this.gridPhysics.update(delta);

        if(this.player.getTilePos().x ===20 && this.player.getTilePos().y === 7) this.scene.start('Room0',);
       
       
      //  console.log(this.player.getTilePos())
       
    }
}