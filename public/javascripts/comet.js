import {visibleHeightAtZDepth, visibleWidthAtZDepth, boundCheckX, getRandomInt} from './utils.js'
import stars from './background.js'
import { showHitStatus, hideHitStatus } from './hud.js';

// Debugging variables.
const debug = true;
const verbose = false;

// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer({alpha: true});

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 50000000);

// Creates the scene and lighting.
let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0xffffff);
let pointLight = new THREE.PointLight(0xffffff, 0.35);

//////////////////////////////
//      SOME VARIABLES      //
//        Objects         //
let listOfAst = [];
let astColliders = [];
let cometCollider = new THREE.Sphere();

// Creates the comet //
let geo = new THREE.SphereGeometry(5, 6, 6);
let mat = new THREE.MeshPhongMaterial({color: 0x0793AF});
let sph = new THREE.Mesh(geo, mat);

//////////////////////////////
//       SPEEDS    /// 
let cometSpeed = 0;
let asteroidSpeed = 1.4;

/////////////////////////////////
//       State Management
let warning = false;

// Initialize scene and it's renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
document.body.appendChild(renderer.domElement);
camera.position.set(0, 0, 250);
sph.receiveShadow = true;
sph.castShadow = true;
scene.background = new THREE.Color(0x0f0f0f);
pointLight.position.set(50, 0, 250);
pointLight.castShadow = true;
pointLight.intensity = 0.35;

let Width =  visibleWidthAtZDepth(sph.position.z, camera);
let Height = visibleHeightAtZDepth(sph.position.z, camera);

// Last minute sphere configurations
//   Allows the sphere to properly initialize independent of camera
sph.position.y = -Height/2 + 20;

// Initial scene objects and render call.
scene.add(light, pointLight, sph, stars);
render();


// START GAME
//     by generating asteroids
asteroidGen(200);
asteroidGen(200);

// HELPER FUNCTIONS, create an API to interact with utility functions
function moveComet(speed){
    cometSpeed = speed;
    return speed;
    // Because cometSpeed is global variable in this file, 
    //   other functions may be imported and passed with this function
    //   such that outside files now know which variables to work with.
}


function cometMovement(){
    sph.position.x += cometSpeed;
    cometCollider.center = sph.position;
}

// Generating a asteroid. TEST //
function asteroidGen(d){
    let geo = new THREE.SphereGeometry(6, 3, 3);
    let mat = new THREE.MeshPhongMaterial({color: 0x999999});
    let a = new THREE.Mesh(geo, mat);
    let coll = new THREE.Sphere();
    a.position.y = 70 + Math.random()*(d/10);
    a.position.x = d * 0.4 * (Math.random() - .5);
    a.receiveShadow = true;
    a.castShadow = true;
    coll.center = a.position;
    coll.radius = 3;

    scene.add(a);
    listOfAst.push(a);
    astColliders.push(coll);
    document.addEventListener("keydown", keyPressed, true);
    return a;
}

// Asteroid movement, rotation and position.
function asteroidMovement(){
    if(listOfAst === undefined){
        return false;
    }
    for(let i = 0; i < listOfAst.length; i++){
        listOfAst[i].rotateX(THREE.Math.degToRad(1));
        listOfAst[i].rotateY(THREE.Math.degToRad(2));
        

        if(listOfAst[i].position.y <= (-(Height / 2) - 30)){
            listOfAst[i].position.y = 70 + Math.random()*10;
            listOfAst[i].position.x = getRandomInt(-Width/2, Width/2);
        }

        listOfAst[i].position.y -= asteroidSpeed;
        astColliders[i].center = listOfAst[i].position;
        
        if(astColliders[i].intersectsSphere(cometCollider) && !warning){
            console.log("HIT");
            showHitStatus();
            warning = true;
        }
    }
}

// Rotating any object, given XYZ degrees
function rotateObject(object, X=0, Y=0, Z=0){
    object.rotateX(THREE.Math.degToRad(X));
    object.rotateY(THREE.Math.degToRad(Y));
    object.rotateZ(THREE.Math.degToRad(Z));
}

function keyPressed(e){
    let k = e.key;
    //////////////////////////////////////////////////
    ////     DETECT KEY PRESS AND APPLY LOGIC
    //////////////////////////////////////////////////
    if(debug){
        if(k === " "){ // Spacebar
            cometSpeed = 0;
            sph.position.x = 0;
            hideHitStatus();
            warning = false;
            return 1;
        }
    }
    if(k === "ArrowLeft"){
        cometSpeed = -.5;
    }
    else if(k === "ArrowRight"){
        cometSpeed = .5;
    }
    if(verbose) console.log(k, '|', e.keyCode);
}

