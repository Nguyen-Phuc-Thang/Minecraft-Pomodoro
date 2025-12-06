export default class InventoryUI {
  constructor(scene, itemSystem, hotbarUI) {
    this.scene = scene;
    this.itemSystem = itemSystem;
    this.hotbarUI = hotbarUI;

    const width = scene.scale.width;
    const height = scene.scale.height;

    const barLeft = 10;
    const barBottom = 10;
    const barWidth = 5268;
    const barHeight = 636;
    const barScale = 0.16;
    const barX = barLeft + (barWidth * barScale) / 2;
    const barY = height - barBottom - (barHeight * barScale) / 2;

    const invWidth = barWidth;
    const invHeight = 1356;
    const invScale = barScale;
    const invGap = 10;

    const invX = barX;
    const invY =
      barY -
      (barHeight * barScale) / 2 -
      (invHeight * invScale) / 2 -
      invGap;

    this.invX = invX;
    this.invY = invY;
    this.invWidth = invWidth;
    this.invHeight = invHeight;
    this.invScale = invScale;

    this.inventoryPanel = scene.add
      .image(invX, invY, "inventory_panel")
      .setOrigin(0.5)
      .setScale(invScale)
      .setVisible(false)
      .setDepth(3);

    const invRows = 3;
    const invCols = 14;

    this.invRows = invRows;
    this.invCols = invCols;

    const invSlotWidth = (invWidth / invCols) * invScale - 3.3;
    const invSlotHeight = (invHeight / invRows) * invScale - 3.3;

    this.invSlotWidth = invSlotWidth;
    this.invSlotHeight = invSlotHeight;

    const invLeftScreen = invX - (invWidth * invScale) / 2 + 22;
    const invTopScreen = invY - (invHeight * invScale) / 2 + 17;

    this.invLeftScreen = invLeftScreen;
    this.invTopScreen = invTopScreen;

    this.inventoryItems = [];


    const self = this;

    this.createIcon = function (row, col, item) {
      const textureKey = item.type;
      const count = item.count;

      const x =
        self.invLeftScreen + self.invSlotWidth / 2 + col * self.invSlotWidth;
      const y =
        self.invTopScreen +
        self.invSlotHeight / 2 +
        row * self.invSlotHeight / 1.2;

      const source = scene.textures.get(textureKey).getSourceImage();
      const scale = Math.min(
        (self.invSlotWidth * 0.8) / source.width,
        (self.invSlotHeight * 0.8) / source.height
      );

      const icon = scene.add
        .image(x, y, textureKey)
        .setOrigin(0.5)
        .setScale(scale)
        .setDepth(4)
        .setVisible(false)
        .setInteractive({ useHandCursor: true });

      const countText = scene.add
        .text(
          x + self.invSlotWidth / 2 - 4,
          y + self.invSlotHeight / 2 - 4,
          String(count),
          {
            fontFamily: "Arial",
            fontSize: "14px",
            color: "#ffffff"
          }
        )
        .setOrigin(1, 1)
        .setDepth(5)
        .setVisible(false);

      countText.setStroke("#000000", 4);

      icon.invRow = row;
      icon.invCol = col;
      icon.location = "inventory";
      icon.hotbarIndex = null;
      icon.blockType = textureKey;

      icon.dataItem = item;
      icon.stackCount = item.count;
      icon.countText = countText;

      icon.on("pointerdown", function (pointer) {
        if (pointer.leftButtonDown()) {
          self.itemSystem.handleInventoryLeftClick(this);
        } else {
        }
      });

      self.inventoryItems.push(icon);
    };

    hotbarUI.inventoryButton.on("pointerdown", () => {
      const show = !this.inventoryPanel.visible;
      this.setInventoryVisible(show);
    });
  }

  getCellPosition(row, col) {
    const x =
      this.invLeftScreen + this.invSlotWidth / 2 + col * this.invSlotWidth;
    const y =
      this.invTopScreen +
      this.invSlotHeight / 2 +
      row * this.invSlotHeight / 1.2;
    return { x, y };
  }

  setInventoryVisible(show) {
    this.inventoryPanel.setVisible(show);

    for (let i = 0; i < this.inventoryItems.length; i++) {
      const icon = this.inventoryItems[i];
      if (icon.location === "inventory") {
        icon.setVisible(show);
        if (icon.countText) icon.countText.setVisible(show);
      }
    }

  }

  setItems(items) {
    for (let i = 0; i < this.inventoryItems.length; i++) {
      const icon = this.inventoryItems[i];
      if (icon.countText) icon.countText.destroy();
      icon.destroy();
    }
    this.inventoryItems = [];

    const maxSlots = this.invRows * this.invCols;
    const count = Math.min(items.length, maxSlots);

    for (let i = 0; i < count; i++) {
      const item = items[i];
      const row = Math.floor(i / this.invCols);
      const col = i % this.invCols;
      this.createIcon(row, col, item);
    }
  }

  refreshCounts() {
    for (let i = 0; i < this.inventoryItems.length; i++) {
      const icon = this.inventoryItems[i];
      const dataItem = icon.dataItem;
      if (icon.countText && dataItem) {
        icon.countText.setText(String(dataItem.count));
      }
    }
  }

  isOpen() {
    return this.inventoryPanel.visible;
  }
}
