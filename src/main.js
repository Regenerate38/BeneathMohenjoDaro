import { InfoPanel } from "./game/InfoPanel";
import { Boot } from "./game/scenes/Boot";
import { Game } from "./game/scenes/Game";
import { GameOver } from "./game/scenes/GameOver";
import { MainMenu } from "./game/scenes/MainMenu";
import { Preloader } from "./game/scenes/Preloader";
import { Room0 } from "./game/story/rooms/Room0";
import { BubbleSort } from "./game/training/algorithms/sorting/BubbleSort";
import { SelectionSort } from "./game/training/algorithms/sorting/SelectionSort";
import { Sorting } from "./game/training/algorithms/sorting/Sorting";
import { QuickSort } from "./game/training/algorithms/sorting/QuickSort";
import { HeapSort } from "./game/training/algorithms/sorting/HeapSort";
import { MergeSort } from "./game/training/algorithms/sorting/MergeSort";
import { InsertionSort } from "./game/training/algorithms/sorting/InsertionSort";
import { ShellSort } from "./game/training/algorithms/sorting/ShellSort";
import { LinearSearch } from "./game/training/algorithms/searching/LinearSearch";
import { Pathfinding } from "./game/training/algorithms/pathfinding/Pathfinding";
import { BreadthFirst } from "./game/training/algorithms/pathfinding/BreadthFirst";
import { DepthFirst } from "./game/training/algorithms/pathfinding/DepthFirst";
import { DijkstraAlgorithm } from "./game/training/algorithms/pathfinding/DijkstraAlgorithm";

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
    Boot,
    Preloader,
    MainMenu,
    Game,
    GameOver,
    Room0,
    Sorting,
    BubbleSort,
    SelectionSort,
    QuickSort,
    HeapSort,
    MergeSort,
    InsertionSort,
    ShellSort,
    LinearSearch,
    Pathfinding,
    BreadthFirst,
    DepthFirst,
    DijkstraAlgorithm,
  ],
};

export default new Phaser.Game(config);
