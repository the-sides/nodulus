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
             1 : new LevelConfig(7, 300, 1.5, 3), 
             2 : new LevelConfig(8, 300, 1.7, 3), 
             3 : new LevelConfig(8, 300, 2.0, 3), 
             4 : new LevelConfig(9, 280, 2.2, 3), 
             5 : new LevelConfig(9, 280, 2.4, 3), 
             6 : new LevelConfig(10, 280, 2.5, 4), 
             7 : new LevelConfig(10, 280, 2.6, 4), 
             8 : new LevelConfig(11, 280, 2.6, 4), 
             9 : new LevelConfig(12, 280, 2.6, 4), 
            10 : new LevelConfig(15, 260, 2.6, 4), 
            11 : new LevelConfig(15, 260, 2.6, 4), 
            12 : new LevelConfig(15, 260, 2.6, 4), 
            13 : new LevelConfig(15, 260, 2.6, 4), 
            14 : new LevelConfig(15, 260, 2.6, 4), 
            15 : new LevelConfig(15, 260, 2.6, 4), 
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
            menuToggle: true,
            astsPassed: 0,
        }

        this.LevelConfig = generateLevelConfig(level);

        // Check for mobile, iff, create touch elements
        const mobileCheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };
        if(mobileCheck()){
            const grid  = document.createElement('div');
            const left  = document.createElement('div');
            const right = document.createElement('div');
            grid.id  = 'touch-grid'
            left.id  = 'touch-left'
            right.id = 'touch-right'
            grid.appendChild(left);
            grid.appendChild(right);
            document.body.prepend(grid)
        }
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