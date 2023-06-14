/**
 * Global Variables
 */
// contacts is deprecated - will be deleted later
let contacts = [
    {
        name: 'Lothar Zok',
        email: 'lothar.zok@web.de',
        color: 'bgColor019623'
    },
    {
        name: 'Martin Buder',
        email: 'martinb@test.de',
        color: 'bgColor0190E0'
    },
    {
        name: 'Gino Emmel',
        email: 'ginoe@test.com',
        color: 'bgColorAF1616'
    }
];
let selectedContacts = [];
let maxImgId = 0;


/**
 * Fills the list of choices of the 'Assign To' field.
 */
function addContacts() {
    // Render into the list box
    document.getElementById('newAssList').innerHTML = '';
    let imgId = 0;
    // Fill list: Selection 'You' (fixed) -> List of contacts -> Selection 'New contact' (fixed)
    let curImage = (selectedContacts.indexOf(user.email.toLowerCase()) > -1) ? 'checked' : 'unchecked';
    document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('${user.email}', 'img-${imgId}')"><span>You</span><img src="./img/add-task/check-button-${curImage}.svg" alt="" class="h21px" id="img-${imgId}"></li>`;
    fillContactsSelection();
    document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('inviteNewContact', '-1')" class="inviteNewContact"><span>Invite new contact</span><img src="./img/contacts-icon.svg" alt="" class="h21px"></li>`;
}


/**
 * Subsection of filling the list of choices. Here for the list of contacts.
*/
function fillContactsSelection() {
    // Global variable contactList will be loaded on log in so I can already use it
    imgId = 1; // 0 is reserved for 'You'
    for (let i = 0; i < contactList.length; i++) {
        let curContact = contactList[i];
        let curImage = (selectedContacts.indexOf(curContact.email.toLowerCase()) > -1) ? './img/add-task/check-button-checked.svg' : './img/add-task/check-button-unchecked.svg';
        
        if (curContact['email'].toLowerCase() != user['email'].toLowerCase()) {
            document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('${curContact['email']}', 'img-${imgId}')">${curContact['name']}<img src="${curImage}" alt="" class="h21px" id="img-${imgId}"></li>`
            imgId++;
            maxImgId = imgId;
        }
    }
}


/**
 * Reacts to the selection of an entry in the list of contacts. Triggers corresponding further functions.
 * 
 * @param {string} item - The item that was chosen
 * @param {string} imgId - The ID of the item that was selected. Corresponds to the ID in the html file.
 */
function selectContact(item, imgId) {
    // Item should only be the email address OR 'inviteNewContact'.
    if (item == 'inviteNewContact') {
        toggleAssVisibility();
    } else {
        toggleContactSelection(item, imgId);
    }
    showInitialBadges();
}


/**
 * Toggles the highlighting whether an entry in the list has been selected or not.
 * 
 * @param {string} item - The item that was chosen.
 * @param {string} imgId - The ID of the item that was selected. Corresponds to the ID in the html file.
 */
function toggleContactSelection(item, imgId) {
    let elem = document.getElementById(imgId);
    if (elem.src.includes('unchecked')) {
        elem.src = "./img/add-task/check-button-checked.svg"
        selectedContacts.push(item);
    } else {
        elem.src = "./img/add-task/check-button-unchecked.svg";
        selectedContacts = selectedContacts.filter((tmpItem) => tmpItem != item);
    }
}


/**
 * Shows the coloured badges with initials in it for every selected contact.
 */
function showInitialBadges() {
    document.getElementById('assBadges').innerHTML = '';
    let elemArray = document.getElementById('newAssList').childNodes;
    for (let i = 0; i < elemArray.length; i++) {
        let elem = elemArray[i];
        if (elem.innerHTML.includes('-checked.svg')) {
            let curName = elem.innerText;
            curName == 'You' ? curName = user.name : '';
            addInitialsBadge(getInitialsAndColor(curName));
        }
    }
}


/**
 * Adds the code for a badge with initials to the according div.
 * 
 * @param {array} srcArray - An array of two string: The initals of a contact and its assigned colour
 */
