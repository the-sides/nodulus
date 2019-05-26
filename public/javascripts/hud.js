const elm = document.getElementById('status');

function showHitStatus(){
    console.log("hit status sent")
    elm.textContent = 'you fucking suck'
    elm.style.display = 'block';
}
function hideHitStatus(){
    elm.style.display = 'none';

}

export {showHitStatus, hideHitStatus};