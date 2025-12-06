export default class HotbarUI {
  constructor(scene, itemSystem) {
    this.scene = scene;
    this.itemSystem = itemSystem;

    const width = scene.scale.width;
    const height = scene.scale.height;

    const barLeft = 10;
    const barBottom = 10;
    const barWidth = 5268;
    const barHeight = 636;
    const barScale = 0.16;
    const barX = barLeft + (barWidth * barScale) / 2;
    const barY = height - barBottom - (barHeight * barScale) / 2;

    this.barY = barY;
    this.barWidth = barWidth;
    this.barHeight = barHeight;
    this.barScale = barScale;

    this.slotBar = scene.add
      .image(barX, barY, "slot_bar")
      .setOrigin(0.5)
      .setScale(barScale)
      .setDepth(1);

    const numSlots = 14;
    this.numSlots = numSlots;

    this.hotbarItemSprites = new Array(numSlots).fill(null);
    this.storedItems = new Array(numSlots).fill(null);
    this.hotbarCountTexts = new Array(numSlots).fill(null);

    const slotWidth = (barWidth / numSlots) * barScale - 3.1;
    const slotHeight = barHeight * barScale;
    this.slotWidth = slotWidth;
    this.slotHeight = slotHeight;

    const barLeftScreen = barX - (barWidth * barScale) / 2;
    const firstSlotX = barLeftScreen + slotWidth / 2 + 20;

    this.hotbarSlots = [];
    this.selectedSlotIndex = 0;

    this.slotSelection = scene.add
      .rectangle(
        firstSlotX,
        barY,
        slotWidth - 7,
        slotHeight - 50
      )
      .setOrigin(0.5)
      .setStrokeStyle(4, 0xffffff)
      .setFillStyle(0x000000, 0)
      .setDepth(5);

    for (let i = 0; i < numSlots; i++) {
      const x = firstSlotX + i * slotWidth;
      const zone = scene.add
        .zone(x, barY, slotWidth, slotHeight)
        .setOrigin(0.5)
        .setInteractive();

      zone.slotIndex = i;
      zone.on("pointerdown", () => {
        this.selectSlot(zone.slotIndex);
        this.itemSystem.handleHotbarClick(zone.slotIndex);
      });

      this.hotbarSlots.push(zone);
    }

    scene.input.on("wheel", (_pointer, _go, _dx, dy) => {
      if (dy > 0) {
        this.selectSlot(this.selectedSlotIndex + 1);
      } else if (dy < 0) {
        this.selectSlot(this.selectedSlotIndex - 1);
      }
    });

    const btnSize = 636;
    const btnScale = 0.16;
    const btnWidth = btnSize * btnScale;
    const gap = 35;

    const totalBtnWidth = btnWidth * 3 + gap * 2;
    const rightMargin = 20;
    const firstBtnX = width - rightMargin - totalBtnWidth + btnWidth / 2;
    const btnY = barY;

    this.buildButton = scene.add
      .image(firstBtnX, btnY, "build_button")
      .setOrigin(0.5)
      .setScale(btnScale)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    this.removeButton = scene.add
      .image(firstBtnX + btnWidth + gap, btnY, "remove_button")
      .setOrigin(0.5)
      .setScale(btnScale)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    this.inventoryButton = scene.add
      .image(firstBtnX + (btnWidth + gap) * 2, btnY, "inventory_button")
      .setOrigin(0.5)
      .setScale(btnScale)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    this.selectSlot(0);
  }

  selectSlot(index) {
    const n = this.numSlots;
    this.selectedSlotIndex = ((index % n) + n) % n;
    const slot = this.hotbarSlots[this.selectedSlotIndex];
    this.slotSelection.x = slot.x;
  }

  getSlotIconPosition(index) {
    const slot = this.hotbarSlots[index];
    return {
      x: slot.x,
      y: this.barY
    };
  }

  setSlotItem(index, item) {
    if (index < 0 || index >= this.numSlots) return;
    this.storedItems[index] = item;
  }

  getSlotItem(index) {
    if (index < 0 || index >= this.numSlots) return null;
    return this.storedItems[index];
  }

  getSelectedItem() {
    return this.getSlotItem(this.selectedSlotIndex);
  }

  getSelectedItemType() {
    const item = this.getSelectedItem();
    return item ? item.type : null;
  }

  getSelectedItemCount() {
    const item = this.getSelectedItem();
    return item ? item.count : 0;
  }

  refreshCounts() {
    for (let i = 0; i < this.numSlots; i++) {
      const item = this.storedItems[i];
      const slot = this.hotbarSlots[i];
      let textObj = this.hotbarCountTexts[i];

      if (item && item.count > 0) {
        const textX = slot.x + this.slotWidth / 2 - 4;
        const textY = this.barY + this.slotHeight / 2 - 12;

        if (!textObj) {
          textObj = this.scene.add
            .text(textX, textY, String(item.count), {
              fontFamily: "Arial",
              fontSize: "14px",
              color: "#ffffff"
            })
            .setOrigin(1, 1)
            .setDepth(5);

          textObj.setStroke("#000000", 4);
          this.hotbarCountTexts[i] = textObj;
        } else {
          textObj.setText(String(item.count));
          textObj.setPosition(textX, textY);
          textObj.setVisible(true);
        }
      } else {
        if (textObj) {
          textObj.destroy();
          this.hotbarCountTexts[i] = null;
        }
      }
    }
  }
}
