import {
    Scene
} from 'phaser';

export class TempScene extends Scene {
    constructor() {
        super('TempScene')
    }

    booktitle = "hawa";
    
    init(data){
        this.booktitle = data.txt;
    }
    preload(){
        this.load.image("inventory-bg", "assets/inventory_background.png");
    }
    booktitle = "hawa";

    create() {
        this.add.image(512, 384, 'inventory-bg');
        const itemTitle = this.add.text(512, 150, " ", {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: {width: 150},
        }).setOrigin(0.5,0);

        itemTitle.setText(this.booktitle)

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start("TrainingRoom");
        })
    }

    update() {

    }


}