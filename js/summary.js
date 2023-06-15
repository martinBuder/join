async function initSummary() {
    await init();
    greeting();
}

/**
 * This function shows definated tehe greeting person
 */
function greeting() {
    let greetingPerson = document.getElementById('greetingPerson');
    let greetingPersonMobile = document.getElementById('greetingPersonMobile');
    greetingPerson.innerHTML = `${user['name']}`;
    greetingPersonMobile.innerHTML = `${user['name']}`        
}