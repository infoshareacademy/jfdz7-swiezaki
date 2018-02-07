const endState = {

    create: () => {

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

        gameOverLabel = game.add.bitmapText(30, 50, 'carrier_command', 'GAME OVER', 20);
        gameOverScore = game.add.bitmapText(30, 90, 'carrier_command', `Your score: ${gameScore} pts`, 17);
        highScoreLabel = game.add.bitmapText(30, 140, 'carrier_command', 'Highscores: ', 19);

        let playerResultYPosition  = 165;
        for (let i = 0; i < highScore.length; i++) {

            let listPosition = i + 1;
            playerResultYPosition = playerResultYPosition + 30;
            highScoreList = game.add.bitmapText
            (30, playerResultYPosition, 'carrier_command',
                `${listPosition}. ${highScore[i].score} pts (${highScore[i].time})`, 15);

            const buttonRestart = game.add.button(30, 300, 'buttonRestart',
                                                  endState.restart, endState, 2, 1, 0);
        }
    },

    restart: () => {

        game.state.start('menu');
        playerLives = 1; // resets player lives to start number
        gameScore = 0; // resets gameScore to 0

    }
};