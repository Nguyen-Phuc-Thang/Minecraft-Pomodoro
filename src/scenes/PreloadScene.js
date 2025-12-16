import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.load.image("slot_bar", "assets/ui/hotbar/slot_bar.png");
    this.load.image("build_button1", "assets/ui/hotbar/build_button1.png");
    this.load.image("build_button4", "assets/ui/hotbar/build_button4.png");
    this.load.image("inventory_button", "assets/ui/hotbar/inventory_button.png");
    this.load.image("inventory_button1", "assets/ui/hotbar/inventory_button1.png");
    this.load.image("inventory_panel", "assets/ui/inventory_panel.png");
    this.load.image("buy_button", "assets/ui/buy_button.png");
    this.load.image("buildmode_button_setting", "assets/ui/buildmode_button_setting.png");
    this.load.image("buildmode_button_setting_pressed", "assets/ui/buildmode_button_setting_pressed.png");

    this.load.image("grass", "assets/blocks/grass.png");
    this.load.image("dirt", "assets/blocks/dirt.png");
    this.load.image("bedrock", "assets/blocks/bedrock.png");
    this.load.image("stone", "assets/blocks/stone.png");
    this.load.image("oak_planks", "assets/blocks/oak_planks.png");
    this.load.image("oak_wood", "assets/blocks/oak_wood.png");
    this.load.image("obsidian", "assets/blocks/obsidian.png");
    this.load.image("bricks", "assets/blocks/bricks.png");
    this.load.image("sand", "assets/blocks/sand.png");
    this.load.image("TNT", "assets/blocks/TNT.png");
    this.load.image("ice", "assets/blocks/ice.png");
    this.load.image("command_block", "assets/blocks/command_block.png");
    this.load.image("glass", "assets/blocks/glass.png");
    this.load.image("triangle_wood", "assets/blocks/triangle_wood.png");
    this.load.image("pumpkin", "assets/blocks/pumpkin.png");
    this.load.image("magma", "assets/blocks/magma.png");
    this.load.image("lantern", "assets/blocks/lantern.png");
    this.load.image("mushroom", "assets/blocks/mushroom.png");
    this.load.image("red_mushroom", "assets/blocks/red__mushroom.png");
    this.load.image("half_wood", "assets/blocks/half_wood.png");
    this.load.image("cactus", "assets/blocks/cactus.png");
    this.load.image("books", "assets/blocks/books.png");
    this.load.image("emerald_block", "assets/blocks/emerald_block.png");
    this.load.image("diamond_block", "assets/blocks/diamond_block.png");
    this.load.image("gold_block", "assets/blocks/gold_block.png");
    this.load.image("iron_block", "assets/blocks/iron_block.png");
    this.load.image("chest", "assets/blocks/chest.png");
    this.load.image("stove", "assets/blocks/stove.png");
    this.load.image("crafting_table", "assets/blocks/crafting_table.png");
    this.load.image("steve", "assets/blocks/steve.png");
    this.load.image("torch", "assets/blocks/torch.png");
    this.load.image("flower", "assets/blocks/flower.png");
    this.load.image("triangle_wood2", "assets/blocks/triangle_wood2.png");
    this.load.image("iron_trapdoor", "assets/blocks/iron_trapdoor.png");
    this.load.image("wood_trapdoor", "assets/blocks/wood_trapdoor.png");
    this.load.image("stone1", "assets/blocks/stone1.png");
    this.load.image("cake", "assets/blocks/cake.png");
    this.load.image("shit3", "assets/blocks/shit3.png");
    this.load.image("shit1", "assets/blocks/shit1.png");
    this.load.image("shit", "assets/blocks/shit.png");
    this.load.image("leaves", "assets/blocks/leaves.png");
    this.load.image("pink_wool", "assets/blocks/pink_wool.png");



    this.load.font('Minecraft', 'assets/fonts/Minecraft.ttf');
    this.load.image("pomodoroMode", "assets/ui/pomodoro_mode.png");
    this.load.image("buildMode", "assets/ui/build_mode.png");
    this.load.audio("woodenButtonClick", "assets/sounds/sfx/wooden_button_click.mp3");
    this.load.audio("minecraft_button_click", "assets/sounds/sfx/minecraft_button_click.mp3");
  }

  init(data) {
    this.userId = data.userId;
  }

  create() {

    async function loadInventoryFromDB() {
      const userRef = doc(db, "users", this.userId);

      const snap = await getDoc(userRef);
      const inv = snap.data().inventory || [];

      this.inventoryUI.setItems(inv);
    }
    const userId = "demoUser";
    this.scene.start("BuildScene", { userId: this.userId });
  }
}
