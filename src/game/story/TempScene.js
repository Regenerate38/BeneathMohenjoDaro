import { Scene } from 'phaser';

class Block {
    constructor(scene, x, y, width, height, color, text) {
        this.scene = scene;
        this.block = scene.add.rectangle(x, y, width, height, color).setInteractive();
        this.scene.input.setDraggable(this.block);
        this.block.on('drag', (pointer) => this.onDrag(pointer));
        this.label = scene.add.text(x, y, text, {
            fontFamily: 'menu_font',
            fontSize: 16,
            color: '#000000',
            align: 'center',
        }).setOrigin(0.5);
    }

    onDrag(pointer) {
        this.block.x = pointer.x;
        this.block.y = pointer.y;
        this.label.x = pointer.x;
        this.label.y = pointer.y;
    }
}

function collionDection(block1, block2) {
    // Check if block1 is colliding with block2
    console.log(block1.x + block1.width > block2.x)
    return (block1.x + block1.width > block2.x);
}


export class TempScene extends Scene {
    constructor() {
        super('TempScene');
        this.blocks = [];
        this.snapDistance = 30;
        this.smoothMovementDuration = 100;
        this.pseudo_code = []
    }

    init(data) {
        this.booktitle = data.txt;

    }

    preload() {
        this.load.image('inventory-bg', 'assets/inventory_background.png');
    }

    create() {
        this.add.image(512, 384, 'inventory-bg');

        // Pseudo code
        // let pseudo_code_list = [[1,'Push Stack'], [2, 'Check if stack is full'], [3, 'top++'], [4, 'stack[top] = value'], [5, 'Return']]
        let pseudo_code_list = {
            1: 'Push Stack',
            2: 'Check if stack is full',
            3: 'top++',
            4: 'stack[top] = value',
            5: 'Return'
        }
        for (let i = 0; i < 5; i++) {
            this.pseudo_code.push(pseudo_code_list[i+1])
        }
        let pseudo_code_scrambled = [...this.pseudo_code].sort(() => Math.random() - 0.5);
        console.log(pseudo_code_scrambled[0])
        console.log(this.pseudo_code[0])
        console.log(pseudo_code_scrambled == this.pseudo_code)

        // Add draggable blocks with labels using class
        for (let i = 0; i < pseudo_code_scrambled.length; i++) {
            const block = new Block(this, 300, 250 + i * 75, 350, 50, 0x00ff00, `${pseudo_code_scrambled[i]}`);
            console.log(block.label.text)
            this.blocks.push(block);
        }

        // Setting item title
        const itemTitle = this.add.text(512, 150, this.booktitle, {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: { width: 150 },
        }).setOrigin(0.5, 0);

        // If ESC is pressed, go to TrainingRoom
        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start('TrainingRoom');
        });
    }

    update() {
        // Create a new list that shows the list of pseudo code as shown in screen
        let new_list = []
        for (let i = 0; i < this.blocks.length; i++) {
            // create a list that stores the label of blocks in the order shown in screen that changes when the blocks are dragged
            for (let j = 0; j < this.blocks.length; j++) {
                if (i == j) {
                    continue
                }
                if (this.blocks[i].block.y < this.blocks[j].block.y) {
                    // swap the labels of the two blocks
                    let temp = this.blocks[i]
                    this.blocks[i] = this.blocks[j]
                    this.blocks[j] = temp
                }
            }
        }
        for (let i = 0; i < this.blocks.length; i++) {
            new_list[i] = this.blocks[i].label.text
        }
        // compare the elements of new list with the original list
        if (JSON.stringify(new_list) === JSON.stringify(this.pseudo_code)) {
            // if the new list is the same as the original list, then show the success message
            console.log('success')
        } else {
            // if the new list is not the same as the original list, then show the failure message
            console.log(new_list)
            console.log(this.pseudo_code)
            console.log('failure')
        }
    }
}