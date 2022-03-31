const visibleHeightAtZDepth = ( depth, camera ) => {
  // compensate for cameras not positioned at z=0
  const cameraOffset = camera.position.z;
  if ( depth < cameraOffset ) depth -= cameraOffset;
  else depth += cameraOffset;

  // vertical fov in radians
  const vFOV = camera.fov * Math.PI / 180; 

  // Math.abs to ensure the result is always positive
  return 2 * Math.tan( vFOV / 2 ) * Math.abs( depth );
};

const visibleWidthAtZDepth = ( depth, camera ) => {
  const height = visibleHeightAtZDepth( depth, camera );
  return height * camera.aspect;
};

function boundCheckX(dimension, suspectPos, depth, inCamera){
    let limit = undefined;
    if(dimension == 'x')
        limit = visibleWidthAtZDepth(depth, inCamera)/2 - 5 ;

    else if(dimension == 'y')
        limit = visibleHeightAtZDepth(depth, inCamera)/2 - 5 ;
    else throw error("Unknown dimension");


    if( Math.abs(suspectPos) > limit)
        return false;   // Failed bound check. 
    else
      return true;      // Passed bound check.
}

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

function collisionDetection(obj1, obj2){
  return obj1.intersectsSphere(obj2);
}

export {visibleHeightAtZDepth, visibleWidthAtZDepth, boundCheckX, getRandomInt, collisionDetection}