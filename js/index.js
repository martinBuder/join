let indexContent;
let indexHeaderBtn;
let passwordImg;
let passwordField;

/**
 * find element to fill
 */
function renderLogInWindow() {
  indexContent = document.getElementById("indexContent");
  indexContent.innerHTML = returnLogInHtml();
		renderLogInHeaderButtons();
}

/** 
	* delete header buttons
	* @param {HTMLElement} indexHeaderBtn
	*/
function deleteHeaderBtn() {
	indexHeaderBtn.innerHTML = ''; 
}

/** fill header buttons
	* 
	*/
function renderLogInHeaderButtons() {
	indexHeaderBtn = document.getElementById('indexHeaderBtn');
	indexHeaderBtn.innerHTML = returnHeaderBtnHtml();
}

/**
 * find sign up element to fill
 */
function renderSignUpWindow() {
	indexContent.innerHTML = returnSignUpHtml();
	deleteHeaderBtn();
}

/** 
	* fill forgot password part
	*/
function renderForgotPassword() {
	indexContent.innerHTML = returnForgotPasswordHtml();
	deleteHeaderBtn();
}

/** 
	* fill reset message 
	*/
async function resetPassword() {
	email = document.getElementById('email').value;
	await checkUser();
	noUserFound();
}

/** 
	* information and fill reset password area
	*/
function resetPasswordStepTwo() {
	alert('This is just to show the reset site. In the normal way the user get an email with a link. If the user click on this link the follow site will open.');
	renderResetPassword();
}

/** 
	* fill password html
	*/
function renderResetPassword() {
	indexContent.innerHTML = returnResetPasswordHtml();
}

/**
	* render new password isn't ok content
	* @param {HTMLInputElement} confirmPassword 
	*/
function newPasswordFalse(confirmPassword){
	let requiredMessage = document.getElementById('requiredMessage');
		requiredMessage.style="opacity: 1";
		confirmPassword.parentElement.style="border-color: red"
}

/** 
	* make that you see your password while writing
	*/
function showPassword() {
	passwordImg = document.getElementById('passwordImg');
	passwordField = document.getElementById('passwordField');
	passwordImg.style.backgroundImage = "url('img/openEye.svg')";
	passwordImg.style.backgroundSize = "contain"
	passwordImg.setAttribute("onClick", "dontShowPassword();");
	passwordField.setAttribute("type", "text")
	passwordField.focus();
}

/** 
	* make that you don't see your password while writing
	*/
function dontShowPassword() {
	passwordImg.style="";
	passwordImg.setAttribute("onClick", "showPassword();");
	passwordField.setAttribute("type", "password")
	passwordField.focus();
}

/** 
	* render the Log In window
	*/
function createNewAccount() {
	renderLogInWindow();
}



