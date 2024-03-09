import {
    Stack
} from "../../stack";
import {
    Scene
} from "phaser";

export class Puzzle2 extends Scene {

    constructor() {
        super('Puzzle2')
        var height_a = 486,
            height_b = 486,
            height_c = 486
        this.height = [height_a, height_b, height_c]
        this.diff = 28
    }

    init(data) {
        this.sourceRoom = data.sourceRoom
    }


    preload() {
        this.load.image("inventory-bg", "assets/inventory/inventory_background.png");
        this.load.image("base", "assets/puzzles/puzzle1/base.png");
        this.load.image("rod", "assets/puzzles/puzzle1/rod.png");
        this.load.image("code", "assets/code.png")
        this.load.image("ring1", "assets/puzzles/puzzle2/ring1.png")
        this.load.image("ring2", "assets/puzzles/puzzle2/ring2.png")
        this.load.image("ring3", "assets/puzzles/puzzle2/ring3.png")

    }


    create() {
        var popped = {}
        var poppednum = 0;

        this.add.image(512, 384, "inventory-bg")
        this.add.image(512, 520, 'base').setScale(0.5).setOrigin(0.5, 1)
        this.add.image(512, 490, 'rod').setScale(0.5).setOrigin(0.5, 1)
        this.add.image(262, 520, 'base').setScale(0.5).setOrigin(0.5, 1)
        this.add.image(262, 490, 'rod').setScale(0.5).setOrigin(0.5, 1)
        this.add.image(762, 520, 'base').setScale(0.5).setOrigin(0.5, 1)
        this.add.image(762, 490, 'rod').setScale(0.5).setOrigin(0.5, 1)
        let stack1 = new Stack();
        let stack2 = new Stack();
        let stack3 = new Stack();
        let ringstack1 = new Stack();
        let ringstack2 = new Stack();
        let ringstack3 = new Stack();
        let stack = [stack1, stack2, stack3]
        let ringstack = [ringstack1, ringstack2, ringstack3]
        stack[0].add(1);
        stack[0].add(2);
        stack[0].add(1);
        stack[1].add(3);
        stack[1].add(3);
        stack[1].add(2);
        stack[1].add(1);
        stack[2].add(3);
        stack[2].add(2);
        const ring = [];
        ring[0] = []
        ring[1] = []
        ring[2] = []
        ring[3] = []
        this.create_puzzle(stack, ring, ringstack)


        const switch_code_img = this.add.image(100, 650, 'code').setScale(0.1).setInteractive()
        const switch_code_text = this.add.text(150, 640, "Switch to Block Code", {
            color: '#000000',
            fontFamily: 'menu_font',
            fontSize: 20,
        }).setInteractive()
        const difficulty_text = this.add.text(650, 640, "Puzzle difficulty: EASY", {
            color: '#000000',
            fontFamily: 'menu_font',
            fontSize: 20,
        })
        const switch_code_button = [switch_code_img, switch_code_text];

        switch_code_button.forEach((obj) => {
            obj.on('pointerdown', () => {
                //this.scene.start('RewardScreen');
                console.log('It works')
            });
        });


        popped = ringstack1.remove()
        poppednum = stack1.remove()
        this.move_rings(popped, 'a', 1)
        ringstack2.add(popped);
        stack2.add(poppednum);
        this.move_rings(popped, 'b', 2);

        popped = ringstack1.remove()
        poppednum = stack1.remove()
        this.move_rings(popped, 'a', 1)
        ringstack3.add(popped);
        stack3.add(poppednum);
        this.move_rings(popped, 'c', 2);

        popped = ringstack2.remove()
        poppednum = stack2.remove()
        this.move_rings(popped, 'b', 1)
        ringstack1.add(popped);
        stack1.add(poppednum);
        this.move_rings(popped, 'a', 2);


        popped = ringstack2.remove()
        poppednum = stack2.remove()
        this.move_rings(popped, 'b', 1)
        ringstack1.add(popped);
        stack1.add(poppednum);
        this.move_rings(popped, 'a', 2);

        popped = ringstack2.remove()
        poppednum = stack2.remove()
        this.move_rings(popped, 'b', 1)
        ringstack1.add(popped);
        stack1.add(poppednum);
        this.move_rings(popped, 'a', 2);


        popped = ringstack3.remove()
        poppednum = stack3.remove()
        this.move_rings(popped, 'c', 1)
        ringstack1.add(popped);
        stack1.add(poppednum);
        this.move_rings(popped, 'a', 2);


        popped = ringstack3.remove()
        poppednum = stack3.remove()
        this.move_rings(popped, 'c', 1)
        ringstack1.add(popped);
        stack1.add(poppednum);
        this.move_rings(popped, 'a', 2);

        popped = ringstack3.remove()
        poppednum = stack3.remove()
        this.move_rings(popped, 'c', 1)
        ringstack2.add(popped);
        stack2.add(poppednum);
        this.move_rings(popped, 'b', 2);

        popped = ringstack1.remove()
        poppednum = stack1.remove()
        this.move_rings(popped, 'a', 1)
        ringstack3.add(popped);
        stack3.add(poppednum);
        this.move_rings(popped, 'c', 2);

        popped = ringstack1.remove()
        poppednum = stack1.remove()
        this.move_rings(popped, 'a', 1)
        ringstack3.add(popped);
        stack3.add(poppednum);
        this.move_rings(popped, 'c', 2);

        popped = ringstack1.remove()
        poppednum = stack1.remove()
        this.move_rings(popped, 'a', 1)
        ringstack3.add(popped);
        stack3.add(poppednum);
        this.move_rings(popped, 'c', 2);

        if (this.check_puzzle(stack)) {
           setTimeout(()=>{this.puzzle_solved()}, 3000)
        }

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start(this.sourceRoom, {sourceRoom: "Puzzle1"});

        })
    }


    create_puzzle(stack, ring, ringstack) {
        let x_pos = 262;
 

        for (let i = 0; i < 3; i++) {
            let y_pos = 486;
            for (let j = 0; j < stack[i].size(); j++) {
                ring[i][j] = this.add.image(x_pos, y_pos, 'ring' + stack[i].items[j]).setOrigin(0.5, 1)
                ringstack[i].add(ring[i][j])
                console.log(x_pos, y_pos)
                //  console.log(ring[stack[i].items[j]][count])
                y_pos -= this.diff;
            }
            this.height[i] = y_pos
            console.log(this.height[i])
            x_pos += 250
        }

    }

    check_puzzle(stack) {
        const allEqual = arr => arr.every(v => v === arr[0]);
       return allEqual(stack[0].items) && allEqual(stack[1].items) && allEqual(stack[2].items);
    }

    puzzle_solved() {
        this.scene.start("RewardScreen")
    }

    move_rings(disk1, x_label, mode) {
        let x_pos = 0;
        switch (x_label) {
            case 'a':
                x_pos = 262
                x_label = 0
                break;
            case 'b':
                x_pos = 512
                x_label = 1
                break;
            case 'c':
                x_pos = 762
                x_label = 2
                break;
        }

        switch (mode) {
            case 1: {
                const duration = 500;
                const ease = 'sine.out';
                this.tweens.add({
                    targets: disk1,
                    x: 512,
                    y: 600,
                    duration,
                    delay: 500,
                    ease,

                })
                this.height[x_label] += this.diff
            }
            break;

        case 2: {
            const duration = 500;
            const ease = 'sine.out';
            this.tweens.add({
                targets: disk1,
                x: x_pos,
                y: this.height[x_label],
                duration,
                delay: 2500,
                ease,
            })
            this.height[x_label] -= this.diff
            break;
        }
        }

    }

    update() {

    }

}