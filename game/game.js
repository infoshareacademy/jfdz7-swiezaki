
// setting up needed const and let
const gameWidth = window.innerWidth*0.7;
const gameHeight = gameWidth*0.5;
const gameBackgroundImageOriginalWidth = 1958;
const gameBackgroundImageOriginalHeight = 492;
const backgroundWidthRatio = gameWidth*2/gameBackgroundImageOriginalWidth;
const backgroundHeightRatio = gameHeight/gameBackgroundImageOriginalHeight;

let cityBoard;
let player;
let run;
let spaceKey;

let crates;
let crate;
let crate2;
let crate3;
let tires;
let tire;
let burn;
// starting values for tires speed, they are increased during gameplay:
let minTireSpeed = 700;
let maxTireSpeed = 1000;

let tool;
let tools;

// setting up canvas size and placing it in selected div id 'game-body'
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-body', { preload: preload, create: create, update: update });

// preloading needed graphics, backgrounds, heroes, icons, etc.
function preload() {

   game.load.image('background', 'graphics/gameBackground_1958_492.png');
   game.load.spritesheet('marian', 'graphics/spritesheet.png', 300, 393, 3); //300 and 393 are size of the frame, 3 is number of frames in the png file

    // OBSTACLES:
    game.load.image('crate', 'graphics/crate.PNG');
    game.load.spritesheet('tire', 'graphics/spritesheet_tire.png', 126, 91, 2);

    // TOOLS:
    game.load.image('drill', 'graphics/drill.PNG');
    game.load.image('hammer', 'graphics/hammer.PNG');
    game.load.image('pincers01', 'graphics/pincers.PNG');
    game.load.image('pincers02', 'graphics/pincers2.PNG');
    game.load.image('screwdriver01', 'graphics/screwdriver.PNG');
    game.load.image('screwdriver02', 'graphics/screwdriver2.PNG');
    game.load.image('wrench01', 'graphics/wrench.PNG');
    game.load.image('wrench02', 'graphics/wrench2.PNG');

}

// creating game environment using preloaded images
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    // placing preloaded background image into game board and fixing size to current view
    cityBoard = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
    cityBoard.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);

    player = game.add.sprite(250, game.world.height - 110, 'marian');
    player.scale.setTo(0.2, 0.2); //resize sprite to fit the background
    game.physics.arcade.enable(player); //enable physics on marian
    player.body.gravity.y = 800; //marian and his 'heaviness'
    player.body.collideWorldBounds = true; // prevents from falling off the ground

    run = player.animations.add('run'); //add animation property 'run'
    player.animations.play('run', 7, true); //starts animation, 7 is number of frames animated per second(how 'fast our player is)

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); //register spacebar key
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]); //block-out spacebar of doing default things on the browser

    // spawning crates every 2 seconds:
    crates = game.add.group();
    crates.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 2, spawnCrates, this);

    // increasing tires speed every 30 seconds:
    const increaseMinTireSpeed = () => minTireSpeed += 100;
    const increaseMaxTireSpeed = () => maxTireSpeed += 100;
    game.time.events.loop(Phaser.Timer.SECOND * 30, increaseMinTireSpeed, this);
    game.time.events.loop(Phaser.Timer.SECOND * 30, increaseMaxTireSpeed, this);

    // spawning tires every 2 seconds:
    tires = game.add.group();
    tires.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 2, spawnTires, this);

    // generating normal tools:
    tools = game.add.group();
    tools.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 0.3, spawnTools, this);



}

// changing elements state
function update() {


    // moving background image at the selected speed.
    cityBoard.tilePosition.x += -6;

    // 'press and hold spacebar' function to jump over obstacles
    // player can jump only while touching the ground (&& player.body.blocked.down)
    if (spaceKey.isDown && player.body.blocked.down) {

        player.body.velocity.y = - 550;

    };

}

// function will be needed in future planning. If not - might be deleted. Must be deleted also in const = game!

function render () {

}

// three functions used to create three levels of crates, used later in spawnCrates() function:

const addFirstCrate = () => {
    crate = crates.create(800, game.world.height - 65, 'crate');
    crate.scale.setTo(0.150, 0.150);
    crate.body.velocity.x = -600;
};

const addSecondCrate = () => {
    crate2 = crates.create(800, game.world.height - 105, 'crate');
    crate2.scale.setTo(0.150, 0.150);
    crate2.body.velocity.x = -600;
};

const addThirdCrate = () => {
    crate3 = crates.create(800, game.world.height - 145, 'crate');
    crate3.scale.setTo(0.150, 0.150);
    crate3.body.velocity.x = -600;
};

// randomized spawning of crates (random intervals and height):

const spawnCrates = () => {

    const randomNum = Math.floor(Math.random() * 4);

    if (randomNum === 1) {
        // if we get 1, two-level crate is spawned

        addFirstCrate();
        addSecondCrate();

    } else if (randomNum === 2) {
        // if we get 2, three-level crate is spawned

        addFirstCrate();
        addSecondCrate();
        addThirdCrate();

    }

    // if we get 3 or 4, no crate will be spawned

};

// function responsible for spawning tires, with randomized speed:

function spawnTires() {

    const randomTireSpeed = Math.floor(Math.random() * (maxTireSpeed - minTireSpeed + 1)) + minTireSpeed;

    tire = game.add.sprite(800, game.world.height - 75, 'tire');
    tires.add(tire);
    tire.scale.setTo(0.750, 0.750);
    tire.body.velocity.x = - randomTireSpeed;
    burn = tire.animations.add('burn');
    tire.animations.play('burn', 7, true);

};

const spawnTools = () => {

    //generating random tool texture
    const toolsArray = ['drill', 'hammer', 'pincers01', 'pincers02', 'screwdriver01', 'screwdriver02', 'wrench01', 'wrench02'];
    const randomTool = toolsArray[Math.floor(Math.random() * toolsArray.length)];

    //randomizing height
    const maxHeight = 300;
    const minHeight = 200;
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    //randomizing spawning interval
    const randomNum = Math.random() * 10;
    if (randomNum >= 4) {

        tool = tools.create(game.width, game.world.height - randomHeight, randomTool);
        tool.scale.setTo(0.5, 0.5);
        tool.body.velocity.x = - 600;

    }

};