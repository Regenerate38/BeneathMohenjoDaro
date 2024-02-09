import { InfoPanel } from './game/InfoPanel';
import {
    Boot
} from './game/scenes/Boot';
import {
    Game
} from './game/scenes/Game';
import {
    GameOver
} from './game/scenes/GameOver';
import {
    MainMenu
} from './game/scenes/MainMenu';
import {
    Preloader
} from './game/scenes/Preloader';
import { Room0 } from './game/story/rooms/Room0';




const config = {
    type: Phaser.AUTO,
    title: "Beneath MohenjoDaro",
    render: {
        antialias: false,
    },
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        Room0,
    ]
};

export default new Phaser.Game(config);