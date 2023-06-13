/**
 * This function opens the input mask.
 */
function addTask() {
	let addTaskWindow = document.getElementById('addTaskSection');
	addTaskWindow.style.animationName = "slide";
	addTaskWindow.style.animationDuration = "1.5s";
	addTaskWindow.style.animationFillMode = "forwards";
}
/**
* This function closes the input mask.
*/
function closeAdd() {
	let addTaskWindow = document.getElementById('addTaskSection');
	addTaskWindow.style.animationName = "slideOut";
	addTaskWindow.style.animationDuration = "1.5s";
	addTaskWindow.style.animationFillMode = "backwards";
}