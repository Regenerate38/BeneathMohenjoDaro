
import {
    Scene
} from 'phaser';
import { Room0 } from '../story/rooms/Room0';


export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
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

        const logo = this.add.image(512, 150, 'logo').setSize(200, 100);


    const menu_music = this.sound.add("main_menu_theme");
    menu_music.play();


        const continue_game = this.add.text(512, 380, 'Continue', main_menu_style).setOrigin(0.5).setInteractive();
        const newgame = this.add.text(512, 430, 'New Game', main_menu_style).setOrigin(0.5).setInteractive();
        const options = this.add.text(512, 480, 'Options', main_menu_style).setOrigin(0.5).setInteractive();
        const quit_game = this.add.text(512, 530, 'Quit Game', main_menu_style).setOrigin(0.5).setInteractive();

        const menuItems = [continue_game, newgame, options, quit_game];

        menuItems.forEach((obj) => {
            obj.on('pointerout', () => {
                obj.setStroke('#000000');
            });
            obj.on("pointerover", () => {
                obj.setStroke('#1f51ff');
            });

        });


        continue_game.on('pointerdown', () => {
            this.scene.add('Room0', Room0, false)
            this.scene.start('Room0');
        });

        newgame.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}

