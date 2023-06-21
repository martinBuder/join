/**
 * Global variables
 */
let currentDraggedElement = '';
let noTasks = `
    <div class="noTasks">
        No tasks status
    </div>
`;


/**
 * Initialises the board, that is it loads all data and renders it.
 */
async function initBoard() {
    await initAddTask();                 // needed for loading selections in add task submask
    tasksArray = await getTasksArray();  // loading the already saved tasks from disk
    renderTasks(tasksArray);
}


/**
 * Renders the JSON data of an array. Usually that are the already saved data (tasksArray) but when searching for tasks this may be an array of filtered JSON data.
 * 
 * @param {json} arrayToRender - The array of already saved tasks OR the array of filtered tasks
 */
function renderTasks(arrayToRender) {
    let statusArray = ['todo','inprogress','awaiting','done'];
    for (let i = 0; i < statusArray.length; i++) {
        document.getElementById(statusArray[i]).innerHTML = '';
        renderStatus(statusArray[i], arrayToRender);
    }
}


/**
 * Loads already saved tasks and returns an array of the JSON data of these tasks.
 * 
 * @returns An array with the JSON data of already saved tasks. If no data is saved it returns an empty array.
 */
async function getTasksArray() {
    let tmpArray = await getItem('tasks');
    tmpArray = await JSON.parse(tmpArray.data.value.replace(/'/g, '"'));
    return (Array.isArray(tmpArray) ? tmpArray : []);
}


/**
 * Renders the JSON data of a status (column). Usually that are the already saved data (tasksArray) but when searching for tasks this may be an array of filtered JSON data.
 * 
 * @param {string} statusToRender - The status (column) that shall be rendered
 * @param {json} arrayToRender - The array of JSON objects that will be filtered to the status
 */
function renderStatus(statusToRender, arrayToRender) {
    let filteredArray = arrayToRender.filter(t => t['status'] == statusToRender);
    let newCode = ``;
    if (filteredArray.length == 0) {
        newCode = noTasks.replace('status', statusToRender).replace('inprogress', 'in progress').replace('awaiting', 'awaiting feedback');
        document.getElementById(statusToRender).innerHTML += newCode;
    } else {
        for (let i = 0; i < filteredArray.length; i++) {
            const elem = filteredArray[i]; // elem contains now one task of the given status
            newCode = getHtmlCode(elem);
            document.getElementById(statusToRender).innerHTML += newCode;
        }
    }
}


/**
 * Returns the html code for a JSON data object for displaying a task inside a status column.
 * 
 * @param {json} elem - The JSON data of the object whose html code should be returned.
 * @returns A string representing the html code.
 */
function getHtmlCode(elem) {
    // elem contains the json-data of a task
    let newCode = `
        <div id="${elem['id']}" draggable="true" ondragstart="startDrag('${elem['id']}')" onclick="openTaskForView('${elem['id']}')" class="taskBox">
            <div class="cardCategoryAndArrow mb-20">
                <div id="category" class="cardCategory bgCatColor${elem['categorycolor']}">${elem['category']}</div>
                <div class="menuDropdownContainer">
                    <img src="./img/blackBackArrow.svg" class="cardArrow" onclick="showStatusMenu(event, '${elem['status']}', '${elem['id']}')">
                    <ul id="dropdown${elem['id']}" class="menuDropdown d-none">
                        ${getHtmlCodeDropdown(elem)}
                    </ul>
                </div>
            </div>
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


/**
 * Returns the html code for the status submenu. This part is used when changing a status by the arrow function.
 * 
 * @param {json} elem - The JSON data of the object whose html code should be returned.
 * @returns A string representing the html code.
 */
function getHtmlCodeDropdown(elem) {
    let allStatus = ['todo', 'inprogress', 'awaiting', 'done'];
    let filteredStatus = allStatus.filter(ast => ast != elem['status']);
    newCode = ``;
    for (let i = 0; i < filteredStatus.length; i++) {
        let curStatus = filteredStatus[i];
        let txtStatus = curStatus.replace('todo', 'To do').replace('inprogress', 'In progress').replace('awaiting', 'Awaiting Feedback').replace('done', 'Done');
        newCode += `
            <li onclick="moveToFromMenu(event, '${curStatus}', '${elem['id']}')">${txtStatus}</li>
        `;
    }
    return newCode;
}


/**
 * Returns the html code for the subtasks of a task.
 * 
 * @param {json} elem - The JSON data of the object whose html code should be returned.
 * @returns A string representing the html code.
 */
function getHtmlCodeSubtasks(elem) {
    let elemSubtasks = elem['subtasks'];
    let elemSubtasksCounter = elemSubtasks.length;
    if (elemSubtasksCounter == 0) return ('');

    let elemSubtasksDone = 0;
    elemSubtasksDone = elemSubtasks.filter(st => st['status'] == 'done').length;
    let percentage = (elemSubtasksCounter > 0) ? Math.round(100 / elemSubtasksCounter * elemSubtasksDone) : 0;
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


/**
 * Returns the html code for the editor (assign to) selection of a task.
 * 
 * @param {json} elem - The JSON data of the object whose html code should be returned.
 * @returns A string representing the html code.
 */
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


// --------- Drag & Drop Functions ----------


/**
 * Sets a global parameter with the ID of the currently dragged element.
 * 
 * @param {string} cardID - The ID of the element that is dragged.
 */
function startDrag(cardID) {
    currentDraggedElement = cardID;
}


/**
 * Allow a drop.
 * 
 * @param {event} ev - The event that was called
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Reacts to the dropping of an element inside a status column.
 * 
 * @param {string} cardColumn - The status column an element will be dropped in.
 */
async function moveTo(cardColumn) {
    let curTask = tasksArray.filter(t => t['id'] == currentDraggedElement);  // get task-element of given id (id = currentDraggedElement)
    curTask[0]['status'] = cardColumn;                                       // change status to given status (status = cardColumn)
    await setItem('tasks', tasksArray);                                      // save the changed task, which means we have to save tasksArray
    setNumbersToTaskNumbersForSummary();                                     // function for counting several summary data
    currentDraggedElement = '';                                              // delete the entry in currentDraggedElement
    deHighlightColumn(cardColumn);                                           // remove highlighting of the column
    renderTasks(tasksArray);                                                 // and finally... reload the page
}      


/**
 * Highlights a status column when hovering over it.
 * 
 * @param {string} colId - The status column that needs a hovering effect.
 */
function highlightColumn(colId) {
    document.getElementById(colId).classList.add('taskColumnHighlighted');
}


/**
 * Removes the highlighting of a status column when hovering leaves its area.
 * 
 * @param {string} colId - The status column whose hovering effect should be removed.
 */
function deHighlightColumn(colId) {
    document.getElementById(colId).classList.remove('taskColumnHighlighted');
}


// ---------- END Drag & Drop Functions ----------


/**
 * Deletes a task from the array of tasks and saves the changes to disk.
 * 
 * @param {string} taskId - The ID of the task to be deleted
 */
async function deleteTaskFromView(taskId) {
    await deleteTask(taskId);
    closeTaskForView();
    renderTasks(tasksArray);
}


/**
 * Search for tasks with phrases/letters in either title or description.
 * Will be called when letters are written into the search field.
 */
function searchTasks() {
    let searchValue = document.getElementById('boardSearchField').value.toLowerCase();
    let filteredArray = tasksArray.filter(t => (t['title'].toLowerCase().includes(searchValue) || t['description'].toLowerCase().includes(searchValue)));
    renderTasks(filteredArray);
}


/**
 * Shows the menu to change the status of a task.
 * 
 * @param {object} event - The event handler
 * @param {string} curStatus - The current status
 * @param {string} curId - The ID of the element that was clicked
 */
function showStatusMenu(event, curStatus, curId) {
    event.stopPropagation();
    document.getElementById('dropdown' + curId).classList.toggle('d-none');
}


/**
 * Moves a task to another status.
 * 
 * @param {object} event - The event handler
 * @param {string} whereTo - The new status, that is, the status the task will be moved to
 * @param {string} curId - The ID of the element that will be moved
 */
function moveToFromMenu(event, whereTo, curId) {
    event.stopPropagation();

    currentDraggedElement = curId;
    moveTo(whereTo);

    document.getElementById('dropdown' + curId).classList.toggle('d-none');
}