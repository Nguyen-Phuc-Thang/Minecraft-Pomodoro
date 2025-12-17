import { audioSettings } from "../gameSettings.js";

export default class BlockBuildUI {
  constructor(scene, hotbarUI) {
    this.scene = scene;
    this.hotbarUI = hotbarUI;

    this.mapCols = 50;
    this.mapRows = 25;

    this.viewCols = 25;
    this.topOffset = 90;

    const usableWidth = scene.scale.width - 5;
    this.cellSize = usableWidth / this.viewCols;

    this.worldWidth = this.mapCols * this.cellSize;
    this.worldHeight = this.topOffset + this.mapRows * this.cellSize;

    this.grid = new Array(this.mapRows);
    for (let y = 0; y < this.mapRows; y++) {
      this.grid[y] = new Array(this.mapCols);
    }

    this.hoverHighlight = scene.add
      .rectangle(0, 0, this.cellSize - 4, this.cellSize - 4)
      .setOrigin(0.5)
      .setStrokeStyle(3, 0xffffff)
      .setFillStyle(0x000000, 0)
      .setDepth(0)
      .setVisible(false);

    for (let y = 0; y < this.mapRows; y++) {
      for (let x = 0; x < this.mapCols; x++) {
        const p = this.cellToWorld(x, y);

        const zone = scene.add
          .zone(p.x, p.y, this.cellSize, this.cellSize)
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true });

        zone.gridX = x;
        zone.gridY = y;

        zone.on("pointerover", () => {
          const cell = this.getCell(zone.gridX, zone.gridY);
          if (!cell || cell.type === "bedrock") return;
          this.hoverHighlight.setPosition(zone.x, zone.y);
          this.hoverHighlight.setVisible(true);
        });

        zone.on("pointerout", () => {
          this.hoverHighlight.setVisible(false);
        });

        zone.on("pointerdown", () => {
          const cell = this.getCell(zone.gridX, zone.gridY);
          if (!cell || cell.type === "bedrock") return;
          this.scene.sound.play("minecraft_button_click", { volume: audioSettings.sfxVolume });
          if (this.onCellClick) {
            this.onCellClick({
              x: zone.gridX,
              y: zone.gridY,
              type: cell.type,
              sprite: cell.sprite,
              zone
            });
          }
        });

        this.grid[y][x] = {
          x,
          y,
          type: null,
          sprite: null,
          zone
        };
      }
    }

    this.resetToDefault();
  }

  cellToWorld(x, y) {
    const wx = this.cellSize / 2 + x * this.cellSize;
    const wy = this.topOffset + (this.mapRows - 1 - y) * this.cellSize + this.cellSize / 2;
    return { x: wx, y: wy };
  }

  getCell(x, y) {
    if (x < 0 || x >= this.mapCols) return null;
    if (y < 0 || y >= this.mapRows) return null;
    return this.grid[y][x];
  }

  placeBlock(x, y, type) {
    const cell = this.getCell(x, y);
    if (!cell) return;

    if (cell.sprite) {
      cell.sprite.destroy();
      cell.sprite = null;
    }

    cell.type = type;
    if (!type) return;

    const p = this.cellToWorld(x, y);
    const source = this.scene.textures.get(type).getSourceImage();
    const scale = Math.min(this.cellSize / source.width, this.cellSize / source.height);
    const depth = 0;

    cell.sprite = this.scene.add
      .image(p.x, p.y, type)
      .setOrigin(0.5)
      .setScale(scale)
      .setDepth(depth);
  }

  getBlock(x, y) {
    const cell = this.getCell(x, y);
    if (!cell) return null;
    return cell.type;
  }

  setVisible(visible) {
    for (let y = 0; y < this.mapRows; y++) {
      for (let x = 0; x < this.mapCols; x++) {
        const cell = this.grid[y][x];
        if (cell.sprite) cell.sprite.setVisible(visible);
        if (cell.zone) {
          if (visible) cell.zone.setInteractive();
          else cell.zone.disableInteractive();
        }
      }
    }
    if (!visible) this.hoverHighlight.setVisible(false);
  }

  setInteractiveEnabled(enabled) {
    for (let y = 0; y < this.mapRows; y++) {
      for (let x = 0; x < this.mapCols; x++) {
        const cell = this.grid[y][x];
        if (!cell?.zone) continue;
        if (enabled) cell.zone.setInteractive({ useHandCursor: true });
        else cell.zone.disableInteractive();
      }
    }
    if (!enabled) this.hoverHighlight.setVisible(false);
  }

  removeBlock(x, y) {
    const cell = this.getCell(x, y);
    if (!cell) return false;
    if (!cell.type || cell.type === "bedrock") return false;

    if (cell.sprite) {
      cell.sprite.destroy();
      cell.sprite = null;
    }

    cell.type = null;
    return true;
  }

  resetToDefault() {
    for (let y = 0; y < this.mapRows; y++) {
      for (let x = 0; x < this.mapCols; x++) {
        const cell = this.getCell(x, y);
        if (cell && cell.sprite) {
          cell.sprite.destroy();
          cell.sprite = null;
        }
        if (cell) cell.type = null;
      }
    }

    for (let x = 0; x < this.mapCols; x++) {
      this.placeBlock(x, 0, "bedrock");
      this.placeBlock(x, 1, "bedrock");
      this.placeBlock(x, 2, "bedrock");
      this.placeBlock(x, 3, "dirt");
      this.placeBlock(x, 4, "grass");
    }
  }

  getMapData() {
    const data = {};
    for (let y = 0; y < this.mapRows; y++) {
      const row = new Array(this.mapCols);
      for (let x = 0; x < this.mapCols; x++) {
        const cell = this.getCell(x, y);
        row[x] = cell && cell.type ? cell.type : null;
      }
      data[y] = row;
    }
    return data;
  }

  loadMapData(mapData) {
    if (!mapData || typeof mapData !== "object") return;

    for (let y = 0; y < this.mapRows; y++) {
      const row = mapData[y];
      if (!Array.isArray(row)) continue;

      for (let x = 0; x < this.mapCols; x++) {
        const type = row[x] || null;
        this.placeBlock(x, y, type);
      }
    }
  }
}