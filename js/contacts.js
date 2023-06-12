let contactList = [];

let contactJson = {
	name: 'person',
	email: '',
	phonenumber: '',
	initials:'',
	color: '',
}

let contactName;
let contactEmail;
let contactPhone;

function sortContacts() {
	contactList.sort( (a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	})
}

async function initContact() {
	  await init();
			fillContactList();
	};


function fillContactList() {
	let firstLetter
	let firstLetterHeader
	sortContacts();
	let contactListContainer = document.getElementById('contactListContainer');
	contactListContainer.innerHTML = '';
	for (let i = 0; i < contactList.length; i++) {
		let contact = contactList[i];
		firstLetter = getFirstLetter(contact);
		firstLetterHeader = fillFirstLetterHeader(firstLetterHeader, firstLetter);
		contactListContainer.innerHTML += returnContactListHtml(contact, i);		
	}
}

function returnContactListHtml(contact, i) {
	return /*html*/`
		<div class="contactWrapper" onclick="renderFullContact(${i})">
			<div class="intials ${contact['color']}">${contact['initials']}</div>
			<div class="contactBox">
				<h3>${contact['name']}</h3>
				<a href="mailto:${contact['email']}" class="link">${contact['email']}</a>
			</div>
		</div>

	`
}

function renderFullContact(i) {
	let showFullContact = document.getElementById('showFullContact');
	showFullContact.innerHTML = returnFullContactHtml(i);
}

function returnFullContactHtml(i) {
	return /*html*/`
		<div class="fullContactHeader">
			<div class="intials background: ${contactList[i]['color']}">${contactList[i]['initials']}</div>
			<div class="fullContactHeaderName">
				<h2>${contactList[i]['name']}</h2>
				<p onclick="contactAddTask()">+ Add Task</p>
			</div>			
		</div>
		<div class="contactSubHeaderContainer">
			<h3>Contact Information</h3>
			<p onclick="openEditContact(${i})"><img src="./img/pen.svg" alt=""> Edit Contact</p>
</div>	
		<h4>Email</h4>
		<a href="mailto:${contactList[i]['email']}">${contactList[i]['email']}</a>
		<h4>Phone</h4>
		<a href="tel:${contactList[i]['phonenumber']}">${contactList[i]['phonenumber']}</a>
	`
}

/**
	* open add contact Window
	*/
function openAddContact() {
	addedNewContactBtn();
	startSlideAnimation();
}

function fillEditInputs(i) {
	contactName.value = contactList[i]['name'];
	contactEmail.value = contactList[i]['email']
	contactPhone.value = contactList[i]['phonenumber']
}

function openEditContact(i){
	getContactInputFields();
	fillEditInputs(i);
	addedEditContactBtn();
	startSlideAnimation();
	overwriteContactSaveOnSubmit();
}

async function saveEditContact() {
	setEditedContact();
}

function setEditedContact() {
	contactList[i]['name'] = contactName.value;
	contactList[i]['email'] = contactEmail.value;
	contactList[i]['phonenumber'] = contactPhone.value
}

function 	overwriteContactSaveOnSubmit() {
	let form = document.getElementById('inputArea')
	form.setAttribute('onsubmit', 'saveEditContact()');
}

function startSlideAnimation() {
	let addContactWindow = document.getElementById('addContactWindow');
	addContactWindow.style.animationName = "slide";
	addContactWindow.style.animationDuration = "1.5s";
	addContactWindow.style.animationFillMode = "forwards";
}

function addedNewContactBtn() {
	let contactWorkspaceBtnContainer = document.getElementById('contactWorkspaceBtnContainer');
		contactWorkspaceBtnContainer.innerHTML = /*html*/`
			<button class="btnWithImg outFocusBtn" onclick="closeAddContact()"><p>Cancel</p><p>&#10006</p></button>
   <button class="btnWithImg focusBtn" submit ><p>Create contact</p><p>&#10003</p></button>
		`
}

function addedEditContactBtn() {
	let contactWorkspaceBtnContainer = document.getElementById('contactWorkspaceBtnContainer');
		contactWorkspaceBtnContainer.innerHTML = /*html*/`
			<button class="outFocusBtn" onclick="closeAddContact()">Delete</button>
   <button class="focusBtn" submit>Save</button>
		`
}

/**
 * This function closes the input mask.
 */
function closeAddContact() {
	let addContactWindow = document.getElementById('addContactWindow');
	addContactWindow.style.animationName = "slideOut";
	addContactWindow.style.animationDuration = "1.5s";
	addContactWindow.style.animationFillMode = "backwards";

}


/**save the contactList in remot storage with token, email and password
	* 
	* @param {JsonWebKey} key 
	* @param {Json} value 
	* @returns 
	*/
	async function setContactListToRemoteStorage(key, value) {
		const payload = {key, value, token: STORAGE_TOKEN,} //old is key: key & value: value
		return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
	}

/** get the first letter from name
	* 
	* @param {JSON} contact 
	* @returns to fillContactList
	*/
function getFirstLetter(contact) {
	return contact['name'].substring(0, 1)
}

/** check if the firstLetters are the same if not he fill the h2 with first Letter
	* 
	* @param {string} firstLetterHeader firstLetter from last Name
	* @param {string} firstLetter 
	* @returns 
	*/
function fillFirstLetterHeader(firstLetterHeader, firstLetter) {
	if (firstLetterHeader !== firstLetter) {
	contactListContainer.innerHTML += /*html*/`
	<div class="oneLetterHeader">${firstLetter.toUpperCase()}</div>
	`
	firstLetterHeader = firstLetter;
	}
return firstLetterHeader
}


async function saveNewContact() {
	getContactInputFields()
	getNewContactData();
	getNewContactInitials();
	addColorNewContact();
	pushContactToContacts();
	sortContacts()
	saveContactList();
	await setContactListToRemoteStorage('contactList', contactList);
	getContactList();
	fillContactList();
	closeAddContact();
}

function getContactInputFields() {
	contactName = document.getElementById('contactName');
	contactEmail = document.getElementById('contactEmail');
	contactPhone = document.getElementById('contactPhone');
}

function getNewContactData() {
	contactJson['name'] = contactName.value;
	contactJson['email'] = contactEmail.value;
	contactJson['phonenumber'] = contactPhone.value;
}

function getNewContactInitials() {
	let nameArray = contactJson['name'].split(' ');
	let initial = '';
	nameArray.length == 1 ? initial = nameArray[0].substring(0, 2) : initial = nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1);
	contactJson['initials'] = initial.toUpperCase();
}

function addColorNewContact() {
	contactJson['color'] = getRandomColor();
}

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * bgColorArray.length);
  return bgColorArray[randomIndex];
}

function pushContactToContacts() {
	contactList.push(contactJson);
}






