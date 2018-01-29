const gameWidth = window.innerWidth*0.6;
const gameHeight = gameWidth*0.34;

console.log(gameWidth)

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-body', { preload: preload, create: create, update: update });

function preload() {

   game.load.image('background', 'graphics/gameBackground.png');

}

var cityBoard;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    cityBoard = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    console.log(gameWidth);
    console.log(gameHeight);
    console.log(cityBoard);
}

function update() {
    cityBoard.tilePosition.x += -4;
}

function render () {

}