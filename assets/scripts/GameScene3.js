class GameScene3 extends Phaser.Scene {
    constructor() {
        super('GameScene3');
        this.player = null;
        this.platforms = null;
        this.cursors = null;
        this.scoreLabel = null;
        this.fishLabel = null;
        this.coinsCollected = 0;
        this.coins = null;
        this.bombs = null;
        this.gameOver = false;
        this.originalScale = 2;
    }

    preload() {
        this.load.audio('bgm3', 'assets/music/bgm3.mp3');
        this.load.image('bg3', 'assets/images/bg_level3.jpg');
        this.load.image('tiles3', 'assets/images/platform3.png');
        this.load.image('coin', 'assets/images/fish.png');
        this.load.image('bomb', 'assets/images/vegetable.png');
        this.load.spritesheet('player_char', 'assets/images/cat.png', {
            frameWidth: PLAYER_FRAME_WIDTH,
            frameHeight: PLAYER_FRAME_HEIGHT
        });
    }

    create() {
        this.coinsCollected = 0;
        colorIndex = 0;
        this.gameOver = false;

        this.add.image(0, 0, 'bg3').setOrigin(0, 0).setDisplaySize(config.width, config.height);

        this.bgm = this.sound.add('bgm3', {
            loop: true,
            volume: 0.5
        });
        this.bgm.play();

        this.platforms = this.physics.add.staticGroup();
        const ground = this.add.tileSprite(config.width / 2, config.height - 16, config.width, 32, 'tiles3');
        this.physics.add.existing(ground, true);
        this.platforms.add(ground);

        // Harder layout
        const positions = [
            [250, 500], [700, 400], [1150, 300],
            [500, 200], [900, 500], [1300, 480], [400, 100]
        ];
        positions.forEach(([x, y]) => {
            const platform = this.add.tileSprite(x, y, 250, 32, 'tiles3');
            this.physics.add.existing(platform, true);
            this.platforms.add(platform);
        });

        this.player = this.physics.add.sprite(100, 100, 'player_char');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(this.originalScale);
        this.player.setTint(0xffffff);
        this.player.body.setSize(10, 17.5).setOffset(19.5, 17);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_char', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player_char', frame: 3 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_char', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms);

        this.coins = this.physics.add.group({ key: 'coin', repeat: 19 });
        this.coins.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
            child.setScale(0.1);
            const x = Phaser.Math.Between(50, config.width - 50);
            const y = Phaser.Math.Between(-100, -200);
            child.setPosition(x, y);
        });

        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.bombs = this.physics.add.group();
        this.createBomb();
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);

        this.scoreLabel = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.fishLabel = this.add.text(config.width - 16, 16, 'Fish Collected: 0', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(1, 0);
    }

    update() {
        if (this.gameOver) return;

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-230); // faster movement
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(230);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-450); // higher jump
        }
    }

    collectCoin(player, coin) {
        coin.disableBody(true, true);
        this.coinsCollected += 1;

        const score = this.coinsCollected * 10;
        this.scoreLabel.setText('Score: ' + score+'/400');
        this.fishLabel.setText('Fish Collected: ' + this.coinsCollected);

        this.player.setTint(COLORS[colorIndex]);
        colorIndex = (colorIndex + 1) % COLORS.length;

        if (this.coinsCollected % 5 === 0) {
            this.increasePlayerSize();
            this.createBomb();
        }

        if (this.coinsCollected < 40) {
            const x = Phaser.Math.Between(50, config.width - 50);
            const y = Phaser.Math.Between(-100, -200);
            const newCoin = this.coins.create(x, y, 'coin');
            newCoin.setBounceY(Phaser.Math.FloatBetween(0.3, 0.6));
            newCoin.setScale(0.1);
        }

        if (this.coinsCollected >= 40) {
            this.winCondition();
        }
    }

    increasePlayerSize() {
        let currentScale = this.player.scale;
        this.player.setScale(currentScale * 1.1);
    }

    createBomb() {
        const x = Phaser.Math.Between(100, config.width - 100);
        const bomb = this.bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-300, 300), 50);
        bomb.setScale(0.1);
    }

    winCondition() {
        this.physics.pause();
        this.gameOver = true;
        if (this.bgm && this.bgm.isPlaying) {
            this.bgm.stop();
        }

        this.add.text(config.width / 2, config.height / 2 - 50, 'You Beat All Levels!', {
            fontSize: '64px',
            fill: '#00ff88',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(config.width / 2, config.height / 2 + 10, 'Click to continue', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('WinScene');
        });
    }

    hitBomb(player, bomb) {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.stop();
        this.gameOver = true;

        if (this.bgm && this.bgm.isPlaying) {
            this.bgm.stop();
        }

        this.add.text(config.width / 2, config.height / 2 - 50, 'GAME OVER', {
            fontSize: '64px',
            fill: '#ff0000',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(config.width / 2, config.height / 2 + 10, 'Click to Retry Level 3', {
            fontSize: '32px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.restart();
        });
    }
}
