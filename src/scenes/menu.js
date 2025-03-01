class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    preload(){
        this.load.image("startButton", "./assets/Sprites/StartButton.png")
        this.load.spritesheet('attack', './assets/Sprites/Attack.png', {
            frameWidth: 24,
            frameHeight: 25,
            startFrame: 0,
            endFrame: 10
        })
        this.load.image("hunter", "./assets/Sprites/Hunter.png")
        this.load.image("tiger", "./assets/Sprites/Tiger.png")
        this.load.image("sky", "./assets/Sprites/Sky.png")
        this.load.image("food", "./assets/Sprites/Food.png")
        this.load.image("health", "./assets/Sprites/Health.png")
        this.load.audio("start", "./assets/Audio/Start.mp3")
        this.load.audio("attackSound", "./assets/Audio/Attack.mp3")
        this.load.audio("punch", "./assets/Audio/Punch.mp3")
        this.load.audio("gameOver", "./assets/Audio/GameOver.mp3")
        this.load.audio("chomp", "./assets/Audio/Chomp.mp3")
        this.load.audio("bgm", "./assets/Audio/bgm.mp3")
    }
    create(){
        this.anims.create({
            key: 'scratch',
            frames: this.anims.generateFrameNumbers('attack', { start: 0, end: 10, first: 0}),
            frameRate: 30
        })
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0)
        this.add.text(320, 100, "Tiger Hunt", {
            fontSize: "48px",
            fontFamily: "Arial",
            fontStyle: "bold",
            color: "orange",
            stroke: "black",
            strokeThickness: 6,
            align: "center"
        }).setOrigin(0.5);
        this.menuTiger = new Tiger(this, 288, 530, "tiger").setOrigin(0, 0)
        this.menuHunter = this.add.sprite(320, 480, "hunter").setOrigin(0, 0)
        this.startButton = this.add.sprite(320, 200, "startButton").setInteractive()
        this.add.text(320, 250, "Press SPACE to Jump and ENTER to Attack", { fontSize: "20px", fill: "black" }).setOrigin(0.5)
        this.add.text(320, 280, "Survive as long as you can!", { fontSize: "20px", fill: "black" }).setOrigin(0.5)
        this.add.text(320, 320, "Press C for Credits", { fontSize: "20px", fill: "black" }).setOrigin(0.5)
        this.startButton.on("pointerdown", () => {
            this.sound.play("start")
            this.scene.start("playScene")
        })
        this.startButton.on("pointerover", () => {
            this.startButton.setScale(1.1)
            this.startButton.setTint(0xff0000)
        })
        this.startButton.on("pointerout", () => {
            this.startButton.setScale(1)
            this.startButton.clearTint()
        })
        this.input.keyboard.on("keydown-C", () => {
            this.scene.start("creditsScene")
        })
    }
}