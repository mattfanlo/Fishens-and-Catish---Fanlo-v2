import { GameScene1 } from './GameScene1.js';
import { GameScene2 } from './GameScene2.js';
import { GameScene3 } from './GameScene3.js'; 

let config = {
    type: Phaser.AUTO,
    width: 1408, 
    height: 768, 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, 
            debug: true 
        }
    },
    scene: [MenuScene, CreditsScene, GameScene1, GameScene2, ] 
};

let game = new Phaser.Game(config); 