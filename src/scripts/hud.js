const elm = document.getElementById('status');
const hudContainer = document.getElementById('top-right');
const currentLevelDisplay = hudContainer.querySelector('.levelHud')
const pointsDisplay = hudContainer.querySelector('.pointHud')
const speedDisplay = hudContainer.querySelector('.speedHud')

function showMessage(message){
    if(elm === null) 
        return;
    elm.textContent = message;
    elm.style.display = 'block'
    //setTimeout(hideMessage, 3000)
}
function hideMessage(){
    if(elm === null) 
        return;
    elm.style.display = 'none'
}
function updateLevel(lvl){
    if(currentLevelDisplay === null)
        return;
    currentLevelDisplay.textContent = 'Level: ' + lvl;
}

function updateSpeed(moveSpeed){
    if(speedDisplay === null)
        return;
    speedDisplay.textContent = 'Speed: ' + moveSpeed;
}

function updatePoints(pts){
    if(pointsDisplay === null){
        return;
    }
    pointsDisplay.textContent = 'Points: ' + Number(pts);
}

export {showMessage, hideMessage, updateLevel, updatePoints, updateSpeed};