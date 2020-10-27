import { BeltPiece } from './components.js'
import { getRandomInt } from './utils.js';

function starGen(offsetY = 0){
    const stars_geometry = new THREE.Geometry();
    const stars_material = new THREE.PointsMaterial({
    color: 0xe6e6fa, 
    size: 1.3, 
    sizeAttenuation: false});
    for(let i=0; i<2000; i++){
        var vertex = new THREE.Vector3();
        vertex.x = Math.random()*400 - 200;
        // vertex.y = 0;
        vertex.y = Math.random()*400 + offsetY;
        vertex.z = Math.random()*200-200;
        stars_geometry.vertices.push(vertex);
    }
  
    const stars = new THREE.Points(stars_geometry, stars_material);
    stars.position.z = 1;
    return stars;
}


function beltGen(screenX, screenY){
    let pieces = [];

    let leftBound = (-screenX + 15)/2,
       rightBound = (screenX - 15)/2

    // Left side 
    for(let i = 0; i < 10; i++){
        pieces.push(
            new BeltPiece(leftBound + getRandomInt(-3, 3), 
                          screenY/2 - i * 15)
        );
    }

    // Right side
    for(let i = 0; i < 10; i++){
        pieces.push(
            new BeltPiece(rightBound + getRandomInt(-3, 3), 
                          screenY/2 - i * 15)
        );
    }
    return pieces;

}

export {starGen, beltGen} ;