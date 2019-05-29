class LevelConfig {
    constructor(astN, astDelays, astSpeed, astAngle){
       this.astN = astN; // Number of asteroids to generate
       this.astDelays = astDelays;
       this.astSpeed = astSpeed; 
       this.astAngle = astAngle
    }
}

class GameConfig {
    constructor(){
        this.LevelConfigs = {
            1 : new LevelConfig(2, [0, 2000], 1, 0)
        };

    }

};


export default GameConfig;