const menuState = {

    create: () => {

        const nameLabel = game.add.text(30, 80, 'Game Controls:',
                        { font: '30px Arial', fill: '#ffffff' }); // template sign

        const buttonStart = game.add.button(30, 100, 'buttonStart',
                          menuState.start, menuState, 2, 1, 0); // start button
    },

    start: () => {

        // CHANGING GAME STATE TO PLAY AFTER PRESSING THE START GAME BUTTON
        game.state.start('play');
    }

};