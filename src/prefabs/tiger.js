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
        this.health = 3
        this.body.pushable = false
    }
    update(){
        if (Phaser.Input.Keyboard.JustDown(keyJUMP) &&  this.body.blocked.down){
            this.setVelocityY(this.jumpPower)
        }
        if (Phaser.Input.Keyboard.JustDown(keyATTACK)) {
            this.attack()
        }
    }
    
    takeDamage() {
        this.scene.health -= 1
        console.log("Tiger Health: " + this.health)
        this.scene.updateHealthIcons()

        if (this.scene.health <= 0) {
            this.die()
        }
    }

    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true
            let scratchOffset = 80
            let attackX = this.flipX ? this.x - scratchOffset : this.x + scratchOffset
            let attackY = this.y + 30
            let scratchEffect = this.scene.add.sprite(attackX, attackY, "scratch")
            scratchEffect.play("scratch")
            scratchEffect.flipX = this.flipX
            scratchEffect.setDepth(this.depth + 1)
            scratchEffect.play("scratch")
            this.scene.sound.play("attackSound")
            scratchEffect.on(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                scratchEffect.destroy()
            })
            this.attackHitbox = this.scene.add.rectangle(attackX, attackY, 40, 40, 0xff0000, 0)
            this.scene.physics.add.existing(this.attackHitbox)
            this.attackHitbox.body.setAllowGravity(false)
            this.attackHitbox.body.setImmovable(true)
            this.scene.physics.add.overlap(this.attackHitbox, this.scene.hunterGroup, this.scene.hitHunter, null, this.scene)
            this.scene.time.delayedCall(300, () => {
                this.isAttacking = false
                this.attackHitbox.destroy()
            })
        }
    }
    

    die() {
        this.setActive(false)
        this.setVisible(false)
        this.scene.physics.pause()
        this.scene.time.delayedCall(1000, () => {
            this.scene.gameOver()
        })
    }
}