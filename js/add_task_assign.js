/**
 * Global Variables
 */
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
    // TEST
    // for (let i = 0; i < bgColorArray.length; i++) {
    //     let newCode = `<div class="assBadge ${bgColorArray[i]}">${i+1}</div>`;
    //     document.getElementById('assBadges').innerHTML += newCode;
    // }
    // END TEST
    // Load contacts - erfolgt später aus einer separaten Function aus
    
    // Render into the list box
    document.getElementById('newAssList').innerHTML = '';
    let imgId = 0;
    // Fill list: Selection 'You' (fixed) -> List of contacts -> Selection 'New contact' (fixed)
    document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('${user.email}', 'img-${imgId}')"><span>You</span><img src="./img/add-task/check-button-unchecked.svg" alt="" class="h21px" id="img-${imgId}"></li>`;
    fillContactsSelection();
    document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('inviteNewContact', '-1')" class="inviteNewContact"><span>Invite new contact</span><img src="./img/contacts-icon.svg" alt="" class="h21px"></li>`;
}


/**
 * Subsection of filling the list of choices. Here for the list of contacts.
 */
function fillContactsSelection() {
    imgId = 1; // 0 is reserved for 'You'
    for (let i = 0; i < contacts.length; i++) {
        let curContact = contacts[i];
        let curImage = '';
        if (selectedContacts.indexOf(curContact.email) > -1) {
            curImage = './img/add-task/check-button-checked.svg';
        } else {
            curImage = './img/add-task/check-button-unchecked.svg';
        }
        
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
}


/**
 * Toggles the highlighting whether an entry in the list has been selected or not.
 * 
 * @param {string} item - The item that was chosen.
 * @param {string} imgId - The ID of the item that was selected. Corresponds to the ID in the html file.
 */
function toggleContactSelection(item, imgId) {
    console.log(item);
    let elem = document.getElementById(imgId);
    if (elem.src.includes('unchecked')) {
        elem.src = "./img/add-task/check-button-checked.svg"
        selectedContacts.push(item);
        addInitialsBadge(getInitialsAndColor(item));
    } else {
        elem.src = "./img/add-task/check-button-unchecked.svg";
        selectedContacts = selectedContacts.filter((tmpItem) => tmpItem != item);
    }
    // console.log(selectedContacts);
}


function addInitialsBadge(srcArray) {
        let newCode = `<div class="assBadge ${srcArray[1]}">${srcArray[0]}</div>`;
        document.getElementById('assBadges').innerHTML += newCode;
}

function getInitialsAndColor(item) {
    let retArray = [];
    for (let i = 0; i < contacts.length; i++) {
        const elem = contacts[i];
        if (elem.email == item) {
            retArray.push(getInitials(elem.name));
            retArray.push(elem.color);
        }
    }
    console.log(retArray);
    return retArray;
}


function getInitials(name) {
    console.log(name);
    let nameArray = name.split(' ');
    console.log(nameArray);
    let initial = '';
    if (nameArray.length == 1) {
        initial = nameArray[0].substr(0, 2);
    } else {
        initial = nameArray[0].substr(0, 1) + nameArray[1].substr(0, 1);
    }
    return initial;
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
    toggleAssVisibility();
}


/**
 * Processes the entry of a new contact. Triggers corresponding further functions.
 * 
 * @returns Cancel if the entry does not correspond to the format for email addresses.
 */
function selectNewAssInput() {
    let elem = document.getElementById('newAssInputField');
    if (elem.value == '') return '';
    if (!(elem.value.includes('@'))) {showMsgWrongEmailAddress(true); return('');}

    let newContact = {
        name: elem.value.toLowerCase(),
        email: elem.value.toLowerCase()
    }
    contacts.some((e) => e.email == elem.value.toLowerCase()) ? '' : contacts.push(newContact);
    selectedContacts.some((e) => e == elem.value.toLowerCase()) ? '' : selectedContacts.push(elem.value.toLowerCase());
    elem.value = '';

    addContacts();
    cancelNewAssInput();
    showMsgWrongEmailAddress(false);
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