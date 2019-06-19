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
            1 : new LevelConfig(3, 290, 1.8, 2), 
            2 : new LevelConfig(5, 100, 2.8, 2), 
        };
    return levels[levelNum]
}
class GameConfig {
    constructor(level){
        this.gameState = {
            points: 0,
            messageUp: false,
            crntLevel: level,
            waitingForAsts: true,
            astsPassed: 0,
        }

        this.LevelConfig = generateLevelConfig(level);
    }

    addPoints(earned){
        this.points += earned;
    }
    completedLevel(astGenerator){
        showMessage(`Congrats, moving onto level ${this.gameState.crntLevel + 1}`)
        setTimeout(()=>{
            console.log('generating asteroids')
            astGenerator()
        }, 2000)
        // if(messageUp) 
            // clear messages
        this.gameState.messageUp = false;
        this.gameState.astsPassed = 0; 
        this.gameState.waitingForAsts = true
        this.gameState.crntLevel += 1;
        this.LevelConfig = generateLevelConfig(this.gameState.crntLevel)
    }

};


export default GameConfig;