class Hunter extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setGravityY(0)
        this.setImmovable(true)
        this.speed = 150
        this.damage = 1
        this.hasDamagedTiger = false
    }

    update() {
        this.setVelocityX(-this.speed*this.scene.hunterSpeedMultiplier)

        if (this.x < 20) {
            this.destroy()
        }
    }

    dealDamage(tiger) {
        if (!this.hasDamagedTiger && Phaser.Geom.Intersects.RectangleToRectangle(this.getBounds(), tiger.getBounds())) {
            tiger.takeDamage()
            this.hasDamagedTiger = true
            this.destroy() 
        }
    }
}
