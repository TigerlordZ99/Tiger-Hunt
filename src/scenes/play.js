class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }
    
    create(){
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0)
        this.physics.world.setBounds(0, 0, 640, 480)
        this.p1Tiger = new Tiger(this, 60, 370, "tiger").setOrigin(0, 0)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyATTACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    }

    update(){
        this.sky.tilePositionX += 2
        this.p1Tiger.update()
    }
}