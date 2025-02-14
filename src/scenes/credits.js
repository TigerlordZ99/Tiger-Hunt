class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }

    create() {
        this.add.text(320, 150, "Game by Madhav Ramakrishnan", { fontSize: "24px", fill: "#fff" }).setOrigin(0.5)
        this.add.text(320, 200, "Art: Madhav Ramakrishnan", { fontSize: "20px", fill: "#fff" }).setOrigin(0.5)
        this.add.text(320, 250, "Music & SFX: Pixabay", { fontSize: "20px", fill: "#fff" }).setOrigin(0.5)
        this.add.text(320, 350, "Press M to return to Menu", { fontSize: "20px", fill: "#fff" }).setOrigin(0.5)

        this.input.keyboard.on("keydown-M", () => {
            this.scene.start("menuScene")
        })
    }
}
