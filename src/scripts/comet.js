let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 20, window.innerHeight - 20);
document.body.appendChild(renderer.domElement);

let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.set(0, 0, 250);

let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0x404040);

let geo = new THREE.SphereGeometry(5, 6, 6);
let mat = new THREE.MeshBasicMaterial({color: 0x0793AF});
let sph = new THREE.Mesh(geo, mat);
sph.rotation = new THREE.Euler(100, 100, 200, 'XYZ');

scene.add(sph, light);

render();

document.addEventListener("keydown", keyPressed);

function keyPressed(e){
    let k = e.key;
    if(k === "ArrowLeft"){
        sph.position.x -= 1;
    }
    else if(k === "ArrowRight"){
        sph.position.x += 1;
    }
    console.log(k);
    render();
}

function render(){
    requestAnimationFrame(render);

    renderer.render(scene, camera);
}
