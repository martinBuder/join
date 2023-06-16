// Classes for viewing a task (view mode)

/**
 * Opens a task in view mode
 * 
 * @param {string} taskId - The ID of the task to open
 */
function openTaskForView(taskId) {
    let newCode = getViewRender(taskId);

    document.getElementById('viewTask').classList.toggle('d-none');
    document.getElementById('viewTaskContainer').innerHTML = newCode;
}


/**
 * Closes the view mode
 */
function closeTaskForView() {
    document.getElementById('viewTask').classList.toggle('d-none');
}


/**
 * Creates the HTML code for rendering a selected task
 * 
 * @param {string} taskId - The ID of the task to render
 * @returns HTML code for rendering the task
 */
function getViewRender(taskId) {
    let curTaskArray = tasksArray.filter(t => t['id'] == taskId);
    let curTask = curTaskArray[0];

    let newCode = `
    <div class="viewTaskHeadline mb-20">
        <div id="viewTaskCategory" class="cardCategory bgCatColor${curTask['categorycolor']}">${curTask['category']}</div>
        <img class="closeTaskView" onclick="closeTaskForView()" src="./img/icon-cancel.svg" alt="">
    </div>
    <div id="viewTaskTitle">
        ${curTask['title']}
    </div>
    <div id="viewTaskDescription" class="mb-25">
        ${curTask['description']}
    </div>
    ${getViewRenderSubtasks(curTask)}
    <div class="viewTaskText viewTaskOneLine mb-25">
        <b>Due date: </b>
        <span id="viewTaskDueDate">${curTask['duedate']}</span>
    </div>
    <div id="viewTaskPriority" class="viewTaskText viewTaskOneLine mb-25">
        <b>Priority:</b>
        <button class="viewTaskPrio viewTaskPrio${curTask['prio']}">${curTask['prio']}<img src="./img/add-task/prio-${curTask['prio'].toLowerCase()}.svg"></button>
    </div>
    <div class="viewTaskText mb-25">
        <b>Assigned To:</b>
    </div>
    <div class="viewTaskEditorAndButtons">
        <div id="viewTaskEditorList" class="viewTaskEditorList">
            ${getViewRenderEditors(curTask)}
        </div>
        <div class="viewTaskButtons">
            <div class="viewTaskButton viewTaskButtonLeft" onclick="deleteTaskFromView('${taskId}')">
                <img src="./img/delete.svg" alt="">
            </div>
            <div class="viewTaskButton viewTaskButtonRight" onclick="editTask('${taskId}')">
                <img src="./img/pen.svg" alt="">
            </div>
        </div>
    </div>
    `;

    return newCode;
}


/**
 * Subfunction that creates the HTML code for rendering subtasks
 * 
 * @param {json} curTask - The JSON data that represents the selected task
 * @returns Part of the HTML code for rendering subtasks (if any)
 */
function getViewRenderSubtasks(curTask) {
    let subtaskCode = ``;
    if (curTask['subtasks'].length > 0) {
        subtaskCode += `
        <div id="viewTaskSubtasks" class="viewTaskText mb-25">
            <b>Subtasks:</b>
            <ul class="newSubtaskList mt-10">
        `;
        for (let i = 0; i < curTask['subtasks'].length; i++) {
            const elem = curTask['subtasks'][i];
            subtaskCode += `
                <li>
                    <img src="./img/add-task/check-rectangle-${(elem['status'] == 'done' ? 'checked' : 'unchecked')}.svg" alt="">${elem['title']}
                </li>
            `;
        }
        subtaskCode += `
            </ul>
        </div>
        `;
    }
    return subtaskCode;
}


/**
 * Subfunction that creates the HTML code for rendering editors
 * 
 * @param {json} curTask - The JSON data that represents the selected task
 * @returns Part of the HTML code for rendering editors (if any)
 */
function getViewRenderEditors(curTask) {
    let editorsCode = ``;
    for (let i = 0; i < curTask['assignedto'].length; i++) {
        const elem = curTask['assignedto'][i];
        let nameJson = contactList.filter(c => c['email'] == elem);
        let name = nameJson.length > 0 ? nameJson[0]['initials'] : elem;
        let color = nameJson.length > 0 ? nameJson[0]['color'] : 'bgColorGrey';
        let nameInitials = getCardInitials(name);
        editorsCode += `
        <div class="viewTaskEditor viewTaskOneLine">
            <div class="viewTaskEditorBadge ${color}">${nameInitials}</div>
            <div class="viewTaskText">${elem}</div>
        </div>
        `;
    }
    return editorsCode;
}