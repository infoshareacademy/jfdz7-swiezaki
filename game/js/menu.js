const menuState = {

    create: () => {

        const currentGameHeight = game.world.height;

        const titleFontSize = currentGameHeight/26.85;
        const textFontSize = currentGameHeight/33.56;
        const textLineSpacing = currentGameHeight/10;

        menuBackGround = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        menuBackGround.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);
        menuBackGround.alpha = 0.35;

        console.log(game.world.width, game.world.height);

        instructionTitle = game.add.bitmapText(30, 40, 'carrier_command', 'INSTRUCTION', titleFontSize);
        instructionText = game.add.bitmapText(30, 80, 'carrier_command',
                                                'The main purpose of the game is to collect tools.\n\n' +
                                                'They are randomly showing up - to reach them ' +
                                                'you need to jump.\n\nYou also need to jump to avoid' +
                                                ' a series of the obstacles.\n\nIf you will hit the' +
                                                ' obstacle you will loose a life.\n\nYou have a total of' +
                                                ' 10 lives in the game.\n\nAfter loosing last life ' +
                                                'the game will end.\n\nthere is a special "golden" tool' +
                                                ' which gives you an extra points.\n\nLook for it! Good luck!',
                                                textFontSize);
        gameControlsTitle = game.add.bitmapText(30, 360, 'carrier_command', 'GAME CONTROLS', titleFontSize);
        gameControlsText = game.add.bitmapText(30, 400, 'carrier_command',
                                                '[SPACEBAR] - JUMP (collect tools/avoid obstacles)', textFontSize)

        const buttonStart = game.add.button(30, 450, 'buttonStart',
                          menuState.start, menuState, 2, 1, 0); // start button
    },

    start: () => {

        // CHANGING GAME STATE TO PLAY AFTER PRESSING THE START GAME BUTTON
        game.state.start('play');
    }

};