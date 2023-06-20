/**
 * This function opens the input mask.
 */
function addTask() {
  document.getElementById('addTask').classList.remove('addTask-none');
  document.getElementById('editOutScroll').style.overflow = "hidden";
}
/**
 * This function closes the input mask.
 */
function closeAdd() {
  document.getElementById('addTask').classList.add('addTask-none');
  document.getElementById('editOutScroll').style.overflow = "auto";
  clearTask(); // deletes all entries - needed in editing an existing task
}