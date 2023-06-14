let currentDraggedElement = '';
let noTasks = `
    <div class="noTasks">
        No tasks with that status.
    </div>
`;

async function initBoard() {

    await initAddTask(); // needed for loading selections in add task submask
    tasksArray = await getTasksArray();  // loading the already saved tasks
    renderTasks();

}

function renderTasks() {
    let statusArray = ['todo','inprogress','awaiting','done'];
    for (let i = 0; i < statusArray.length; i++) {
        document.getElementById(statusArray[i]).innerHTML = '';
        renderStatus(statusArray[i]);
    }
}

/**
 * This function opens the input mask.
 */
function addTask() {
    document.getElementById('addTask').classList.remove('addTask-none');
}
/**
 * This function closes the input mask.
 */
function closeAdd() {
    document.getElementById('addTask').classList.add('addTask-none');
}

/**
 * Loads already saved tasks and returns an array of the JSON data of these tasks.
 * @returns An array with the JSON data of already saved tasks. If no data is saved it returns an empty array.
 */
async function getTasksArray() {
    let tmpArray = await getItem('tasks');
    tmpArray = await JSON.parse(tmpArray.data.value.replace(/'/g, '"'));
    return (Array.isArray(tmpArray) ? tmpArray : []);
}

function updateTask() {
    // tasksArray is already filled with the current tasks
    let boardTodoArray = tasksArray.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    let boardInprogressArray = tasksArray.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';
    let boardAwaitingArray = tasksArray.filter(t => t['status'] == 'awaiting');
    document.getElementById('awaiting').innerHTML = '';
    let boardDoneArray = tasksArray.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
}

function renderStatus(statusToRender) {
    let filteredArray = tasksArray.filter(t => t['status'] == statusToRender);
    let newCode = ``;
    if (filteredArray.length == 0) {
        newCode = noTasks;
        document.getElementById(statusToRender).innerHTML += newCode;
    } else {
        for (let i = 0; i < filteredArray.length; i++) {
            const elem = filteredArray[i]; // elem contains now one task of the given status
            newCode = getHtmlCode(elem);
            document.getElementById(statusToRender).innerHTML += newCode;
        }
    }
}

function getHtmlCode(elem) {
    // elem contains the json-data of a task
    let newCode = `
        <div id="${elem['id']}" draggable="true" ondragstart="startDrag('${elem['id']}')" class="taskBox">
            <div id="category" class="cardCategory bgCatColor${elem['categorycolor']}">${elem['category']}</div>
            <div id="title" class="cardTitle">${elem['title']}</div>
            <div id="description" class="cardDescription">${elem['description']}</div>
    `;
    newCode += getHtmlCodeSubtasks(elem);
    newCode += `
            <div class="lettersAndPrio">
                <div id="prio" class="cardLettersContainer">
    `;
    newCode += getHtmlCodeEditors(elem);
    newCode += `
                </div>
                <div class="cardPrio">
                    <img src="./img/add-task/prio-${elem['prio'].toLowerCase()}.svg" alt="${elem['prio'].toLowerCase()} priority">
                </div>
            </div>
        </div>
    `;
    return newCode;
}

function getHtmlCodeSubtasks(elem) {
    let elemSubtasks = elem['subtasks'];
    let elemSubtasksCounter = elemSubtasks.length;
    if (elemSubtasksCounter == 0) return ('');

    let elemSubtasksDone = 0;
    // for (let st = 0; st < elemSubtasks.length; st++) {
    //     if (elemSubtasks[st]['status'] == 'done') {
    //         elemSubtasksDone++;
    //     }
    // }
    elemSubtasksDone = elemSubtasks.filter(st => st['status'] == 'done').length;
    let percentage = (elemSubtasksCounter > 0) ? (100 / elemSubtasksCounter * elemSubtasksDone) : 0;
    let newCode = `
            <div id="subtasks" class="cardSubtasks">
                <div class="cardSubtaskGraphic">
                    <div class="cardSubtaskPercent" style="width: ${percentage}%"></div>
                </div>
                ${elemSubtasksDone}/${elemSubtasksCounter} Done
            </div>
    `;
    return (newCode);
}

function getHtmlCodeEditors(elem) {
    let elemEditors = elem['assignedto'];  // Contains an array of email-addresses
    let plusElements = elemEditors.length > 3 ? elemEditors.length - 2 : 0;
    if (elemEditors.length == 0) return ('');
    if (elemEditors.length > 3) {
        let slicedEditors = elemEditors.slice(0,2);
        elemEditors = slicedEditors;
    }
    let newCode = ``;

    for (let i = 0; i < elemEditors.length; i++) {
        let nameJson = contactList.filter(c => c['email'] == elemEditors[i]);
        let name = nameJson.length > 0 ? nameJson[0]['initials'] : elemEditors[i];
        let color = nameJson.length > 0 ? nameJson[0]['color'] : 'bgColorGrey';
        let nameInitials = getCardInitials(name);
        let minusMargin = i > 0 ? ' cardLettersMinus6' : '';
        newCode += `
            <div class="cardLetters ${color}${minusMargin}">${nameInitials}</div>
        `;
    }
    if (plusElements > 0) newCode += `<div class="cardLetters bgColorBlack cardLettersMinus6">+${plusElements}</div>`;

    return newCode;
}


/**
 * Returns the initials of a given name. If the name, hence the parameter, is only one word, the first two letters are taken for the initials.
 * 
 * @param {string} name - The name whose initials should be returned
 * @returns A string with the initials for a name in uppercase letters
 */
function getCardInitials(name) {
    let nameArray = name.split(' ');
    let initial = '';
    nameArray.length == 1 ? initial = nameArray[0].substring(0, 2) : initial = nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1);
    return initial.toUpperCase();
}




function startDrag(cardID) {
    currentDraggedElement = cardID;
    // console.log(currentDraggedElement);

}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(cardColumn) {
    console.log('Verschieben in Spalte ' + cardColumn);
    console.log('ID zum verschieben: ' + currentDraggedElement);
    // Zugriff auf das Element, das ich verschiebe (id == currentDraggedElement)
    let curTask = tasksArray.filter(t => t['id'] == currentDraggedElement);
    console.log(curTask);
    // Dort ändern des Status, je nach Ziel (cardColumn)
    curTask[0]['status'] = cardColumn;
    console.log(curTask);
    // Speichern des geänderten Tasks, d.h. da sich der Task innerhalb tasksArray befindet: Speichern von tasksArray
    await setItem('tasks', tasksArray);

    // Löschen von currentDraggedElement
    currentDraggedElement = '';

    // Neuladen der Seite, damit das alles korrekt dargestellt wird
    renderTasks();
}