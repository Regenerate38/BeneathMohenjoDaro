import { Scene } from 'phaser';

export class TrainingRoom extends Scene {
    constructor() {
        super('TrainingRoom')
        this.sourceRoom ="Room0"
    }

    init(data) {
        this.sourceRoom = data.sourceRoom
    }
    preload() {
        this.load.image("training-bg", "assets/bg.png");
        this.load.image("scroll1", "assets/scroll.png")
      

    }

    create() {
       this.add.image(512, 384, 'training-bg');
        const book1 = this.add.image(40, 300, "scroll1").setOrigin(0).setInteractive().setName("book1").setScale(0.5);
        const book2 = this.add.image(400, 300, "scroll1").setOrigin(0).setInteractive().setName("book2").setScale(0.5);
        const book3 = this.add.image(760, 300, "scroll1").setOrigin(0).setInteractive().setName("book3").setScale(0.5);

        this.input.on('gameobjectover', (pointer, gameObject) => {
            gameObject.setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        })

        book1.on('pointerdown', () => {
            this.scene.start('Searching', { txt: "Searching" })
        })
        book2.on('pointerdown', () => {
            this.scene.start('Sorting', { txt: "Sorting" })
        })
        book3.on('pointerdown', () => {
            this.scene.start('Pathfinding', { txt: "Pathfinding" })
        })

        
        // this.input.on('gameobjectdown', (pointer, gameObject) => {
        //     this.scene.start('TempScene', { txt: gameObject.name })
        // })

        const gameObjects = [book1, book2, book3];

        gameObjects.forEach((obj) => {
            obj.on('pointerout', () => {
                obj.clearTint();
            });
        });

        // same logic le tyo description change garne halne

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start(this.sourceRoom, {sourceRoom: "TrainingRoom"});

        })
    }

    update() {

    }
}