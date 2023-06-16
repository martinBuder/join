// Classes for editing a task (edit mode)
let currentEditedTask = '';

function editTask(curId) {
    console.log('editTask gestartet - ID: ' + curId);
    currentEditedTask = curId;
    let curTask = tasksArray.filter(t => t['id'] == currentEditedTask);

    closeTaskForView();

    // füllen der benötigten Felder, etc. mit den vorhandenen Daten
    document.getElementById('taskTitle').value = curTask[0]['title'];

    document.getElementById('taskDescription').value = curTask[0]['description'];

    selectedCategory = curTask[0]['category'];
    selectedColour = curTask[0]['categorycolor'];
    document.getElementById('newCatHeaderField').innerHTML = `${selectedCategory}<img src="./img/add-task/circle-${selectedColour}.svg" class="h21px">`;

    selectPriority(curTask[0]['prio'])

    document.getElementById('taskDueDate').value = curTask[0]['duedate'];

    for (let i = 0; i < curTask[0]['assignedto'].length; i++) {
        const assignedto = curTask[0]['assignedto'][i];
        // let pos = contactList.findIndex(co => co['email'] == assignedto);
        let listEntries = document.querySelectorAll('ul#newAssList li');
        // console.log(listEntries);
        for (let j = 0; j < listEntries.length; j++) {
            const le = listEntries[j];
            // console.log(le.getAttribute('onclick'));
            if (le.getAttribute('onclick').includes(assignedto)) {
                le.click();
            }
        }
    }

    for (let i = 0; i < curTask[0]['subtasks'].length; i++) {
        const curSubtask = curTask[0]['subtasks'][i];
        console.log(curSubtask);
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


    // Buttons ändern
    document.getElementById('btnTaskClear').classList.add('d-none');
    document.getElementById('btnTaskCreate').classList.add('d-none');
    document.getElementById('btnTaskSave').classList.remove('d-none');

    addTask();



    
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