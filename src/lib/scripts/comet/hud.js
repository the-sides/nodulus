
function showMessage(message){
	const elm = document?.getElementById('status') ?? null;
    if(elm === null) 
        return;
    elm.textContent = message;
    elm.style.display = 'block'
    //setTimeout(hideMessage, 3000)
}
function hideMessage(){
	const elm = document?.getElementById('status');
    if(elm === null) 
        return;
    elm.style.display = 'none'
}
function updateLevel(lvl){
	const currentLevelDisplay = document?.querySelector('.levelHud')
    if(currentLevelDisplay === null)
        return;
    currentLevelDisplay.textContent = 'Level: ' + lvl;
}

function updateSpeed(moveSpeed){
	const speedDisplay = document?.querySelector('.speedHud')
    if(speedDisplay === null)
        return;
    speedDisplay.textContent = 'Speed: ' + moveSpeed;
}

function updatePoints(pts){
	const pointsDisplay = document?.querySelector('.pointHud')
    if(pointsDisplay === null){
        return;
    }
    pointsDisplay.textContent = 'Points: ' + Number(pts);
}

export {showMessage, hideMessage, updateLevel, updatePoints, updateSpeed};