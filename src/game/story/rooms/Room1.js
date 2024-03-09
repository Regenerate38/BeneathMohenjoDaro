import { Scene } from "phaser";
import {
    Player
} from '../../player';
import {
    Direction
} from '../../direction';
import {
    GridControls
} from "../../GridControls";
import {
    GridPhysics
} from "../../GridPhysics";
import {
    InfoPanel
} from '../../InfoPanel';
import {
    InventoryScreen
} from '../../scenes/InventoryScreen';
import {
    MapScreen
} from '../../scenes/MapScreen';

export class Room1 extends Scene {

    constructor() {
        super('Room1');
       this.player_x = 24;
        this.player_y = 38;
    }

  

    init(data) {
        if(data.byTeleport) {
            this.player_x= 3;
            this.player_y = 32; 
        }
        else if(data.sourceRoom==="Puzzle2") {
             this.player_x = 38
             this.player_y = 21
        }
        else if (data.sourceRoom==="Room0") {
            this.player_x = 24;
            this.player_y = 38;
        }
        console.log(data.sourceRoom)
    }


    preload() {
        this.load.image("room1tiles", "assets/room_one_tiles.png");
        this.load.tilemapTiledJSON("room_one", "assets/room_one.tmj");
        this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 26,
            frameHeight: 36,
          });
    }

    create() {

        const roomZeroTileMap = this.make.tilemap({ key: 'room_one',  tileHeight: 16, tileWidth: 16 })

        const tileset = roomZeroTileMap.addTilesetImage("room_one_tiles", "room1tiles");
        for (let i = 0; i < roomZeroTileMap.layers.length; i++) {
            const layer = roomZeroTileMap
                .createLayer(i, "room_one_tiles", 0, 0)
            layer.setDepth(i);
            layer.scale = 3;
        }

        const playerSprite = this.add.sprite(0, 0, "player");
        playerSprite.setDepth(4);
        playerSprite.scale = 3;
        
        this.cameras.main.startFollow(playerSprite, true, 0.5, 0.5);
        this.player = new Player(playerSprite, new Phaser.Math.Vector2(this.player_x, this.player_y));

        this.gridPhysics = new GridPhysics(this.player, roomZeroTileMap)
        this.gridControls = new GridControls(this.input, this.gridPhysics)
        
        this.createPlayerAnimation(Direction.UP, 94, 95);
        this.createPlayerAnimation(Direction.RIGHT, 82, 83);
        this.createPlayerAnimation(Direction.DOWN, 58, 59);
        this.createPlayerAnimation(Direction.LEFT, 70, 71);

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
        this.scene.pause('Room1')
        this.scene.launch('InfoPanel', {
            desc: this.gridPhysics.getFacingObjectDesc(),
            retScreen: 'Room1'
        });


    }
    load_inventory() {
        this.scene.add('InventoryScreen', InventoryScreen, false);
        this.scene.pause('Room1')
        this.scene.launch('InventoryScreen', {retScreen: 'Room1'})
    }

    show_map() {
        this.scene.add('MapScreen', MapScreen, false);
        this.scene.pause('Room1')
        this.scene.launch('MapScreen', {isTeleporting: false, sourceRoom: "Room1"});
    }

    teleport() {
        this.scene.add('MapScreen', MapScreen, false);
        this.scene.pause('Room1')
        this.scene.launch('MapScreen', {isTeleporting: true, sourceRoom: "Room1"});
    }


    update(_time, delta) {
        this.gridControls.update();
        this.gridPhysics.update(delta);
     console.log(this.player.getTilePos().x, this.player.getTilePos().y)
        if (this.player.getTilePos().y<=22 && this.player.getTilePos().y>=20  && this.player.getTilePos().x === 39 && this.gridPhysics.facingDirection === Direction.RIGHT) this.scene.start('Puzzle2', {sourceRoom: "Room1"});
        if (this.player.getTilePos().y<=21 && this.player.getTilePos().y>=19  && this.player.getTilePos().x === 0 && this.gridPhysics.facingDirection === Direction.LEFT) this.scene.start('Puzzle3', {sourceRoom: "Room1"});


    }


}