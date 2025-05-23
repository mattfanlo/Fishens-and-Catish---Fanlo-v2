class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        this.load.image('mainButton', 'assets/images/buttonQuit.png');
        this.load.image('creditsBG', 'assets/images/background.jpg');

        this.load.audio('click', 'assets/music/click.mp3'); // 👈 preload click sound
    }

    create() {
        // Background
        this.add.image(0, 0, 'creditsBG').setOrigin(0, 0).setDisplaySize(1920, 1080);

        // Fancy font style
        const textStyle = {
            font: 'bold 42px Arial Black',
            fill: '#FFD700',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#333333',
                blur: 4,
                fill: true
            }
        };

        // Text
        this.add.text(350, 300, 'FULL NAME: Matthew Miguel A. Fanlo', textStyle);
        this.add.text(450, 360, 'SECTION: A224', textStyle);
        this.add.text(450, 420, 'PROGRAM: EMC', textStyle);

        // Click sound
        const clickSound = this.sound.add('click');

        // Back to menu button
        const backButton = this.add.image(1000, 450, 'mainButton')
            .setScale(0.5)
            .setInteractive();

        backButton.on('pointerdown', () => {
            clickSound.play(); // 👈 play click
            this.scene.start('MenuScene');
        });
    }
}
