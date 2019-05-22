function init(){
    const stars_geometry = new THREE.Geometry();
    const stars_material = new THREE.PointsMaterial({
    color: 0xe6e6fa, 
    size: 1.3, 
    sizeAttenuation: false});
    for(let i=0; i<5000; i++){
        var vertex = new THREE.Vector3();
        vertex.x = Math.random()*2-1;
        vertex.y = Math.random()*2-1;
        vertex.z = Math.random()*2-1;
        stars_geometry.vertices.push(vertex);
    }
  
    const stars = new THREE.Points(stars_geometry, stars_material);
    stars.position.z = 249;
    return stars;
}
// I am no exporting the function, 
//    but the stars that are formed
export default init();