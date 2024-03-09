import {
    Scene
} from 'phaser';
import { Room1 } from '../story/rooms/Room1';
import { Room0 } from '../story/rooms/Room0';

export class MapScreen extends Scene {
    constructor() {
        super('MapScreen')
    }
    sourceRoom = ""
    isTeleporting = false;

    init(data) {
        this.isTeleporting = data.isTeleporting;
        this.sourceRoom = data.sourceRoom;

    }
   

    preload() {
        this.load.image("map-bg", "assets/map/MapBackground.png");
        this.load.image("bottom-room", "assets/map/BottomRoom.png");
        this.load.image("center-room", "assets/map/CenterRoom.png");
        this.load.image("first-lroom", "assets/map/FirstLRoom.png");
        this.load.image("left-major-room", "assets/map/LeftMajorRoom.png");
        this.load.image("second-room", "assets/map/Secondroom.png");
        this.load.image("starting-room", "assets/map/startingRoom.png");
        this.load.image("training-room", "assets/map/TrainingRoom.png");
        this.load.image("triangle-room", "assets/map/TriangleRoom.png");
        this.load.image("unfair-room", "assets/map/unfairRoom.png");

    }

    create() {

        this.add.image(512, 384, 'map-bg');
        const centerRoom = this.add.image(512, 340, 'center-room').setOrigin(0.5).setInteractive();
        const triangleRoom = this.add.image(376, 404, 'triangle-room').setOrigin(0.5, 0).setInteractive();
        const startingRoom = this.add.image(110, 619, 'starting-room').setOrigin(0, 0).setInteractive();
        const trainingRoom = this.add.image(62, 672, 'training-room').setOrigin(0, 0.5).setInteractive();
        const secondRoom = this.add.image(188, 547, 'second-room').setOrigin(0.5, 0.5).setInteractive();
        const unfairRoom = this.add.image(438, 499, 'unfair-room').setOrigin(0, 0).setInteractive();
        const firstLRoom = this.add.image(137, 433, 'first-lroom').setOrigin(0, 1).setInteractive();
        const LeftMajorRoom = this.add.image(190, 290, 'left-major-room').setOrigin(0.5, 0.5).setInteractive();
        const BottomRoom = this.add.image(518, 675, 'bottom-room').setOrigin(0.5, 0.5).setInteractive();

        this.input.on('gameobjectover', (pointer, gameObject) => {
            gameObject.setTint('#000000')
        })


        centerRoom.on('pointerout', () => {
            centerRoom.clearTint();
        })
        const gameObjects = [centerRoom, triangleRoom, startingRoom, trainingRoom, secondRoom, unfairRoom, firstLRoom, LeftMajorRoom, BottomRoom];

        gameObjects.forEach((obj) => {
            obj.on('pointerout', () => {
                obj.clearTint();
            });
        });



        startingRoom.on('pointerdown', () => {
            if (this.isTeleporting) {
                if (this.sourceRoom != "Room0") {
                    this.scene.add('Room0', Room0, false);
                    this.scene.start('Room0', {
                        byTeleport: true
                    });
                    this.scene.remove(this.sourceRoom)
                    this.scene.remove('MapScreen')
                }
            }
        })

        
        secondRoom.on('pointerdown', () => {
            if (this.isTeleporting) {
                if (this.sourceRoom != "Room1") {
                    this.scene.add('Room1', Room1, false);
                    this.scene.start('Room1', {
                        byTeleport: true
                    });
                    this.scene.remove(this.sourceRoom)
                    this.scene.remove('MapScreen')
                }
            }
        })

        this.add.text(512, 40, "Map", {
            fontFamily: 'menu_font',
            fontSize: 24,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
        }).setOrigin(0.5)




        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.resume(this.sourceRoom);
            this.scene.remove("MapScreen");


        })



    }

    outofhover(obj) {


    }

    update() {

    }
}