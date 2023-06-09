let contactList = [
	{
			name: 'Max Mustermann',
			email: 'mustermann@web.de',
			phonenumber: '0151 1234567',
			initials: 'MM',
			img: './img/person.svg',
			color: 'bgColorFF0000',
	},
	{
			name: 'Alfred Meier',
			email: 'alfmeier@gmx.de',
			phonenumber: '0151 1458734',
			initials: 'AM',
			img: './img/person.svg',
			color: 'bgColor019623',
	},
	{
			name: 'John Doe',
			email: 'john.doe@example.com',
			phonenumber: '0151 12345678',
			initials: 'JD',
			img: './img/john.svg',
			color: 'bgColor0190E0',
	},
	{
			name: 'Jane Smith',
			email: 'jane.smith@example.com',
			phonenumber: '0172 23456789',
			initials: 'JS',
			img: './img/jane.svg',
			color: 'bgColorEE00D6',
	},
	{
			name: 'Michael Johnson',
			email: 'michael.johnson@example.com',
			phonenumber: '0160 34567890',
			initials: 'MJ',
			img: './img/michael.svg',
			color: 'bgColor02CF2F',
	},
	{
			name: 'Emily Davis',
			email: 'emily.davis@example.com',
			phonenumber: '0152 45678901',
			initials: 'ED',
			img: './img/emily.svg',
			color: 'bgColorFF7A00',
	},
	{
			name: 'David Wilson',
			email: 'david.wilson@example.com',
			phonenumber: '0176 56789012',
			initials: 'DW',
			img: './img/david.svg',
			color: 'bgColor9327FF',
	},
	{
			name: 'Sophia Martinez',
			email: 'sophia.martinez@example.com',
			phonenumber: '0155 67890123',
			initials: 'SM',
			img: './img/sophia.svg',
			color: 'bgColor69C4EB',
	},
	{
			name: 'Daniel Anderson',
			email: 'daniel.anderson@example.com',
			phonenumber: '0162 78901234',
			initials: 'DA',
			img: './img/daniel.svg',
			color: 'bgColorFC71FF',
	},
	{
			name: 'Olivia Taylor',
			email: 'olivia.taylor@example.com',
			phonenumber: '0157 89012345',
			initials: 'OT',
			img: './img/olivia.svg',
			color: 'bgColorAF1616',
	},
	{
			name: 'Ethan Brown',
			email: 'ethan.brown@example.com',
			phonenumber: '0171 01234567',
			initials: 'EB',
			img: './img/ethan.svg',
			color: 'bgColor462F8A',
	},
	{
			name: 'Ava Clark',
			email: 'ava.clark@example.com',
			phonenumber: '0159 12345678',
			initials: 'AC',
			img: './img/ava.svg',
			color: 'bgColor019623',
	},
];

let contactJson = {
	name: 'person',
	email: '',
	phonenumber: '',
	initials:'',
	img: './img/person.svg',
	color: '',
}

function sortContacts() {
	contactList.sort( (a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	})
}

function fillContactList() {
	sortContacts();
	let contactListContainer = document.getElementById('contactListContainer');
	contactListContainer.innerHTML = '';
	for (let i = 0; i < contactList.length; i++) {
		let contact = contactList[i];
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








