let contactJson = {
  name: "",
  email: "",
  phonenumber: "",
  initials: "",
  color: "",
};

let contactName;
let contactEmail;
let contactPhone;
let nameArray;

/**
 * wait that init is ready and just then start fillContactList
 */
async function initContact() {
  await init();
  fillContactList();
  addCategories();
  addContacts();
}

/**
 * render the full Contact part
 * 
 * @param {index} i
 */
function renderFullContact(i) {
  getContactWindow();
  getFullContactArea(i);
  contactListBtnBackground(i);
}

/**
 * open full contact site (mobile)
 */
function getContactWindow() {
  let contactWindow = document.getElementsByClassName("contactWindow")[0];
  contactWindow.classList.add("fullSite");
  fillContactList(); /* so you have no darkblue background if you close the window */
}

/**
 * close full contact site (mobile)
 */
function closeFullSite() {
  let oldContactWrapper = document.getElementsByClassName("contactWrapper")[o];
  oldContactWrapper.classList.remove("sameFullContact");
  let contactWindow = document.getElementsByClassName("contactWindow")[0];
  contactWindow.classList.remove("fullSite");
}

/**
 * get the area to fill
 * 
 * @param {index} i
 */
function getFullContactArea(i) {
  let showFullContact = document.getElementById("showFullContact");
  showFullContact.innerHTML = returnFullContactHtml(i);
}

/**
 * open add contact Window
 */
function openAddContact() {
  addedNewContactBtn();
  startSlideAnimation();
}

/**
 * serie of functions to open the contact edit window
 * 
 * @param {index} i
 */
function openEditContact(i) {
  changeClaimer();
  getContactInputFields();
  fillEditInputs(i);
  createCircle(i);
  addedEditContactBtn(i);
  startSlideAnimation();
  overwriteContactSaveOnSubmit(i);
}

/**
 * change Claimer text
 */
function changeClaimer() {
  let changeClaimer = document.getElementsByClassName("claimerText")[0];
  changeClaimer.innerHTML = /*html*/ `
		<h1>Edit contact</h1>
	`;
}

/**
 * change Claimer text
 */
function changeClaimerback() {
  let changeClaimer = document.getElementsByClassName("claimerText")[0];
  changeClaimer.innerHTML = /*html*/ `
		<h1>Add Contact</h1>
    <p>Tasks are better with a team!</p>
	`;
}

/**
 * fill inputfields with contactList Infos
 * 
 * @param {index} i
 */
function fillEditInputs(i) {
  contactName.value = contactList[i]["name"];
  contactEmail.value = contactList[i]["email"];
  contactPhone.value = contactList[i]["phonenumber"];
}

/**
 * clear all inputfields from inputArea
 */
function clearInputs() {
  document.getElementById("inputArea").reset();
}

/**
 * fill contactJson with edited information
 * 
 * @param {index} i
 */
function setEditedContact(i) {
  contactList[i]["name"] = contactName.value;
  contactList[i]["email"] = contactEmail.value;
  contactList[i]["phonenumber"] = contactPhone.value;
}

/**
 * change form function to new function
 * 
 * @param {index} i
 */
function overwriteContactSaveOnSubmit(i) {
  let form = document.getElementById("inputArea");
  form.setAttribute("onsubmit", `saveEditContact(${i})`);
}

/**
 * contact Window get the animatioon to slide in
 */
function startSlideAnimation() {
  let addContactWindow = document.getElementById("addContactWindow");
  addContactWindow.classList.remove('workOnContact')
}

/**
 * render the btn for new contact in contact window
 */
function addedNewContactBtn() {
  let contactWorkspaceBtnContainer = document.getElementById(
    "contactWorkspaceBtnContainer"
  );
  contactWorkspaceBtnContainer.innerHTML = /*html*/ `
			<button class="btnWithImg outFocusBtn contactCancelBtn" onclick="closeAddContact()"><p>Cancel</p><p>&#10006</p></button>
   <button class="btnWithImg focusBtn" submit ><p>Create contact</p><p>&#10003</p></button>
		`;
  contactWorkspaceBtnContainer.style.justifyContent = "flex-start";
}

/**
 * render the btn for edit contact in contact window
 * 
 * @param {index} i
 */
function addedEditContactBtn(i) {
  let contactWorkspaceBtnContainer = document.getElementById(
    "contactWorkspaceBtnContainer"
  );
  contactWorkspaceBtnContainer.innerHTML = /*html*/ `
			<button class="outFocusBtn" onclick="deleteContact(${i})">Delete</button>
   <button class="focusBtn editContactSaveBtn" submit>Save</button>
		`;
  contactWorkspaceBtnContainer.style.justifyContent = "flex-end";
}

/**
 * This function closes the input mask.
 */
function closeAddContact() {
  let addContactWindow = document.getElementById('addContactWindow');
  let contactColorWrapper = document.getElementsByClassName('contactColorWrapper')[0];
  addContactWindow.classList.add('workOnContact');
  setTimeout(clearInputs, 1000);
  setTimeout(changeClaimerback, 1000);
  setTimeout(contactColorWrapper.innerHTML = ``, 1000);
}

/**
 * get the inputFields from work on contact window
 */
function getContactInputFields() {
  contactName = document.getElementById("contactName");
  contactEmail = document.getElementById("contactEmail");
  contactPhone = document.getElementById("contactPhone");
}
