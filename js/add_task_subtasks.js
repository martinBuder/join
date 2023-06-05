/**
 * Globaler Array zum Sammeln der eingetragenen Subtasks
 */
let selectedSubtasks = [];


/**
 * Reagiert auf den Klick auf das Subtask-Feld.
 * Startet den Wechsel der Sichtbarkeite des Eingabefeldes und setzt den Fokus dorthin.
 */
function selectSubtask() {
    toggleSubtaskVisibility();
    document.getElementById('newSubtaskInputField').focus();
}


/**
 * Wechselt die Sichtbarkeit des Subtask Anzeige- und Auswahlfeldes
 */
function toggleSubtaskVisibility() {
    let fieldArray = ['newSubtaskHeader', 'newSubtaskInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
        fieldArray[i] == 'newSubtaskHeader' ? element.classList.toggle('selectionHeaderFlex') : '';
    }
}


/**
 * Wechselt bei einem Subtask die Graphik, ob der Subtask ausgewählt ist, oder nicht.
 * 
 * @param {string} subtask - Name des Subtask
 * @param {string} imgId - ID der Zeile, in der der Subtask steht
 */
function toggleSubtaskCheck(subtask, imgId) {
    let elem = document.getElementById(imgId);
    if (elem.src.includes('unchecked')) {
        elem.src = "./img/add-task/check-rectangle-checked.svg"
        selectedSubtasks.push(subtask);
    } else {
        elem.src = "./img/add-task/check-rectangle-unchecked.svg";
        removeSubtask(subtask);
    }
    console.log(selectedSubtasks);
}


/**
 * Reagiert auf den Abbruch der Eingabe eines Subtasks.
 */
function cancelNewSubtaskInput() {
    toggleSubtaskVisibility();
    document.getElementById('newSubtaskInputField').value = '';
}


/**
 * Reagiert auf die Bestätigung der Eingabe eines Subtasks.
 * Fügt der Liste der Subtasks den Eintrag hinzu und wählt ihn gleich aus (setztt den Haken).
 */
function selectNewSubtaskInput() {
    let newValue = document.getElementById('newSubtaskInputField').value.replace("'", "´");

    selectedSubtasks.push(newValue);
    let newCode = `
        <li onclick="toggleSubtaskCheck('${newValue}', 'check-${newValue.replace(' ', '_')}')"><img src="./img/add-task/check-rectangle-checked.svg" alt="" id="check-${newValue.replace(' ', '_')}">${newValue}</li>
    `;
    document.getElementById('newSubtaskList').innerHTML += newCode;
    console.log(selectedSubtasks);
    cancelNewSubtaskInput();
}


/**
 * Entfernt den gewählten Subtask aus der Liste der Subtasks.
 * 
 * @param {string} subtask - Name des Subtask
 */
function removeSubtask(subtask) {
    selectedSubtasks = selectedSubtasks.filter((tmpItem) => tmpItem != subtask);
    // let id = `check-${subtask.replace(' ', '_')}`;
    // let img = document.getElementById(id);
    // let li = img.parentNode;
    // li.parentNode.removeChild(li);

    console.log(selectedSubtasks);
}