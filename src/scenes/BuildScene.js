import Phaser from "phaser";

export default class BuildScene extends Phaser.Scene {
  constructor() {
    super("BuildScene");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBackgroundColor(0xaecbff);

    const topBarHeight = 80;
    const topBar = this.add.rectangle(
      width / 2,
      topBarHeight / 2,
      width,
      topBarHeight,
      0x222831
    );
    topBar.setOrigin(0.5);

    const bottomBarHeight = 120;
    const bottomBar = this.add.rectangle(
      width / 2,
      height - bottomBarHeight / 2,
      width,
      bottomBarHeight,
      0x393e46
    );
    bottomBar.setOrigin(0.5);

    this.add.text(20, 20, "Build Screen", {
      fontSize: "24px",
      color: "#ffffff",
    });
  }
}
