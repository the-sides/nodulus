import { Brawler } from '../components.js'
import inputController from './inputController.js'
import generateAnimations from './animation.js';

// Game Data
//    I'll need to be passing information between functions and scopes, 
// therefore will be making a single object holding what I need rn, the game
// state. I can simply pass gameData to access anything I might need, as long 
// as the property is defined here.
let gameData = {
    gameState: undefined,
    gameConfig: undefined,
}

// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer({ alpha: true });

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);

// Creates the scene and lighting.
let scene = new THREE.Scene();
let pointLight = new THREE.PointLight(0xffffff, 0.35);

// Game Config
gameData.gameConfig = {
    animations: undefined//generateAnimations(),
}

gameData.gameState = {
        animation: 'none',
        clock: new THREE.Clock(),
        players: {
            p1: undefined// new Brawler(),
        }
    }

// Initialize scene and it's renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 10);

scene.background = new THREE.Color(0x222831);

pointLight.position.set(2, 5, 5);
pointLight.castShadow = true;
pointLight.intensity = 0.6;

// Orbiter 
// console.log( THREE)
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

// Fetch some models and set the scene
let fighter = new Brawler();
gameData.gameState.players.p1 = fighter;

scene.add(fighter.model);

scene.add(pointLight);

render();

// Event Listeners
window.addEventListener("resize", () => {
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
});

function inputManagement(event, gamedata) {
    // Use this function to cherrypick the parameters that need to 
    //   pass with the input controller function
    gameData = inputController[event.type](event, gamedata);
}

// Avoid repetitions!!! todo
window.addEventListener('keydown', (e) => inputManagement(e, gameData));
window.addEventListener('keyup', (e) => inputManagement(e, gameData));

/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//                NOW KEEP PLAYING!
//
//    UPDATE AND RENDER
function sceneMovement(){
    if(gameData.gameState.animation !== 'none'){
        console.log('moving');
        // console.log("Player 1 moving", gameData.gameState.players.p1.movement);
        // if(gameData.gameState.players.p1.movement === 'left'){
        //     gameData.gameConfig.animations.movements.left(
        //         gameData.gameState.players.p1.model,
        //         gameData.gameState.animation
        //     )
        // }
    }
}

// Changes the scene objects.
function update() {
    controls.update();
    sceneMovement();
    // gameData.gameState.players.p1.model.position.x -= 0.1;
}

// Renders the changed scene objects.
function render() {
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}
