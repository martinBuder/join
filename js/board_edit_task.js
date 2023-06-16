// Classes for editing a task (edit mode)

function editTask(curId) {
    console.log('editTask gestartet - ID: ' + curId);

    // füllen der benötigten Felder, etc. mit den vorhandenen Daten
    document.getElementById('taskTitle').value = "Aber Hallo";
    document.getElementById('taskDescription').value = "Eine dämliche Beschreibung";

    addTask();
}