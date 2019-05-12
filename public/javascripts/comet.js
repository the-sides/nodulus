const debug = true;
const verbose = true;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(0, 0, 250);

let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0x404040);
let cometSpeed = 0;

let geo = new THREE.SphereGeometry(5, 6, 6);
let mat = new THREE.MeshBasicMaterial({color: 0x0793AF});
let sph = new THREE.Mesh(geo, mat);
sph.position.y = -45;

scene.add(light, sph);

render();

document.addEventListener("keydown", keyPressed, true);
window.addEventListener("resize", ()=>{
    camera.aspect = (window.innerWidth / window.innerHeight);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function keyPressed(e){
    let k = e.key;
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

function update(){
    cometMovement();
}

function render(){
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}
