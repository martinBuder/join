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
 *
 * @returns to renderLogInWindow()
 */
function returnLogInHtml() {
 return /*html*/ `
	<h1>Log In</h1>
 <div class="blueLine"></div>
 <div class="inputContainer">
  <input type="email" id="email" placeholder="Email" class="inputField" required><img src="img/letter.svg" alt="">
 </div>
 <div class="inputContainer">
  <input type="password" id="passwordField" placeholder="Password" class="inputField" autocomplete="current-password" required><div id="passwordImg" onclick="showPassword()"></div>
 </div>
 <div class="rememberContainer">
  <div class="checkContainer">
   <input type="checkbox" name="remember" id="remember" id="remember"> <p>Remember me</p>
  </div>    
 	<a href="#" class="link" onclick="renderForgotPassword()">Forgot my password</a>
 </div>
 <div class="twiceBtnContainer">
  <button class="focusBtn" type="submit">Log in</button>
  <a href="summary.html" class="outFocusBtn guestA"><p>Guest Log in</p></a>
 </div>
	`;
}

/** delete header buttons
	* 
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
	* 
	* @returns to renderLogInHeaderButtons()
	*/
function returnHeaderBtnHtml() {
	return /*html*/`
		<button class="justTextBtn">Not a Join user?</button>
  <button class="focusBtn" onclick="renderSignUpWindow()">Sign up</button>
	`
}

/**
 * find sign up element to fill
 */
function renderSignUpWindow() {
	indexContent.innerHTML = returnSignUpHtml();
	deleteHeaderBtn();
}

/**
*
* @returns to renderSignUpWindow()
*/
function returnSignUpHtml() {
return /*html*/ `
	<img src="img/backArrow.svg" class="backArrow" onclick="renderLogInWindow()" alt="">
	<h1>Sign Up</h1>
	<div class="blueLine"></div>
	<div class="inputContainer">
		<input type="text" id="name" placeholder="Name" class="inputField" required><img src="img/person.svg" alt="">
	</div>
	<div class="inputContainer">
		<input type="email" id="email" placeholder="Email" class="inputField" required><img src="img/letter.svg" alt="" >
	</div>
	<div class="inputContainer">
  <input type="password" id="passwordField" placeholder="Password" class="inputField" autocomplete="current-password" required><div id="passwordImg" onclick="showPassword()"></div>
 </div>
	<!-- ! function sign up field evtl. wieder weg oder anpassen-->
	<div class="twiceBtnContainer">
		<button class="focusBtn" onclick="createNewAccount()" type="submit">Sign up</button>
	</div>
`;
}

/** fill forgot password part
	* 
	*/
function renderForgotPassword() {
	indexContent.innerHTML = returnForgotPasswordHtml();
	deleteHeaderBtn();
}

/**
	* 
	* @returns to renderForgotPassword()
	*/
function returnForgotPasswordHtml() {
	return /*html*/`
	<img src="img/backArrow.svg" class="backArrow" onclick="renderLogInWindow()" alt="">
	<h1>I forgot my password</h1>
	<div class="blueLine"></div>
	<p class="activityText">
		Don't worry! We will send you an email with the instructions to reset your password.
	</p>
	<div class="inputContainer">
		<input type="email" id="email" placeholder="Email" class="inputField" required><img src="img/letter.svg" alt="">
	</div>
	<div class="twiceBtnContainer">
		<button class="focusBtn" onclick="resetPassword()" type="submit">Send me the email</button>
	</div>
	`
}

/** fill reset message 
	* 
	*/
function resetPassword() {
	indexContent.innerHTML += returnSendEmailHtml();
	setTimeout(resetPasswordStepTwo, 200)
}

/** information and fill reset password area
	* 
	*/
function resetPasswordStepTwo() {
	alert('This is just to show the reset site. In the normal way the user get an email with a link. If the user click on this link the follow site will open.');
	renderResetPassword();
}

/** fill password html
	* 
	*/
function renderResetPassword() {
	indexContent.innerHTML = returnResetPasswordHtml();
}

/** reset Passwort html
	* 
	* @returns to renderResetPassword()
	*/
function returnResetPasswordHtml() {
	return /*html*/`
	<img src="img/backArrow.svg" class="backArrow" onclick="renderLogInWindow()" alt="">
	<h1>Reset your password</h1>
	<div class="blueLine"></div>
	<p class="activityText">
		Change your account password.
	</p>
	<div class="inputContainer">
		<input type="text" id="passwordField" autocomplete="new-password" placeholder="Password" class="inputField" minlength="8" required>
	</div>
	<div class="inputContainer requiredMessageContainer">
		<input type="text" id="confirmPassword" placeholder="Confirm password" class="inputField" required>
		<span id="requiredMessage" style="opacity: 0">Make sure the second password you typed matches the first.</span>
	</div>
	<div class="twiceBtnContainer">
		<button class="focusBtn" onclick="createNewPassword()" type="submit">Continue</button>
	</div>
	`
}

/** compare the passworts and show next step
	* 
	*/
function createNewPassword() {
	let newPassword = document.getElementById('passwordField');
	let confirmPassword = document.getElementById('confirmPassword');

	if(newPassword.value === confirmPassword.value) {
		indexContent.innerHTML += returnIdentPasswordHtml()
		setTimeout(renderLogInWindow, 1000);
	} else {
		let requiredMessage = document.getElementById('requiredMessage');
		requiredMessage.style="opacity: 1";
	}
}

/** message reset password
	* 
	* @returns to createNewPassword() --> if
	*/
function returnIdentPasswordHtml() {
	return /*html*/`
	<div class="messageBtnBackground">
		<button class="focusBtn messageBtn">You reset your password</button>
</div>
	`
}

/**  message a email is send
	* 
	* @returns
	*/
function returnSendEmailHtml() {
	return /*html*/`
	<div class="messageBtnBackground">
		<button class="focusBtn messageBtn"><img src="img/sendOk.svg" alt=""> An E-Mail has been sent to you.</button>
</div>
	`
}

function showPassword() {
	passwordImg = document.getElementById('passwordImg');
	passwordField = document.getElementById('passwordField');
	passwordImg.style.backgroundImage = "url('img/openEye.svg')";
	passwordImg.style.backgroundSize = "contain"
	passwordImg.setAttribute("onClick", "dontShowPassword();");
	passwordField.setAttribute("type", "text")
	passwordField.focus();

}

function dontShowPassword() {
	passwordImg.style="";
	passwordImg.setAttribute("onClick", "showPassword();");
	passwordField.setAttribute("type", "password")
	passwordField.focus();
}

function createNewAccount() {
	renderLogInWindow();
}

