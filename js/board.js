

/**
 * This function opens the input mask.
 */
function addTask() {
    document.getElementById('addTask').classList.remove('addTask-none');
}
/**
 * This function closes the input mask.
 */
function closeAdd() {
    document.getElementById('addTask').classList.add('addTask-none');
}

/**
 * Loads already saved tasks and returns an array of the JSON data of these tasks.
 * @returns An array with the JSON data of already saved tasks. If no data is saved it returns an empty array.
 */
async function getTasksArray() {
    let tmpArray = await getItem('tasks');
    tmpArray = await JSON.parse(tmpArray.data.value.replace(/'/g, '"'));
    return (Array.isArray(tmpArray) ? tmpArray : []);
}

function updateTask() {
    // tasksArray is already filled with the current tasks
    let boardTodoArray = tasksArray.filter(t => t['status'] == 'todo');
    document.getElementById('todo').innerHTML = '';
    let boardInprogressArray = tasksArray.filter(t => t['status'] == 'inprogress');
    document.getElementById('inprogress').innerHTML = '';
    let boardAwaitingArray = tasksArray.filter(t => t['status'] == 'awaiting');
    document.getElementById('awaiting').innerHTML = '';
    let boardDoneArray = tasksArray.filter(t => t['status'] == 'done');
    document.getElementById('done').innerHTML = '';
}