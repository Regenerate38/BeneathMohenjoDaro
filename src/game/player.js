export class Player {
  constructor(sprite, tilePos, scale = 3) {
    this.sprite = sprite;
    this.tilePos = tilePos;
    this.scale = scale;

    this.goodSpeed = 16 * scale;
    const offsetX = this.goodSpeed / 2;
    const offsetY = this.goodSpeed;

    this.sprite.setOrigin(0.5, 1);
    this.sprite.setPosition(
      tilePos.x * this.goodSpeed + offsetX,
      tilePos.y * this.goodSpeed + offsetY
    );
    this.sprite.setFrame(81);
  }

  getPosition() {
    return this.sprite.getBottomCenter();
  }

  setPosition(position) {
    this.sprite.setPosition(position.x, position.y);
  }

  stopAnimation(direction) {
    const animationManager = this.sprite.anims.animationManager;
    const standingFrame = animationManager.get(direction).frames[1].frame.name;
    this.sprite.anims.stop();
    this.sprite.setFrame(standingFrame);
  }

  startAnimation(direction) {
    this.sprite.anims.play(direction);
  }

  getTilePos() {
    return this.tilePos.clone();
  }

  setTilePos(tilePosition) {
    this.tilePos = tilePosition.clone();
  }
}
