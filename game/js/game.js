let gameWidth = window.innerWidth*0.7; // width of the game canvas
let gameHeight = gameWidth*0.4; // height of the game canvas

// setting up canvas size and placing it in selected div id 'game-body'
const game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'game-body');

// window.localStorage.clear(); // clearing local window storage of any storaged data

// creating states for game loading
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('gameover', endState);

game.state.start('boot');


