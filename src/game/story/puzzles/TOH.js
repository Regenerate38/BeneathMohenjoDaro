import { Scene } from 'phaser';
let new_list = []
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

class QuestBlock {
    constructor(scene, x, y, width, height, color, text) {
        this.scene = scene;
        this.block = scene.add.rectangle(x, y, width, height, color).setInteractive();
        this.label = scene.add.text(x-width/2+10, y, text, {
            fontFamily: 'menu_font',
            fontSize: 16,
            color: '#ffffff',
            align: 'left',
        }).setOrigin(0, 0.5);
    }
}

function collionDection(block1, block2) {
    // Check if block1 is colliding with block2
    console.log(block1.x + block1.width > block2.x)
    return (block1.x + block1.width > block2.x);
}


export class TOH extends Scene {
    constructor() {
        super('TOH');
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

        // Create a container to hold the buttons
        var buttonContainer = this.add.container(0, 0);
        var buttonData = [
            {
              x: 600,
              y: 700,
              width: 100,
              height: 50,
              color: 0x60462d,
              text: "Next",
              key: 1,
            },
        ]
        buttonData.forEach((data) => {
            var button = this.add.rectangle(
              data.x,
              data.y,
              data.width,
              data.height,
              data.color
            );
            button.setInteractive();
      
            var buttonText = this.add.text(data.x, data.y, data.text, {
              fontSize: "20px",
              fontFamily: "menu_font",
              fill: "#ffffff",
            });
            buttonText.setOrigin(0.5, 0.5);
      
            buttonContainer.add([button, buttonText]);
      
            button.on("pointerover", () => {
              button.fillColor = 0x3c2920;
            });
      
            button.on("pointerout", () => {
              button.fillColor = data.color;
            });
            button.on("pointerdown", () => {
                if (JSON.stringify(new_list) === JSON.stringify(this.pseudo_code)){
                  console.log('sucess')
                } else {
                  console.log('failure')
                }
              });
          });
        

        // Pseudo code
        // let pseudo_code_list = [[1,'Push Stack'], [2, 'Check if stack is full'], [3, 'top++'], [4, 'stack[top] = value'], [5, 'Return']]
        let pseudo_code_list = {
            1: "from_rod",
            2: "aux_rod",
            3: "to_rod",
            4: "from_rod",
            5: "to_rod",
            6: "aux_rod",
            7: "to_rod",
            8: "from_rod"
        }
        let quest = "Arrange blocks into their respective slots."
        let quest_supplement = {
            1: "this.solve_puzzle(disk, n - 1, ____1____, ____2___, ___3___);",
            2: "this.move_disks(disk[n], ____4____, ___5___)",
            3: "this.solve_puzzle(disk, n - 1, ___6____, ___7___, ____8____);"
        }
        for (let i = 0; i < Object.keys(pseudo_code_list).length; i++) {
            this.pseudo_code.push(pseudo_code_list[i+1])
        }
        let pseudo_code_scrambled = [...this.pseudo_code].sort(() => Math.random() - 0.5);
        console.log(pseudo_code_scrambled[0])
        console.log(this.pseudo_code[0])
        console.log(pseudo_code_scrambled == this.pseudo_code)

        // Add draggable blocks with labels using class
        for (let i = 0; i < pseudo_code_scrambled.length; i++) {
            const block = new Block(this, 300, 360 + i * 40, 100, 25, 0x00ff00, `${pseudo_code_scrambled[i]}`);
            console.log(block.label.text)
            this.blocks.push(block);
        } 
        for (let i = 0; i < pseudo_code_scrambled.length; i++) {
            const label = this.add.text(550, 360 + i * 40, `${i+1})`, {
                fontFamily: 'menu_font',
                fontSize: 16,
                color: '#000000',
                align: 'center',
            }).setOrigin(0.5);
        } 
        
        // Setting puzzle quest
        const quest_block = new QuestBlock(this, 500, 150, 700, 50, 0x000000, `${quest}`)
        for (let i = 0; i < 3; i++) {
            const block = new QuestBlock(this, 500, 200 + i * 50, 700, 50, 0x000000, `${quest_supplement[i+1]}`);
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
        new_list = []
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
        // if (JSON.stringify(new_list) === JSON.stringify(this.pseudo_code)) {
        //     // if the new list is the same as the original list, then show the success message
        //     console.log('success')
        // } else {
        //     // if the new list is not the same as the original list, then show the failure message
        //     console.log(new_list)
        //     console.log(this.pseudo_code)
        //     console.log('failure')
        // }
       
    }
}