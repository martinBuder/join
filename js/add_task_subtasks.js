function selectSubtask() {
    toggleSubtaskVisibility();
    document.getElementById('newSubtaskInputField').focus();
}

function toggleSubtaskVisibility() {
    let fieldArray = ['newSubtaskHeader', 'newSubtaskInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
    }
}

function cancelNewSubtaskInput() {
    toggleSubtaskVisibility();
}

function selectNewSubtaskInput() {

}