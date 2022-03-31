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
        this.keysPressed = [];

    }
    move(){
        const speed = 0.12;
        const actions =  {    // Smoother switch statement
            left:  () => { 
                    //// console.log('moving left'); 
                    if(this.model.position.x <= -0.5){
                        console.log('bound reached')
                        return;
                    }
                    this.model.position.x -= speed
                    this.model.position.y = 
                        -0.5 * Math.pow(this.model.position.x, 2) + 1;
                    this.model.rotation.z = -this.model.position.x * 1.5;
            },
            right: () => { 
                    //// console.log('moving right'); 
                    if(this.model.position.x >= 0.5){
                        console.log('bound reached')
                        return;
                    }
                    this.model.position.x += speed
                    this.model.position.y = 
                        -1 * Math.pow(this.model.position.x, 2) + 1;
                    this.model.rotation.z = -this.model.position.x * 1.5;
                    // this.model.rotation.z = -0.75;
                },
            back:  () => { 
                    //// console.log('moving back to dodge'); 
                    this.model.position.y = 0.7;
                    this.model.position.z = -0.75;
                },
            none:  () => { 
                    //// console.log('returning to center'); 
                    if(this.model.position.x < 0){
                        this.model.position.x += speed
                    } 
                    if(this.model.position.x > 0){
                        this.model.position.x -= speed
                    } 
                    this.model.position.y = 
                        -1 * Math.pow(this.model.position.x, 2) + 1;
                    this.model.rotation.z = -this.model.position.x * 1.5;
                }
        }

        if  (actions[this.movement] === undefined) return false;
        else actions[this.movement]();
        // By the current this.movement, from the current position, move towards there. 
        //   if reached by a small threshhold, reset game and comp movement to none.

        return true;
    }
}