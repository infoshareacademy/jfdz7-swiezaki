const bootState = {

    create: () => {

        // LOADING GAME PHYSICS AND CHANGING GAME STATE TO LOAD
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.state.start('load');

    }

};