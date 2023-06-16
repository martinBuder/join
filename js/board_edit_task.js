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