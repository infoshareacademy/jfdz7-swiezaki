
// setting up needed const and let
const gameWidth = window.innerWidth*0.7;
const gameHeight = gameWidth*0.4;
const gameBackgroundImageOriginalWidth = 1958;
const gameBackgroundImageOriginalHeight = 492;
const backgroundWidthRatio = gameWidth*2/gameBackgroundImageOriginalWidth;
const backgroundHeightRatio = gameHeight/gameBackgroundImageOriginalHeight;

let cityBoard;
let player;
let run;
let spaceKey;
let gameScore = 0;
let gameScoreText;
let playerLifes = 10;
let playerLifesText;

// obstacles:
let crates;
let crateTwoLevels;
let crateThreeLevels;
let tires;
let tire;
let burn;

// starting values for tires speed, they are increased during gameplay:
let minTireSpeed = 600;
let maxTireSpeed = 900;

// tools:
let tool;
let tools;
let specialTool;
let specialTools;

// setting up canvas size and placing it in selected div id 'game-body'
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-body', { preload: preload, create: create, update: update });

// preloading needed graphics, backgrounds, heroes, icons, etc.
function preload() {

   game.load.image('background', 'graphics/gameBackground_1958_492.png');
   game.load.spritesheet('marian', 'graphics/spritesheet.png', 300, 393, 3); //300 and 393 are size of the frame, 3 is number of frames in the png file

    // OBSTACLES:
    game.load.image('crateTwoLevels', 'graphics/crate02.PNG');
    game.load.image('crateThreeLevels', 'graphics/crate03.PNG');
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
    game.load.image('goldenWrench', 'graphics/goldenWrench.PNG'); // texture for special (golden) tool

    // FONT:
    game.load.bitmapFont('carrier_command', 'fonts/carrier_command.png', 'fonts/carrier_command.xml');

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
    game.time.events.loop(Phaser.Timer.SECOND * 2.5, spawnCrates, this);

    // increasing tires speed every 30 seconds:
    const increaseMinTireSpeed = () => minTireSpeed += 50;
    const increaseMaxTireSpeed = () => maxTireSpeed += 50;
    game.time.events.loop(Phaser.Timer.SECOND * 30, increaseMinTireSpeed, this);
    game.time.events.loop(Phaser.Timer.SECOND * 30, increaseMaxTireSpeed, this);

    // spawning tires every 4 seconds:
    tires = game.add.group();
    tires.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 3, spawnTires, this);

    // generating normal tools:
    tools = game.add.group();
    tools.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 0.3, spawnTools, this);

    // generating special tools:
    specialTools = game.add.group();
    specialTools.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND, spawnSpecialTools, this);

    // displaying player's score and lifes:
    gameScoreText = game.add.bitmapText(16, 16, 'carrier_command', 'score: 0', 20);
    playerLifesText = game.add.bitmapText(16, 40, 'carrier_command', playerLifes, 20);


}

// changing elements state
function update() {

    // collisions between player and game's objects:
    game.physics.arcade.overlap(player, tools, collectTools, null, this);
    game.physics.arcade.overlap(player, specialTools, collectSpecialTools, null, this);
    game.physics.arcade.overlap(player, crates, collideWithTwoLevelsCrate, null, this);
    game.physics.arcade.overlap(player, crates, collideWithThreeLevelsCrate, null, this);


    // moving background image at the selected speed.
    cityBoard.tilePosition.x += -6;

    // 'press and hold spacebar' function to jump over obstacles
    // player can jump only while touching the ground (&& player.body.blocked.down)
    if (spaceKey.isDown && player.body.blocked.down) {

        player.body.velocity.y = - 570;

    };

}

// function will be needed in future planning. If not - might be deleted. Must be deleted also in const = game!

function render () {

}

// creating crates:

const addTwoLevelsCrate = () => {
    crateTwoLevels = crates.create(game.width, game.world.height - 100, 'crateTwoLevels');
    crateTwoLevels.scale.setTo(0.35, 0.35);
    crateTwoLevels.body.velocity.x = -500;
};

const addThreeLevelsCrate = () => {
    crateThreeLevels = crates.create(game.width, game.world.height - 150, 'crateThreeLevels');
    crateThreeLevels.scale.setTo(0.35, 0.35);
    crateThreeLevels.body.velocity.x = -500;
};

// randomized spawning of crates (random intervals and height):

const spawnCrates = () => {

    const randomNum = Math.floor(Math.random() * 4);
    if (randomNum === 1) {
        // if we get 1, two-level crate is spawned
        addTwoLevelsCrate()
    } else if (randomNum === 2) {
        // if we get 2, three-level crate is spawned
        addThreeLevelsCrate()
    }
    // if we get 3 or 4, no crate will be spawned

};

// collision with crates:

const collideWithTwoLevelsCrate = (player, crateTwoLevels) => {
    crateTwoLevels.kill();
    // crate has to be 'killed' on collision, otherwise player will constantly lose lifes while passing the crate
    playerLifes -= 1; // player lose one life
    playerLifesText.text = playerLifes; // player's lifes are updated on screen
};

const collideWithThreeLevelsCrate = (player, crateThreeLevels) => {
    crateThreeLevels.kill();
    playerLifes -= 1;
    playerLifesText.text = playerLifes;
};



// function responsible for spawning tires, with randomized speed:

const spawnTires = () => {

    const randomTireSpeed = Math.floor(Math.random() * (maxTireSpeed - minTireSpeed + 1)) + minTireSpeed;

    tire = game.add.sprite(game.width, game.world.height - 75, 'tire');
    tires.add(tire);
    tire.scale.setTo(0.75, 0.75);
    tire.body.velocity.x = - randomTireSpeed;
    burn = tire.animations.add('burn');
    tire.animations.play('burn', 7, true);

};

const spawnTools = () => {

    //generating random tool texture
    const toolsArray = ['drill', 'hammer', 'pincers01', 'pincers02', 'screwdriver01', 'screwdriver02', 'wrench01', 'wrench02'];
    const randomTool = toolsArray[Math.floor(Math.random() * toolsArray.length)];

    //randomizing height
    const maxHeight = 260;
    const minHeight = 230;
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    //randomizing spawning interval
    const randomNum = Math.random() * 10;
    if (randomNum >= 4) {

        tool = tools.create(game.width, game.world.height - randomHeight, randomTool);
        tool.scale.setTo(0.5, 0.5);
        tool.body.velocity.x = - 600;

    }

};

const collectTools = (player, tool) => {

    tool.kill(); // tools disappear after collision
    gameScore += Math.ceil(Math.random() * 10); // game score is increased by random number 1-10
    gameScoreText.text = 'Score: ' + gameScore; // updated game score is displayed

};

const spawnSpecialTools = () => {

    // randomizing spawning interval
    const randomNum = Math.floor(Math.random() * 10);
    if (randomNum === 1) {

        specialTool = specialTools.create(game.width, game.world.height - 280, 'goldenWrench');
        // height is hardcoded, so special tool doesn't overlap with normal tools (always will spawn above them)
        specialTool.scale.setTo(0.5, 0.5);
        specialTool.body.velocity.x = -600;

    }

};

const collectSpecialTools = (player, specialTool) => {

    specialTool.kill();
    gameScore += 500;
    gameScoreText.text = 'Score: ' + gameScore;

};