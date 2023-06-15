async function initSummary() {
    await init();
    greeting();
    await getTaskNumbersFromRemoteStorage('taskNumbersForSummary');
    findtaskNumbersForSummaryArray()
    fillTaskNumbers();
}

let taskNumbersForSummary = [ 
    {allTasks: 0},
    {progressTasks: 0},
    {awaitTasks: 0},
    {toDoTasks: 0},
    {doneTasks: 0},
    {urgentTasks: 0},
    {deadlineDate: 'January 01, 2024'}
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

/**
 * set all values in html
 */

function fillTaskNumbers() {
    for (let i = 0; i < taskNumbersForSummary.length; i++) {
        let taskNumber = taskNumbersForSummary[i];
        let key = Object.keys(taskNumber)[0]; // Schlüssel des Objekts erhalten
        let element = document.getElementById(key);
        element.innerHTML = taskNumber[key];
    }
}

    /** 
	* get the taskNumbersForSummary-Array from localStorage so that taskNumbersForSummary is on every site 
	*/
    function gettaskNumbersForSummary() {
        let taskNumbersForSummaryAsText = localStorage.getItem('taskNumbersForSummary');
        if (taskNumbersForSummaryAsText) {
            taskNumbersForSummary = JSON.parse(taskNumbersForSummaryAsText);
        }
    }

    /** 
	* this function get the user information from Remote Storage and changed it to taskNumbersForSummary-Array compares with e-mail and passwort
	* !!! you need to used findtaskNumbersForSummaryArray() to work with taskNumbersForSummary array
	* @param {JsonWebKey} key 
    */
    async function getTaskNumbersFromRemoteStorage(key) {
        const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
        let res = await fetch(url).catch(errorFunction);
        taskNumbersForSummary = await res.json();
    }

    /**
	* this function separate taskNumbersForSummary-Array from the serveranswer and changed in a taskNumbersForSummary array 
	*/
function findtaskNumbersForSummaryArray() {
	if (taskNumbersForSummary && taskNumbersForSummary.data && taskNumbersForSummary.data.value) {
			taskNumbersForSummary = JSON.parse(taskNumbersForSummary.data.value.replace(/'/g, '"'));
	} else {
			user = null;
	}
}