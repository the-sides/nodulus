import {visibleHeightAtZDepth, visibleWidthAtZDepth} from './utils.js'

// Debugging variables.
const debug = true;
const verbose = false;

// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 250);

// Creates the scene and lighting.
let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0x404040);

//////////////////////////////
//      SOME VARIABLES      //
let cometSpeed = 0;
let listOfAst = [];
let ast = asteroidGen(200);
let ast2 = asteroidGen(300);
let asteroidSpeed = 1;
//  END OF SOME VARIABLES   //
//////////////////////////////

// Creates the comet //
let geo = new THREE.SphereGeometry(5, 6, 6);
let mat = new THREE.MeshBasicMaterial({color: 0x0793AF});
let sph = new THREE.Mesh(geo, mat);

// Allows the sphere to properly initialize independent of camera
sph.position.y = -visibleHeightAtZDepth(sph.position.z,camera)/2 + 20;

// Initial scene objects and render call.
scene.add(light, sph);
render();

window.addEventListener("resize", ()=>{
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    
    if(verbose) console.log("dim", window.innerWidth)
    if(verbose) console.log("at z:0", visibleWidthAtZDepth(0, camera))
    if(verbose) console.log("at z:6", visibleWidthAtZDepth(6, camera))

    // sph.position.x = visibleWidthAtZDepth(6, camera)/2 - 3.5
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function boundCheckX(dimension, suspectPos, depth){
    let limit = undefined;
    if(dimension == 'x')
        limit = visibleWidthAtZDepth(depth, camera)/2 - 5 ;

    else if(dimension == 'y')
        limit = visibleHeightAtZDepth(depth, camera)/2 - 5 ;
    else throw error("Unknown dimension");


    if( Math.abs(suspectPos) > limit)
        cometSpeed = 0;

}

let sideL = document.getElementById('left')
let sideR = document.getElementById('right')
sideL.addEventListener('mousedown', ()=>{cometSpeed = -.5}, true)
sideR.addEventListener('mousedown', ()=>{cometSpeed = .5}, true)

document.addEventListener("keydown", keyPressed, true);
function keyPressed(e){
    let k = e.key;
    //////////////////////////////////////////////////
    ////     DETECT KEY PRESS AND APPLY LOGIC
    //////////////////////////////////////////////////
    if(debug){
        if(k === " "){ // Spacebar
            cometSpeed = 0;
            sph.position.x = 0;
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

function cometMovement(){
    sph.translateX(cometSpeed);
}

// Generating a asteroid. TEST //
function asteroidGen(d){
    let geo = new THREE.SphereGeometry(6, 3, 3);
    let mat = new THREE.MeshBasicMaterial({color: 0x999999});
    let a = new THREE.Mesh(geo, mat);
    a.position.y = 65;
    a.position.x = d * 0.2;

    scene.add(a);
    listOfAst.push(a);
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

        if(listOfAst[i].position.y <= -(visibleHeightAtZDepth(6, camera) / 2)){
            listOfAst[i].position.y = 50 + Math.random()*10;
        }
        listOfAst[i].position.y -= asteroidSpeed;
    }
}

// Rotating any object, given XYZ degrees
function rotateObject(object, X=0, Y=0, Z=0){
    ast.rotateX(THREE.Math.degToRad(X));
    object.rotateY(THREE.Math.degToRad(Y));
    object.rotateZ(THREE.Math.degToRad(Z));
}

// Changes the scene objects.
function update(){
    boundCheckX('x', sph.position.x + cometSpeed, sph.position.z)
    cometMovement();
    asteroidMovement();
}

// Renders the changed scene objects.
function render(){
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}
