import { Scene } from 'phaser';
import { Player } from '../../player';
import { Direction } from '../../direction';
import { GridControls } from "../../GridControls";
import { GridPhysics } from "../../GridPhysics";

export class Room0 extends Scene {
    constructor() {
        super('Room0');
    }

    player_x = 14;
    player_y = 19;

    init(data) {
<<<<<<< Updated upstream
        if(data.byTeleport) {
        this.player_x= 20;
        this.player_y = 14; 
    }
    }

    preload(){
=======
        if (data.byTeleport) {
            this.player_x = 20;
            this.player_y = 14;
        }
    }

    preload() {
>>>>>>> Stashed changes
        this.load.image("room0tiles", "assets/room_zero_tiles.png");
        this.load.tilemapTiledJSON("room_zero", "assets/room_zero.tmj");
        this.load.spritesheet("player", "assets/characters.png", {
            frameWidth: 26,
            frameHeight: 36,
        });
    }

    create() {

        const roomZeroTileMap = this.make.tilemap({ key: 'room_zero', tileHeight: 16, tileWidth: 16 })

        const tileset = roomZeroTileMap.addTilesetImage("room_zero_tiles", "room0tiles");
        // console.log(startingRoomTileMap.layers.length.toString());
        for (let i = 0; i < roomZeroTileMap.layers.length; i++) {
            const layer = roomZeroTileMap
                .createLayer(i, "room_zero_tiles", 0, 0)
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

        this.input.once('pointerdown', () => {
            // this.load_artifact_information();
        });
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

    update(_time, delta) {
        this.gridControls.update();
        this.gridPhysics.update(delta);
<<<<<<< Updated upstream
        if(this.player.getTilePos().x ===14 && this.player.getTilePos().y === 19 && this.gridPhysics.facingDirection === Direction.DOWN) 
        {this.scene.start('Game', {currentX: 20, currentY:7, fromRoom: true}) }
=======
        if (this.player.getTilePos().x === 14 && this.player.getTilePos().y === 19 && this.gridPhysics.facingDirection === Direction.DOWN) this.scene.start('Game')
>>>>>>> Stashed changes

    }
}