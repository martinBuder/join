/**
 * This function opens the input mask.
 */
function addTask() {
    document.getElementById('addTask').innerHTML = `
        <div class="window">
            <img onclick="closeAdd()" src="./img/icon-cancel.svg" alt="">        
        </div>
    `;
    document.getElementById('addTask').classList.remove('addTask-none');
}
/**
 * This function closes the input mask.
 */
function closeAdd() {
    document.getElementById('addTask').classList.add('addTask-none');
}