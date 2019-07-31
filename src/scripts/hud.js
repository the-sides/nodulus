const elm = document.getElementById('status');
const currentLevelDisplay = document.getElementById('top-right');
const pointsDisplay = document.getElementById('bottom-right');

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
    currentLevelDisplay.textContent = 'Level ' + lvl;
}
function updatePoints(pts){
    if(pointsDisplay === null){
        return;
    }
    pointsDisplay.display = 'Points: ' + pts;
}

export {showMessage, hideMessage, updateLevel, updatePoints};