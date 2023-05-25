async function init() {
    await includeHTML(); // Solange warten, bis alle Dateien nachgeladen wurden
    // und dann erst ausführen, um z.B. auf ein eingefügtes Feld zuzugreifen
}

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