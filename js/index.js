let indexContent;

/**
 * find element to fill
 */
function renderLogInWindow() {
  indexContent = document.getElementById("indexContent");
  indexContent.innerHTML = returnLogInHtml();
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
 	<a href="#" class="link">Forgot my password</a>
 </div>
 <div class="twiceBtnContainer">
  <button class="focusBtn">Log in</button>
  <button class="outFocusBtn">Guest Log in</button>
 </div>
	`;
}

/**
 * find element to fill
 */
function renderSignUpWindow() {
	indexContent = document.getElementById("indexContent");
	indexContent.innerHTML = returnSignUpHtml();
}

/**
*
* @returns html
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