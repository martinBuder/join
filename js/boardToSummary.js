let taskNumbersForSummary = [
  { allTasks: 0 },
  { progressTasks: 0 },
  { awaitTasks: 0 },
  { toDoTasks: 0 },
  { doneTasks: 0 },
  { urgentTasks: 0 },
  { deadlineDate: "January 01, 2024" },
];

let progressTasksCounter = 0;
let awaitTasksCounter = 0;
let toDoTasksCounter = 0;
let doneTasksCounter = 0;
let urgentTasksCounter = 0;

/**
 * serie of functions to set the datas in taskNumbersForSummaryArray
 */
async function setNumbersToTaskNumbersForSummary() {
  setAllTasksNumber();
  countTaskNumbers();
  setTaskNumbers();
  clearCounters();
  sortTaskForDate();
  await setTaskNumbersStorage("taskNumbersForSummary", taskNumbersForSummary);
}

/**
 * set the numbers of all tast
 */
function setAllTasksNumber() {
  taskNumbersForSummary[0]["allTasks"] = tasksArray.length;
}

/**
 * set the progress Task
 */
function countTaskNumbers() {
  for (let i = 0; i < tasksArray.length; i++) {
    let status = tasksArray[i]["status"];
    if (status == "inprogress") {
      progressTasksCounter++;
    } else if (status == "awaiting") {
      awaitTasksCounter++;
    } else if (status == "todo") {
      toDoTasksCounter++;
    } else if (status == "done") {
      doneTasksCounter++;
    }
    if (tasksArray[i]["prio"] == "Urgent") {
      urgentTasksCounter++;
    }
  }
}

/**
 * set the task numbers
 */
function setTaskNumbers() {
  taskNumbersForSummary[1]["progressTasks"] = progressTasksCounter;
  taskNumbersForSummary[2]["awaitTasks"] = awaitTasksCounter;
  taskNumbersForSummary[3]["toDoTasks"] = toDoTasksCounter;
  taskNumbersForSummary[4]["doneTasks"] = doneTasksCounter;
  taskNumbersForSummary[5]["urgentTasks"] = urgentTasksCounter;
}

/**
 * set all counters back to 0
 */
function clearCounters() {
  progressTasksCounter = 0;
  awaitTasksCounter = 0;
  toDoTasksCounter = 0;
  doneTasksCounter = 0;
  urgentTasksCounter = 0;
}

/**
 * sort dates to find the next
 */
function sortTaskForDate() {
  tasksArray.sort((a, b) => {
    if (a.duedate < b.duedate) return -1;
    if (a.duedate > b.duedate) return 1;
    return 0;
  });
  let nextDate = new Date(tasksArray[0]["duedate"]);
  let options = { month: "long", day: "numeric", year: "numeric" };
  taskNumbersForSummary[6]["deadlineDate"] = nextDate.toLocaleDateString(
    "en-US",
    options
  );
}

/**
 * set the task into remote storage
 * 
 * @param {JsonWebKey} key 
 * @param {JSON} value 
 * @returns 
 */
async function setTaskNumbersStorage(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
