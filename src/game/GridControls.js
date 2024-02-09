import { Direction } from "../game/direction";
import { GridPhysics } from "./GridPhysics";

export class GridControls {
    constructor(input, gridPhysics) {
        this.input = input
        this.gridPhysics = gridPhysics
      }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.gridPhysics.movePlayer(Direction.LEFT);
    } else if (cursors.right.isDown) {
      this.gridPhysics.movePlayer(Direction.RIGHT);
    } else if (cursors.up.isDown) {
      this.gridPhysics.movePlayer(Direction.UP);
    } else if (cursors.down.isDown) {
      this.gridPhysics.movePlayer(Direction.DOWN);
    }
  }
}