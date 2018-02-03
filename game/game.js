
// setting up needed const and let
const gameWidth = window.innerWidth*0.7;
const gameHeight = gameWidth*0.34;
const gameBackgroundImageOriginalWidth = 1958;
const gameBackgroundImageOriginalHeight = 492;
const backgroundWidthRatio = gameWidth*2/gameBackgroundImageOriginalWidth;
const backgroundHeightRatio = gameHeight/gameBackgroundImageOriginalHeight;

let cityBoard;
let player;
let platforms;
let ground;
let cursors;
let run;
let spaceKey;

// setting up canvas size and placing it in selected div id 'game-body'
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-body', { preload: preload, create: create, update: update });

// preloading needed graphics, backgrounds, heroes, icons, etc.
function preload() {

   game.load.image('background', 'graphics/gameBackground_1958_492.png');
   game.load.spritesheet('marian', 'graphics/spritesheet.png', 300, 393, 3); //300 and 393 are size of the frame, 3 is number of frames in the png file

}

// creating game environment using preloaded images
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // placing preloaded background image into game board and fixing size to current view
    cityBoard = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    cityBoard.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);


    player = game.add.sprite(60, game.world.height - 110, 'marian');
    player.scale.setTo(0.2, 0.2); //resize sprite to fit the background
    game.physics.arcade.enable(player); //enable physics on marian
    player.body.bounce.y = 0.3; // give marian slight bounce
    player.body.gravity.y = 300; //marian and his 'heaviness'
    player.body.collideWorldBounds = true; // prevents from falling off the ground
    run = player.animations.add('run'); //add animation property 'run'
    player.animations.play('run', 7, true); //starts animation, 7 is number of frames animated per second(how 'fast our player is)

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //register spacebar key
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]); //block-out spacebar of doing default things on the browser

}

// changing elements state
function update() {

    // moving background image at the selected speed.
    cityBoard.tilePosition.x += -3;

    // 'press and hold spacebar' function to jump over obstacles
    player.body.velocity.y = 0;
    if (spaceKey.isDown) {
        player.body.velocity.y = -450;
    }
    else {
        player.body.velocity.y = 150;
    }

}

// function will be needed in future planning. If not - might be deleted. Must be deleted also in const = game!

function render () {

}