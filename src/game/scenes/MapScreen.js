import {
    Scene
} from 'phaser';

export class MapScreen extends Scene {
    constructor() {
        super('MapScreen')
    }
    init(data) {
        this.isTeleporting = data.isTeleporting;
    }

    isTeleporting = false;

    preload() {
        this.load.image("map-bg", "assets/MapBackground.png");
        this.load.image("bottom-room", "assets/BottomRoom.png");
        this.load.image("center-room", "assets/CenterRoom.png");
        this.load.image("first-lroom", "assets/FirstLRoom.png");
        this.load.image("left-major-room", "assets/LeftMajorRoom.png");
        this.load.image("second-room", "assets/Secondroom.png");
        this.load.image("starting-room", "assets/startingRoom.png");
        this.load.image("training-room", "assets/TrainingRoom.png");
        this.load.image("triangle-room", "assets/TriangleRoom.png");
        this.load.image("unfair-room", "assets/unfairRoom.png");

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

        this.input.on('gameobjectdown', (pointer, gameObject) => {
            if (this.isTeleporting) {
                { this.scene.start('TrainingRoom')
                    this.scene.remove('MapScreen')
            }
            }
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
            this.scene.start("Game");
            this.scene.remove("MapScreen");


        })



    }

    outofhover(obj) {


    }

    update() {

    }
}