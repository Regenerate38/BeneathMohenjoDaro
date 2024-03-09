import {
    Scene
} from 'phaser';
import { States } from '../states';


export class InventoryScreen extends Scene {
    constructor() {
        super('InventoryScreen')
    }

    init(data) {
        this.retScreen = data.retScreen
    }

    preload() {
        this.load.image("inventory-bg", "assets/inventory/inventory_background.png");
        this.load.image("trishul", "assets/inventory/Trident.png");
        this.load.image("teleport", "assets/inventory/teleport.png");
        this.load.image("grid", "assets/inventory/grid.png");
        this.load.image("navaratna", "assets/inventory/Navaratna.png");
        this.load.image("ratna1", "assets/inventory/layer1.png")
        this.load.image("ratna2", "assets/inventory/layer2.png")
        this.load.image("ratna3", "assets/inventory/layer3.png")
        this.load.image("ratna4", "assets/inventory/layer4.png")
        this.load.image("ratna5", "assets/inventory/layer5.png")
        this.load.image("ratna6", "assets/inventory/layer6.png")
        this.load.image("ratna7", "assets/inventory/layer7.png")
        this.load.image("ratna8", "assets/inventory/layer8.png")
        this.load.image("ratna9", "assets/inventory/layer9.png")
        this.load.image("key1", "assets/inventory/key1.png")
        this.load.image("key2", "assets/inventory/key2.png")
        this.load.image("key3", "assets/inventory/key3.png")
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

        const trident = this.add.image(200, 200, 'trishul').setVisible(States.trident)
        const teleportNecklace = this.add.image(140, 300, 'teleport').setVisible(States.rudraksha)
        this.add.image(276, 300, 'grid');
        this.add.image(150, 420, 'grid');
        this.add.image(276, 420, 'grid');
        this.add.line(350, 350, 0, 0, 0, 350, '#000000', 2).setDepth(20);
        this.add.line(740, 350, 0, 0, 0, 350, '#000000', 2).setDepth(20);
        const Navaratna = this.add.image(552, 340, 'navaratna')
        const Ratna1 = this.add.image(554, 456, 'ratna1').setScale(0.55).setVisible(States.gem1)
        const Ratna2 = this.add.image(554, 337, 'ratna2').setScale(0.55).setVisible(States.gem2)
        const Ratna3 = this.add.image(668, 337, 'ratna3').setScale(0.55).setVisible(States.gem3)
        const Ratna4 = this.add.image(472, 260, 'ratna4').setScale(0.55).setVisible(States.gem4)
        const Ratna5 = this.add.image(472, 425, 'ratna5').setScale(0.55).setVisible(States.gem5)
        const Ratna6 = this.add.image(635, 425, 'ratna6').setScale(0.50).setVisible(States.gem6)
        const Ratna7 = this.add.image(635, 260, 'ratna7').setScale(0.50).setVisible(States.gem7)
        const Ratna8 = this.add.image(554, 225, 'ratna8').setScale(0.50).setVisible(States.gem8)
        const Ratna9 = this.add.image(440, 340, 'ratna9').setScale(0.50).setVisible(States.gem9)
        const keysHeading = this.add.text(120, 550, "Keys", {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: {width: 150},
        }).setOrigin(0.5,0);

        const key1 = this.add.image(140, 620, 'key1').setScale(0.8).setVisible(States.key1)
        const key2 = this.add.image(280, 620, 'key2').setScale(0.8).setVisible(States.key2)
        const key3 = this.add.image(420, 620, 'key3').setScale(0.8).setVisible(States.key3)


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
            this.scene.resume(this.retScreen);
            this.scene.remove("InventoryScreen");


        })



    }
    update() {

    }
}