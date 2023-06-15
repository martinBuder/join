async function initSummary() {
    await init();
    greeting();
    fillTaskNumbers();
}

let taskNumbersForSummary = [ 
    {allTasks: 0, },
    {progressTasks: 0,},
    {awaitTasks: 0,},
    {toDoTasks: 0,},
    {doneTasks: 0,},
    {urgentTasks: 0,},
    {deadlineDate: 'January 01, 2024',}
]
  
/**
 * This function shows definated tehe greeting person
 */
function greeting() {
    let greetingPerson = document.getElementById('greetingPerson');
    let greetingPersonMobile = document.getElementById('greetingPersonMobile');
    greetingPerson.innerHTML = `${user['name']}`;
    greetingPersonMobile.innerHTML = `${user['name']}`        
}

function fillTaskNumbers() {
    countTaskInBoard();
}

function countTaskInBoard() {
    for (let i = 0; i < taskNumbersForSummary.length; i++) {
        let taskNumber = taskNumbersForSummary[i];
        let key = Object.keys(taskNumber)[0]; // Schlüssel des Objekts erhalten
        let element = document.getElementById(key);
        element.innerHTML = taskNumber[key];
    }
}