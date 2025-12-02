import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("slot_bar", "assets/ui/hotbar/slot_bar.png");
  }

  create() {
    this.scene.start("BuildScene");
  }
}
