import { getRandomInt } from "./utils.js";

class SpaceJunk {
    move() {
        this.model.position.x += this.velX;
        this.model.position.y += this.velY;

        this.model.rotateX(THREE.Math.degToRad(this.spinX));
        this.model.rotateY(THREE.Math.degToRad(this.spinY));

        // Bind collider's position with model's position
        this.collider.center = this.model.position;
    }

    collisionDetect(otherObject) {
        return this.collider.intersectsSphere(otherObject.collider);
    }
    
    getModel() { return this.model }
    getCollider() { return this.collider }

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

        this.spinX = 0.0;
        this.spinY = 0.3;
    }


    getPos() { return this.model.position; }
    setPosX(newX) { this.model.position.x = newX; }
    setPosY(newY) { this.model.position.y = newY; }
    setVelX(newX) { this.velX = newX; }
    setVelY(newY) { this.velY = newY; }
    setSpinX(newX) { this.spinX = newX; }
    setSpinY(newY) { this.spinY = newY; }

}

class Asteroid extends SpaceJunk{
    constructor(screenWidth, screenHeight, speed, waveCount, listIndice) {
        super()
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

        this.wavePasses = waveCount;
        this.listIndex = listIndice;
    }

    setVelY(newVelocity) { return this.velY = newVelocity; }

    initPosition(Width, Height) {
        console.log("position initalized")
        this.model.position.y = (Height / 2) + Math.random() * 50;
        this.model.position.x = getRandomInt(-Width / 2, Width / 2);
        this.model.position.z = 10
        this.collider.center = this.model.position;
    }

    fellOff(screenWidth, screenHeight, removeFunc) {
        if (this.model.position.y <= (-(screenHeight / 2) - 30)) {
            this.initPosition(screenWidth, screenHeight)
            this.wavePasses -= 1;
            if(this.wavePasses <= 0){
                removeFunc(this);
                // delete this.model;
                // delete this.collider;
                return true;
            }
            else return false;
        }
    }

    printAst() {
        console.log("Position:", this.model.position);
        console.log("Velocity: x=", this.velX, " y=", this.velY);
    }
}

class BeltPiece {
    constructor(x, y){
        let geo = new THREE.SphereGeometry(2 * getRandomInt(0.8, 2), 3, 3);
        let mat = new THREE.MeshPhongMaterial({ color: 0x999999 });
        let ast = new THREE.Mesh(geo, mat);

        // Init position
        ast.position.x = x;
        ast.position.y = y;

        this.model = ast;

    }

    move(){
        this.model.position.y -= 0.1;
    }
    fellOff(Height){
        if(this.model.position.y < -Height/2 - 10){
            this.model.position.y += Height + 20;
        }
        return true;
    }
}

export { Comet, Asteroid, BeltPiece };