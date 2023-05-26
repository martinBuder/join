function toggleSelection() {
    let test = document.getElementById('testCategory');
    test.classList.toggle('d-none');
}







function clickReaction(item) {
    // Fügen Sie hier den Code ein, der bei einem Klick auf einen Eintrag ausgeführt werden soll
    console.log(item.textContent);
}

function toggleDropdownList() {
    var dropdownList = document.getElementById("dropdownList");
    var dropdownItems = dropdownList.getElementsByTagName("li");
    
    for (var i = 0; i < dropdownItems.length; i++) {
        var item = dropdownItems[i];
        
        if (item.style.display === "none") {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    }
}