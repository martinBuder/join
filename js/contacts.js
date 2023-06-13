let contactList = [];

let contactJson = {
	name: '',
	email: '',
	phonenumber: '',
	initials:'',
	color: '',
}

let contactName;
let contactEmail;
let contactPhone;
let nameArray;

/**
	* sort contactList from a to z
	*/
function sortContacts() {
	contactList.sort( (a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	})
}

/**
	* wait that init is ready and just then start fillContactList
	*/
async function initContact() {
	  await init();
			fillContactList();
	};

	/**
		* find first Letter of name and if no header with same letter is there render a header with this letter and then fill with the contacts with same first letter
		*/
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

/**
	* 
	* @param {JSON} contact 
	* @param {index} i 
	* @returns to fillContactList()
	*/
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

/**
	* render the full Contact part
	* @param {index} i 
	*/
function renderFullContact(i) {
	let showFullContact = document.getElementById('showFullContact');
	showFullContact.innerHTML = returnFullContactHtml(i);
}

/**
	* 
	* @param {number} i 
	* @returns to renderFullContact
	*/
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

/**
	* fill inputfields with contactList Infos
	* @param {index} i 
	*/
function fillEditInputs(i) {
	contactName.value = contactList[i]['name'];
	contactEmail.value = contactList[i]['email'];
	contactPhone.value = contactList[i]['phonenumber'];
}

/**
	* design the circle in contact working window 
	* @param {index} i 
	*/
function createCircle(i) {
	let circle = document.getElementById('circle');
	circle.innerHTML = contactList[i]['initials'];
	circle.classList.remove('bgLightGrey');
	circle.classList.add(contactList[i]['color'])
	circle.setAttribute('onclick', `changeContactColor(${i})`);
}

/**
	* open the contact colors for changing
	* @param {index} i 
	*/
function changeContactColor(i) {
	let contactColorWrapper = document.getElementsByClassName('contactColorWrapper')[0];
	contactColorWrapper.innerHTML = ``;
	contactColorWrapper.innerHTML = `<p>Joice a color...</p>`;
	for (let j = 0; j < bgColorArray.length; j++) {
		contactColorWrapper.innerHTML += /*html*/`
			<div class="contactColorContainer ${bgColorArray[j]}" onclick="choiceColor(${i}, ${j})"></div>
		`		
	}
}

/**
	* serie of function to change the color
	* @param {index} i 
	* @param {index} j 
	*/
async function choiceColor(i, j) {
	chosseNewColor(i, j)
	await setContactListToRemoteStorage('contactList', contactList);
	saveContactList();
	getContactList();
	fillContactList();
}

/**
	* choose a new color for contact
	* @param {index} i 
	* @param {index} j 
	*/
function chosseNewColor(i, j) {
	let contactColorWrapper = document.getElementsByClassName('contactColorWrapper')[0];
	let circle = document.getElementById('circle');
	circle.classList.remove(contactList[i]['color']);
	contactList[i]['color'] = bgColorArray[j];
	circle.classList.add(contactList[i]['color']);
	contactColorWrapper.innerHTML = ``;
}

/**
	* serie of functions to open the contact edit window
	* @param {index} i 
	*/
function openEditContact(i) {
	getContactInputFields();
	fillEditInputs(i);
	createCircle(i);
	addedEditContactBtn(i);
	startSlideAnimation();
	overwriteContactSaveOnSubmit(i);
}

/**
	* serie of function to save the edited contact
	* @param {index} i 
	*/
async function saveEditContact(i) {
	setEditedContact(i);
	getContactInitials(i);
	sortContacts()
	saveContactList();
	await setContactListToRemoteStorage('contactList', contactList);
	getContactList();
	fillContactList();
	closeAddContact();
}

/**
	* serie of function to delete contact
	* @param {index} i 
	*/
async function deleteContact(i) {
	contactList.splice(i, 1);
	saveContactList();
	await setContactListToRemoteStorage('contactList', contactList);
	getContactList();
	fillContactList();
	closeAddContact();
}

/**
	* fill contactJson with edited information
	* @param {index} i 
	*/
function setEditedContact(i) {
	contactList[i]['name'] = contactName.value;
	contactList[i]['email'] = contactEmail.value;
	contactList[i]['phonenumber'] = contactPhone.value
}

/**
	* change form function to new function
	* @param {index} i 
	*/
function overwriteContactSaveOnSubmit(i) {
	let form = document.getElementById('inputArea')
	form.setAttribute('onsubmit', `saveEditContact(${i})`);
}

/**
	* contact Window get the animatioon to slide in 
	*/
function startSlideAnimation() {
	let addContactWindow = document.getElementById('addContactWindow');
	addContactWindow.style.animationName = "slide";
	addContactWindow.style.animationDuration = "1.5s";
	addContactWindow.style.animationFillMode = "forwards";
}

/**
	* render the btn for new contact in contact window
	*/
function addedNewContactBtn() {
	let contactWorkspaceBtnContainer = document.getElementById('contactWorkspaceBtnContainer');
		contactWorkspaceBtnContainer.innerHTML = /*html*/`
			<button class="btnWithImg outFocusBtn" onclick="closeAddContact()"><p>Cancel</p><p>&#10006</p></button>
   <button class="btnWithImg focusBtn" submit ><p>Create contact</p><p>&#10003</p></button>
		`
}

/**
	* render the btn for edit contact in contact window
	* @param {index} i 
	*/
function addedEditContactBtn(i) {
	let contactWorkspaceBtnContainer = document.getElementById('contactWorkspaceBtnContainer');
		contactWorkspaceBtnContainer.innerHTML = /*html*/`
			<button class="outFocusBtn" onclick="deleteContact(${i})">Delete</button>
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

/**
	* serie of function to save the new contact
	*/
async function saveNewContact() {
	getContactInputFields()
	getNewContactData();
	getContactInitials();
	addColorNewContact();
	pushContactToContacts();
	sortContacts()
	saveContactList();
	await setContactListToRemoteStorage('contactList', contactList);
	getContactList();
	fillContactList();
	closeAddContact();
}

/**
	* get the inputFields from work on contact window
	*/
function getContactInputFields() {
	contactName = document.getElementById('contactName');
	contactEmail = document.getElementById('contactEmail');
	contactPhone = document.getElementById('contactPhone');
}

/**
	* contactJson get the information --> before push in contactList
	*/
function getNewContactData() {
	contactJson['name'] = contactName.value;
	contactJson['email'] = contactEmail.value;
	contactJson['phonenumber'] = contactPhone.value;
}

/**
	* get the initials of name
	* if i == definated we came from edit contact
	* @param {index} i 
	*/
function getContactInitials(i) {
	if (i !== undefined) {
		nameArray = contactList[i]['name'].split(' ');
	}else{
		nameArray = 	contactJson['name'].split(' ');
	}
	let initial = '';
	nameArray.length == 1 ? initial = nameArray[0].substring(0, 2) : initial = nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1);
	if (i !== undefined) {
		contactList[i]['initials'] = initial.toUpperCase();
	}else{
 	contactJson['initials'] = initial.toUpperCase();
	}
}

/**
	* set a color for new contact
	*/
function addColorNewContact() {
	contactJson['color'] = getRandomColor();
}

/**
	* choose a random color for create a new contact
	*/
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * bgColorArray.length);
  return bgColorArray[randomIndex];
}

/**
	* push contact to new contactList
	*/
function pushContactToContacts() {
	contactList.push(contactJson);
}






