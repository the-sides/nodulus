import { arrayExpression } from "babel-types";

export default {
    keydown: function (e, gameData) {
        let p1        = gameData.gameState.players.p1;

        // Check for repetition...
        console.log(p1.keysPressed);
        if (!p1.keysPressed.includes(e.key)){
            p1.keysPressed.push(e.key);
            // Right Movement
            if (e.key === 'd'){
                console.log(e.key, 'pressed');
                // gameData.gameState.animation = ''
                gameData.gameState.players.p1.movement = 'right';
            }
            // Left Movement
            else if (e.key === 'a'){
                gameData.gameState.animation = 'p1'
                gameData.gameState.players.p1.movement = 'left';
            }
            // Dodge "Back" Movement
            else if (e.key === 's'){
                gameData.gameState.animation = 'p1'
                gameData.gameState.players.p1.movement = 'back';
                console.log(gameData.gameState.players.p1.model.rotation)
            }
            gameData.gameState.players.p1 = p1;
        }

        return gameData
    },
    keyup: function (e, gameData) {
        let p1        = gameData.gameState.players.p1;
        let animation = gameData.gameState.animation;

        // Since key is released, remove from 
        console.log('keys pressed before', p1.keysPressed)
        for(let i = p1.keysPressed.length - 1; i >= 0; i--){
            console.log(`trying to remove ${e.key} at ${p1.keysPressed[i]}`)
            if(e.key === p1.keysPressed[i]){
                // p1.keysPressed = 
                p1.keysPressed.splice(i, 1);
                break;
            }

        }
        console.log('keys pressed after', p1.keysPressed)

        // Do some keysPressed array reading and compare with movement
        if(p1.keysPressed.length === 0){
            p1.movement = 'none';
        }
        else{
            // A key is still being pressed. 
            const toMove = String(p1.keysPressed[p1.keysPressed.length - 1])
            const actions = {
                a: 'left',
                d: 'right',
                s: 'back'
            }
            p1.movement = actions[toMove];
        }

        gameData.gameState.players.p1 = p1;
        return gameData;
    }
}