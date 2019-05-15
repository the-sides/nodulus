import {visibleHeightAtZDepth, visibleWidthAtZDepth} from './utils.js'

const debug = true;
const verbose = false;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 250);

let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0x404040);
let cometSpeed = 0;

let geo = new THREE.SphereGeometry(5, 6, 6);
let mat = new THREE.MeshBasicMaterial({color: 0x0793AF});
let sph = new THREE.Mesh(geo, mat);

// Allows the sphere to properly initialize independent of camera
sph.position.y = -visibleHeightAtZDepth(sph.position.z,camera)/2 + 20;

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

document.addEventListener("keydown", keyPressed, true);
function keyPressed(e){
    let k = e.key;
    //////////////////////////////////////////////////
    ////     DETECT KEY PRESS AND APPLY LOGIC
    //////////////////////////////////////////////////
    if(debug){
        if(e.keyCode === 32){
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
let ast = asteroidGen();
function asteroidGen(){
    let geo = new THREE.SphereGeometry(6, 3, 3);
    let mat = new THREE.MeshBasicMaterial({color: 0x999999});
    let a = new THREE.Mesh(geo, mat);
    a.position.y = 50;

    scene.add(a);
    return a;
}

// Rotating any object, given XYZ degrees
function rotateObject(object, X=0, Y=0, Z=0){
    object.rotateX(THREE.Math.degToRad(X));
    object.rotateY(THREE.Math.degToRad(Y));
    object.rotateX(THREE.Math.degToRad(X));
}

function update(){
    boundCheckX('x', sph.position.x + cometSpeed, sph.position.z)
    cometMovement();
    rotateObject(ast, 40, 50, 20);
}

function render(){
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}
