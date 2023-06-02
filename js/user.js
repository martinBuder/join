const STORAGE_TOKEN = 'IOGUK15K4QR1H4E6Z8358ZBEFF667PNX3VN95C2Z';
const STORAGE_URL   = 'https://remote-storage.developerakademie.org/item';


let user = {
	name: '',
	email: '',
	img: '',
}

function getUser() {
	let userAsText = localStorage.getItem('user');
	if (userAsText) {
		user = JSON.parse(userAsText);;
	}
}

let username;
let email;
let password;



function createNewAccount() {
	getUserInputFields();
	getUserLogInInfo();
	changeUserInformation();
	setItemToRemoteStorage('user', user);
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

function getUserLogInInfo() {
	email = email.value;
	password = password.value; 
}

function changeUserInformation() {
	user['name'] = username.value;
	user['email'] = email;
}

async function setItemToRemoteStorage(key, value) {
	const payload = {key, value, email, password, token: STORAGE_TOKEN,} //old is key: key & value: value
	return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}


async function getItemFromRemoteStorage(key) {
	const url = `${STORAGE_URL}?key=${key}&email=${email}&password=${password}&token=${STORAGE_TOKEN}`;
	let res = await fetch(url).catch(errorFunction);
	userData = await res.json();
	user = JSON.parse(userData.data.value.replace(/'/g, '"'));
}

function errorFunction() {
	alert(`Something goes wrong!`)
}

async function logIn() {
	getUserInputFields();
	getUserLogInInfo();
	await getItemFromRemoteStorage('user');
	saveUser();
	goToSummary();
}

function goToSummary() {
	window.location.href = './summary.html';
}

function saveUser() {
	let userAsText = JSON.stringify(user); // 
	localStorage.setItem('user', userAsText);
}
