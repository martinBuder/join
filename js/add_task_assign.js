let contacts = [
    {
        name: 'Lothar Zok',
        email: 'lothar.zok@web.de'
    },
    {
        name: 'Martin Buder',
        email: 'martinb@test.de'
    },
    {
        name: 'Gino Emmel',
        email: 'ginoe@test.com'
    }
];
let selectedContacts = [];
let maxImgId = 0;


function addContacts() {
    // Contacts laden - erfolgt später aus einer separaten Function aus
    console.log('addContacts gestartet');
    // Rendern in das Listenfeld
    document.getElementById('newAssList').innerHTML = '';
    let imgId = 0;
    // Liste Füllen: Auswahl 'You' (Fest vorgegeben) -> Liste der Kontakte -> Auswahl 'New contact' (Fest vorgegeben)
    document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('lothar.zok@web.de', 'img-${imgId}')"><span>You</span><img src="./img/add-task/check-button-unchecked.svg" alt="" class="h21px" id="img-${imgId}"></li>`;
    fillContactsSelection();
    document.getElementById('newAssList').innerHTML += `<li onclick="selectContact('inviteNewContact', '-1')" class="inviteNewContact"><span>Invite new contact</span><img src="./img/contacts-icon.svg" alt="" class="h21px"></li>`;
}

function fillContactsSelection() {
    imgId = 1; // 0 ist reserviert für 'You'
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

function selectContact(item, imgId) {
    console.log(item);  // Item soll nur die email-Adresse sein ODER 'inviteNewContact'

    if (item == 'inviteNewContact') {
        toggleAssVisibility();
    } else {
        toggleContactSelection(item, imgId);
    }
}

function toggleContactSelection(item, imgId) {
    let elem = document.getElementById(imgId);
    if (elem.src.includes('unchecked')) {
        elem.src = "./img/add-task/check-button-checked.svg"
        selectedContacts.push(item);
    } else {
        elem.src = "./img/add-task/check-button-unchecked.svg";
        selectedContacts = selectedContacts.filter((tmpItem) => tmpItem != item);
    }
    console.log(selectedContacts);
}

function toggleAssVisibility() {
    let fieldArray = ['newAssHeader', 'newAssList', 'newAssInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
    }
}

function cancelNewAssInput() {
    document.getElementById('newCatColours').style.display = 'none';
    toggleAssVisibility();
}

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

function showMsgWrongEmailAddress(toShow) {
    toShow ? document.getElementById('reqAssignedTo').classList.remove('d-none') : document.getElementById('reqAssignedTo').classList.add('d-none');
}

function clearAssignments() {
    for (let i = 0; i < maxImgId; i++) {
        document.getElementById('img-' + i).src = './img/add-task/check-button-unchecked.svg';
    }
    selectedContacts = [];
}