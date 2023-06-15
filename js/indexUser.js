/**
 * a serie of functions to create a account
 */
async function createNewAccount() {
  getUserInputFields();
  getUserLogInInfo();
  await checkUser();
  isUserDouble();
}

/**
 * check is user in users
 */
async function checkUser() {
  await getItemFromRemoteStorage("users");
  findUsersArray();
  await findEmailUser();
}

/**
 * step 2 from create a account if user hasn't an account
 */
async function saveNewAccount() {
  reloadUserJson();
  changeUserInformation();
  deleteUserfromUsers();
  pushUserToUsers();
  await setItemToRemoteStorage("users", users);
  clearDesktopUsersUserInformation();
}

/**
 * push user to users
 */
function pushUserToUsers() {
  users.push(user);
}

/**
 *  get the inputfields
 */
function getUserInputFields() {
  username = document.getElementById("name");
  email = document.getElementById("email");
  password = document.getElementById("passwordField");
}

/**
 * definated email and password for control
 */
function getUserLogInInfo() {
  email = email.value;
  password = password.value;
}

/**
 * check if user is correct
 */
function findCorrectUser() {
  user = users.find((u) => u.password === password && u.email === email);
  if (user === undefined) {
    alert("The email or password you used is not correct!");
    clearDesktopUsersUserInformation();
  } else {
    saveUser();
    indexToSummary();
  }
}

/**
 * function serie go from index to summary
 */
async function indexToSummary() {
  await getContactListFromRemoteStorage("contactList");
  findContactListArray();
  saveContactList();
  goToSummary();
}

/**
 * this are the functions row for log in fill input to summery site
 */
async function logIn() {
  getUserInputFields();
  getUserLogInInfo();
  await getItemFromRemoteStorage("users");
  findUsersArray();
  findCorrectUser();
}

/**
 * go to summery site
 */
function goToSummary() {
  window.location.href = "./summary.html";
}

/**
 * create a new password and go to log In Window
 * @param {string} newPassword
 */
async function newPasswordOk(newPassword) {
  await saveNewPassword(newPassword);
  indexContent.innerHTML += returnIdentPasswordHtml();
  setTimeout(renderLogInWindow, 1000);
}

/**
 * check: have the user an account
 */
function noUserFound() {
  if (user == undefined) {
    alert(`This user hasn't an account!`);
    renderForgotPassword();
  } else {
    goToChangePassword();
  }
}

/**
 * go forward to change password
 */
function goToChangePassword() {
  indexContent.innerHTML += returnSendEmailHtml();
  setTimeout(resetPasswordStepTwo, 200);
}

/**
 * check: have the user an account
 */
function isUserDouble() {
  if (user !== undefined) {
    alert("This user has already an account!");
    clearDesktopUsersUserInformation();
  } else {
    saveNewAccount();
  }
}
