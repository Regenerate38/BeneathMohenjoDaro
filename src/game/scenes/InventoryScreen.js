import {
    Scene
} from 'phaser';

export class InventoryScreen extends Scene {
    constructor() {
        super('InventoryScreen')
    }

    preload() {
        this.load.image("inventory-bg", "assets/inventory_background.png");
        this.load.image("trishul", "assets/Trident.png");
        this.load.image("teleport", "assets/teleport.png");
        this.load.image("grid", "assets/grid.png");
        this.load.image("navaratna", "assets/Navaratna.png");

        // this.load.image("inventory-bg", "assets/Inventory_Mockup.png");

    }

    create() {

        this.add.image(512, 384, 'inventory-bg');
        this.add.text(512, 40, "Inventory", {
            fontFamily: 'menu_font',
            fontSize: 24,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
        }).setOrigin(0.5)

        const trident = this.add.image(200, 200, 'trishul');
        const teleportNecklace = this.add.image(140, 300, 'teleport')
        this.add.image(276, 300, 'grid');
        this.add.image(150, 420, 'grid');
        this.add.image(276, 420, 'grid');
        this.add.line(350, 350, 0, 0, 0, 350, '#000000', 2).setDepth(20);
        this.add.line(740, 350, 0, 0, 0, 350, '#000000', 2).setDepth(20);
        const Navaratna = this.add.image(552, 340, 'navaratna')

        const itemTitle = this.add.text(860, 150, " ", {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: {width: 150},
        }).setOrigin(0.5,0);

        const itemDesc = this.add.text(860, 210, " ", {
            fontFamily: 'menu_font',
            fontSize: 16,
            color: '#000000',
            align: 'center',
            wordWrap: {width: 200},
        }).setOrigin(0.5, 0);

        // same logic le tyo description change garne halne
        trident.setInteractive().on("pointerover", () => {
            itemTitle.setText("Trident");
            itemDesc.setText("Trident, or Trishul, is one of the most powerful ancient weapon.")
           console.log("You are hovering over trident");
        });
        teleportNecklace.setInteractive().on("pointerover", () => {
            itemTitle.setText("Rudraksha Bracelet");
            itemDesc.setText("A bracelet made of of several Rudrakshya. This allows you to teleport to any place you have previously visited in your map.")
           console.log("You are hovering over trident");
        });
        Navaratna.setInteractive().on("pointerover", () => {
            itemTitle.setText("Navaratna Necklace");
            itemDesc.setText("A necklace created using silver and 9 gems of unparalled power. The stones, which already work as protection, being combined to this makes it the object with ultimate defense capabilities.")
           console.log("You are hovering over trident");
        });


        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start("Game");
            this.scene.remove("InventoryScreen");


        })



    }
    update() {

    }
<<<<<<< Updated upstream
}
=======
}   
>>>>>>> Stashed changes
