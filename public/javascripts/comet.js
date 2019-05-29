import {visibleHeightAtZDepth, visibleWidthAtZDepth, boundCheckX, getRandomInt, collisionDetection} from './utils.js'
import stars from './background.js'
import { showHitStatus, hideHitStatus } from './hud.js';
import gameConfig from './config.js'
import {Comet, Asteroid } from './components.js'

// Debugging variables.
const debug = true;
const verbose = false;


////////////////////////////////////////////////
//////   RENDERING AND GAME SCENE    //////////

// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer({alpha: true});

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);

// Creates the scene and lighting.
let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0xffffff);
let pointLight = new THREE.PointLight(0xffffff, 0.35);


/////////////////////////////////
//      GAME MANAGER       ///// 
const config = new gameConfig();
let crntLevel = 1;

//////////////////////
//   Containers    //
let asteroids = [];

////////////////////////////////
////     Game Objects   ///////
const comet = new Comet();



// Initialize scene and it's renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.set(0, 0, 250);

scene.background = new THREE.Color(0x0f0f0f);

pointLight.position.set(50, 0, 250);
pointLight.castShadow = true;
pointLight.intensity = 0.35;

let Width =  visibleWidthAtZDepth(comet.getPos().z, camera);
let Height = visibleHeightAtZDepth(comet.getPos().z, camera);

for(let i = 0; i < config.LevelConfigs[crntLevel].astN; i++){
    setTimeout(
        function(){
            const ast = new Asteroid(
                Width, 
                Height, 
                config.LevelConfigs[crntLevel].astSpeed
            )
            
            asteroids.push(ast)
            scene.add(ast.getModel())
        },
        config.LevelConfigs[crntLevel].astDelays[i]
    );
}

// Last minute sphere configurations
//   Allows the sphere to properly initialize independent of camera
comet.setPosY(-Height/2 + 20)



// Initial scene objects and render call.
scene.add(light, pointLight, comet.getModel(), stars)

document.body.appendChild(renderer.domElement);
render();



// Move objects in scene, checking relationship of new positions
function sceneMovement(){

    asteroids.forEach(ast => {
        ast.move()
        ast.fellOff(Width, Height)
    })
    comet.move()

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
            comet.setVelX(0)
            comet.setPosX(0);
            hideHitStatus();
            return 1;
        }
    }
    if(k === "ArrowLeft"){
        comet.setVelX(-0.5)
    }
    else if(k === "ArrowRight"){
        comet.setVelX(0.5)
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
sideL.addEventListener('mousedown', ()=>{comet.setVelX(-0.5 ) }, true)
sideR.addEventListener('mousedown', ()=>{comet.setVelX( 0.5 ) }, true)
document.addEventListener("keydown", keyPressed, true);

/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//                NOW KEEP PLAYING!
//
//    UPDATE AND RENDER

// Changes the scene objects.
function update(){
    // boundCheckX('x', comet.getPos().x + comet.velX, comet.getPos().z, camera)
    sceneMovement();
    stars.rotation.x -= 0.0005
}
setInterval(()=>{
    asteroids.forEach(ast=>{
        ast.printAst();
    })
},2000)
// Renders the changed scene objects.
function render(){
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}
