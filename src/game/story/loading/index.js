import { Scene } from 'phaser';
export class LoadingScene extends Scene {
  constructor() {
    super('loading-scene');
  }
  create() {
    console.log('Loading scene was created');
  }
}