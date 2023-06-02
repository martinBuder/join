let selectedSubtasks = [];

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

function cancelNewSubtaskInput() {
    toggleSubtaskVisibility();
    document.getElementById('newSubtaskInputField').value = '';
}

function selectNewSubtaskInput() {
    let elem = document.getElementById('newSubtaskInputField');
    selectedSubtasks.push(elem.value);
    let newCode = `
        <li onclick="toggleSubtaskCheck('${elem.value}', 'check-${elem.value.replace(' ', '_')}')"><img src="./img/add-task/check-rectangle-checked.svg" alt="" id="check-${elem.value.replace(' ', '_')}">${elem.value}</li>
    `;
    document.getElementById('newSubtaskList').innerHTML += newCode;
    console.log(selectedSubtasks);
    cancelNewSubtaskInput();
}

function removeSubtask(subtask) {
    selectedSubtasks = selectedSubtasks.filter((tmpItem) => tmpItem != subtask);
    // let id = `check-${subtask.replace(' ', '_')}`;
    // let img = document.getElementById(id);
    // let li = img.parentNode;
    // li.parentNode.removeChild(li);

    console.log(selectedSubtasks);
}