import { Scene } from 'phaser';

export class TempScene extends Scene {
    constructor() {
        super('TempScene');
        this.rectangle = null;
    }

    init(data) {
        this.booktitle = data.txt;
    }

    preload() {
        this.load.image('inventory-bg', 'assets/inventory_background.png');
    }

    create() {
        this.add.image(512, 384, 'inventory-bg');

        // Add a dragable rect1 and its label1
        this.rect1 = this.add.rectangle(512, 384, 500, 50, 0x00ff00);
        this.rect1.setInteractive();
        this.label1 = this.add.text(this.rect1.x, this.rect1.y, 'Drag Me!', {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: { width: 150 },
        }).setOrigin(0.5, 0.5);
        this.rect1.dragBool = false;
        this.input.setDraggable(this.rect1);
        
        // Add a dragable rect2 and its label2
        this.rect2 = this.add.rectangle(512, 500, 500, 50, 0x00ff00);
        this.rect2.setInteractive();
        this.label2 = this.add.text(this.rect2.x, this.rect2.y, 'Drag Me Too!', {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: { width: 150 },
        }).setOrigin(0.5, 0.5);
        this.rect2.dragBool = false;
        this.input.setDraggable(this.rect2);

        // Add a drag listener
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
            gameObject.dragBool = true;
        });


        // Setting item title
        const itemTitle = this.add.text(512, 150, ' ', {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: { width: 150 },
        }).setOrigin(0.5, 0);
        itemTitle.setText(this.booktitle);

        // If ESC is pressed, goto TrainingRoom
        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start('TrainingRoom');
        });
    }

    update() {
        // You can add update logic here if needed
        if (this.rect1.dragBool == true) {
            this.Snap(this.rect1, this.rect2, this.label1, this.label2)
            this.rect1.dragBool = false;
        }
        if (this.rect2.dragBool == true) {
            this.Snap(this.rect2, this.rect1, this.label2, this.label1)
            this.rect2.dragBool = false;
        }
    }

    Snap(obj1, obj2, lab1, lab2) {
        // Check if the right edge of rect1 is close to the left edge of rect2
        const distanceX = Math.abs(obj1.x + obj1.width - obj2.x);
        // Check if the y-coordinate of rect1 is within a certain range of rect2
        const distanceY = (obj1.y - obj2.y);
        console.log(distanceX, distanceY);

        // If they are close along the x-axis and have similar y-coordinates, snap them together
        if (distanceX > 400.0 && distanceX < 700.0 && distanceY < 80.0 && distanceY > -10.0) {
            obj1.x = obj2.x;
            obj1.y = obj2.y + obj1.height;
            // Updating the lab1 position w.r.t obj1
            lab1.x = obj1.x;
            lab1.y = obj1.y;
            // Updating the lab2 position w.r.t obj2
            lab2.x = obj2.x;
            lab2.y = obj2.y;
        } else {
            // Updating the lab1 position w.r.t obj1
            lab1.x = obj1.x;
            lab1.y = obj1.y;
            // Updating the lab2 position w.r.t obj2
            lab2.x = obj2.x;
            lab2.y = obj2.y;
        }
        if (distanceX > 400.0 && distanceX < 700.0 && distanceY < -10.0 && distanceY > -80.0) {
            obj1.x = obj2.x;
            obj1.y = obj2.y - obj1.height;
            // Updating the lab1 position w.r.t obj1
            lab1.x = obj1.x;
            lab1.y = obj1.y;
            // Updating the lab2 position w.r.t obj2
            lab2.x = obj2.x;
            lab2.y = obj2.y;
        } else {
            // Updating the lab1 position w.r.t obj1
            lab1.x = obj1.x;
            lab1.y = obj1.y;
            // Updating the lab2 position w.r.t obj2
            lab2.x = obj2.x;
            lab2.y = obj2.y;
        }
    }
}
