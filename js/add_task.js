let categories = [
    {
        name: 'Sales',
        img: 'img/add-task/circle-lightviolet.svg'
    },
    {
        name: 'Backoffice',
        img: 'img/add-task/circle-turqoise.svg'
    },
    {
        name: 'Testkategorie',
        img: ''
    }
];

let selectedColour = '';
let selectedCategory = '';

function initAddTask() {
    addCategories();
}

function addCategories() {
    // Categories laden - erfolgt später aus einer separaten Function aus

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
            newCode += `<li onclick="selectCategory(this)">${curCat['name']}<img src="${curCat['img']}" alt="" class="h21px"></li>`
        }
    }
    document.getElementById('newCatList').innerHTML = newCode;
}



function toggleSelection() {
    let test = document.getElementById('newCatList');
    test.classList.toggle('d-none');
}







function selectCategory(item) {
    console.log('selected category: ' + item.innerHTML);
    if (item.textContent == 'New category') {
        let fieldArray = ['newCatHeader', 'newCatList', 'newCatInput'];
        for (let i = 0; i < fieldArray.length; i++) {
            let element = document.getElementById(fieldArray[i]);
            element.classList.toggle('d-none');
        }
    } else {
        let newCat = item.textContent;
        let newColour = item.innerHTML.match(/<img.*?src=['"](.*?)['"]/);
        console.log('newCat: ' + newCat);
        newColour ? console.log('newColour: ' + newColour[1]) : console.log('newColour: ' + newColour);
    }
    let elem = document.getElementById('newCatInputField');
    if (!(elem.classList.contains('d-none'))) {
        elem.focus();
    }
}

function selectCatColour(srcColour) {
    console.log('selected colour: ' + srcColour);
    selectedColour = 'img/add-task/circle-' + srcColour + '.svg';
}

function cancelNewCatInput() {
    let fieldArray = ['newCatHeader', 'newCatList', 'newCatInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
    }
}

function selectNewCatInput() {
    let elem = document.getElementById('newCatInputField');
    console.log(elem.value);
    let newCat = {
        name: elem.value,
        img: selectedColour
    }
    selectedCategory = elem.value;
    categories.push(newCat);
    elem.value = '';
    document.getElementById('newCatHeaderField').innerHTML = `${newCat['name']}<img src="${newCat['img']}" alt="" class="h21px">`;
    addCategories();
    cancelNewCatInput();
    toggleSelection();
}
