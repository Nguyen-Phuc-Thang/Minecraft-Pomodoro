import Phaser from "phaser";
import BuildScene from "./scenes/BuildScene.js";
import PreloadScene from "./scenes/PreloadScene.js";
import PomodoroScene from "./scenes/PomodoroScene.js";

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
  scene: [PomodoroScene],
};


new Phaser.Game(config);
