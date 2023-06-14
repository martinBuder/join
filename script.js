/**
 * Global variables
 */
let display = "none";
let cursor = "pointer";


/**
 * Colour codes
 */
let bgColorArray = ['bgColor0190E0', 'bgColorEE00D6', 'bgColor02CF2F', 'bgColorFF7A00', 'bgColor9327FF', 'bgColor69C4EB', 'bgColorFC71FF', 'bgColorAF1616', 'bgColor462F8A', 'bgColor019623', 'bgColorFF0000', 'bgColor0000FF'];
let bgCatColorArray = ['bgColorlightblue', 'bgColorred', 'bgColorgreen', 'bgColororange', 'bgColorviolet', 'bgColorblue', 'bgColorturqoise', 'bgColorlightviolet'];

/**
 * Initialize the site.
 * This function calls several functions that are needed for functionality of the pages.
 */
async function init() {
    await includeHTML(); // Solange warten, bis alle Dateien nachgeladen wurden
    // und dann erst ausführen, um z.B. auf ein eingefügtes Feld zuzugreifen
    getUser();
    getContactList();
}

/**
 * get contacts from local storage
 */
function getContactList() {
	let contactListAsText = localStorage.getItem('contactList');
	if (contactListAsText) {
		contactList = JSON.parse(contactListAsText);
	}
}

/**
 * Function for including separate html files into a main file.
 * Usually for parts of a side like a header or a footer.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html'); // Holt den Inhalt des Attributs
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

/** show or dont show the Log out Button
 * 
 */
function showLogOut(){
    let logOutBtn = document.getElementById('logOutBtn');
    display = display === "block" ? "none" : "block"
    logOutBtn.style.display = display;
    changeCursorUserImg();
}

/** change cursor over UserImg from pointer to auto and from auto to pointer
 * 
 */
function changeCursorUserImg() {
    userImg = document.getElementById('userImg');
    cursor = cursor === "pointer" ? "auto" : "pointer";
    userImg.style.cursor = cursor
}