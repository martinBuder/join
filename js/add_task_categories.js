/**
 * Global variable categories: Contains the already assigned categories
 */
let categories = [];


/**
 * Loads the already assigned categories and adds them to the selection list
 */
async function addCategories() {
    // Load already used categories
    categories = await getArrayOfCategories();

    // Render into the list box
    document.getElementById('newCatList').innerHTML = '';  // delete entries - important when page will be refreshed
    // -- Part 1: Selection 'New category' (fixed)
    let newCode = `<li onclick="selectCategory(this)">New category</li>`;
    // -- Part 2: Loop over categories and add newCode
    for (let i = 0; i < categories.length; i++) {
        let curCat = categories[i];
        if (curCat['color'] == '') {
            newCode += `<li onclick="selectCategory(this)">${curCat['name']}</li>`
        } else {
            newCode += `<li onclick="selectCategory(this)">${curCat['name']}<img src="img/add-task/circle-${curCat['color']}.svg" alt="" class="h21px"></li>`
        }
    }
    document.getElementById('newCatList').innerHTML = newCode;
}


/**
 * Responds to the selection of a category from the list of categories
 * 
 * @param {object} item - Das ausgewählte Item aus der Liste der Kategorien
 */
function selectCategory(item) {
    if (item.textContent == 'New category') {
        activateNewCatInput();
    } else {
        let newColour = item.innerHTML.match(/<img.*?src=['"](.*?)['"]/);  // Result: img/add-task/circle-<Farbe>.svg
        selectedCategory = item.textContent;
        selectedColour = newColour ? newColour[1].replace('img/add-task/circle-', '').replace('.svg', '') : '';

        document.getElementById('newCatHeaderField').innerHTML = item.innerHTML;
        toggleSelection('category');
    }
    let elem = document.getElementById('newCatInputField');
    if (!(elem.classList.contains('d-none'))) {
        elem.focus();
    }
}


/**
 * Sets the global variable selectedColour depending on the selected colour
 * 
 * @param {string} srcColour - The selected colour for the category
 */
function selectCatColour(srcColour) {
    console.log('selected colour: ' + srcColour);
    selectedColour = srcColour;
}


/**
 * Activates the input of a new category
 */
function activateNewCatInput() {
    document.getElementById('newCatColours').style.display = 'flex';
    toggleNewCatVisibility();
}


/**
 * Deactivates the input of a new category
 */
function cancelNewCatInput() {
    document.getElementById('newCatColours').style.display = 'none';
    toggleNewCatVisibility();
}


/**
 * Changes the visibility of some elements when 'new Category' is selected.
 */
function toggleNewCatVisibility() {
    let fieldArray = ['newCatHeader', 'newCatList', 'newCatInput'];
    for (let i = 0; i < fieldArray.length; i++) {
        let element = document.getElementById(fieldArray[i]);
        element.classList.toggle('d-none');
        fieldArray[i] == 'newCatHeader' ? element.classList.toggle('selectionHeaderFlex') : '';
    }
}


/**
 * Reacts to the entry of a new category.
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


/**
 * Create a unique array of already used categories und its colors. Give that array back.
 * 
 * @returns Array with unique entries of category and categorycolor pairs
 */
async function getArrayOfCategories() {
    let tmpArray = [];

    tasksArray = await getTasksArray();
    for (let i = 0; i < tasksArray.length; i++) {
        const elem = tasksArray[i];
        let tmpJSON = {
            name: elem['category'],
            color: elem['categorycolor']
        }
        tmpArray.push(tmpJSON);
    }
    let retArray = [...new Set(tmpArray)];  // ... changes the new set into an array
    return retArray;
}