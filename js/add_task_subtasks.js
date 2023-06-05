/**
 * Global array for collecting the registered subtasks
 */
let selectedSubtasks = [];


/**
 * Responds to the click on the subtask field.
 * Starts the change of the visibility of the input field and sets the focus there.
 */
function selectSubtask() {
    toggleSubtaskVisibility();
    document.getElementById('newSubtaskInputField').focus();
}


/**
 * Switches the visibility of the subtask display and selection field
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
 * Changes the graphic for a subtask, whether the subtask is selected or not.
 * 
 * @param {string} subtask - Name of the subtask
 * @param {string} imgId - ID of the line in which the subtask is located
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
 * Reacts to the abortion of the input of a subtask.
 */
function cancelNewSubtaskInput() {
    toggleSubtaskVisibility();
    document.getElementById('newSubtaskInputField').value = '';
}


/**
 * Responds to the confirmation of the input of a subtask.
 * Adds the entry to the list of subtasks and selects it immediately (sets the check mark).
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
 * Removes the selected subtask from the list of subtasks.
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