const menuState = {

    create: () => {

        const currentGameHeight = game.world.height;
        const currentGameWidth = game.world.width;

        const titleFontSize = currentGameHeight/26.85;
        const textFontSize = currentGameHeight/33.56;
        const instructionTitleVerticalSpace = currentGameHeight/13.42;
        const instructionTextVerticalSpace = currentGameHeight/6.72;
        const gameControlsTitleVerticalSpace = currentGameHeight/1.49;
        const gameControlsTextVerticalSpace = currentGameHeight/1.34;
        const buttonStartVerticalSpace = currentGameHeight/1.19;
        const buttonSizeRatio = currentGameWidth/1344;


        menuBackGround = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        menuBackGround.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);
        menuBackGround.alpha = 0.35;

        instructionTitle = game.add.bitmapText(30, instructionTitleVerticalSpace, 'carrier_command', 'INSTRUCTION', titleFontSize);
        instructionText = game.add.bitmapText(30, instructionTextVerticalSpace, 'carrier_command',
                                                'The main purpose of the game is to collect tools.\n\n' +
                                                'They are randomly showing up - to reach them ' +
                                                'you need to jump.\n\nYou also need to jump to avoid' +
                                                ' a series of the obstacles.\n\nIf you will hit the' +
                                                ' obstacle you will loose a life.\n\nYou have a total of' +
                                                ' 10 lives in the game.\n\nAfter loosing last life ' +
                                                'the game will end.\n\nthere is a special "golden" tool' +
                                                ' which gives you an extra points.\n\nLook for it! Good luck!',
                                                textFontSize);
        gameControlsTitle = game.add.bitmapText(30, gameControlsTitleVerticalSpace, 'carrier_command', 'GAME CONTROLS', titleFontSize);
        gameControlsText = game.add.bitmapText(30, gameControlsTextVerticalSpace, 'carrier_command',
                                                '[SPACEBAR] - JUMP (collect tools/avoid obstacles)', textFontSize)

        buttonStart = game.add.button(30, buttonStartVerticalSpace, 'buttonStart',
                          menuState.start, menuState, 2, 1, 0); // start button
        buttonStart.scale.setTo(buttonSizeRatio, buttonSizeRatio);
    },

    start: () => {

        // CHANGING GAME STATE TO PLAY AFTER PRESSING THE START GAME BUTTON
        game.state.start('play');
    }

};