// const PLAYER_FRAME_WIDTH = 312;
// const PLAYER_FRAME_HEIGHT = 317;
// const FISH_FRAME_WIDTH = 500;
// const FISH_FRAME_HEIGHT = 263;

// const PLAYER_COLORS = [0xff0000, 0xff5733, 0xFFE500, 0x00ff00, 0x0000ff, 0x4b0082, 0xee82ee];

// class GameScene extends Phaser.Scene {
//     constructor() {
//         super('GameScene');
//         this.player = null;
//         this.fishes = null;
//         this.vegetables = null;
//         this.platforms = null;
//         this.cursors = null;
//         this.scoreText = null;
//         this.fishesCollectedText = null;

//         this.score = 0;
//         this.fishesCollected = 0;
//         this.fishesForScaleBoost = 0;
//         this.currentColorIndex = 0;
//         this.gameOver = false;
//     }

//     preload() {
//         this.load.image('game_background', 'assets/images/background.jpg');
//         this.load.spritesheet('player_char', 'assets/images/cat.png', {
//             frameWidth: PLAYER_FRAME_WIDTH,
//             frameHeight: PLAYER_FRAME_HEIGHT
//         });
//         this.load.spritesheet('fish_collectible', 'assets/images/fish.png', {
//             frameWidth: FISH_FRAME_WIDTH,
//             frameHeight: FISH_FRAME_HEIGHT
//         });
//         this.load.image('vegetable_hazard', 'assets/images/vegetable.png');
//         this.load.image('new_platform_tile', 'assets/images/tiles.png');
//     }

//     create() {
//         this.score = 0;
//         this.fishesCollected = 0;
//         this.fishesForScaleBoost = 0;
//         this.currentColorIndex = 0;
//         this.gameOver = false;

//         this.add.image(0, 0, 'game_background')
//             .setOrigin(0, 0)
//             .setDisplaySize(config.width, config.height);

//         this.platforms = this.physics.add.staticGroup();

//         const groundHeight = 24;
//         let ground = this.add.tileSprite(
//             config.width / 2,
//             config.height - (groundHeight / 2),
//             config.width,
//             groundHeight,
//             'new_platform_tile'
//         );
//         this.platforms.add(ground);

//         const platformHeight = 54;

//         let plat1 = this.add.tileSprite(config.width * 0.85, config.height * 0.75, 240, platformHeight, 'new_platform_tile');
//         this.platforms.add(plat1);

//         let plat2 = this.add.tileSprite(config.width * 0.2, config.height * 0.75, 375, platformHeight, 'new_platform_tile');
//         this.platforms.add(plat2);

//         let plat3 = this.add.tileSprite(config.width * 0.5, config.height * 0.45, 395, platformHeight, 'new_platform_tile');
//         this.platforms.add(plat3);

//         this.player = this.physics.add.sprite(100, config.height - 150, 'player_char');
//         this.player.setBounce(0.1);
//         this.player.setCollideWorldBounds(true);
//         this.player.setTint(PLAYER_COLORS[this.currentColorIndex]);
//         this.player.setScale(0.25);

//         const hitboxWidth = PLAYER_FRAME_WIDTH * 0.5;
//         const hitboxHeight = PLAYER_FRAME_HEIGHT * 0.6;
//         this.player.body.setSize(hitboxWidth, hitboxHeight);
//         this.player.body.setOffset((PLAYER_FRAME_WIDTH - hitboxWidth) / 2, (PLAYER_FRAME_HEIGHT - hitboxHeight) / 2);

//         this.cursors = this.input.keyboard.createCursorKeys();

//         this.fishes = this.physics.add.group();
//         for (let i = 0; i < 8; i++) {
//             this.spawnFish();
//         }

//         this.vegetables = this.physics.add.group();
//         this.spawnVegetable();

//         this.scoreText = this.add.text(16, 16, 'Score: 0', {
//             fontSize: '32px',
//             fill: '#FFFF00',
//             fontStyle: 'bold',
//             stroke: '#000000',
//             strokeThickness: 3
//         });

//         this.fishesCollectedText = this.add.text(config.width - 400, 16, 'Fishes Collected: 0', {
//             fontSize: '32px',
//             fill: '#FFFFFF',
//             fontStyle: 'bold',
//             stroke: '#000000',
//             strokeThickness: 3
//         }).setOrigin(0, 0);

//         this.physics.add.collider(this.player, this.platforms);
//         this.physics.add.collider(this.fishes, this.platforms);
//         this.physics.add.collider(this.vegetables, this.platforms);
//         this.physics.add.overlap(this.player, this.fishes, this.collectFish, null, this);
//         this.physics.add.overlap(this.player, this.vegetables, this.hitVegetable, null, this);
//     }

