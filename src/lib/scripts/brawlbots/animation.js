function generateAnimations(){
    const animations = {
        movements: {
            left: function(obj, crntAnimation) {
                if(crntAnimation === 'p1'){
                    console.log("tween")
                    new createjs.Tween(obj.position)
                        .to({x: [3, 4] }, 10000)
                    console.log(obj.position.x)
                        // .onComplete(crntAnimation = 'none')
                        // .start()
                }
            },
            center: undefined

        }
    }
    return animations;
}

export default generateAnimations;