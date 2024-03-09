import {
    InfoPanel
} from './game/InfoPanel';
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
import {
    RewardScreen
} from './game/scenes/RewardScreen';
import {
    TempScene
} from './game/story/TempScene';
import { Puzzle1 } from './game/story/puzzles/puzzle1';
import { Puzzle2 } from './game/story/puzzles/puzzle2';
import {
    Room0
} from './game/story/rooms/Room0';
import { Room1 } from './game/story/rooms/Room1';
import {
    TrainingRoom
} from './game/training/TrainingRoom';




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
        TrainingRoom,
        TempScene,
        Puzzle1,
        Puzzle2,
        RewardScreen,

    ]
};

export default new Phaser.Game(config);