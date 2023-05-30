let indexContent;
let indexHeaderBtn;

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
 * @returns html
 */
function returnLogInHtml() {
 return /*html*/ `
	<h1>Log In</h1>
 <div class="blueLine"></div>
 <div class="inputContainer">
  <input type="email" id="email" placeholder="Email" class="inputField"><img src="img/letter.svg" alt="">
 </div>
 <div class="inputContainer">
  <input type="text" id="password" placeholder="Password" class="inputField"><img src="img/lock.svg" alt="">
 </div>
 <div class="rememberContainer">
  <div class="checkContainer">
   <input type="checkbox" name="remember" id="remember" id="remember"> <p>Remember me</p>
  </div>    
 	<a href="#" class="link" onclick="renderForgotPassword()">Forgot my password</a>
 </div>
 <div class="twiceBtnContainer">
  <button class="focusBtn">Log in</button>
  <a href="summary.html"><button class="outFocusBtn">Guest Log in</button></a>
 </div>
	`;
}

function deleteHeaderBtn() {
	indexHeaderBtn.innerHTML = ''; 
}

function renderLogInHeaderButtons() {
	indexHeaderBtn = document.getElementById('indexHeaderBtn');
	indexHeaderBtn.innerHTML = returnHeaderBtnHtml();
}

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
* @returns sign up html
*/
function returnSignUpHtml() {
return /*html*/ `
	<img src="img/backArrow.svg" class="backArrow" onclick="renderLogInWindow()" alt="">
	<h1>Sign Up</h1>
	<div class="blueLine"></div>
	<div class="inputContainer">
		<input type="text" id="name" placeholder="Name" class="inputField"><img src="img/person.svg" alt="">
	</div>
	<div class="inputContainer">
		<input type="email" id="email" placeholder="Email" class="inputField"><img src="img/letter.svg" alt="">
	</div>
	<div class="inputContainer">
		<input type="text" id="password" placeholder="Password" class="inputField"><img src="img/lock.svg" alt="">
	</div>
	<div class="twiceBtnContainer">
		<button class="focusBtn">Sign up</button>
	</div>
`;
}

function renderForgotPassword() {
	indexContent.innerHTML = returnForgotPasswordHtml();
	deleteHeaderBtn();
}

function returnForgotPasswordHtml() {
	return /*html*/`
	<img src="img/backArrow.svg" class="backArrow" onclick="renderLogInWindow()" alt="">
	<h1>I forgot my password</h1>
	<div class="blueLine"></div>
	<p class="activityText">
		Don't worry! We will send you an email with the instructions to reset your password.
	</p>
	<div class="inputContainer">
		<input type="email" id="email" placeholder="Email" class="inputField"><img src="img/letter.svg" alt="">
	</div>
	<div class="twiceBtnContainer">
		<button class="focusBtn">Send me the email</button>
	</div>
	`
}
