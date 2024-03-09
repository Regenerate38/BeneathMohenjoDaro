<<<<<<< Updated upstream
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
import { TempScene } from './game/story/TempScene';
import { Room0 } from './game/story/rooms/Room0';
import { TrainingRoom } from './game/training/TrainingRoom';




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
        TrainingRoom,
        TempScene
    ]
=======
import { InfoPanel } from "./game/InfoPanel";
import { Boot } from "./game/scenes/Boot";
import { Game } from "./game/scenes/Game";
import { GameOver } from "./game/scenes/GameOver";
import { MainMenu } from "./game/scenes/MainMenu";
import { Preloader } from "./game/scenes/Preloader";
import { Room0 } from "./game/story/rooms/Room0";
import { Sorting } from "./game/training/algorithms/sorting/Sorting";
import { Edit } from "./game/training/algorithms/sorting/Edit";
import { LinearSearch } from "./game/training/algorithms/searching/LinearSearch";
import { TrainingRoom } from "./game/training/TrainingRoom";
import { TempScene } from "./game/story/TempScene";
import { SortWindow } from "./game/training/algorithms/sorting/SortWindow";

const config = {
  type: Phaser.AUTO,
  title: "Beneath MohenjoDaro",
  render: {
    antialias: false,
  },
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [
    Sorting,
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver,
    Room0,
    TrainingRoom,
    TempScene,
    SortWindow,
    LinearSearch,
    Edit,
  ],
>>>>>>> Stashed changes
};

export default new Phaser.Game(config);