export default class Brawler {
    constructor() {
        let geo = new THREE.BoxGeometry(1.0, 1.4, 0.8);
        let mat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.model = new THREE.Mesh(geo, mat);
        this.model.receiveShadow = true;
        this.model.castShadow = true

        this.movement = 'none'
        this.model.position.x = 0;
        this.animationStart = undefined;

    }
    moveLeft(){
        const path = function(del){
            
            return del;
        }
        return path();
    }
    move(gamestate){
        // By the current this.movement, from the current position, move towards there. 
        //   if reached by a small threshhold, reset game and comp movement to none.

        return true;
    }
}