// Event listeners
window.addEventListener("resize", ()=>{
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();

    Width =  visibleWidthAtZDepth(sph.position.z, camera);
    Height = visibleHeightAtZDepth(sph.position.z, camera);
    
    if(verbose) console.log("dim", window.innerWidth)
    if(verbose) console.log("at z:0", visibleWidthAtZDepth(0, camera))
    if(verbose) console.log("at z:6", visibleWidthAtZDepth(6, camera))

    // sph.position.x = visibleWidthAtZDepth(6, camera)/2 - 3.5
    renderer.setSize(window.innerWidth, window.innerHeight);
});

let sideL = document.getElementById('left')
let sideR = document.getElementById('right')
sideL.addEventListener('mousedown', ()=>{cometSpeed = -.5}, true)
sideR.addEventListener('mousedown', ()=>{cometSpeed = .5}, true)
document.addEventListener("keydown", keyPressed, true);

////////////////////////////////////////////////////////////////
//                                              iiii                    
//                                             i::::i                   
//                                              iiii                    
//                                                                      
//     mmmmmmm    mmmmmmm     aaaaaaaaaaaaa   iiiiiii nnnn  nnnnnnnn    
//   mm:::::::m  m:::::::mm   a::::::::::::a  i:::::i n:::nn::::::::nn  
//  m::::::::::mm::::::::::m  aaaaaaaaa:::::a  i::::i n::::::::::::::nn 
//  m::::::::::::::::::::::m           a::::a  i::::i nn:::::::::::::::n
//  m:::::mmm::::::mmm:::::m    aaaaaaa:::::a  i::::i   n:::::nnnn:::::n
//  m::::m   m::::m   m::::m  aa::::::::::::a  i::::i   n::::n    n::::n
//  m::::m   m::::m   m::::m a::::aaaa::::::a  i::::i   n::::n    n::::n
//  m::::m   m::::m   m::::ma::::a    a:::::a  i::::i   n::::n    n::::n
//  m::::m   m::::m   m::::ma::::a    a:::::a i::::::i  n::::n    n::::n
//  m::::m   m::::m   m::::ma:::::aaaa::::::a i::::::i  n::::n    n::::n
//  m::::m   m::::m   m::::m a::::::::::aa:::ai::::::i  n::::n    n::::n
//  mmmmmm   mmmmmm   mmmmmm  aaaaaaaaaa  aaaaiiiiiiii  nnnnnn    nnnnnn
//
//
//  lllllll                                                                        
//  l:::::l                                                                        
//  l:::::l                                                                        
//  l:::::l                                                                        
//   l::::l    ooooooooooo      ooooooooooo   ppppp   ppppppppp       ssssssssss   
//   l::::l  oo:::::::::::oo  oo:::::::::::oo p::::ppp:::::::::p    ss::::::::::s  
//   l::::l o:::::::::::::::oo:::::::::::::::op:::::::::::::::::p ss:::::::::::::s 
//   l::::l o:::::ooooo:::::oo:::::ooooo:::::opp::::::ppppp::::::ps::::::ssss:::::s
//   l::::l o::::o     o::::oo::::o     o::::o p:::::p     p:::::p s:::::s  ssssss 
//   l::::l o::::o     o::::oo::::o     o::::o p:::::p     p:::::p   s::::::s      
//   l::::l o::::o     o::::oo::::o     o::::o p:::::p     p:::::p      s::::::s   
//   l::::l o::::o     o::::oo::::o     o::::o p:::::p    p::::::pssssss   s:::::s 
//  l::::::lo:::::ooooo:::::oo:::::ooooo:::::o p:::::ppppp:::::::ps:::::ssss::::::s
//  l::::::lo:::::::::::::::oo:::::::::::::::o p::::::::::::::::p s::::::::::::::s 
//  l::::::l oo:::::::::::oo  oo:::::::::::oo  p::::::::::::::pp   s:::::::::::ss  
//  llllllll   ooooooooooo      ooooooooooo    p::::::pppppppp      sssssssssss    
//                                             p:::::p                             
//                                             p:::::p                             
//                                            p:::::::p                            
//                                            p:::::::p                            
//                                            p:::::::p                            
//                                            ppppppppp                            
//                                                                                 


// Changes the scene objects.
function update(){
    boundCheckX('x', sph.position.x + cometSpeed, sph.position.z, camera, moveComet)
    cometMovement();
    stars.rotation.x -= 0.0005
    asteroidMovement();
}

// Renders the changed scene objects.
function render(){
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}
