let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth - 20, window.innerHeight - 20 );
document.body.appendChild( renderer.domElement );

let camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 5000 );
camera.position.set(0, 0, 250);

let scene = new THREE.Scene();
scene.background = new THREE.Color().setHSL(0.6, 0, 1);
scene.fog = new THREE.Fog( scene.background, 1, 5000 );
let geometry = new THREE.BoxGeometry(10,10,10);
let material = new THREE.MeshBasicMaterial( {color:0x767676} );
let cube = new THREE.Mesh(geometry, material);

geometry = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
material = new THREE.MeshBasicMaterial({color:0x000000, side: THREE.DoubleSide});
let plane = new THREE.Mesh(geometry, material)
// plane.rotateX( - Math.PI / 2);

scene.add(cube, plane);
camera.position.z = 30;
camera.position.y = 5;
renderer.render( scene, camera );

document.addEventListener("keydown", onDocumentKeyDown);



function onDocumentKeyDown(e){
    let k = e.key;
    if(k === "ArrowLeft"){
        console.log(true);
        cube.position.x -= .1;
    }
    else if(k === "ArrowRight"){
        console.log(true);
        cube.position.x += .1;
    }
    console.log(k);
    renderer.render(scene, camera);
}