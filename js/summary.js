/**
 * This function change the image by hover.
 */
document.getElementById('cha1').onmouseover = function changeImg1() {
    document.getElementById('cha1Img').src = './img/Frame 592n.svg'
}

/**
 * This function reverses the change by no-hover.
 */
document.getElementById('cha1').onmouseout = function changeImgBack1() {
    document.getElementById('cha1Img').src = './img/Frame 592.svg'
}

/**
 * This function change the image by hover.
 */
document.getElementById('cha2').onmouseover = function changeImg1() {
    document.getElementById('cha2Img').src = './img/Frame 593n.svg'
}

/**
 * This function reverses the change by no-hover.
 */
document.getElementById('cha2').onmouseout = function changeImgBack1() {
    document.getElementById('cha2Img').src = './img/Frame 593.svg'
}

let userAsText = localStorage.getItem('user');
let userName = '';

/**
 * If "userAsText" has a content, it will be converted to object and stored in "userName".
 */
if (userAsText) {
    userName = JSON.parse(userAsText);
}

document.getElementById('person').innerHTML = '';

/**
 * If "userName" is null, "Guest" is output, otherwise the content of "userName" is output.
 */
if (userName == 0) {
    document.getElementById('person').innerHTML += '';
} else {
    document.getElementById('person').innerHTML += userName['name'];
}

/**
 * This function shows "greeting" for a few seconds when loading "summary" if the viewport is narrower than 1350 pixels.
 */
async function greeting() {
    if (document.documentElement.clientWidth < 1350) {
        document.getElementById('greetingBig').innerHTML = '';
        document.getElementById('greetingBig').innerHTML = `
            <div id="greet" class="greet">Good morning</div>
            <div id="person" class="person">Sofia Müller</div>
        `;
        setTimeout(function() {
            document.getElementById('greetingBig').classList.add('greetingBigNone');
        }, 1000);

    } else {
        document.getElementById('greetingBig').classList.add('greetingBigNone');
    }
}