// Functions for editing a task (edit mode)

/**
 * Global variables
 */
let currentEditedTask = '';  // contains the id of the task that is currently edited


/**
 * Start the change functionality. Sets some important data and opens the task in edit mode.
 * 
 * @param {string} curId - The ID of the task that is about to change
 */
function editTask(curId) {
    currentEditedTask = curId;
    let curTask = tasksArray.filter(t => t['id'] == currentEditedTask);
    closeTaskForView();  // closes the viewing mode of the current task - otherwise it will still be open in the background

    // filling of the fields with already saved data
    boardSetCommonFields(curTask);
    boardSetCategory(curTask);
    selectPriority(curTask[0]['prio']);  // function from add_task.js
    boardSetEditors(curTask);
    boardSetSubtasks(curTask);
    boardChangeButtonVisibility();

    addTask();  // opens the editing mode for a task - generally used when creating a new task, but here some data was added before
}


/**
 * Saves the changed task to disc and re-renders the board.
 */
async function saveTask() {
    let newJson = getChangedJSON();                                        // create a JSON object with the changed values
    var index = tasksArray.findIndex(obj => obj.id == currentEditedTask);  // get the index of the current task inside the tasksArray
    changeJsonData(index, newJson);                                        // change the JSON data inside tasksArray
    await setItem('tasks', tasksArray);                                    // save the changes of tasksArray to disc
    emptyVariables();                                                      // reset the global variables that were used
    closeAdd();                                                            // Close Edit Form

    // after saving: reset visibility of some buttons
    document.getElementById('btnTaskClear').classList.remove('d-none');
    document.getElementById('btnTaskCreate').classList.remove('d-none');
    document.getElementById('btnTaskSave').classList.add('d-none');

    renderTasks(tasksArray); // re-render the tasks so changes will be shown
}


// ---------- Help functions for shortening the editTask function ----------


/**
 * Sets the data of some common fields, that might be changed, into the array with the data of the current task.
 * 
 * @param {Array} curTask - An array with the data of the current task
 */
function boardSetCommonFields(curTask) {
    document.getElementById('taskTitle').value = curTask[0]['title'];
    document.getElementById('taskDescription').value = curTask[0]['description'];
    document.getElementById('taskDueDate').value = curTask[0]['duedate'];
}


/**
 * Sets the data of the category fields, that might be changed, into the array with the data of the current task.
 * 
 * @param {Array} curTask - An array with the data of the current task
 */
function boardSetCategory(curTask) {
    selectedCategory = curTask[0]['category'];
    selectedColour = curTask[0]['categorycolor'];
    document.getElementById('newCatHeaderField').innerHTML = `${selectedCategory}<img src="./img/add-task/circle-${selectedColour}.svg" class="h21px">`;
}


/**
 * Sets the data of the editors field, that might be changed, into the array with the data of the current task.
 * 
 * @param {Array} curTask - An array with the data of the current task
 */
function boardSetEditors(curTask) {
    for (let i = 0; i < curTask[0]['assignedto'].length; i++) {
        const assignedto = curTask[0]['assignedto'][i];
        let listEntries = document.querySelectorAll('ul#newAssList li');
        for (let j = 0; j < listEntries.length; j++) {
            const le = listEntries[j];
            if (le.getAttribute('onclick').includes(assignedto)) {
                le.click();
            }
        }
    }
}


/**
 * Sets the data of the subtasks fields, that might be changed, into the array with the data of the current task.
 * 
 * @param {Array} curTask - An array with the data of the current task
 */
function boardSetSubtasks(curTask) {
    for (let i = 0; i < curTask[0]['subtasks'].length; i++) {
        let curSubtask = curTask[0]['subtasks'][i];
        selectedSubtasks.push(curSubtask['title']);
        selectedSubtasksStatus.push(curSubtask['status']);

        let newValue = curSubtask['title'].replace("'", "´");
        let newImg = (curSubtask['status'] == 'done') ? 'checked' : 'unchecked';
        let newCode = `
            <li>
                <img src="./img/add-task/check-rectangle-${newImg}.svg" alt="" id="check-${newValue.replace(/\s/g, '~~~')}" onclick="toggleSubtaskCheck('${newValue}', 'check-${newValue.replace(/\s/g, '~~~')}')">
                ${newValue}
                <img src="./img/delete.svg" alt="delete" onclick="removeSubtask('${newValue}');">
            </li>
        `;
        document.getElementById('newSubtaskList').innerHTML += newCode;
    }
}


/**
 * Changes the visibility of some buttons inside the task form.
 */
function boardChangeButtonVisibility() {
    document.getElementById('btnTaskClear').classList.add('d-none');   // hide clear button
    document.getElementById('btnTaskCreate').classList.add('d-none');  // hide create button - click here would create a complete new task with the data
    document.getElementById('btnTaskSave').classList.remove('d-none'); // show save button - click here will overwrite already saved data
}


// ---------- Help functions for shortening the saveTask function ----------


/**
 * Assembles and returns a JSON object with the data of the entered task.
 * Important: This function creates no new ID. Instead it uses the ID saved in variable currentEditedTask.
 * For that reason not all elements are included in this JSON object.
 * 
 * @returns {json} The JSON object with the data of the entered task.
 */
function getChangedJSON() {
    let newJSON = {
        id: currentEditedTask,
        title: document.getElementById('taskTitle').value,
        description: document.getElementById('taskDescription').value,
        category: selectedCategory,
        categorycolor: selectedColour,
        duedate: document.getElementById('taskDueDate').value,
        prio: selectedPriority,
        subtasks: getSubtaskArray(),
        assignedto: selectedContacts
    }
    return newJSON;
}


/**
 * Changes the JSON data in tasksArray with the data from the change form (also as JSON data).
 * 
 * @param {integer} index - The index number of the JSON object inside the tasksArray
 * @param {json} newJson - The JSON object with the changed data
 */
function changeJsonData(index, newJson) {
    let changeArray = ['title', 'description', 'category', 'categorycolor', 'duedate', 'prio', 'subtasks', 'assignedto'];
    for (let i = 0; i < changeArray.length; i++) {
        const elem = changeArray[i];
        tasksArray[index][elem] = newJson[elem];
    }
}


/**
 * Delete entries in some global variables. Otherwise they may affect editing another task.
 */
function emptyVariables() {
    selectedContacts = [];
    selectedSubtasks = [];
    selectedSubtasksStatus = [];
    categories = [];
    selectedColour = '';
    selectedCategory = '';
    selectedPriority = '';
}