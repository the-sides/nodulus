export default {
    keydown: function (e, gameData) {
        // Check for repetition...
        if (e.key === 'a'){
            gameData.gameState.animation = 'p1'
            gameData.gameState.players.p1.movement = 'left';
        }
        else if (e.key === 'd'){
            gameData.gameState.animation = 'p1'
            gameData.gameState.players.p1.movement = 'right';
        }

        return gameData
    },
    keyup: function (e, gameData) {
        if(e.key === 'd'||'a'){
            gameData.gameState.animation = 'none';
            gameData.gameState.players.p1.movement = 'none';
        }
        return gameData;
    }
}