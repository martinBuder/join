const STORAGE_TOKEN = 'IOGUK15K4QR1H4E6Z8358ZBEFF667PNX3VN95C2Z';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'
let username;
let email;
let password;

let user = {
	name: '',
	email: '',
	img: '',
}

function createNewAccount() {
	getUserInputFields();
	changeUserInformation();
	setItemToRemoteStorage('user', JSON.stringify(user));
	clearUserInformation();
	renderLogInWindow();
}

function clearUserInformation() {
	Object.keys(user).forEach(key => {
  user[key] = '';
	});
	email = '';
	password = '';
}

function getUserInputFields() {
	username = document.getElementById('name');
	email = document.getElementById('email');
	password = document.getElementById('passwordField');
}

function changeUserInformation() {
	if (username !== null) {
		user['name'] = username.value;
	} 
	user['email'] = email.value;
	email = email.value;
	password = password.value; 
}

async function setItemToRemoteStorage(key, value) {
	const payload = {key, value, email, password, token: STORAGE_TOKEN,} //old is key: key & value: value
	return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload) })
	.then(res => res.json());
}

async function getItemToRemoteStorage(key) {
	const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
	return fetch(url).then(res => res.json())
}

function logIn() {
	getUserInputFields();
	changeUserInformation();
}