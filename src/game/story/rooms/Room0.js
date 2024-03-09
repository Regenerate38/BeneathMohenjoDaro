
import {
    Scene
} from 'phaser';
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
import {
    States
} from '../../states';
import { Room1 } from './Room1';


export class Room0 extends Scene {


export class Room0 extends Scene {
    constructor() {
        super('Room0');
    }

    player_x = 14;
    player_y = 13;

    init(data) {
        if (data.byTeleport) {
            this.player_x = 8;
            this.player_y = 2;
        } else if (data.sourceRoom === "TrainingRoom") {
            this.player_x = 1;
            this.player_y = 10;
        } else if (data.sourceRoom === "Puzzle1") {
            this.player_x = 28;
            this.player_y = 12;
        }
    }

    preload() {
        this.load.image("room0tiles", "assets/room_zero_tiles.png");
        this.load.tilemapTiledJSON("room_zero", "assets/room_zero.tmj");
        this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 26,
            frameHeight: 36,
        });
    }

    create() {

        const layer = []
        const roomZeroTileMap = this.make.tilemap({
            key: 'room_zero',
            tileHeight: 16,
            tileWidth: 16
        })

        const tileset = roomZeroTileMap.addTilesetImage("room_zero_tiles", "room0tiles");
        for (let i = 0; i < roomZeroTileMap.layers.length; i++) {
            layer[i] = roomZeroTileMap.createLayer(i, "room_zero_tiles", 0, 0)
            layer[i].setDepth(i);
            layer[i].scale = 3;
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

        if (States.key1) {
            //roomZeroTileMap.removeLayer(layer[4]

            roomZeroTileMap.removeTile(roomZeroTileMap.getTileAt(15, 0))
            //roomZeroTileMap.destroyLayer(layer[4])
            console.log(roomZeroTileMap.getTileAt(15, 0))
        }



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
        this.scene.pause('Room0')
        this.scene.launch('InfoPanel', {
            desc: this.gridPhysics.getFacingObjectDesc(),
            retScreen: 'Room0'
        });


    }
    load_inventory() {
        this.scene.add('InventoryScreen', InventoryScreen, false);
        this.scene.pause('Room0')
        this.scene.launch('InventoryScreen', {
            retScreen: 'Room0'
        })
    }

    show_map() {
        this.scene.add('MapScreen', MapScreen, false);
        this.scene.pause('Room0')
        this.scene.launch('MapScreen', {
            isTeleporting: false,
            sourceRoom: "Room0"
        });
    }

    teleport() {
        this.scene.add('MapScreen', MapScreen, false);
        this.scene.pause('Room0')
        this.scene.launch('MapScreen', {
            isTeleporting: true,
            sourceRoom: "Room0"
        });
    }


    update(_time, delta) {
        this.gridControls.update();
        this.gridPhysics.update(delta);

        console.log(this.player.getTilePos().x, this.player.getTilePos().y)
        if (this.player.getTilePos().x === 0 && this.player.getTilePos().y === 10 && this.gridPhysics.facingDirection === Direction.LEFT) this.scene.start('TrainingRoom', {
            sourceRoom: "Room0"
        });
        if (this.player.getTilePos().x === 29 && this.player.getTilePos().y === 12 && this.gridPhysics.facingDirection === Direction.RIGHT) this.scene.start('Puzzle1', {
            sourceRoom: "Room0"
        });
        if (this.player.getTilePos().x === 15 && this.player.getTilePos().y === 0 && this.gridPhysics.facingDirection === Direction.UP) {
            this.scene.add('Room1', Room1, false);
            this.scene.remove('Room0')
            this.scene.start('Room1', {
                sourceRoom: "Room0"
            });

        }


    }
}