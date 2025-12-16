import { audioSettings } from "../gameSettings";
import Phaser from "phaser";
import LoginScene from "../scenes/LoginScene";

export default class SettingsDialog {
  constructor(scene, x, y) {
    this.scene = scene;

    this.dom = scene.add.dom(x, y).createFromCache("settings-html");
    this.dom.setOrigin(0.5);
    this.dom.setDepth(1000);
    this.dom.setVisible(false);
    this.dom.setScrollFactor(0);

    this.dom.addListener("input");
    this.dom.addListener("click");

    this.dom.on("input", (e) => {
      if (e.target.id === "music-volume") {
        audioSettings.musicVolume = parseFloat(e.target.value) / 100;
      }
      if (e.target.id === "sound-volume") {
        audioSettings.sfxVolume = parseFloat(e.target.value) / 100;
      }
    });

    this.dom.on("click", (e) => {
      if (e.target.id === "btn-apply") {
        this.hide();
      } else if (e.target.id === "btn-logout") {
        this.scene.scene.start("LoginScene");
      }
    });
  }

  show() {
    this.dom.getChildByID("music-volume").value = audioSettings.musicVolume * 100;
    this.dom.getChildByID("sound-volume").value = audioSettings.sfxVolume * 100;
    this.dom.setVisible(true);
  }

  hide() {
    this.dom.setVisible(false);
  }

  toggle() {
    if (this.dom.visible) this.hide();
    else this.show();
  }

  destroy() {
    this.dom.destroy();
  }
}