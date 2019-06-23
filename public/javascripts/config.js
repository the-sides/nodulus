import { showMessage } from './hud.js';

class LevelConfig {
    constructor(astN, astDelays, astSpeed, waveCount){
       this.astN = astN; // Number of asteroids to generate
       this.astDelays = astDelays;
       this.astSpeed = astSpeed;
       this.waveCount = waveCount;
    }
}
function generateLevelConfig(levelNum){
    // TODO: Make this process way better
    const levels = {
            1 : new LevelConfig(1, 290, 1.8, 2), 
            2 : new LevelConfig(2, 100, 2.8, 2), 
        };
    
    if (levels.length + 1 === levelNum) {
        return false;
    }
    else {
        return levels[levelNum];
    }
}
class GameConfig {
    constructor(level){
        this.gameState = {
            points: 0,
            crntLevel: level,
            messageUp: false,
            waitingForAsts: true,
            beltThrottle: true,
            astsPassed: 0,
        }

        this.LevelConfig = generateLevelConfig(level);
    }

    addPoints(earned){
        this.points += earned;
    }
    completedLevel(astGenerator){
        showMessage(`Congrats, moving onto level ${this.gameState.crntLevel + 1}`)
        // if(messageUp) 
            // clear messages
        this.gameState.messageUp = false;
        this.gameState.astsPassed = 0; 
        this.gameState.waitingForAsts = true
        this.gameState.crntLevel += 1;
        this.LevelConfig = generateLevelConfig(this.gameState.crntLevel)

        console.log(`At level ${this.gameState.crntLevel}`, this.LevelConfig)
        // Check for max level
        if(this.LevelConfig === undefined){
            showMessage("You beat the game, we didn't write more levels")
            return;
            this.gameState.crntLevel -= 1;
            this.LevelConfig = generateLevelConfig(this.gameState.crntLevel)
        }
        setTimeout(()=>{
            console.log('generating asteroids')
            astGenerator()
        }, 2000)
    }

};


export default GameConfig