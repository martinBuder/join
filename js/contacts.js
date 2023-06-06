let contacts = [
	{
		name: 'Max Mustermann',
		email: 'mustermann@web.de',
		phonenumber: '0151 1234567',
		initials:'MM',
		img: './img/person.svg',
		color: '#ff0000',
	},{
		name: 'Alfred Meier',
		email: 'alfmeier@gmx.de',
		phonenumber: '0151 1458734',
		initials:'AM',
		img: './img/person.svg',
		color: '#019623',
	},{
		name: 'John Doe',
		email: 'john.doe@example.com',
		phonenumber: '0151 12345678',
		initials: 'JD',
		img: './img/john.svg',
		color: '#0190E0' 
},
{
		name: 'Jane Smith',
		email: 'jane.smith@example.com',
		phonenumber: '0172 23456789',
		initials: 'JS',
		img: './img/jane.svg',
		color: '#EE00D6' 
},
{
		name: 'Michael Johnson',
		email: 'michael.johnson@example.com',
		phonenumber: '0160 34567890',
		initials: 'MJ',
		img: './img/michael.svg',
		color: '#02CF2F'
},
{
		name: 'Emily Davis',
		email: 'emily.davis@example.com',
		phonenumber: '0152 45678901',
		initials: 'ED',
		img: './img/emily.svg',
		color: '#FF7A00' 
},
{
		name: 'David Wilson',
		email: 'david.wilson@example.com',
		phonenumber: '0176 56789012',
		initials: 'DW',
		img: './img/david.svg',
		color: '#9327FF' 
},
{
		name: 'Sophia Martinez',
		email: 'sophia.martinez@example.com',
		phonenumber: '0155 67890123',
		initials: 'SM',
		img: './img/sophia.svg',
		color: '#69C4EB' 
},
{
		name: 'Daniel Anderson',
		email: 'daniel.anderson@example.com',
		phonenumber: '0162 78901234',
		initials: 'DA',
		img: './img/daniel.svg',
		color: '#FC71FF' 
},
{
		name: 'Olivia Taylor',
		email: 'olivia.taylor@example.com',
		phonenumber: '0157 89012345',
		initials: 'OT',
		img: './img/olivia.svg',
		color: '#AF1616'
},
{
		name: 'Ethan Brown',
		email: 'ethan.brown@example.com',
		phonenumber: '0171 01234567',
		initials: 'EB',
		img: './img/ethan.svg',
		color: '#462F8A' 
},
{
		name: 'Ava Clark',
		email: 'ava.clark@example.com',
		phonenumber: '0159 12345678',
		initials: 'AC',
		img: './img/ava.svg',
		color: '#019623' 
}
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
	contacts.sort( (a, b) => {
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	})
}

function fillContactList() {
	sortContacts();
	let contactList = document.getElementById('contactList');
	contactList.innerHTML = '';
	for (let i = 0; i < contacts.length; i++) {
		let contact = contacts[i];
		contactList.innerHTML += returnContactListHtml(contact);		
	}
}

function returnContactListHtml(contact) {
	return /*html*/`
		<div class="contactWrapper" onclick="renderFullContact(${contact})">
			<div class="intials" style="background: ${contact['color']}">${contact['initials']}</div>
			<div class="contactBox">
				<h4>${contact['name']}</h4>
				<a href="mailto:${contact['email']}" class="link">${contact['email']}</a>
			</div>
		</div>

	`
}

