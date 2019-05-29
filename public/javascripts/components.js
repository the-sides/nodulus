class Asteroid{
    constructor(){
        // Create models and three.js bullshit
        let geo = new THREE.SphereGeometry(6, 3, 3);
        let mat = new THREE.MeshPhongMaterial({color: 0x999999});
        let a = new THREE.Mesh(geo, mat);
        let coll = new THREE.Sphere();

        let d = 200;

        a.position.y = 70 + Math.random()*(d/10);
        a.position.x = d * 0.4 * (Math.random() - .5);
        a.receiveShadow = true;
        a.castShadow = true;
        coll.center = a.position;
        coll.radius = 6;

        this.model = a;
        this.collider = coll

        this.velY = 1;
        this.velX = 0;
    }
    moveAst(){
        console.log("move ast by", this.velY);
    }
    getModel(){ return this.model }
    getCollider(){ return this.collider }
}

export default Asteroid;