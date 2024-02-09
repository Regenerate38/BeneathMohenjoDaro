import { Direction } from "./direction"


const Vector2 = Phaser.Math.Vector2

export class GridPhysics {
  
  movementDirectionVectors = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT
  }

  movementDirection = Direction.NONE;
  facingDirection = Direction.NONE;
  isFacingObject = false;
  facingObjectDesc = "hawa";

  speedPixelsPerSecond = 48 * 4
  tileSizePixelsWalked = 0

  lastMovementIntent = Direction.NONE

  constructor(player, tileMap) {
    this.player = player
    this.tileMap = tileMap
  }

  movePlayer(direction) {
    this.lastMovementIntent = direction
    if (this.isMoving()) return
    if (this.isBlockingDirection(direction)) {
      this.player.stopAnimation(direction)
    } else {
      this.startMoving(direction)
    }
  }

  update(delta) {
    if (this.isMoving()) {
      this.updatePlayerPosition(delta)
    }
    this.lastMovementIntent = Direction.NONE
  }

  isMoving() {
    return this.movementDirection != Direction.NONE
  }

  startMoving(direction) {
    this.player.startAnimation(direction)
    this.movementDirection = direction
    this.updatePlayerTilePos()
  }

  updatePlayerPosition(delta) {
    const pixelsToWalkThisUpdate = this.getPixelsToWalkThisUpdate(delta)

    if (!this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.movePlayerSprite(pixelsToWalkThisUpdate)
    } else if (this.shouldContinueMoving()) {
      this.movePlayerSprite(pixelsToWalkThisUpdate)
      this.updatePlayerTilePos()
    } else {
      this.movePlayerSprite(48 - this.tileSizePixelsWalked)
      this.stopMoving()
    }
  }

  updatePlayerTilePos() {
    this.player.setTilePos(
      this.player
        .getTilePos()
        .add(this.movementDirectionVectors[this.movementDirection])
    )
  }

  movePlayerSprite(pixelsToMove) {
    const directionVec = this.movementDirectionVectors[
      this.movementDirection
    ].clone()
    const movementDistance = directionVec.multiply(new Vector2(pixelsToMove))
    const newPlayerPos = this.player.getPosition().add(movementDistance)
    this.player.setPosition(newPlayerPos)

    this.tileSizePixelsWalked += pixelsToMove
    this.tileSizePixelsWalked %= 48
  }

  getPixelsToWalkThisUpdate(delta) {
    const deltaInSeconds = delta / 1000
    return this.speedPixelsPerSecond * deltaInSeconds
  }

  stopMoving() {
    this.player.stopAnimation(this.movementDirection)
    this.setFacingDirection(this.movementDirection)
    this.movementDirection = Direction.NONE
  }

  willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate) {
    return (
      this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= 48
    )
  }

  shouldContinueMoving() {
    return (
      this.movementDirection == this.lastMovementIntent &&
      !this.isBlockingDirection(this.lastMovementIntent)
    )
  }

  isBlockingDirection(direction) {
    return this.hasBlockingTile(this.tilePosInDirection(direction))
  }

  tilePosInDirection(direction) {
    return this.player
      .getTilePos()
      .add(this.movementDirectionVectors[direction])
  }

  hasBlockingTile(pos) {
    if (this.hasNoTile(pos)) return true
    return this.tileMap.layers.some(layer => {
      const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name);
      if(tile && tile.properties.collides&& tile.properties.interactable)  {
        this.isFacingObject = true;
        this.setFacingObjectDesc(tile.properties.info); 
      }
      else {
        this.isFacingObject = false;
      }
      return tile && tile.properties.collides
    })

  }

  hasNoTile(pos) {
    return !this.tileMap.layers.some(layer =>
      this.tileMap.hasTileAt(pos.x, pos.y, layer.name)
    )
  }

  setFacingObjectDesc(desc) {
    this.facingObjectDesc = desc
  }

  getFacingObjectDesc() {
    return this.facingObjectDesc;
  }

  setFacingDirection(direction) {
      this.facingDirection = direction
  }

  getFacingDirection() {
      return this.facingDirection;
  }
}
