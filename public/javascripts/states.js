class LevelConfig {
    constructor(numAsteroids, astSpeed, astAngle){
       this.numAsteroids = numAsteroids;
       this.astSpeed = astSpeed; 
       this.astAngle = astAngle
    }
}

class GameConfig {
    constructor(){
        this.LevelConfigs = {
            1 : new LevelConfig(5, 1, 0)
        };

    }

};

config = new GameConfig();
console.log(config.LevelConfigs[1].numAsteroids)

export default GameConfig;