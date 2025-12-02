import Phaser from "phaser";


export default class BuildScene extends Phaser.Scene {
  constructor() {
    super("BuildScene");
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.cameras.main.setBackgroundColor(0xaecbff);

    const barLeft = 10;
    const barBottom = 10;
    const barWidth = 5268;
    const barHeight = 636;
    const barScale = 0.16;
    const barX = barLeft + (barWidth * barScale) / 2;
    const barY = height - barBottom - (barHeight * barScale) / 2;

    this.slotBar = this.add
      .image(barX, barY, "slot_bar")
      .setOrigin(0.5)
      .setScale(barScale)
      .setDepth(1);

    const numSlots = 14;                     
    const slotWidth = (barWidth / numSlots) * barScale - 3.1;
    const slotHeight = barHeight * barScale;

    const barLeftScreen = barX - (barWidth * barScale) / 2;

    const firstSlotX = barLeftScreen + slotWidth / 2 + 20;

    this.hotbarSlots = [];
    this.selectedSlotIndex = 0;

    this.slotSelection = this.add
      .rectangle(
        firstSlotX,
        barY,
        slotWidth - 6,       
        slotHeight - 46
      )
      .setOrigin(0.5)
      .setStrokeStyle(4, 0xffffff)
      .setFillStyle(0x000000, 0) 
      .setDepth(5);

    this.selectSlot = (index) => {
      const n = numSlots;
      this.selectedSlotIndex = ((index % n) + n) % n; // wrap
      const slot = this.hotbarSlots[this.selectedSlotIndex];
      this.slotSelection.x = slot.x;
    };

    for (let i = 0; i < numSlots; i++) {
      const x = firstSlotX + i * slotWidth;
      const zone = this.add
        .zone(x, barY, slotWidth, slotHeight)
        .setOrigin(0.5)
        .setInteractive();

      zone.slotIndex = i;
      zone.on("pointerdown", () => {
        this.selectSlot(zone.slotIndex);
      });

      this.hotbarSlots.push(zone);
    }

    this.input.on("wheel", (_pointer, _go, _dx, dy) => {
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

    this.buildButton = this.add
      .image(firstBtnX, btnY, "build_button")
      .setOrigin(0.5)
      .setScale(btnScale)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    this.removeButton = this.add
      .image(firstBtnX + btnWidth + gap, btnY, "remove_button")
      .setOrigin(0.5)
      .setScale(btnScale)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

    this.inventoryButton = this.add
      .image(firstBtnX + (btnWidth + gap) * 2, btnY, "inventory_button")
      .setOrigin(0.5)
      .setScale(btnScale)
      .setInteractive({ useHandCursor: true })
      .setDepth(2);

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

    this.inventoryPanel = this.add
      .image(invX, invY, "inventory_panel")
      .setOrigin(0.5)
      .setScale(invScale)
      .setVisible(false)
      .setDepth(3);

    this.inventoryButton.on("pointerdown", () => {
      this.inventoryPanel.setVisible(!this.inventoryPanel.visible);
    });

    this.selectSlot(0);
  }
}
