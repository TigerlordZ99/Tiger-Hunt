class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }
    
    create(){
        //SETUP
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0)
        this.physics.world.setBounds(0, 0, 640, 480)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyATTACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.p1Tiger = new Tiger(this, 60, 370, "tiger").setOrigin(0, 0)
        this.physics.add.collider(this.p1Tiger, this.ground)
        
        //HEALTH
        this.maxHealth = 3
        this.health = this.maxHealth
        this.healthIcons = []
        for (let i = 0; i < this.maxHealth; i++) {
            let heart = this.add.image(540 + i * 30, 40, "health")
            this.healthIcons.push(heart)
        }

        //FOOD
        this.foodGroup = this.physics.add.group()
        this.spawnFood()

        //SCORE
        this.score = 0;
        this.scoreText = this.add.text(20, 20, 'Score: 0', {
        fontSize: '32px',
        fill: 'black '
        })

        this.time.addEvent({
            delay: 50,
            callback: this.increaseScore,
            callbackScope: this,
            loop: true
        })

        //FOOD SPAWN
        this.time.addEvent({
            delay: 10000,
            callback: this.spawnFood,
            callbackScope: this,
            loop: true
        })

        this.physics.add.overlap(this.p1Tiger, this.foodGroup, this.collectFood, null, this)

        //DAMAGE
        this.time.addEvent({
            delay: 10000,
            callback: this.decreaseHealth,
            callbackScope: this,
            loop: true
        })

        console.log("Health is " + this.health)
    }

    update(){
        this.sky.tilePositionX += 2
        this.p1Tiger.update()

        this.foodGroup.children.each((food) => {
            food.x -= 2
            if (food.x < 15) {
                food.destroy()
            }
        }, this)
    }

    decreaseHealth(){
        if (this.health > 0) {
            this.health -= 1
            console.log("Health is " + this.health)
            this.updateHealthIcons()
        }
    }

    spawnFood(){
        let x = Phaser.Math.Between(700, 900)
        let y = Phaser.Math.Between(300, 400)
        let food = this.foodGroup.create(x, y, "food")
        food.setImmovable(true)
        food.body.allowGravity = false
        food.setCollideWorldBounds(true)
    }

    collectFood(tiger, food) {
        if (!food || !food.active) return
        if (this.health < this.maxHealth) {
            this.health++
            this.updateHealthIcons()
            console.log("Health is " + this.health)
        }
        food.destroy()
    }
    
    updateHealthIcons() {
        for (let i = 0; i < this.maxHealth; i++) {
            this.healthIcons[i].setVisible(i < this.health)
        }
    }

    increaseScore() {
        this.score += 1
        this.scoreText.setText('Score: ' + this.score)
    }
}