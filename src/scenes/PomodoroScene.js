import Phaser from "phaser";

export default class PomodoroScene extends Phaser.Scene {
    constructor() {
        super("PomodoroScene");
    }

    preload() {
        this.add.rectangle(0, 0, this.scale.width, this.scale.height, "0xF5E78C").setOrigin(0);
        this.load.image("num_0", "assets/fonts/wooden/0.png");
        this.load.image("num_1", "assets/fonts/wooden/1.png");
        this.load.image("num_2", "assets/fonts/wooden/2.png");
        this.load.image("num_3", "assets/fonts/wooden/3.png");
        this.load.image("num_4", "assets/fonts/wooden/4.png");
        this.load.image("num_5", "assets/fonts/wooden/5.png");
        this.load.image("num_6", "assets/fonts/wooden/6.png");
        this.load.image("num_7", "assets/fonts/wooden/7.png");
        this.load.image("num_8", "assets/fonts/wooden/8.png");
        this.load.image("num_9", "assets/fonts/wooden/9.png");
        this.load.image("colon", "assets/fonts/wooden/colon.png");
        this.load.image("bottomFrame", "assets/ui/wooden_frame.png");
        this.load.image("upButton", "assets/ui/button_up.png");
        this.load.image("upButtonPressed", "assets/ui/button_up_pressed.png");
        this.load.image("downButton", "assets/ui/button_down.png");
        this.load.image("downButtonPressed", "assets/ui/button_down_pressed.png");
        this.load.image("numberFrame", "assets/ui/num_frame.png");
    }

    create() {
        const WIDTH = this.scale.width;
        const HEIGHT = this.scale.height;

        // Static UI Elements
        const distanceFromCenter = [-300, -150, 150, 300];
        let numberFrames = [];
        for(let i = 0; i < 4; i++) {
            numberFrames.push(this.add.image(WIDTH / 2 - distanceFromCenter[i], HEIGHT / 3, "numberFrame").setOrigin(0.5).setScale(1.5));
        }

        const colon = this.add.image(WIDTH / 2, HEIGHT / 3, "colon").setOrigin(0.5);

        const controllerFrame = this.add.image(0, HEIGHT / 2 + 50, "bottomFrame");
        controllerFrame.setOrigin(0, 0);
        controllerFrame.setScale(20);
        
        // Numbers
        const distanceFromFirstQuartile = [-175, -75, 75, 175];
        this.timerDigits = [];
        this.focusDigits = [];
        this.breakDigits = [];
        for(let i = 0; i < 4; i++) {
            this.timerDigits.push( this.add.image(numberFrames[i].x, numberFrames[i].y, "num_0").setOrigin(0.5));
            this.focusDigits.push(this.add.image(WIDTH / 5 + distanceFromFirstQuartile[i], HEIGHT - 125, "num_0").setOrigin(0.5).setScale(0.75));
            this.breakDigits.push(this.add.image(WIDTH / 5 * 4 + distanceFromFirstQuartile[i], HEIGHT - 125, "num_0").setOrigin(0.5).setScale(0.75));
        }

        this.focusColon = this.add.image(WIDTH / 5, HEIGHT - 125, "colon").setOrigin(0.5).setScale(0.75);
        this.breakColon = this.add.image(WIDTH / 5 * 4, HEIGHT - 125, "colon").setOrigin(0.5).setScale(0.75);

        // Buttons
        const createButton = (x, y, key, keyPressed, action) => {
            const button = this.add.sprite(x, y, key).setOrigin(0.5).setScale(1.5).setInteractive();
            button.on('pointerdown', () => {
                button.setTexture(keyPressed);
                action();});
            button.on('pointerup', () => {
                button.setTexture(key);
            });
            return button;
        }        

        for(let i = 0; i < 4; i++) {
            createButton(this.focusDigits[i].x, HEIGHT - 200, "upButton", "upButtonPressed", () => {});
            createButton(this.breakDigits[i].x, HEIGHT - 200, "upButton", "upButtonPressed", () => {});
            createButton(this.focusDigits[i].x, HEIGHT - 50, "downButton", "downButtonPressed", () => {});
            createButton(this.breakDigits[i].x, HEIGHT - 50, "downButton", "downButtonPressed", () => {});
        }
    }

    update(time, delta) {

    }
}