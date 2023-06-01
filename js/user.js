let token = 'IOGUK15K4QR1H4E6Z8358ZBEFF667PNX3VN95C2Z'

let user = {
	"token": token,
	"name": '',
	"email": '',
	"password": '',
	"img": '',
	"taska": [],
}

function createNewAccount() {
	getUserInputFields();
	console.log(username.value, email.value, password.value)
}

function getUserInputFields() {
	let username = document.getElementById('name');
	let email = document.getElementById('email');
	let password = document.getElementById('password');

	return {username, email, password};
}