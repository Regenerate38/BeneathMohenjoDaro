
export class Player {
  constructor(sprite, tilePos) {
    this.sprite = sprite
    this.tilePos = tilePos
    const offsetX = 48 / 2
    const offsetY = 48

    this.sprite.setOrigin(0.5, 1)
    this.sprite.setPosition(
      tilePos.x * 48 + offsetX,
      tilePos.y * 48 + offsetY
    )
    this.sprite.setFrame(81)
  }

  getPosition() {
    return this.sprite.getBottomCenter()
  }

  setPosition(position) {
    this.sprite.setPosition(position.x, position.y)
  }

  stopAnimation(direction) {
    const animationManager = this.sprite.anims.animationManager
    const standingFrame = animationManager.get(direction).frames[1].frame.name
    this.sprite.anims.stop()
    this.sprite.setFrame(standingFrame)
  }

  startAnimation(direction) {
    this.sprite.anims.play(direction)
  }

  getTilePos() {
    return this.tilePos.clone()
  }

  setTilePos(tilePosition) {
    this.tilePos = tilePosition.clone()
  }
}
