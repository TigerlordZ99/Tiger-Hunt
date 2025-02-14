class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }
    preload(){
        this.load.image("tiger", "./assets/Tiger.png")
        this.load.image("sky", "./assets/Sky.png")
        this.load.image("food", "./assets/Food.png")
        this.load.image("health", "./assets/Health.png")
    }
    create(){
        this.scene.start("playScene")
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0)
        this.menuTiger = new Tiger(this, 320, 240, "tiger").setOrigin(0, 0)

    }
}