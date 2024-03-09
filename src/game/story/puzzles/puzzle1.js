import {
    Scene
} from "phaser";

export class Puzzle1 extends Scene {

    constructor() {
        super('Puzzle1');
        this.sourceRoom = ""
        var height_a = 370,
            height_b = 486,
            height_c = 486
        this.height = [height_a, height_b, height_c]
        this.diff = 29
        this.solved = false
    }

  

    init(data) {
        this.sourceRoom = data.sourceRoom
        this.solved = data.solved
    }

    preload() {
        this.load.image("inventory-bg", "assets/inventory/inventory_background.png");
        this.load.image("base", "assets/puzzles/puzzle1/base.png");
        this.load.image("rod", "assets/puzzles/puzzle1/rod.png");
        this.load.image("disk1", "assets/puzzles/puzzle1/disk1.png");
        this.load.image("disk2", "assets/puzzles/puzzle1/disk2.png");
        this.load.image("disk3", "assets/puzzles/puzzle1/disk3.png");
        this.load.image("disk4", "assets/puzzles/puzzle1/disk4.png");
        this.load.image("code", "assets/code.png")

    }

    create() {
        this.background =  this.add.image(512, 384, 'inventory-bg');
        const base_B = this.add.image(512, 520, 'base').setScale(0.5).setOrigin(0.5, 1)
        const rod_B = this.add.image(512, 490, 'rod').setScale(0.5).setOrigin(0.5, 1)
        const base_A = this.add.image(262, 520, 'base').setScale(0.5).setOrigin(0.5, 1)
        const rod_A = this.add.image(262, 490, 'rod').setScale(0.5).setOrigin(0.5, 1)
        const base_C = this.add.image(762, 520, 'base').setScale(0.5).setOrigin(0.5, 1)
        const rod_C = this.add.image(762, 490, 'rod').setScale(0.5).setOrigin(0.5, 1)
        const disk4 = this.add.image(262, 486, 'disk4').setScale(0.5).setOrigin(0.5, 1)
        const disk3 = this.add.image(262, 457, 'disk3').setScale(0.5).setOrigin(0.5, 1)
        const disk2 = this.add.image(262, 428, 'disk2').setScale(0.5).setOrigin(0.5, 1)
        const disk1 = this.add.image(262, 399, 'disk1').setScale(0.5).setOrigin(0.5, 1)
        
        const disk = [disk1, disk2, disk3, disk4];
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
                this.scene.start('TOH')
                
                // 
               
               //this.solve_puzzle(disk, 3, 'A', 'C', 'B')
                console.log("Returned last")
            });
        });

        if(this.solved) {
            this.solve_puzzle(disk1, disk2, disk3, disk4);
        
        }

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.start(this.sourceRoom, {
                sourceRoom: "Puzzle1"
            });

        })

    }

   
    solve_puzzle(disk1, disk2, disk3, disk4) {
        const duration = 1000; 
        const ease = 'Linear'; 

        this.tweens.add({
            targets: disk1,
            x: 512,
            y: 486,
            duration,
            ease,
            onComplete :()=>{
                this.tweens.add({
                    targets: disk2,
                    x: 762,
                    y: 486,
                    duration,
                    ease,
                    onComplete: ()=> {
                        this.tweens.add({
                            targets: disk1,
                            x: 762,
                            y: 457,
                            duration,
                            delya: 1000,
                            ease,
                            onComplete: ()=> {
                                this.tweens.add({
                                    targets: disk3,
                                    x: 512,
                                    y: 486,
                                    duration,
                                    delya: 1000,
                                    ease,
                                    onComplete: ()=> {
                                        this.tweens.add({
                                            targets: disk1,
                                            x: 262,
                                            y: 457,
                                            duration,
                                            delya: 1000,
                                            ease,
                                            onComplete: ()=> {
                                                this.tweens.add({
                                                    targets: disk2,
                                                    x: 512,
                                                    y: 457,
                                                    duration,
                                                    delya: 1000,
                                                    ease,
                                                    onComplete: ()=> {
                                                        this.tweens.add({
                                                            targets: disk1,
                                                            x: 512,
                                                            y: 428,
                                                            duration,
                                                            delya: 1000,
                                                            ease,
                                                            onComplete: ()=> {
                                                                this.tweens.add({
                                                                    targets: disk4,
                                                                    x: 762,
                                                                    y: 486,
                                                                    duration,
                                                                    delya: 1000,
                                                                    ease,
                                                                    onComplete: ()=> {
                                                                        this.tweens.add({
                                                                            targets: disk1,
                                                                            x: 762,
                                                                            y: 457,
                                                                            duration,
                                                                            delya: 1000,
                                                                            ease,
                                                                            onComplete: ()=> {
                                                                                this.tweens.add({
                                                                                    targets: disk2,
                                                                                    x: 262,
                                                                                    y: 487,
                                                                                    duration,
                                                                                    delya: 1000,
                                                                                    ease,
                                                                                    onComplete: ()=> {
                                                                                        this.tweens.add({
                                                                                            targets: disk1,
                                                                                            x: 262,
                                                                                            y: 457,
                                                                                            duration,
                                                                                            delya: 1000,
                                                                                            ease,
                                                                                            onComplete: ()=> {
                                                                                                this.tweens.add({
                                                                                                    targets: disk3,
                                                                                                    x: 762,
                                                                                                    y: 457,
                                                                                                    duration,
                                                                                                    delya: 1000,
                                                                                                    ease,
                                                                                                    onComplete: ()=> {
                                                                                                        this.tweens.add({
                                                                                                            targets: disk1,
                                                                                                            x: 512,
                                                                                                            y: 486,
                                                                                                            duration,
                                                                                                            delya: 1000,
                                                                                                            ease,
                                                                                                            onComplete: ()=> {
                                                                                                                this.tweens.add({
                                                                                                                    targets: disk2,
                                                                                                                    x: 762,
                                                                                                                    y: 428,
                                                                                                                    duration,
                                                                                                                    delya: 1000,
                                                                                                                    ease,
                                                                                                                    onComplete: ()=> {
                                                                                                                        this.tweens.add({
                                                                                                                            targets: disk1,
                                                                                                                            x: 762,
                                                                                                                            y: 399,
                                                                                                                            duration,
                                                                                                                            delay: 2000,
                                                                                                                            ease,
                                                                                                                            onComplete: ()=>{this.puzzle_solved()}
                                                                                                                        });
                                                                                                                    }
                                                                                                                });
                                                                                                            }
                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                        
                            }
                        });
                
                    }
                });
            }
        });
          
    }


/*   
solve_puzzle(disk, n, from_rod, to_rod, aux_rod) {
        if (n <0) {
            console.log("Returned once")
            return;
        }
        this.solve_puzzle(disk, n - 1, from_rod, aux_rod, to_rod);
        //      console.log("Move disk " + n + " from rod " + from_rod + " to rod " + to_rod)
        this.move_disks(disk[n], from_rod, to_rod)
        this.solve_puzzle(disk, n - 1, aux_rod, to_rod, from_rod);
    }

    move_disks(disk, from_rod, to_rod) {
        let x_pos = 0,
            y_pos = 0;
        switch (from_rod) {
            case 'A':
                this.height[0] += 29
                break;

            case 'B':
                this.height[1] += 29
                break;

            case 'C':
                this.height[2] += 29
                break;
        }

        switch (to_rod) {
            case 'A':
                x_pos = 262
                y_pos = this.height[0];
                this.height[0] -= 29
                break;

            case 'B':
                x_pos = 512
                y_pos = this.height[1];
                this.height[1] -= 29
                break;

            case 'C':
                x_pos = 762
                y_pos = this.height[2];
                this.height[2] -= 29
                break;
        }
        
        const duration = 1000;
            const ease = 'sine.out';    
           var tween = this.tweens.add({
                targets: disk,
                x: x_pos,
                y: y_pos,
                duration,
                delay: 3000,
              ease,
            })
            tween.on('complete', ()=>{return});

            
    }
*/

    puzzle_solved() {
        this.scene.start("RewardScreen")
    }

    update() {
        //console.log(this.input.mousePointer.x, this.input.mousePointer.y)

    }


}