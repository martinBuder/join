/**
 * Global array for collecting the registered subtasks
 */
let selectedSubtasks = [];
let selectedSubtasksStatus = [];


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
        selectedSubtasksStatus[selectedSubtasks.indexOf(imgId.substring(6))] = 'done';
    } else {
        elem.src = "./img/add-task/check-rectangle-unchecked.svg";
        selectedSubtasksStatus[selectedSubtasks.indexOf(imgId.substring(6))] = 'todo';
    }
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
 * Adds the entry to the list of subtasks.
 */
function selectNewSubtaskInput() {
    let newValue = document.getElementById('newSubtaskInputField').value.replace("'", "´");

    selectedSubtasks.push(newValue);
    selectedSubtasksStatus.push('todo');
    let newCode = `
        <li>
            <img src="./img/add-task/check-rectangle-unchecked.svg" alt="" id="check-${newValue.replace(' ', '_')}" onclick="toggleSubtaskCheck('${newValue}', 'check-${newValue.replace(' ', '_')}')">
            ${newValue}
            <img src="./img/delete.svg" alt="delete" onclick="removeSubtask('${newValue}');">
        </li>
    `;
    document.getElementById('newSubtaskList').innerHTML += newCode;
    cancelNewSubtaskInput();
}


/**
 * Removes the selected subtask from the list of subtasks.
 * 
 * @param {string} subtask - Name des Subtask
 */
function removeSubtask(subtask) {
    selectedSubtasksStatus.splice(selectedSubtasks.indexOf(subtask), 1);
    selectedSubtasks = selectedSubtasks.filter((tmpItem) => tmpItem != subtask);
    let id = `check-${subtask.replace(' ', '_')}`;
    let img = document.getElementById(id);
    let li = img.parentNode;
    li.parentNode.removeChild(li);
}