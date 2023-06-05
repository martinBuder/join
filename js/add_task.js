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
    let elem;
    switch (selection) {
        case 'category':
            elem = document.getElementById('newCatList');
            break;
        case 'assigned':
            elem = document.getElementById('newAssList');
            break;
        default:
            break;
    }
    elem.classList.toggle('d-none');
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
    // Save task data
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