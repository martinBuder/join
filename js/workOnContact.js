/**
 * design the circle in contact working window
 * 
 * @param {index} i
 */
function createCircle(i) {
  let circle = document.getElementById("circle");
  circle.innerHTML = contactList[i]["initials"];
  circle.classList.remove("bgLightGrey");
  circle.classList.add(contactList[i]["color"]);
  circle.setAttribute("onclick", `changeContactColor(${i})`);
}

/**
 * open the contact colors for changing
 * 
 * @param {index} i
 */
function changeContactColor(i) {
  let contactColorWrapper = document.getElementsByClassName(
    "contactColorWrapper"
  )[0];
  contactColorWrapper.innerHTML = ``;
  contactColorWrapper.innerHTML = `<p>Choose a color...</p>`;
  for (let j = 0; j < bgColorArray.length; j++) {
    contactColorWrapper.innerHTML += /*html*/ `
				<div class="contactColorContainer ${bgColorArray[j]}" onclick="choiceColor(${i}, ${j})"></div>
			`;
  }
}

/**
 * serie of function to change the color
 * 
 * @param {index} i
 * @param {index} j
 */
async function choiceColor(i, j) {
  chosseNewColor(i, j);
  await setContactListToRemoteStorage("contactList", contactList);
  saveContactList();
  getContactList();
  fillContactList();
}

/**
 * choose a new color for contact
 * 
 * @param {index} i
 * @param {index} j
 */
function chosseNewColor(i, j) {
  let contactColorWrapper = document.getElementsByClassName(
    "contactColorWrapper"
  )[0];
  let circle = document.getElementById("circle");
  let fullContactColor = document.getElementById("fullContactColor");
  fullContactColor.classList.remove(contactList[i]["color"]);
  circle.classList.remove(contactList[i]["color"]);
  contactList[i]["color"] = bgColorArray[j];
  circle.classList.add(contactList[i]["color"]);
  fullContactColor.classList.add(contactList[i]["color"]);
  contactColorWrapper.innerHTML = ``;
}

/**
 * set a color for new contact
 */
function addColorNewContact() {
  contactJson["color"] = getRandomColor();
}

/**
 * choose a random color for create a new contact
 */
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * bgColorArray.length);
  return bgColorArray[randomIndex];
}

/**
 * serie of function to save the edited contact
 * 
 * @param {index} i
 */
async function saveEditContact(i) {
  setEditedContact(i);
  getContactInitials(i);
  saveContactList();
  getContactList();
  fillContactList();
  closeAddContact();
  await setContactListToRemoteStorage("contactList", contactList);
}

/**
 * serie of function to delete contact
 * 
 * @param {index} i
 * @param {event} submit saveNewContact()
 */
async function deleteContact(event, i) {
  event.preventDefault();
  closeAllButtons();
  contactList.splice(i, 1);
  saveContactList(); // set contactList to localStorage
  clearFullContact();
  fillContactList(); // füllt contactList nach Anfangsbuchstaben
  closeAddContact(); // schließt bearbeitungsfenster
  closeFullSite();
  openAllButtons();
  await setContactListToRemoteStorage("contactList", contactList);
}

/**
 * close all  Buttons
 */
function closeAllButtons() {
  let buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
}

/**
 * open all Buttons
 */
function openAllButtons() {
  let buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}

/**
 * clear full contact
 */
function clearFullContact() {
  document.getElementById('showFullContact').innerHTML = '';
}

/**
 * serie of function to save the new contact
 */
async function saveNewContact() {
  closeAllButtons();
  getContactInputFields();
  getNewContactData();
  getContactInitials();
  addColorNewContact();
  pushContactToContacts();
  saveContactList();
  await setContactListToRemoteStorage("contactList", contactList);
  getContactList();
  fillContactList();
  closeAddContact();
  openAllButtons();
}

/**
 * contactJson get the information --> before push in contactList
 */
function getNewContactData() {
  contactJson["name"] = contactName.value;
  contactJson["email"] = contactEmail.value;
  contactJson["phonenumber"] = contactPhone.value;
}

/**
 * get the initials of name
 * if i == definated we came from edit contact
 * 
 * @param {index} i
 */
function getContactInitials(i) {
  if (i !== undefined) {
    nameArray = contactList[i]["name"].split(" ");
  } else {
    nameArray = contactJson["name"].split(" ");
  }
  let initial = "";
  nameArray.length == 1
    ? (initial = nameArray[0].substring(0, 2))
    : (initial = nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1));
  if (i !== undefined) {
    contactList[i]["initials"] = initial.toUpperCase();
  } else {
    contactJson["initials"] = initial.toUpperCase();
  }
}

/**
 * push contact to new contactList
 */
function pushContactToContacts() {
  contactList.push(contactJson);
}
