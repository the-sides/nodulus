class LevelConfig {
    constructor(astN, astDelays, astSpeed, waveCount){
       this.astN = astN; // Number of asteroids to generate
       this.astDelays = astDelays;
       this.astSpeed = astSpeed;
       this.waveCount = waveCount;
    }
}

class GameConfig {
    constructor(){
        this.LevelConfigs = {
            1 : new LevelConfig(3, 200, 1.8, 2)
        };

    }

};


export default GameConfig;