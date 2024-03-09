import {
    Scene
} from 'phaser';

export class RewardScreen extends Scene {
    constructor() {
        super('RewardScreen')
    }
    rewardsrc = "assets/inventory/teleport.png"
    rewardName = "Rudraksha Necklace"
    rewardDesc = "This item allows you to teleport to any room you have already unlocked and visited"
    sourceRoom = ""
    sourcePuzzle = ""

    init(data) {
        this.rewardsrc = data.rewardsrc
        console.log(data.rewardsrc)
        this.sourceRoom = data.sourceRoom
        this.sourcePuzzle = data.sourcePuzzle
        this.rewardName = data.rewardName
        this.rewardDesc = data.rewardDesc
    }

    preload() {
            this.load.image("reward", this.rewardsrc);
        
    }

    create() {
        this.add.text(512, 40, "Congratulations", {
            fontFamily: 'menu_font',
            fontSize: 36,
            color: '#FF0000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
        }).setOrigin(0.5)

        const success_music = this.sound.add('success');
        success_music.play();

        this.add.text(512, 80, "You received", {
            fontFamily: 'menu_font',
            fontSize: 30,
            color: '#FF0000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
        }).setOrigin(0.5)

        this.add.image(512, 350, "reward").setOrigin(0.5).setSize(500,500).setScale(1.5)

        const rewardTitleText = this.add.text(512, 500, this.rewardName, {
            fontFamily: 'menu_font',
            fontSize: 26,
            color: '#FFFFFF',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 1,
            wordWrap: {width: 350},
        }).setOrigin(0.5,0);

        const rewardDescText = this.add.text(512, 530, this.rewardDesc, {
            fontFamily: 'menu_font',
            fontSize: 20,
            color: '#FFFFFF',
            align: 'center',
            wordWrap: {width: 700},
        }).setOrigin(0.5, 0);
    

        var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        key_ESC.on('down', () => {
            this.scene.remove(RewardScreen);

            this.scene.start(this.sourceRoom, {
                sourceRoom: this.sourcePuzzle
            });
        })

    }
    
}