//     update() {
//         if (this.gameOver) return;

//         if (this.cursors.left.isDown) {
//             this.player.setVelocityX(-300);
//             this.player.anims.play('left', true);
//             this.player.flipX = true;
//         } else if (this.cursors.right.isDown) {
//             this.player.setVelocityX(300);
//             this.player.anims.play('right', true);
//             this.player.flipX = false;
//         } else {
//             this.player.setVelocityX(0);
//             this.player.anims.play('turn', true);
//         }

//         if (this.cursors.up.isDown && this.player.body.touching.down) {
//             this.player.setVelocityY(-420);
//         }
//     }

//     spawnFish() {
//         const x = Phaser.Math.Between(50, config.width - 50);
//         const y = Phaser.Math.Between(0, config.height / 3);
//         let fish = this.fishes.create(x, y, 'fish_collectible');

//         fish.setScale(0.1);
//         fish.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));
//         fish.setCollideWorldBounds(true);
//         fish.anims.play('star_spin', true); // animation key remains unless renamed elsewhere
//         fish.body.allowGravity = true;
//     }

//     spawnVegetable() {
//         const x = (this.player.x < config.width / 2) ?
//             Phaser.Math.Between(config.width / 2, config.width - 50) :
//             Phaser.Math.Between(50, config.width / 2);
//         let vegetable = this.vegetables.create(x, 20, 'vegetable_hazard');

//         vegetable.setScale(0.1);
//         vegetable.setBounce(1);
//         vegetable.setCollideWorldBounds(true);
//         vegetable.setVelocity(Phaser.Math.Between(-150, 150), 20);
//         vegetable.body.allowGravity = true;
//     }

//     collectFish(player, fish) {
//         fish.disableBody(true, true);

//         this.score += 10;
//         this.scoreText.setText('Score: ' + this.score);

//         this.fishesCollected++;
//         this.fishesCollectedText.setText('Fishes Collected: ' + this.fishesCollected);

//         this.fishesForScaleBoost++;
//         if (this.fishesForScaleBoost >= 5) {
//             this.fishesForScaleBoost = 0;
//             player.setScale(player.scaleX * 1.10, player.scaleY * 1.10);
//         }

//         this.currentColorIndex = (this.currentColorIndex + 1) % PLAYER_COLORS.length;
//         player.setTint(PLAYER_COLORS[this.currentColorIndex]);

//         this.spawnFish();

//         if (this.fishesCollected % Phaser.Math.Between(3, 6) === 0) {
//             this.spawnVegetable();
//         }
//     }

//     hitVegetable(player, vegetable) {
//         this.physics.pause();
//         player.setTint(0xff0000);
//         player.anims.stop();
//         player.disableBody(true, true);

//         this.gameOver = true;

//         this.add.text(config.width / 2, config.height / 2 - 60, 'GAME OVER', {
//             fontFamily: 'Impact, Arial Black, sans-serif',
//             fontSize: '80px',
//             fill: '#ff0000',
//             fontStyle: 'bold',
//             stroke: '#ffffff',
//             strokeThickness: 8,
//             shadow: {
//                 offsetX: 4,
//                 offsetY: 4,
//                 color: '#000000',
//                 blur: 6,
//                 stroke: true,
//                 fill: true
//             }
//         }).setOrigin(0.5);

//         this.add.text(config.width / 2, config.height / 2 + 20, 'Click to Restart', {
//             fontFamily: 'Verdana, sans-serif',
//             fontSize: '36px',
//             fill: '#ffcc00',
//             fontStyle: 'italic',
//             stroke: '#000000',
//             strokeThickness: 4,
//             shadow: {
//                 offsetX: 2,
//                 offsetY: 2,
//                 color: '#000000',
//                 blur: 3,
//                 stroke: true,
//                 fill: true
//             }
//         }).setOrigin(0.5);

//         this.add.text(config.width / 2, config.height / 2 + 70, 'Press ESC for Main Menu', {
//             fontFamily: 'Courier New, monospace',
//             fontSize: '32px',
//             fill: '#00ffff',
//             fontStyle: 'bold',
//             stroke: '#000000',
//             strokeThickness: 4,
//             shadow: {
//                 offsetX: 2,
//                 offsetY: 2,
//                 color: '#000000',
//                 blur: 3,
//                 stroke: true,
//                 fill: true
//             }
//         }).setOrigin(0.5);

//         this.input.once('pointerdown', () => {
//             if (this.gameOver) this.scene.restart();
//         });

//         this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
//         this.escKey.once('down', () => {
//             if (this.gameOver) {
//                 this.scene.start('MenuScene');
//             }
//         });
//     }
// }
