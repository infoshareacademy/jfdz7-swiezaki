const loadState = {

    preload: () => {

        // loading text visible until this state is done.
        const loadingLabel = game.add.text(80, 150, 'loading... please wait...',
                             { font: '30px Courier', fill: '#ffffff' });
        // BACKGROUND:
        game.load.image('background', 'graphics/gameBackground_1958_492.png');

        // OPERATION BUTTONS

        game.load.image('buttonStart', 'graphics/startGameButton_mouseOver.png');

        // HERO:
        game.load.spritesheet('marian', 'graphics/spritesheet.png', 300, 393, 3); //300 and 393 are size of the frame, 3 is number of frames in the png file

        // HEART FOR LOOSING LIFE GRAPHICS:
        game.load.image('heart', 'graphics/heart.PNG');

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

    },

    create: () => {

        // CHANGING GAME STATE TO MENU AFTER LOADING GAME ASSETS
        game.state.start('menu');

    }

};