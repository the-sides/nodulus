import { visibleHeightAtZDepth, visibleWidthAtZDepth, boundCheckX } from './utils.js'
import { starGen, beltGen } from './background.js'
import { showMessage, hideMessage, updateLevel, updatePoints } from './hud.js';
import gameConfig from './config.js'
import { Comet, Asteroid } from './components.js'

// Debugging variables.
const debug = true;
const verbose = false;


//*  ////////////////////////////////////////////*/
//* //   RENDERING AND GAME SCENE    //////////*/

// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer({alpha: true});

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 0, 250);

// Given depth, calculate visable space within frame
let Width =  visibleWidthAtZDepth(0, camera);
let Height = visibleHeightAtZDepth(0, camera);

// Orbit controls
// let orbiter = new THREE.OrbitControls(camera, renderer.domElement); 
//     orbiter.enabled = false;

// Creates the scene and lighting.
let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0x999999);
let pointLight = new THREE.PointLight(0x999999, 1);
let pointLight2 = new THREE.PointLight(0x999999, 1);

//* //////////////////////////////
//      GAME MANAGER       //* // 
const config = new gameConfig(1);
config.addPoints(0);

//// let crntLevel = 1;
let colliderThrottle = false;
showMessage("To Start : use the Left and Right Arrows to move");

// Initialize scene and it's renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

scene.background = new THREE.Color(0x0f0f0f);

pointLight.position.set(50, 20, 60);
pointLight.castShadow = true;
pointLight.intensity = 0.75;
pointLight2.position.set(-50, -20, 60);
pointLight2.castShadow = true;
pointLight2.intensity = 0.75;
light.intensity = 0.2



//* ////////////////////////////
//* /    Game Objects   ///////
const comet = new Comet();
      comet.setPosY(-Height/2 + 20)

let starsA = starGen();
let starsB = starGen();
starsA.position.y = -130;
starsB.position.y = 270;

let LOSER = false;
let started = false;
let reset = false;

// move speed variable
let moveSpeed = 1;

//* ///////////////////
//   Containers    //
let asteroids = [];
let boundaryBelt = [];

boundaryBelt = beltGen(Width, Height);

for(let i = 0; i < boundaryBelt.length; i++){
    scene.add(boundaryBelt[i].model)
}

function generateAsteroids(){
    asteroids = [];
    for(let i = 0; i < config.LevelConfig.astN; i++){
        setTimeout(
            function(){
                const ast = new Asteroid(
                    Width, 
                    Height, 
                    config.LevelConfig.astSpeed,
                    config.LevelConfig.waveCount,
                    i
                )
                
                asteroids.push(ast)
                scene.add(ast.getModel())
                config.gameState.waitingForAsts = false;
            },
            config.LevelConfig.astDelays * i
        );
    };
};

//generateAsteroids();


// Initial scene objects and render call.
scene.add(light, pointLight,pointLight2, comet.getModel(), starsA, starsB)


const removeAsteroids = function(obj){
    scene.remove(obj.getModel());
    delete asteroids[obj.listIndex]
    config.gameState.astsPassed += 1;
    console.log(`Asteroids left: ${asteroids.length - config.gameState.astsPassed} after ${obj.listIndex} passed`);
}
const removeBelt = function(obj){
    scene.remove(obj.getModel());
    delete boundaryBelt[boundaryBelt.length-1];
}

document.body.appendChild(renderer.domElement);
render();


