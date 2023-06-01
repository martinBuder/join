function addContacts() {
        // Contacts laden - erfolgt später aus einer separaten Function aus
        console.log('addContacts gestartet');
        // Rendern in das Listenfeld
        document.getElementById('newAssList').innerHTML = '';
        // -- Teil 1: Auswahl 'You' (Fest vorgegeben)
        let newCode = `<li onclick="selectContact(this)"><span>You</span><img src="./img/add-task/check-button-unchecked.svg" alt="" class="h21px"></li>`;
        // -- Teil 2: Schleife über Contacts und ergänzen von newCode
        for (let i = 0; i < categories.length; i++) {
            let curCat = categories[i];
            if (curCat['img'] == '') {
                newCode += `<li onclick="selectCategory(this)">${curCat['name']}</li>`
            } else {
                newCode += `<li onclick="selectCategory(this)">${curCat['name']}<img src="./img/add-task/circle-${curCat['img']}.svg" alt="" class="h21px"></li>`
            }
        }
        // -- Teil 3: Auswahl 'New contact' (Fest vorgegeben)
        newCode += `<li onclick="selectContact(this)" class="inviteNewContact"><span>Invite new contact</span><img src="./img/contacts-icon.svg" alt="" class="h21px"></li>`;
        document.getElementById('newAssList').innerHTML = newCode;
}