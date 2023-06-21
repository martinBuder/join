/**
 * generate html for contactsList
	* 
 * @param {JSON} contact
 * @param {index} i
 * @returns to fillContactList()
 */
function returnContactListHtml(contact, i) {
  return /*html*/ `
		<div class="contactWrapper" onclick="renderFullContact(${i})">
			<div class="initials ${contact["color"]}">${contact["initials"]}</div>
			<div class="contactBox">
				<h3>${contact["name"]}</h3>
				<a href="#" class="link">${contact["email"]}</a> 
			</div>
		</div>
	`;
}

/**
 * generate html for fullContact
	* 
 * @param {number} i
 * @returns to renderFullContact
 */
function returnFullContactHtml(i) {
  return /*html*/ `
		<div class="fullContactHeader">
			<div class="initials background: ${contactList[i]["color"]}" id="fullContactColor">${contactList[i]["initials"]}</div>
			<div class="fullContactHeaderName">
				<h2>${contactList[i]["name"]}</h2>
				<p onclick="addTask()">+ Add Task</p>
			</div>			
		</div>
		<div class="contactSubHeaderContainer">
			<h3>Contact Information</h3>
			<p onclick="openEditContact(${i})"><img src="./img/pen.svg" alt=""> Edit Contact</p>
</div>	
		<h4>Email</h4>
		<a href="mailto:${contactList[i]["email"]}" target="_blank">${contactList[i]["email"]}</a>
		<h4>Phone</h4>
		<a href="tel:${contactList[i]["phonenumber"]}">${contactList[i]["phonenumber"]}</a>
		<button class="outFocusBtn mobilImgBtn" ><img src="./img/delete.svg" alt="" onclick="deleteContact(${i})"></button>
  <button class="focusBtn mobilImgBtn editImgBtn" onclick="openEditContact(${i})"><img src="./img/pen.svg" alt=""></button>
	`;
}
