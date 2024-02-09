import {
    Scene
} from 'phaser';


export class MainMenu extends Scene {
    constructor() {
        super('MainMenu');
    }

    create() {
        const main_menu_style = {
            fontFamily: 'menu_font',
            fontSize: 28,
            color: '#ffffff',
            align: 'center',
            stroke: '#000000', 
            strokeThickness: 8,
        }
        this.add.image(512, 384, 'background');

        const logo = this.add.image(512, 150, 'logo');

        const menu_music = this.sound.add('main_menu_theme');
        menu_music.play();

        const continue_game = this.add.text(512, 380, 'Continue', main_menu_style).setOrigin(0.5);
        const newgame = this.add.text(512, 430, 'New Game', main_menu_style).setOrigin(0.5);
        const options = this.add.text(512, 480, 'Options', main_menu_style).setOrigin(0.5);
        const quit_game = this.add.text(512, 530, 'Quit Game', main_menu_style).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}