class WinScene extends Phaser.Scene {
    constructor() {
        super('WinScene');
    }

    preload() {
        this.load.audio('winMusic', 'assets/music/win.mp3');
        this.load.image('winBackground', 'assets/images/background.jpg');

    }

    create() {
        // Background
        this.add.image(0, 0, 'winBackground').setOrigin(0, 0).setDisplaySize(config.width, config.height);

        // Music
        this.winMusic = this.sound.add('winMusic', { volume: 0.6 });
        this.winMusic.play();

        const titleStyle = {
            fontFamily: 'Georgia, serif',
            fontSize: '72px',
            fill: 'linear-gradient(to right, #ffdd00, #ff9900)',
            stroke: '#000000',
            strokeThickness: 8,
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#333333',
                blur: 6,
                stroke: true,
                fill: true
            }
        };

        const subtitleStyle = {
            fontFamily: 'Verdana, sans-serif',
            fontSize: '36px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: '#222222',
                blur: 4,
                stroke: true,
                fill: true
            }
        };

        const smallStyle = {
            fontFamily: 'Courier New, monospace',
            fontSize: '28px',
            fill: '#00ffcc',
            stroke: '#000000',
            strokeThickness: 3,
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#000000',
                blur: 3,
                stroke: true,
                fill: true
            }
        };

        
        this.add.text(config.width / 2, config.height / 2 - 100, ' CONGRATULATIONS! ', titleStyle).setOrigin(0.5);

        
        this.add.text(config.width / 2, config.height / 2 - 30, 'You finished all levels!', subtitleStyle).setOrigin(0.5);

        
        const restartText = this.add.text(config.width / 2, config.height / 2 + 60, 'Click anywhere to return', smallStyle).setOrigin(0.5);

        restartText.setInteractive({ useHandCursor: true });
        restartText.on('pointerdown', () => {
            this.winMusic.stop();
            this.scene.start('MenuScene');
        });

        
        this.input.once('pointerdown', () => {
            this.winMusic.stop();
            this.scene.start('MenuScene');
        });
    }
}
