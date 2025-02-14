// Madhav Ramakrishnan
// 2/13/2025
// 16 Hours
// 
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,    
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
    scene: [ Menu, Play, GameOver ]
}
let game = new Phaser.Game(config)

let keyJUMP, keyATTACK