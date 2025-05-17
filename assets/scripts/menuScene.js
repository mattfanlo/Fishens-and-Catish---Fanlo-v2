class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('playBtn', 'assets/images/buttonPlay.png');
        this.load.image('creditsBtn', 'assets/images/buttonCredits.png');
        this.load.image('quitBtn', 'assets/images/buttonQuit.png');
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('title', 'assets/images/title.png');
        
        this.load.audio('bg_music', 'assets/music/bgm.mp3');
    }

    create() {
        //music
        if (!this.sys.game.isMusicPlaying) { 
            this.backgroundMusic = this.sound.add('bg_music', {
                loop: true,
                volume: 0.3 
            });
            this.backgroundMusic.play();
            this.sys.game.isMusicPlaying = true; 
            this.sys.game.backgroundMusicInstance = this.backgroundMusic;
        }


        this.add.image(0, 0, 'background').setOrigin(0);

        this.add.image(670, 150, 'title')

        this.add.image(670, 450, 'playBtn')
            .setInteractive()
            .on('pointerdown', () => {
                this.sys.game.backgroundMusicInstance.stop(); // Stop music here
                this.scene.start('GameScene1');
            });

        this.add.image(350, 700, 'creditsBtn')
            .setInteractive()
            .on('pointerdown', () => this.scene.start('CreditsScene'));

        this.add.image(1000, 700, 'quitBtn')
            .setInteractive()
            .on('pointerdown', () => alert('You exited the game.'));

            
    }
}