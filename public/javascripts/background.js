function init(offsetY = 0){
    console.log(offsetY)
    const stars_geometry = new THREE.Geometry();
    const stars_material = new THREE.PointsMaterial({
    color: 0xe6e6fa, 
    size: 1.3, 
    sizeAttenuation: false});
    for(let i=0; i<5000; i++){
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
// I am no exporting the function, 
//    but the stars that are formed
export default init;