const STORAGE_TOKEN = 'IOGUK15K4QR1H4E6Z8358ZBEFF667PNX3VN95C2Z';
const STORAGE_URL   = 'https://remote-storage.developerakademie.org/item';


let user = {
	name: '',
	email: '',
	img: '',
}

let username;
let email;
let password;

/** get the user-Array from localStorage so that user is on every site 
	* 
	*/
function getUser() {
	let userAsText = localStorage.getItem('user');
	if (userAsText) {
		user = JSON.parse(userAsText);;
	}
}

/** a serie of functions to create a account
	* 
	*/
function createNewAccount() {
	getUserInputFields();
	getUserLogInInfo();
	changeUserInformation();
	setItemToRemoteStorage('user', user);
	clearUserInformation();
	renderLogInWindow();
}

/** clear user information in array and clear email and password
	* 
	*/
function clearUserInformation() {
	Object.keys(user).forEach(key => {
  user[key] = '';
	});
	email = '';
	password = '';
}

/** get the inputfields 
	* 
	*/
function getUserInputFields() {
	username = document.getElementById('name');
	email = document.getElementById('email');
	password = document.getElementById('passwordField');
}

/** definated email and password for control
	* 
	*/
function getUserLogInInfo() {
	email = email.value;
	password = password.value; 
}

/** change the information in user Array
	* 
	*/
function changeUserInformation() {
	user['name'] = username.value;
	user['email'] = email;
}

/**save the user inforamtion in remot storage with token, email and password
	* 
	* @param {JsonWebKey} key 
	* @param {Json} value 
	* @returns 
	*/
async function setItemToRemoteStorage(key, value) {
	const payload = {key, value, email, password, token: STORAGE_TOKEN,} //old is key: key & value: value
	return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/** this function get the user information from Remote Storage and changed it to user-Array compares with e-mail and passwort
	* 
	* @param {JsonWebKey} key 
	*/
async function getItemFromRemoteStorage(key) {
	const url = `${STORAGE_URL}?key=${key}&email=${email}&password=${password}&token=${STORAGE_TOKEN}`;
	let res = await fetch(url).catch(errorFunction);
	userData = await res.json();
	user = JSON.parse(userData.data.value.replace(/'/g, '"'));
}

/** tell that something goes wrong by fetch
	* 
	*/
function errorFunction() {
	alert(`Something goes wrong!`)
}

/** this are the functions row for log in fill input to summery site
	* 
	*/
async function logIn() {
	getUserInputFields();
	getUserLogInInfo();
	await getItemFromRemoteStorage('user');
	saveUser();
	goToSummary();
}

/** go to summery site
	* 
	*/
function goToSummary() {
	window.location.href = './summary.html';
}

/** save user array in localstorage so the user is on every site (because reload)
	* 
	*/
function saveUser() {
	let userAsText = JSON.stringify(user); // 
	localStorage.setItem('user', userAsText);
}

/** series of functions to log out the user
	* 
	*/
function logOut() {
	clearUserInformation();
	saveUser();
	reloadSite();
}

/** reload the site
	* 
	*/
function reloadSite() {
	location.reload();
}