function addInitialsBadge(srcArray) {
        let newCode = `<div class="assBadge ${srcArray[1]}">${srcArray[0]}</div>`;
        document.getElementById('assBadges').innerHTML += newCode;
}


/**
 * Returns the initials (via function getInitials) and colours for a given contact.
 * 
 * @param {string} name - The name of the contact whose initials and colours should be returned.
 * @returns An array consisting of the initials and the assigned colour of a contact.
 */
function getInitialsAndColor(name) {
    let found = false;
    let retArray = [];
    for (let i = 0; i < contactList.length; i++) {
        const elem = contactList[i];
        if (elem.name == name) {
            retArray.push(getInitials(elem.name));
            retArray.push(elem.color);
            found = true;
        }
    }
    if (!(found)) {  // In case the name is not in the list of contacts
        retArray.push(getInitials(name));
        retArray.push('bgColorGrey');
    }
    return retArray;
}


/**
 * Returns the initials of a given name. If the name, hence the parameter, is only one word, the first two letters are taken for the initials.
 * 
 * @param {string} name - The name whose initials should be returned
 * @returns A string with the initials for a name in uppercase letters
 */
function getInitials(name) {
    let nameArray = name.split(' ');
    let initial = '';
    nameArray.length == 1 ? initial = nameArray[0].substring(0, 2) : initial = nameArray[0].substring(0, 1) + nameArray[1].substring(0, 1);
    return initial.toUpperCase();
}


/**
 * Changes the visibility when the selection 'inviteNewContact' is chosen.
 */
function toggleAssVisibility() {
    let fieldArray = ['newAssHeader', 'newAssList', 'newAssInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
        fieldArray[i] == 'newAssHeader' ? element.classList.toggle('selectionHeaderFlex') : '';
    }
}


/**
 * Cancellation of the entry of a new contact.
 */
function cancelNewAssInput() {
    showMsgWrongEmailAddress(false);
    toggleAssVisibility();
}


/**
 * Processes the entry of a new contact. Triggers corresponding further functions.
 * 
 * @returns Cancel if the entry does not correspond to the format for email addresses or if no value was given.
 */
function selectNewAssInput() {
    let elem = document.getElementById('newAssInputField');
    if (elem.value == '') return '';
    if (!(elem.value.includes('@'))) {showMsgWrongEmailAddress(true); return('');}

    let newContact = {
        name: elem.value.toLowerCase(),
        email: elem.value.toLowerCase(),
        color: getColor()
    }
    contactList.some((e) => e.email == elem.value.toLowerCase()) ? '' : contactList.push(newContact);
    selectedContacts.some((e) => e == elem.value.toLowerCase()) ? '' : selectedContacts.push(elem.value.toLowerCase());
    elem.value = '';

    addContacts();
    cancelNewAssInput();
    showMsgWrongEmailAddress(false);
    showInitialBadges();
}


/**
 * Shows or hides the error message for an incorrect email address.
 * 
 * @param {boolean} toShow - true or false
 */
function showMsgWrongEmailAddress(toShow) {
    toShow ? document.getElementById('reqAssignedTo').classList.remove('d-none') : document.getElementById('reqAssignedTo').classList.add('d-none');
}


/**
 * Deselects all entries in the list of contacts. Used when deleting all information previously entered in the form.
 */
function clearAssignments() {
    for (let i = 0; i < maxImgId; i++) {
        document.getElementById('img-' + i).src = './img/add-task/check-button-unchecked.svg';
    }
    selectedContacts = [];
}


/**
 * Selects a random color from the array of colors, filtered for those who are not already used.
 * 
 * @returns The new color (e.g. 'bgColor0190E0') that can be used as class for a background color
 */
function getColor() {
    // Filter out already used colors
    let newArray = bgColorArray;
    for (let i = 0; i < contactList.length; i++) {
        let curColor = contactList[i].color;
        newArray = newArray.filter(e => e !== curColor);
    }
    newArray.length == 0 ? newArray = bgColorArray : ''; // If all colors are already in use, select from all
    // Now select a random color from those who are not used
    let newColor = newArray[Math.floor(Math.random() * newArray.length)];
    return newColor;
}