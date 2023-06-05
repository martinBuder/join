/**
 * Globale Variable categories: Enthält die bereits vergebenen Kategorien
 */
let categories = [
    {
        name: 'Sales',
        img: 'lightviolet'
    },
    {
        name: 'Backoffice',
        img: 'turqoise'
    },
    {
        name: 'Testkategorie',
        img: ''
    }
];


/**
 * Lädt die bereits vergebenen Kategorien und fügt diese der Auswahlliste hinzu
 * 
 * NOCH NICHT FERTIG - LADEN DER KATEGORIEN FEHLT NOCH
 */
async function addCategories() {
    // Categories laden - erfolgt später aus einer separaten Function aus
    // console.log('addCategories gestartet');

    // TODO : Kategorien laden


    // Rendern in das Listenfeld
    document.getElementById('newCatList').innerHTML = '';
    // -- Teil 1: Auswahl 'New category' (Fest vorgegeben)
    let newCode = `<li onclick="selectCategory(this)">New category</li>`;
    // -- Teil 2: Schleife über categories und ergänzen von newCode
    for (let i = 0; i < categories.length; i++) {
        let curCat = categories[i];
        if (curCat['img'] == '') {
            newCode += `<li onclick="selectCategory(this)">${curCat['name']}</li>`
        } else {
            newCode += `<li onclick="selectCategory(this)">${curCat['name']}<img src="img/add-task/circle-${curCat['img']}.svg" alt="" class="h21px"></li>`
        }
    }
    document.getElementById('newCatList').innerHTML = newCode;
}


/**
 * Reagiert auf die Auswahl einer Kategorie aus der Liste der Kategorien und reagierte je nach Auswahl
 * 
 * @param {object} item - Das ausgewählte Item aus der Liste der Kategorien
 */
function selectCategory(item) {
    // console.log('selected category: ' + item.innerHTML);
    if (item.textContent == 'New category') {
        activateNewCatInput();
    } else {
        let newCat = item.textContent;
        let newColour = item.innerHTML.match(/<img.*?src=['"](.*?)['"]/);  // Resultat: img/add-task/circle-<Farbe>.svg
        // console.log(n_newColour);
        selectedCategory = newCat;
        selectedColour = newColour ? newColour[1].replace('img/add-task/circle-', '').replace('.svg', '') : '';
        // console.log('newCat: ' + newCat);
        // newColour ? console.log('newColour: ' + newColour[1].replace('img/add-task/circle-', '').replace('.svg', '')) : console.log('newColour: ' + newColour);

        document.getElementById('newCatHeaderField').innerHTML = item.innerHTML;
        toggleSelection('category');
    }
    let elem = document.getElementById('newCatInputField');
    if (!(elem.classList.contains('d-none'))) {
        elem.focus();
    }
}


/**
 * Setzt die globale Variable selectedColour je nach ausgewählter Farbe
 * 
 * @param {string} srcColour - Die ausgewählte Farbe zur Kategorie
 */
function selectCatColour(srcColour) {
    console.log('selected colour: ' + srcColour);
    selectedColour = srcColour;
}


/**
 * Aktiviert die Eingabe einer neuen Kategorie
 */
function activateNewCatInput() {
    document.getElementById('newCatColours').style.display = 'flex';
    toggleNewCatVisibility();
}


/**
 * Deaktiviert die Eingabe einer neuen Kategorie
 */
function cancelNewCatInput() {
    document.getElementById('newCatColours').style.display = 'none';
    toggleNewCatVisibility();
}


/**
 * Wechselt die Sichtbarkeit einiger Elemente, wenn 'new Category' ausgewählt wurde
 */
function toggleNewCatVisibility() {
    let fieldArray = ['newCatHeader', 'newCatList', 'newCatInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
    }
}


/**
 * Reagiert auf die Eingabe einer neuen Kategorie
 */
function selectNewCatInput() {
    let elem = document.getElementById('newCatInputField');
    console.log(elem.value);
    if (elem.value == '') return '';
    let newCat = {
        name: elem.value,
        img: selectedColour
    }
    categories.push(newCat);
    selectedCategory = elem.value;
    elem.value = '';
    document.getElementById('newCatHeaderField').innerHTML = `${newCat['name']}<img src="img/add-task/circle-${newCat['img']}.svg" alt="" class="h21px">`;
    addCategories();
    cancelNewCatInput();
    toggleSelection('category');
}