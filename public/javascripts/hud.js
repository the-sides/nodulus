const elm = document.getElementById('status');

function showHitStatus(message){
    console.log("hit status sent")
    elm.textContent = message;
    elm.style.display = 'block'
    setTimeout(hideHitStatus, 2000)
}
function hideHitStatus(){
    elm.style.display = 'none'
}

export {showHitStatus, hideHitStatus};