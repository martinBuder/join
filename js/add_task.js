/**
 * Global Variables
 */
let selectedColour = '';
let selectedCategory = '';
let selectedPriority = '';
let tasksArray = [];


/**
 * Starts the rendering of the Add Task page.
 */
async function initAddTask() {
    await init();
    addCategories();
    addContacts();
}


/**
 * Switches the visibility of the selection list on or off.
 */
function toggleSelection(selection) {
    switch (selection) {
        case 'category':
            document.getElementById('newCatList').classList.toggle('d-none');
            break;
        case 'assigned':
            document.getElementById('newAssList').classList.toggle('d-none');
            break;
        default:
            break;
    }
}


/**
 * Responds to the selection of a priority and switches the corresponding marker on or off.
 * 
 * @param {string} prio - The selected priority.
 */
function selectPriority(prio) {
    selectedPriority == prio ? selectedPriority = '' : selectedPriority = prio;
    // Toggle selection
    document.getElementById(`btnPrio${prio}`).classList.toggle('btnSelected');
    document.getElementById(`btnPrio${prio}`).classList.toggle('btnSelected' + prio);
    document.getElementById(`img${prio}`).classList.toggle('btnSelectedImage');
    // Deactivate other buttons (if selected before)
    let btnArray = ['Urgent', 'Medium', 'Low'];
    for (let i = 0; i < btnArray.length; i++) {
        if (btnArray[i] != prio) {
            document.getElementById(`btnPrio${btnArray[i]}`).classList.remove('btnSelected');
            document.getElementById(`btnPrio${btnArray[i]}`).classList.remove('btnSelected' + btnArray[i]);
            document.getElementById(`img${btnArray[i]}`).classList.remove('btnSelectedImage');
        }
    }
}


/**
 * Deletes all entered data from the form, but does not close it.
 */
function clearTask() {
    selectedColour = '';
    selectedCategory = '';
    selectedPriority = '';
    selectedContacts = [];

    initAddTask();
}


/**
 * Starts the saving of the entered task with all subtasks, if they exist.
 */
async function createTask() {
    // if (!(checkRequiredFields()))
    //     return('');

    // JSON for the new task
    let newJSON = getNewJSON();
    
    // Saving the new task to disk
    // await getTasksArray();
    // tasksArray.push(newJSON);
    // await setItem('tasks', tasksArray);

    // Open Board
    openBoardWhenSaved();
}


/**
 * Returns an array of already saved tasks. Used to push in a new task and then save it.
 */
async function getTasksArray() {
    let tmpArray = await getItem('tasks');
    tmpArray = await JSON.parse(tmpArray.data.value.replace(/'/g, '"'));
    Array.isArray(tmpArray) ? tasksArray = tmpArray : tasksArray = [];
}


/**
 * Checks the information for completeness and, if necessary, displays corresponding error messages under the fields concerned.
 * 
 * @returns {boolean} true or false - The check was OK (true) or information is still missing (false).
 */
function checkRequiredFields() {
    let retValue = true;

    // Title, Description and Due Date
    let fldArray = ['taskTitle', 'reqTitle', 'taskDescription', 'reqDescription', 'taskDueDate', 'reqDueDate'];
    for (let i = 0; i < fldArray.length; i += 2) {
        (document.getElementById(fldArray[i]).value == '') ? document.getElementById(fldArray[i+1]).classList.remove('opacity-0') : document.getElementById(fldArray[i+1]).classList.add('opacity-0');
        (document.getElementById(fldArray[i]).value == '') ? retValue = false : '';
    }
    // Category and Priority are treated separately
    (selectedCategory == '') ? document.getElementById('reqCategory').classList.remove('opacity-0') : document.getElementById('reqCategory').classList.add('opacity-0');
    (selectedCategory == '') ? retValue = false : '';
    (selectedPriority == '') ? document.getElementById('reqPriority').classList.remove('opacity-0') : document.getElementById('reqPriority').classList.add('opacity-0');
    (selectedPriority == '') ? retValue = false : '';

    return retValue;
}


/**
 * Assembles and returns a JSON object with the data of the entered task.
 * 
 * @returns {json} The JSON object with the data of the entered task.
 */
function getNewJSON() {
    let subtasksArray = [];
    for (let i = 0; i < selectedSubtasks.length; i++) {
        let tmpSubtask = {
            title: selectedSubtasks[i],
            status: 'todo'
        }
        subtasksArray.push(tmpSubtask);
    }
    let newJSON = {
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        category: selectedCategory,
        categorycolor: selectedColour,
        duedate: document.getElementById('taskDueDate').value,
        prio: selectedPriority,
        status: 'todo',
        subtasks: subtasksArray,
        assignedto: selectedContacts
    }
    return newJSON;
}


/**
 * Starts a small animation with a confirmation message (a button) and waits a second to open the board.
 */
async function openBoardWhenSaved() {
    // Start animation of confirmation button
    let btn = document.getElementById('btnTaskAdded');
    btn.classList.add('taskButtonsFlex');
    btn.classList.remove('d-none');
    btn.classList.add('w3-animate-bottom');
    // Wait a second, then open board
    await new Promise(wait => setTimeout(wait, 900));
    window.open('./board.html', '_self');
}