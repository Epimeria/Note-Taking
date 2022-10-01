console.log("Welcome to notes app. This is app.js");
showNotes();   // takes all the notes from local storage and display in notes is Div

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let noteTextInputField = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    noteTextInputField.value ? notesObj.push(noteTextInputField.value) : console.log('Input field empty, ignoring click')
    localStorage.setItem("notes", JSON.stringify(notesObj));
    noteTextInputField.value = "";
    showNotes();
});

// function to show elements from local storage 
function showNotes() {
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div> `;
    });
    let notesElm = document.getElementById("notes");
    notesElm.innerHTML = html;

}

// function to delete a Note 
function deleteNote(index) {
    console.log("I am deleting", index);
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    console.log("Input event fired!", inputVal);
    let noteCards = document.getElementByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementByTagName("p")[0].innerText;
        if (cardTxt.include(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})