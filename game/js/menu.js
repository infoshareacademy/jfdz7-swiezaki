const menuState = {

    create: () => {

        const currentGameHeight = game.world.height;

        const titleFontSize = currentGameHeight/26.85;
        const textFontSize = currentGameHeight/33.56;

        menuBackGround = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        menuBackGround.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);
        menuBackGround.alpha = 0.35;

        console.log(game.world.width, game.world.height);

        gameInfo = game.add.bitmapText(30, 50, 'carrier_command', 'INSTRUCTION', titleFontSize);

        gameInfoWd = game.add.bitmapText(30, 350, 'carrier_command', game.world.width, 10);
        gameInfoHg = game.add.bitmapText(30, 370, 'carrier_command', game.world.height, 10);

        const buttonStart = game.add.button(30, 100, 'buttonStart',
                          menuState.start, menuState, 2, 1, 0); // start button
    },

    start: () => {

        // CHANGING GAME STATE TO PLAY AFTER PRESSING THE START GAME BUTTON
        game.state.start('play');
    }

};