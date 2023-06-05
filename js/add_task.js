/**
 * Globale Variablen
 */
let selectedColour = '';
let selectedCategory = '';
let selectedPriority = '';


/**
 * Startet das Rendern der Add-Task-Seite
 */
async function initAddTask() {
    await init();
    addCategories();
    addContacts();
}


/**
 * Schaltet die Sichtbarkeit der Auswahlliste ein oder aus
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
 * Reagiert auf die Auswahl einer Priorität und schaltet die entsprechende Markierung ein oder aus.
 * 
 * @param {string} prio - Die ausgewählte Priorität
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
 * Löscht alle eingetragenen Daten aus dem Formular, schließt es jedoch nicht.
 */
function clearTask() {
    selectedColour = '';
    selectedCategory = '';
    selectedPriority = '';
    selectedContacts = [];

    initAddTask();
}


/**
 * Startet die Speicherung des eingetragenen Task mit allen Subtasks, wenn diese vorhanden sind.
 */
async function createTask() {
    if (!(checkRequiredFields())) 
            return('');

    // JSON für den Task zusammenstellen
    let newJSON = getNewJSON();
    console.log(newJSON);
    return('');

    // Speichern des neuen Tasks

    // TODO - SPEICHERN DER DATEN INKL. STATUS
    // Start animation of confirmation button
    let btn = document.getElementById('btnTaskAdded');
    btn.classList.add('taskButtonsFlex');
    btn.classList.remove('d-none');
    btn.classList.add('w3-animate-bottom');
    // Wait a second, than open board
    await new Promise(wait => setTimeout(wait, 1000));
    window.open('./board.html', '_self');
}


/**
 * Prüft die Angaben auf Vollständigkeit und blendet ggf. entsprechende Fehlermeldungen unter den betroffenen Feldern ein.
 * 
 * @returns {boolean} true or false - Die Prüfung war in Ordnung (true) oder es fehlen noch Angaben (false)
 */
function checkRequiredFields() {
    let retValue = true;
    // Title, Description und Due Date
    let fldArray = ['taskTitle', 'taskDescription', 'taskDueDate'];
    let msgArray = ['reqTitle', 'reqDescription', 'reqDueDate'];
    for (let i = 0; i < fldArray.length; i++) {
        if (document.getElementById(fldArray[i]).value == ''){
            document.getElementById(msgArray[i]).classList.remove('opacity-0');
            retValue = false;
        } else {
            document.getElementById(msgArray[i]).classList.add('opacity-0');
        }
    }
    // Category wird gesondert behandelt
    if (selectedCategory == '') {
        document.getElementById('reqCategory').classList.remove('opacity-0');
        retValue = false;
    } else {
        document.getElementById('reqCategory').classList.add('opacity-0');
    }

    return retValue;
}


/**
 * Stellt ein JSON-Objekt mit den Daten des eingegebenen Tasks zusammen und gibt dieses zurück
 * 
 * @returns {json} Das JSON-Object mit den Daten des eingegebenen Tasks
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