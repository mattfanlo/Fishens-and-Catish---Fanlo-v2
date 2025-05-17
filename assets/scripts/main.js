let config = {
    type: Phaser.AUTO,
    width: 1408, 
    height: 768, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, 
            debug: false 
        }
    },
    scene: [MenuScene, CreditsScene, GameScene1, GameScene2, GameScene3, WinScene] 
};

let game = new Phaser.Game(config); 