export default {
    keydown: function (e, gameData) {
        // Check for repetition...
        if (gameData.gameState.players.p1.movement === 'none' ){
            if (e.key === 'a'){
                gameData.gameState.animation = 'p1'
                gameData.gameState.players.p1.movement = 'left';
            }
            else if (e.key === 'd'){
                gameData.gameState.animation = 'p1'
                gameData.gameState.players.p1.movement = 'right';
            }
            else if (e.key === 's'){
                gameData.gameState.animation = 'p1'
                gameData.gameState.players.p1.movement = 'back';
                gameData.gameState.players.p1.model.position.y = 1;
                gameData.gameState.players.p1.model.rotation.z = -0.75;
                console.log(gameData.gameState.players.p1.model.rotation)
            }
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