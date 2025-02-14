class Tiger extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setGravityY(500)
        this.setBounce(0.2)
        this.speed = 200
        this.jumpPower = -500
        this.isAttacking = false
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyJUMP) &&  this.body.blocked.down){
            this.setVelocityY(this.jumpPower)
        }
        if (Phaser.Input.Keyboard.JustDown(keyATTACK)) {
            this.attack()
        }
    }

    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true
            console.log("Tiger attacks!");
            this.scene.time.delayedCall(300, () => { this.isAttacking = false; })
        }
    }
}