// Move objects in scene, checking relationship of new positions
function sceneMovement(asts){
    /*if(LOSER){
        asts.forEach(ast=> {
            removeAsteroids(ast);
        })
        return;
    }*/

    if(asts.length === config.gameState.astsPassed && !config.gameState.waitingForAsts) {
        //* Reset game for next level
        config.completedLevel(generateAsteroids);
        // generateAsteroids(scene, asteroids)
    }

    if(!LOSER){
        if(!reset){
            asts.forEach(ast => {
                ast.move()
        
                // return true once ast passes wave count
                if(ast.fellOff(Width, Height, removeAsteroids, config)){
                    config.addPoints(50);
                }
               
                

                if(!colliderThrottle && ast.collisionDetect(comet)){
                    colliderThrottle = true;
                    comet.setVelX(0);
                    // Game Over
                    showMessage("GAME OVER");
                    LOSER = true;
                }
            })
        }

        else{
            asts.forEach(ast=> {
                removeAsteroids(ast);
            })
        }
        reset = false;
    }

    boundaryBelt.forEach(b => {
        b.move();
    })

    // Throttled reaction for more complex operation and looping belt objects
    // We're dealing with a worser complexity, however by splitting up is better with a throttle before an additional loop
    if(config.gameState.beltThrottle){
        config.gameState.beltThrottle = false;
        
        boundaryBelt.forEach(b => {
            b.fellOff(Height)
        })
        
        if(starsA.position.y <= -500){
            starsA.position.y += 800;
        }
        if(starsB.position.y <= -500){
            starsB.position.y += 800;
        }

        setTimeout(()=>{
            config.gameState.beltThrottle = true;
        }, 400)

    }


    if(!boundCheckX('x', comet.getPos().x, comet.getPos().z, camera)){
        comet.setVelX(0);
        comet.setPosX(0); // to prevent from running too much
        showMessage("GAME OVER");
        LOSER = true;
    }        

    if(!LOSER){
        comet.move();
    }

    starsA.position.y -= 0.2
    starsB.position.y -= 0.2

}


//////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
/////      INPUT         \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
  ////
    //////////////////////////////////////////////////
      ///    DETECT KEY PRESS AND APPLY LOGIC
        ////////////////////////////////////////////
function keyPressed(e){
    let k = e.key;
    if(reset){
        return 0;
    }

    if(k === " "){ // Spacebar, RESETS game after losing
        comet.setVelX(0);
        comet.setPosX(0);
        comet.setSpinX(0);
        hideMessage();
        LOSER = false;
        colliderThrottle = false;
        config.gameState.crntLevel = 0;
        config.gameState.points = 0;
        updateLevel(0);
        config.addPoints(0);
        reset = true;
        return 1;
    }
    if(k === 'o'){
        // orbiter.enabled = !orbiter.enabled;
    } 
    if(k == 'Escape'){
        // config.gameState.menuToggle = true;
        // openMenu();
        console.log('open menu')
    }
    else if(k === "ArrowLeft"){
        comet.setVelX(moveSpeed * -1);
        comet.setSpinX(-0.2);
        if(!started){
            hideMessage();
            started = true;
            generateAsteroids();
        }
    }
    else if(k === "ArrowRight"){
        comet.setVelX(moveSpeed);
        comet.setSpinX(0.2);
        if(!started){
            hideMessage();
            started = true;
            generateAsteroids();
        }
    }
    else if(k === "ArrowDown"){
        moveSpeed -= .1;
    }
    else if(k === "ArrowUp"){
        moveSpeed += .1;
    }

    else{
        console.log('unregistered key', e, k)
    }
    if(verbose) console.log(k, '|', e.keyCode);
}

// Event listeners
window.addEventListener("resize", ()=>{
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

    Width =  visibleWidthAtZDepth(comet.getPos().z, camera);
    Height = visibleHeightAtZDepth(comet.getPos().z, camera);
    
    if(verbose) console.log("dim", window.innerWidth)
    if(verbose) console.log("at z:0", visibleWidthAtZDepth(0, camera))
    if(verbose) console.log("at z:6", visibleWidthAtZDepth(6, camera))

    // sph.position.x = visibleWidthAtZDepth(6, camera)/2 - 3.5
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let sideL = document.getElementById('touch-left')
let sideR = document.getElementById('touch-right')
if(sideL !== null){
    sideL.addEventListener('touchdown', ()=>{comet.setVelX(-0.5 ) }, false)
    sideR.addEventListener('touchdown', ()=>{comet.setVelX( 0.5 ) }, false)
    sideL.addEventListener('touchmove', ()=>{comet.setVelX(-0.5 ) }, false)
    sideR.addEventListener('touchmove', ()=>{comet.setVelX( 0.5 ) }, false)
}

document.addEventListener("keydown", keyPressed, false);

/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//                NOW KEEP PLAYING!
//
//    UPDATE AND RENDER

// Changes the scene objects.
function update(){
    // boundCheckX('x', comet.getPos().x + comet.velX, comet.getPos().z, camera)
    sceneMovement(asteroids);
    // orbiter.update();
}

// Renders the changed scene objects.
function render(){
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}
