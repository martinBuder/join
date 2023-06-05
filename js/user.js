const STORAGE_TOKEN = 'IOGUK15K4QR1H4E6Z8358ZBEFF667PNX3VN95C2Z';
const STORAGE_URL   = 'https://remote-storage.developerakademie.org/item';

let users = [];

let user = {
	name: '',
	email: '',
	password: '',
	img: '',
}

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
async function createNewAccount() {
	getUserInputFields();
	getUserLogInInfo();
	changeUserInformation();
	await saveInRemoteStorage()
	clearUserInformation();
	renderLogInWindow();
}



/** get usersArray -> fill userArray --> save userArray  at remote Storage ---> clear userArray on 
	* 
	*/
async function saveInRemoteStorage() {
	await getItemFromRemoteStorage('users');
	findUsersArray();
	deleteUserfromUsers();
	pushUserToUsers();
	await	setItemToRemoteStorage('users', users);
	clearUsers();
}



/** push user to users
	* 
 */
function pushUserToUsers() {
	users.push(user);
}

/** clear user information in array and clear email and password
	* 
	*/
function clearUserInformation() {
	Object.keys(user).forEach(key => {
  user[key] = '';
	});
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
	user['password'] = password;
	// user['img'] = `${username.value.lowercase().replace(' ', '')}` + `.png`
};

/**save the user inforamtion in remot storage with token, email and password
	* 
	* @param {JsonWebKey} key 
	* @param {Json} value 
	* @returns 
	*/
async function setItemToRemoteStorage(key, value) {
	const payload = {key, value, token: STORAGE_TOKEN,} //old is key: key & value: value
	return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload) }).then(res => res.json());
}

/** this function get the user information from Remote Storage and changed it to user-Array compares with e-mail and passwort
	* 
	* @param {JsonWebKey} key 
	*/
async function getItemFromRemoteStorage(key) {
	const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
	let res = await fetch(url).catch(errorFunction);
	users = await res.json();
}

function findUsersArray() {
	if (users && users.data && users.data.value) {
			users = JSON.parse(users.data.value.replace(/'/g, '"'));
	} else {
			user = null;
	}
}

function findCorrectUser() {
	user = users.find(u => u.password === password && u.email === email);
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
	await getItemFromRemoteStorage('users');
	findUsersArray();
	findCorrectUser()
	saveUser();
	clearUsers();
	goToSummary();
}

/** find sam e user in array and delete 
	* 
	*/
function deleteUserfromUsers() {
	let index = users.findIndex(u => u.email === email);
	if (index !== -1) {
			users.splice(index, 1);
	}
}

/** clearUsers Array
	* 
	*/
function clearUsers() {
	users = [];
}

/** go to summery site
	* 
	*/
function goToSummary() {
	window.location.href = './summary.html';
}

function goToIndex() {
	window.location.href = './index.html';
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
	goToIndex();
}


/** compare the passworts and show next step
	* 
	*/
	function createNewPassword() {
		let newPassword = document.getElementById('passwordField');
		let confirmPassword = document.getElementById('confirmPassword');
		if(newPassword.value === confirmPassword.value) {
			newPasswordOk(newPassword)
		} else {
			newPasswordFalse(confirmPassword);
		}
	}
	
	/** create a new password and go to log In Window
		* password is just given to passwordUser() 
		* 
		* @param {string} newPassword 
		*/
	async function newPasswordOk(newPassword) {
		await saveNewPassword(newPassword);
		
		indexContent.innerHTML += returnIdentPasswordHtml()
		setTimeout(renderLogInWindow, 1000);
	}
	
	/** a serie of functions to change password
		* 
		* @param {string} newPassword 
		*/
	async function saveNewPassword(newPassword) {
		await getItemFromRemoteStorage('users');
		findUsersArray();
		await findPasswordUser(newPassword);
		deleteUserfromUsers();
		pushUserToUsers();
		await	setItemToRemoteStorage('users', users);
		clearUsers();
	}
	
	/** function found the userAccount who forgot the passwort and change with the new one
		* 
		* @param {string} newPassword 
		*/
	async function findPasswordUser(newPassword) {
		user = users.find(u => u.email === email);
		user['password'] = newPassword.value;
	}



