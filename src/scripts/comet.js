import {visibleHeightAtZDepth, visibleWidthAtZDepth, boundCheckX, getRandomInt, collisionDetection} from './utils.js'
import starGen from './background.js'
import { showMessage, hideMessage } from './hud.js';
import gameConfig from './config.js'
import {Comet, Asteroid } from './components.js'

// Debugging variables.
const debug = true;
const verbose = false;


//*  ////////////////////////////////////////////*/
//* //   RENDERING AND GAME SCENE    //////////*/

// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer({alpha: true});

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// Creates the scene and lighting.
let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0x999999);
let pointLight = new THREE.PointLight(0x999999, 1);
let pointLight2 = new THREE.PointLight(0x999999, 1);
let starsA = starGen(-120);
let starLaps = 1;
let starsB = starGen(260);
starLaps += 1;

//* //////////////////////////////
//      GAME MANAGER       //* // 
const config = new gameConfig(1);
// const urlParams = new URLSearchParams(window.location.search)

//// let crntLevel = 1;
let colliderThrottle = false;

//* ///////////////////
//   Containers    //
let asteroids = [];
let boundaryBelt = [];

//* ////////////////////////////
//* /    Game Objects   ///////
const comet = new Comet();



// Initialize scene and it's renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.set(0, 0, 250);

scene.background = new THREE.Color(0x0f0f0f);

pointLight.position.set(50, 20, 60);
pointLight.castShadow = true;
pointLight.intensity = 0.75;
pointLight2.position.set(-50, -20, 60);
pointLight2.castShadow = true;
pointLight2.intensity = 0.75;
light.intensity = 0.2

let Width =  visibleWidthAtZDepth(comet.getPos().z, camera);
let Height = visibleHeightAtZDepth(comet.getPos().z, camera);

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
    }
}

generateAsteroids();

// Last minute sphere configurations
//   Allows the sphere to properly initialize independent of camera
comet.setPosY(-Height/2 + 20)



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

    if(asts.length === config.gameState.astsPassed && !config.gameState.waitingForAsts) {
        //* Reset game for next level
        config.completedLevel(generateAsteroids);
        // generateAsteroids(scene, asteroids)
    }

    asts.forEach(ast => {
        ast.move()
        
        // return true once ast passes wave count
        if(ast.fellOff(Width, Height, removeAsteroids))
            config.addPoints(50)

        if(!colliderThrottle && ast.collisionDetect(comet)){
            colliderThrottle = true;
            comet.setVelX(0);
            // Game Over
            showMessage("GAME OVER");
            setTimeout(()=>{colliderThrottle = false}, 1000);
        }
    })

    boundaryBelt.forEach(b => {
        b.move();
    })

    // Throttled reaction for more complex operation and looping belt objects
    // We're dealing with a worser complexity, however by splitting up is better with a throttle before an additional loop
    if(config.gameState.beltThrottle){
        config.gameState.beltThrottle = false;
        
        boundaryBelt.forEach(b => {
            b.fellOff(Width, Height, removeBelt)
        })
        
        setTimeout(()=>{
            config.gameState.beltThrottle = true;
        }, 400)

    }


    if(!boundCheckX('x', comet.getPos().x, comet.getPos().z, camera)){
        comet.setVelX(0);
        comet.setPosX(0); // to prevent from running too much
        showMessage("GAME OVER");
    }        


    comet.move();

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

    if(debug){
        if(k === " "){ // Spacebar
            comet.setVelX(0);
            comet.setPosX(0);
            comet.setSpinX(0);
            hideMessage();
            return 1;
        }
    }
    if(k == 'Escape'){
        // config.gameState.menuToggle = true;
        // openMenu();
        console.log('open menu')
    }
    else if(k === "ArrowLeft"){
        comet.setVelX(-0.5);
        comet.setSpinX(-0.2);
    }
    else if(k === "ArrowRight"){
        comet.setVelX(0.5);
        comet.setSpinX(0.2);
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

let sideL = document.getElementById('left')
let sideR = document.getElementById('right')
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
    controls.update();
}

// Set interval for looped function to set side asteroid belts.
/*let belts = setInterval(function()
{
    const ast = new Asteroid(
        Width, 
        Height, 
        1.5,
        0,
        -1
    )
    ast.getModel().position.x = 50;
    boundaryBelt.push(ast);
    scene.add(ast.getModel())
}, 100);*/

// Renders the changed scene objects.
function render(){
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}

// some setIntervals because we don't want to read three.js clock doc
//  This is very bad practice, should be done a different way.
// First star loop should delayed
setTimeout(()=>{
    setInterval(()=>{
        console.log('ping')
        console.log('ping')
        console.log('ping')
        console.log('ping', starLaps)
        console.log('ping')
        console.log('ping')
        console.log('ping')
        // return;
        if(starLaps % 2 == 0){
            // First loop, and odd occurances
            scene.remove(starsA)
            starsA = starGen(200)
            scene.add(starsA);
        }
        else{
            // Second loop, and even occurances
            scene.remove(starsB)
            starsB = starGen(200)
            scene.add(starsB);
    
        }
        starLaps += 1;
    
    },38e3)
}, 20000)