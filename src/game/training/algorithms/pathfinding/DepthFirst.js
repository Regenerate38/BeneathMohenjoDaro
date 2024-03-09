import { Scene } from "phaser";
import { Player } from "../../../player";
import { Direction } from "../../../direction";
import { GridPhysics } from "../../../GridPhysics";

export class DepthFirst extends Scene {
  constructor() {
    super("DepthFirst");
  }

  preload() {
    this.load.image("tiles", "assets/Beneath_Mohenjodaro_Tiles.png");
    this.load.tilemapTiledJSON("maze", "assets/maze.tmj");
    this.load.spritesheet("player", "assets/characters.png", {
      frameWidth: 26,
      frameHeight: 36,
    });
  }

  create() {
    this.tileMap = this.make.tilemap({
      key: "maze",
      tileHeight: 16,
      tileWidth: 16,
    });

    this.tileMap.addTilesetImage("Beneath_Mohenjodaro_Tiles", "tiles");
    for (let i = 0; i < this.tileMap.layers.length; i++) {
      const layer = this.tileMap.createLayer(
        i,
        "Beneath_Mohenjodaro_Tiles",
        0,
        0
      );
      layer.setDepth(i);
    }

    const playerSprite = this.add.sprite(300, 400, "player");
    playerSprite.setDepth(4);

    this.player = new Player(playerSprite, new Phaser.Math.Vector2(1, 25), 1);

    this.gridPhysics = new GridPhysics(this.player, this.tileMap, 1);
    // this.gridControls = new GridControls(this.input, this.gridPhysics);

    this.createPlayerAnimation(Direction.UP, 94, 95);
    this.createPlayerAnimation(Direction.RIGHT, 82, 83);
    this.createPlayerAnimation(Direction.DOWN, 58, 59);
    this.createPlayerAnimation(Direction.LEFT, 70, 71);

    this.movePlayer();
    var key_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    key_ESC.on('down', () => {
        this.scene.start('Pathfinding');

    })
  }
  
  createPlayerAnimation(name, startFrame, endFrame) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers("player", {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  getMovableTilesPosition() {
    const movableTiles = [];
    this.tileMap.forEachTile((tile) => {
      if (!tile.properties.collides) {
        const tileWorldPos = this.tileMap.tileToWorldXY(tile.x, tile.y);
        movableTiles.push({ x: tileWorldPos.x, y: tileWorldPos.y });
      }
    });
    return movableTiles;
  }

  async getAllPaths(start, movableTiles, end) {
    const searchTile = this.tileMap.getTileAtWorldXY(1 * 16, 25 * 16);
    const stack = [{ position: start, path: [], controls: [] }];
    const visited = new Set();

    while (stack.length > 0) {
      const current = stack.pop();
      const currentPosition = current.position;

      if (currentPosition.x === end.x && currentPosition.y === end.y) {
        return [current.path, current.controls];
      }

      const adjacentTiles = [
        { x: currentPosition.x + 16, y: currentPosition.y, dir: "RIGHT" },
        { x: currentPosition.x - 16, y: currentPosition.y, dir: "LEFT" },
        { x: currentPosition.x, y: currentPosition.y + 16, dir: "DOWN" },
        { x: currentPosition.x, y: currentPosition.y - 16, dir: "UP" },
      ];

      for (const tile of adjacentTiles) {
        if (
          this.includesPoint(movableTiles, tile) &&
          !visited.has(`${tile.x},${tile.y}`)
        ) {
          await this.delay(1);
          visited.add(`${tile.x},${tile.y}`);
          if (tile.x !== end.x || tile.y !== end.y)
            this.tileMap.putTileAtWorldXY(searchTile, tile.x, tile.y, false);
          stack.push({
            position: { x: tile.x, y: tile.y },
            path: [...current.path, currentPosition],
            controls: [...current.controls, tile.dir],
          });
        }
      }
    }
    return [];
  }

  async movePlayer() {
    const movableTiles = this.getMovableTilesPosition();
    const startTile = { x: 1 * 16, y: 25 * 16 };
    const endTile = {
      x: 63 * 16,
      y: 40 * 16,
    };
    const pathTile = this.tileMap.getTileAtWorldXY(63 * 16, 40 * 16);
    const [path, moves] = await this.getAllPaths(
      startTile,
      movableTiles,
      endTile
    );
    for (let i = 0; i < moves.length; i++) {
      switch (moves[i]) {
        case "LEFT":
          console.log("LEFT");
          this.gridPhysics.movePlayer(Direction.LEFT);
          break;
        case "RIGHT":
          console.log("RIGHT");
          this.gridPhysics.movePlayer(Direction.RIGHT);
          break;
        case "UP":
          console.log("UP");
          this.gridPhysics.movePlayer(Direction.UP);
          break;
        case "DOWN":
          console.log("DOWN");
          this.gridPhysics.movePlayer(Direction.DOWN);
          break;
        default:
          break;
      }
      this.tileMap.putTileAtWorldXY(pathTile, path[i].x, path[i].y, false);
      await this.delay(100);
    }
  }

  includesPoint(array, value) {
    return array.some((item) => item.x === value.x && item.y === value.y);
  }
  update(_time, delta) {
    this.gridPhysics.update(delta);
  }
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
