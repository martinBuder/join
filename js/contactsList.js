let contactList = [];

let o = -1; // we need this in renderFullContact() --> show the background in contact list for active full contact

/**
 * sort contactList from a to z
 */
function sortContacts() {
  contactList.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
}

/** 
 * get the first letter from name
 *
 * @param {JSON} contact
 * @returns to fillContactList
 */
function getFirstLetter(contact) {
  return contact["name"].substring(0, 1);
}

/** 
 * check if the firstLetters are the same if not he fill the h2 with first Letter
 *
 * @param {string} firstLetterHeader firstLetter from last Name
 * @param {string} firstLetter
 * @returns
 */
function fillFirstLetterHeader(firstLetterHeader, firstLetter) {
  if (firstLetterHeader !== firstLetter) {
    contactListContainer.innerHTML += /*html*/ `
	<div class="oneLetterHeader">${firstLetter.toUpperCase()}</div>
	`;
    firstLetterHeader = firstLetter;
  }
  return firstLetterHeader;
}

/**
 * find first Letter of name and if no header with same letter is there render a header with this letter and then fill with the contacts with same first letter
 */
function fillContactList() {
  let firstLetter;
  let firstLetterHeader;
  changeToYou();
  sortContacts();
  let contactListContainer = document.getElementById("contactListContainer");
  contactListContainer.innerHTML = "";
  for (let i = 0; i < contactList.length; i++) {
    let contact = contactList[i];
    firstLetter = getFirstLetter(contact);
    firstLetterHeader = fillFirstLetterHeader(firstLetterHeader, firstLetter);
    contactListContainer.innerHTML += returnContactListHtml(contact, i);
  }
  changeYouToName();
}

/**
 * change you in contactList to yourself
 */
function changeToYou() {
for (let i = 0; i < contactList.length; i++) {
    if (contactList[i]['email'] == user['email']) {
      contactList[i]['name'] = 'yourself'
  }
}
}


/**
 * change yourself to your name in contactListArray
 */
function changeYouToName() {
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i]['email'] == user['email']) {
        contactList[i]['name'] = user['name']
    }
  } 
}

/**
 * change in contactList the background
 * 
 * @param {index} i
 */
function contactListBtnBackground(i) {
  let contactWrapper = document.getElementsByClassName("contactWrapper")[i];
  contactWrapper.classList.add("sameFullContact");
  if (o !== -1) {
    let oldContactWrapper =
      document.getElementsByClassName("contactWrapper")[o];
    oldContactWrapper.classList.remove("sameFullContact");
  }
  o = i;
}

/**
 * save the contactList in remot storage with token, email and password
 *
 * @param {JsonWebKey} key
 * @param {Json} value
 * @returns
 */
async function setContactListToRemoteStorage(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN }; //old is key: key & value: value
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}
