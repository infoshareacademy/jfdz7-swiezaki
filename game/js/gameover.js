const endState = {

    create: function() {

        let currentScore = (this.game.time.totalElapsedSeconds()).toFixed(2);
        const names = ['Radek', 'Jarek', 'Kamila', 'Ania', 'Stefan'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        let highScore = localStorage.getItem('highscore-DWAMT-game');

        if (highScore === null) {

            highScore = [];

        } else {

            highScore = JSON.parse(highScore);
            console.log(highScore);
        }

        highScore.push({ name: randomName, score: currentScore });
        localStorage.setItem('highscore-DWAMT-game', JSON.stringify(highScore));

        highScore.sort(function(a, b) { return a.score - b.score});
        highScore = highScore.slice(0,5);

        const winLabel = game.add.text(30, 80, 'YOU WON! time: ' + currentScore,
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
        // const startLabel = game.add.text(30, game.world.height-80, 'Press the "W" key to restart',
        //                                { font: '20px Arial', fill: '#00FF00' });
        const buttonRestart = game.add.button(game.world.centerX - 95, 400, 'buttonRestart', this.restart, this, 2, 1, 0);

        // let wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        // wkey.onDown.addOnce(this.restart, this);
    },

    restart: () => {

        game.state.start('menu');

    }
};