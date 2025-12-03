import Phaser from "phaser";
import BuildScene from "./scenes/BuildScene.js";
import PreloadScene from "./scenes/PreloadScene.js";

const config = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 1280,
  height: 640,
  pixelArt: true, 
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene, BuildScene],
};


new Phaser.Game(config);
