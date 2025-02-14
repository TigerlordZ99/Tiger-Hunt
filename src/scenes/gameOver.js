class GameOver extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    init(data) {
        if (data.score !== undefined) {
            this.score = data.score
        } else {
            this.score = 0
        }
    }

    create() {
        this.add.text(320, 150, 'Game Over', {
            fontSize: '64px',
            fill: 'white'
        }). setOrigin(0.5)
        this.add.text(320, 250, 'Score: ' + this.score, {
            fontSize: '32px',
            fill: 'white'
        }).setOrigin(0.5)
        this.add.text(320, 300, 'Press R to Restart', {
            fontSize: '32px',
            fill: 'white'
        }).setOrigin(0.5)
        this.add.text(320, 350, 'Press M to go to the Menu', {
            fontSize: '32px',
            fill: 'white'
        }).setOrigin(0.5)
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start("playScene")
        })
        this.input.keyboard.on('keydown-M', () => {
            this.scene.start("menuScene")
        })
    }
}
