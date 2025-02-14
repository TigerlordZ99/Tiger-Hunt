class Play extends Phaser.Scene{
    constructor(){
        super("playScene")
    }
    
    create(){
        //SETUP
        if (!this.sound.get("bgm")) {
            this.bgm = this.sound.add("bgm", { loop: true, volume: 0.5 })
            this.bgm.play()
        }
        this.sky = this.add.tileSprite(0, 0, 640, 480, "sky").setOrigin(0, 0)
        this.physics.world.setBounds(0, 0, 640, 480)
        keyJUMP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyATTACK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        this.p1Tiger = new Tiger(this, 60, 370, "tiger").setOrigin(0, 0)

        //HUNTER
        this.hunterGroup = this.physics.add.group()
        this.spawnHunter()
        this.time.addEvent({
            delay: 2000,
            callback: this.spawnHunter,
            callbackScope: this,
            loop: true
        })

        this.hunterSpeedMultiplier = 1
        this.time.addEvent({
            delay: 10000,
            callback: () => { this.hunterSpeedMultiplier += 0.5 },
            callbackScope: this,
            loop: true
        })

        this.hunterSpawnRate = 2000
        
        this.hunterSpawnEvent = this.time.addEvent({
            delay: this.hunterSpawnRate,
            callback: this.spawnHunter,
            callbackScope: this,
            loop: true
        })

        this.time.addEvent({
            delay: 30000,
            callback: () => {
                this.hunterSpawnRate /= 2
                this.hunterSpawnEvent.reset({
                    delay: this.hunterSpawnRate,
                    callback: this.spawnHunter,
                    callbackScope: this,
                    loop: true
                })
            },
        })

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
        this.physics.add.overlap(this.p1Tiger, this.hunterGroup, this.dealDamage, null, this)


        console.log("Health is " + this.health)
    }

    update(){
        if (this.health <= 0) {
            this.p1Tiger.die()
        }

        this.sky.tilePositionX += 2
        this.p1Tiger.update()

        this.foodGroup.children.each((food) => {
            food.x -= 2
            if (food.x < 15) {
                food.destroy()
            }
        }, this)

        this.hunterGroup.children.each((hunter) => {
            hunter.update()
            hunter.dealDamage(this.p1Tiger)
        }, this)
    }

    dealDamage(tiger, hunter) {
        tiger.takeDamage()
        this.sound.play("punch")
        hunter.destroy()
    }

    hitHunter(hitbox, hunter) {
        hunter.destroy()
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
        this.sound.play("chomp")
        food.destroy()
    }
    
    updateHealthIcons() {
        for (let i = 0; i < 3; i++) {
            this.healthIcons[i].setVisible(i < this.health)
        }
    }

    increaseScore() {
        this.score += 1
        this.scoreText.setText('Score: ' + this.score)
    }

    gameOver() {
        if (this.bgm) this.bgm.stop()
        this.sound.play("gameOver")
        this.scene.start("gameOverScene", { score: this.score })
    }

    spawnHunter() {
        let x = 700
        let y = 370
        let minDistance = 50
        let canSpawn = this.hunterGroup.getChildren().every(hunter => Math.abs(hunter.x - x) > minDistance)
        if (canSpawn) {
            let hunter = new Hunter(this, x, y, "hunter")
            this.hunterGroup.add(hunter)
            this.physics.add.collider(hunter, this.p1Tiger)
            hunter.setCollideWorldBounds(true)
        } else {
            this.time.delayedCall(500, this.spawnHunter, [], this)
        }
    }
}