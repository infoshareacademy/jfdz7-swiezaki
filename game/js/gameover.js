const endState = {

    create: () => {

        const names = ['Radek', 'Jarek', 'Kamila', 'Ania', 'Stefan'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        let highScore = localStorage.getItem('highscore-DWAMT-game');

        if (highScore === null) {

            highScore = [];

        } else {

            highScore = JSON.parse(highScore);
            console.log(highScore);
        }

        highScore.push({ name: randomName, score: gameScore });
        localStorage.setItem('highscore-DWAMT-game', JSON.stringify(highScore));

        highScore.sort(function(a, b) { return b.score - a.score});
        highScore = highScore.slice(0,5);

        const gameOverLabel = game.add.text(30, 80, 'GAME OVER',
            { font: '30px Arial', fill: '#00FF00' });

        const gameOverScore = game.add.text(30, 120, 'Your score: ' + gameScore,
            { font: '30px Arial', fill: '#00FF00' });

        const highLabel = game.add.text(30, 150, 'Highscores: ',
            { font: '30px Arial', fill: '#00FF00' });

        let playerResultYPosition  = 165;
        for (let i = 0; i < highScore.length; i++) {

            let listPosition = i+1;
            playerResultYPosition = playerResultYPosition+30;
            const firstPlayer = game.add.text
            (30, playerResultYPosition, listPosition + '. '
                + highScore[i].name + ': ' + highScore[i].score,
                { font: '20px Arial', fill: '#00FF00' });
        }

        const buttonRestart = game.add.button(30, 200, 'buttonRestart',
                                              endState.restart, endState, 2, 1, 0);

    },

    restart: () => {

        game.state.start('menu');
        playerLives = 1; // resets player lives to start number
        gameScore = 0; // resets gameScore to 0

    }
};