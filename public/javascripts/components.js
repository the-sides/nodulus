import { getRandomInt } from "./utils.js";

class SpaceJunk {
    move() {
        this.model.position.x += this.velX;
        this.model.position.y += this.velY;

        // Bind collider's position with model's position
        this.collider.center = this.model.position;
    }
}
class Comet extends SpaceJunk {
    constructor() {
        super()
        let geo = new THREE.SphereGeometry(5, 6, 6);
        let mat = new THREE.MeshPhongMaterial({ color: 0x0793AF });
        let sph = new THREE.Mesh(geo, mat);
        let coll = new THREE.Sphere();

        sph.receiveShadow = true;
        sph.castShadow = true;

        coll.radius = 6;
        coll.center = sph.position;

        this.model = sph;
        this.collider = coll;

        this.velX = 0;
        this.velY = 0;
    }

    getModel() { return this.model; }
    getPos() { return this.model.position; }

    setPosX(newX) { this.model.position.x = newX; }
    setPosY(newY) { this.model.position.y = newY; }
    setVelX(newX) { this.velX = newX; }
    setVelY(newY) { this.velY = newY; }

}



class Asteroid {
    constructor(screenWidth, screenHeight, speed) {
        // Create models and three.js bullshit
        let geo = new THREE.SphereGeometry(6, 3, 3);
        let mat = new THREE.MeshPhongMaterial({ color: 0x999999 });
        let ast = new THREE.Mesh(geo, mat);
        let coll = new THREE.Sphere();

        ast.receiveShadow = true;
        ast.castShadow = true;

        coll.radius = 6;

        this.model = ast;
        this.collider = coll;

        // Position asteroids to top of scene
        this.initPosition(screenWidth, screenHeight);

        this.velX = 0;
        this.velY = -speed; // Speed downwards

        this.spinX = getRandomInt(1, 8);
        this.spinY = getRandomInt(1, 8);
    }
    move() {
        this.model.position.x += this.velX;
        this.model.position.y += this.velY;

        this.model.rotateX(THREE.Math.degToRad(this.spinX));
        this.model.rotateY(THREE.Math.degToRad(this.spinY));

        // Bind collider's position with model's position
        this.collider.center = this.model.position;
    }

    getModel() { return this.model }
    getCollider() { return this.collider }
    setVelY(newVelocity) { return this.velY = newVelocity; }

    initPosition(Width, Height) {
        console.log("position initalized")
        this.model.position.y = (Height / 2) + Math.random() * 50;
        this.model.position.x = getRandomInt(-Width / 2, Width / 2);
        this.model.position.z = 10
        this.collider.center = this.model.position;
    }

    fellOff(screenWidth, screenHeight) {
        if (this.model.position.y <= (-(screenHeight / 2) - 30)) {
            this.initPosition(screenWidth, screenHeight)
        }
    }

    printAst() {
        console.log("Position:", this.model.position);
        console.log("Velocity: x=", this.velX, " y=", this.velY);
    }
}


class Brawler {
    constructor() {
        let geo = new THREE.BoxGeometry(1.0, 1.4, 0.8);
        let mat = new THREE.MeshPhongMaterial({ 
                                    color: 0xffffff, 
                                    wireframe:true,
                                });
        this.model = new THREE.Mesh(geo, mat);
        this.model.receiveShadow = true;
        this.model.castShadow = true

        this.movement = 'none'
    }
}

export { Comet, Asteroid, Brawler };