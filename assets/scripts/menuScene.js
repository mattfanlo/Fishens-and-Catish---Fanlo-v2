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
        this.load.audio('click', 'assets/music/click.mp3'); 
    }

    create() {
        // Music
        if (!this.sys.game.isMusicPlaying) {
            this.backgroundMusic = this.sound.add('bg_music', {
                loop: true,
                volume: 0.3
            });
            this.backgroundMusic.play();
            this.sys.game.isMusicPlaying = true;
            this.sys.game.backgroundMusicInstance = this.backgroundMusic;
        }

        // Click sound instance
        this.clickSound = this.sound.add('click');

        // Background and title
        this.add.image(0, 0, 'background').setOrigin(0);
        this.add.image(670, 150, 'title');

        // Play Button
        this.add.image(670, 450, 'playBtn')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.clickSound.play(); 
                this.sys.game.backgroundMusicInstance.stop();
                this.scene.start('GameScene1');
            });

        // Credits Button
        this.add.image(350, 700, 'creditsBtn')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.clickSound.play(); 
                this.scene.start('CreditsScene');
            });

        // Quit Button
        this.add.image(1000, 700, 'quitBtn')
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.clickSound.play(); 
                alert('You exited the game.');
            });
    }
}
 