class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    preload(){
        this.load.image("startButton", "./assets/StartButton.png")
        this.load.image("tiger", "./assets/Tiger.png")
        this.load.image("sky", "./assets/Sky.png")
        this.load.image("food", "./assets/Food.png")
        this.load.image("health", "./assets/Health.png")
    }
    create(){
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0)
        this.menuTiger = new Tiger(this, 288, 530, "tiger").setOrigin(0, 0)
        this.startButton = this.add.sprite(320, 240, "startButton").setInteractive()
        this.startButton.on("pointerdown", () => {
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
    }
}