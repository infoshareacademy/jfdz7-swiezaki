
// setting up needed const and var
const gameWidth = window.innerWidth*0.6;
const gameHeight = gameWidth*0.34;
const gameBackgroundImageOriginalWidth = 1958;
const gameBackgroundImageOriginalHeight = 392;
const backgroundWidthRatio = gameWidth*2/gameBackgroundImageOriginalWidth;
const backgroundHeightRatio = gameHeight/gameBackgroundImageOriginalHeight;

var cityBoard;

// setting up canvas size and placing it in selected div id 'game-body'
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-body', { preload: preload, create: create, update: update });

// preloading needed graphics, backgrounds, heroes, icons, etc.
function preload() {

   game.load.image('background', 'graphics/gameBackground.png');

}

// creating game environment using preloaded images
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // placing preloaded background image into game board and fixing size to current view
    cityBoard = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    cityBoard.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);

}

// changing elements state
function update() {

    // moving background image at the selected speed.
    cityBoard.tilePosition.x += -3;
}

// function will be needed in future planning. If not - might be deleted. Must be deleted also in const = game!

function render () {

}