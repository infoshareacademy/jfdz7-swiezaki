const endState = {

    create: () => {

        const currentGameHeight = game.world.height;
        const currentGameWidth = game.world.width;

        const titleFontSize = currentGameHeight/26.85;
        const textFontSize = currentGameHeight/33.56;
        const gameOverTitleVerticalSpace = currentGameHeight/13.42;
        const gameOverTextVerticalSpace = currentGameHeight/6.72;
        const highScoreTitleVerticalSpace = currentGameHeight/3.83;
        const highScoreTextVerticalSpace = currentGameHeight/3.25;
        const highScoreTextSiblingVerticalSpaceAdd = currentGameHeight/17.9;
        const buttonStartVerticalSpace = currentGameHeight/1.19;
        const buttonSizeRatio = currentGameWidth/1344;

        gameOverBackGround = game.add.tileSprite(0, 0, gameWidth, gameHeight, 'background');
        gameOverBackGround.tileScale = new Phaser.Point(backgroundWidthRatio, backgroundHeightRatio);
        gameOverBackGround.alpha = 0.35;

        let scoreDate = new Date();
        const dateOptions = {
            weekday: "short", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit",
            };
        scoreDate = scoreDate.toLocaleTimeString("en-us", dateOptions);
        let highScore = localStorage.getItem('highscore-DWAMT-game');

        if (highScore === null) {

            highScore = [];

        } else {

            highScore = JSON.parse(highScore);

        }

        highScore.push({ score: gameScore, time: scoreDate });
        localStorage.setItem('highscore-DWAMT-game', JSON.stringify(highScore));

        highScore.sort((a, b) => { return b.score - a.score });
        highScore = highScore.slice(0,5);

        gameOverLabel = game.add.bitmapText(30, gameOverTitleVerticalSpace, 'carrier_command', 'GAME OVER', titleFontSize);
        gameOverScore = game.add.bitmapText(30, gameOverTextVerticalSpace, 'carrier_command', `Your score: ${gameScore} pts`, textFontSize);
        highScoreLabel = game.add.bitmapText(30, highScoreTitleVerticalSpace, 'carrier_command', 'Highscores: ', titleFontSize);

        let playerResultYPosition  = highScoreTextVerticalSpace;
        for (let i = 0; i < highScore.length; i++) {

            let listPosition = i + 1;
            playerResultYPosition = playerResultYPosition + highScoreTextSiblingVerticalSpaceAdd;
            highScoreList = game.add.bitmapText
            (30, playerResultYPosition, 'carrier_command',
                `${listPosition}. ${highScore[i].score} pts (${highScore[i].time})`, textFontSize);
        }

        const buttonRestart = game.add.button(30, buttonStartVerticalSpace, 'buttonRestart',
            endState.restart, endState, 2, 1, 0);
        buttonRestart.scale.setTo(buttonSizeRatio, buttonSizeRatio);
    },
    update : () => {

        gameOverBackGround.tilePosition.x += -6;

    },

    restart: () => {

        game.state.start('menu');
        playerLives = 1; // resets player lives to start number
        gameScore = 0; // resets gameScore to 0

    }
};