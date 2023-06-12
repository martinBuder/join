let contactList = [];

let contactJson = {
	name: 'person',
	email: '',
	phonenumber: '',
	initials:'',
	color: '',
}

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
			<p onclick="editContact(${i})"><img src="./img/pen.svg" alt=""> Edit Contact</p>
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
	let addContactWindow = document.getElementById('addContactWindow');
	addContactWindow.style.animationName = "slide";
	addContactWindow.style.animationDuration = "1.5s";
	addContactWindow.style.animationFillMode = "forwards";
	
	
	// ! this function must go to save step
	saveContactList();
	setContactListToRemoteStorage('contactList', contactList)
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

function getNewContactData() {
	let contactName = document.getElementById('contactName').value;
	let contactEmail = document.getElementById('contactEmail').value;
	let contactPhone = document.getElementById('contactPhone').value;
	contactJson['name'] = contactName;
	contactJson['email'] = contactEmail;
	contactJson['phonenumber'] = contactPhone;
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






