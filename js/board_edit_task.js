// Classes for editing a task (edit mode)
let currentEditedTask = '';  // contains the id of the task that is currently edited

function editTask(curId) {
    console.log('editTask gestartet - ID: ' + curId);
    currentEditedTask = curId;
    let curTask = tasksArray.filter(t => t['id'] == currentEditedTask);

    closeTaskForView();  // closes the viewing mode of the current task - otherwise it will still be open in the background

    // füllen der benötigten Felder, etc. mit den vorhandenen Daten
    document.getElementById('taskTitle').value = curTask[0]['title'];

    document.getElementById('taskDescription').value = curTask[0]['description'];

    selectedCategory = curTask[0]['category'];
    selectedColour = curTask[0]['categorycolor'];
    document.getElementById('newCatHeaderField').innerHTML = `${selectedCategory}<img src="./img/add-task/circle-${selectedColour}.svg" class="h21px">`;

    selectPriority(curTask[0]['prio']);

    document.getElementById('taskDueDate').value = curTask[0]['duedate'];


    boardSetEditors(curTask);
    boardSetSubtasks(curTask);
    boardChangeButtonVisibility();

    addTask();  // opens the editing mode for a task - generally used when creating a new task, but here some data was added before
}

function saveTask() {
    // Task mit der ID currentEditedTask speichern
    let curTask = tasksArray.filter(t => t['id'] == currentEditedTask);

    // Close Edit Form
    closeAdd();

    // Nach Save: Buttons zurückändern
    document.getElementById('btnTaskClear').classList.remove('d-none');
    document.getElementById('btnTaskCreate').classList.remove('d-none');
    document.getElementById('btnTaskSave').classList.add('d-none');
}

// Help functions

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
                <img src="./img/add-task/check-rectangle-${newImg}.svg" alt="" id="check-${newValue.replace(' ', '_')}" onclick="toggleSubtaskCheck('${newValue}', 'check-${newValue.replace(' ', '_')}')">
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