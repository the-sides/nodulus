// Creates the renderer in Three.js and adds it to the HTML body.
let renderer = new THREE.WebGLRenderer({ alpha: true });

// Creates the camera and where it's looking.
let camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 5000);

// Creates the scene and lighting.
let scene = new THREE.Scene();
let light = new THREE.AmbientLight(0xffffff);


// Initialize scene and it's renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
camera.position.set(0, 0, 250);

scene.background = new THREE.Color(0x0f0f0f);

document.body.appendChild(renderer.domElement);
render();

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

// Renders the changed scene objects.
function render(){
    requestAnimationFrame(render); // This tells the browser we want to do animations.
    update();
    renderer.render(scene, camera); // This actually renders the animations.
}
