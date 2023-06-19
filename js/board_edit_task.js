// Classes for editing a task (edit mode)
let currentEditedTask = '';  // contains the id of the task that is currently edited

function editTask(curId) {
    console.log(curId);
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

function saveTask() {
    console.log('subtasks: ' + selectedSubtasks + ' (status: ' + selectedSubtasksStatus + ')');
    let newJson = getChangedJSON();
    console.log(newJson);

    var index = tasksArray.findIndex(obj => obj.id == currentEditedTask);
    console.log('index: ' + index);

    changeJsonData(index, newJson)
    console.log(tasksArray);


    // Empty global variables 
    emptyVariables();

    // Close Edit Form
    closeAdd();

    // Nach Save: Buttons zurückändern
    document.getElementById('btnTaskClear').classList.remove('d-none');
    document.getElementById('btnTaskCreate').classList.remove('d-none');
    document.getElementById('btnTaskSave').classList.add('d-none');
}

// ---------- Help functions for shortening the editTask function ----------

function boardSetCommonFields(curTask) {
    document.getElementById('taskTitle').value = curTask[0]['title'];
    document.getElementById('taskDescription').value = curTask[0]['description'];
    document.getElementById('taskDueDate').value = curTask[0]['duedate'];
}
function boardSetCategory(curTask) {
    selectedCategory = curTask[0]['category'];
    selectedColour = curTask[0]['categorycolor'];
    document.getElementById('newCatHeaderField').innerHTML = `${selectedCategory}<img src="./img/add-task/circle-${selectedColour}.svg" class="h21px">`;
}
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