// Madhav Ramakrishnan
// 2/13/2025
// 16 Hours
// Creative Tilt: 
// I learned how to use Hitboxes for collisions, especially for attacks, which can help me create other games, such as FPS games.
// I'm not really good at art so I'm proud of the basic sprites that I was able to make.
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,    
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 500 },
        }
    },
    scene: [ Menu, Play, GameOver, Credits ]
}
let game = new Phaser.Game(config)

let keyJUMP, keyATTACK