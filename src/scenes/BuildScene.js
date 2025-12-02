import Phaser from "phaser";

export default class BuildScene extends Phaser.Scene {
  constructor() {
    super("BuildScene");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBackgroundColor(0xaecbff);


    // slotbar
    const barLeft = 10; 
    const barBottom = 10;
    const barWidth = 5268;
    const barHeight = 636;
    const barScale = 0.16;
    const barX = barLeft + (barWidth * barScale) / 2;
    const barY = height - barBottom - (barHeight * barScale) / 2;

    this.slotBar = this.add.image(barX, barY, "slot_bar").setOrigin(0.5).setScale(barScale);
  }
}
