import Phaser from "phaser";
import BuildScene from "./scenes/BuildScene.js";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const config = {
  type: Phaser.WEBGL,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  parent: "game-container",
  scene: [
    BuildScene, 
  ],
};

new Phaser.Game(config);
