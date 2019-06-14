const elm = document.getElementById('status');

function showMessage(message){
    elm.textContent = message;
    elm.style.display = 'block'
    setTimeout(hideMessage, 3000)
}
function hideMessage(){
    elm.style.display = 'none'
}

export {showMessage, hideMessage};