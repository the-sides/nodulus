const elm = document.getElementById('status');

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

export {showMessage, hideMessage};