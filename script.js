const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const $ = document
const wrapper = $.querySelector(".wrapper")
const addBoxBtn = $.querySelector(".add-box")
const popUp = $.querySelector(".popup-box")
let popUpTitle = popUp.querySelector("p")
let popUpInput = popUp.querySelector("input")
let popUpDesc = popUp.querySelector("textarea")
let popUpbutton = popUp.querySelector("button")
let popUpCloseIcon = popUp.querySelector(".uil")
let isUpdate = false
let now = new Date()
let notesArrey = []
let updatedNoteId = null;



function showParent(thiss) {
    thiss.parentElement.classList.add("show")
}
function setToLocalStorage(arr) {
    localStorage.setItem("notes", JSON.stringify(arr))
}

function GenerateNotes() {
    if (JSON.parse(localStorage.getItem('notes'))) {
        notesArrey = JSON.parse(localStorage.getItem('notes'))
        wrapper.querySelectorAll("li.note").forEach(note => note.remove())
        notesArrey.forEach(note => {
            wrapper.insertAdjacentHTML("beforeend",
                `
                 <li class="note">
                    <div class="details">
                      <p>${note.title}</p>
                      <span>${note.dec}</span>
                    </div>
                    <div class="bottom-content">
                      <span>${note.date}</span>
                      <div class="settings">
                        <i class="uil uil-ellipsis-h" onclick="showParent(this)"></i>
                        <ul class="menu">
                          <li onclick="updateNote(${note.id},'${note.title}','${note.dec}')">
                            <i class="uil uil-pen"></i>Edit
                          </li>
                          <li onclick="RemoveNote(event,${note.id})">
                            <i class="uil uil-trash"></i>Delete
                          </li>
                        </ul>
                      </div>
                    </div>
                </li>
                `
            )
        });
    }
}

function openPopUp(title, desc) {
    if (isUpdate) {
        popUpInput.value = title
        popUpDesc.value = desc
        popUpTitle.innerHTML = "Update Note"
        popUpbutton.innerHTML = "Update Note"

    } else {
        popUpInput.value = ""
        popUpDesc.value = ""
        popUpTitle.innerHTML = "Add Note"
        popUpbutton.innerHTML = "Add Note"
    }
    popUp.classList.add("show")
}
function addNewNote() {
    if (popUpInput.value.trim() && popUpDesc.value.trim()) {
        let newNote = {
            id: notesArrey.length + 1,
            title: popUpInput.value,
            dec: popUpDesc.value,
            date: `${months[now.getMonth()]} ${now.getDate()},${now.getFullYear()}`
        }
        notesArrey.push(newNote)

        setToLocalStorage(notesArrey)
        GenerateNotes()
        closePopUp()
    } else {
        alert("Please Complite the inputs ")
    }
}

function updateNote(id, title, desc) {
    isUpdate = true
    updatedNoteId = id
    openPopUp(title, desc)
}

function closePopUp() {
    popUp.classList.remove("show")
}
function RemoveNote(event, id) {
    if (confirm("Do you want to delet this note?")) {
        let delIndex = notesArrey.findIndex(note => note.id == id)
        notesArrey.splice(delIndex, 1)
        setToLocalStorage(notesArrey)
        GenerateNotes()
    } else {
        event.target.parentElement.parentElement.classList.remove("show")
    }
}
function updateThisNote(id) {
    if (popUpInput.value.trim() && popUpDesc.value.trim()) {
        notesArrey.forEach(note => {
            if (note.id == id) {
                note.title = popUpInput.value,
                    note.dec = popUpDesc.value
            }
        })
        setToLocalStorage(notesArrey)
        GenerateNotes()
        closePopUp()
        isUpdate = false
    } else {
        alert("Please Complite the inputs ")
    }
}

addBoxBtn.addEventListener("click", openPopUp)
popUpCloseIcon.addEventListener("click", closePopUp)
document.addEventListener("keyup", (e) => {
    if (e.keyCode == 27) {
        closePopUp()
    }
})
popUpbutton.addEventListener("click", (e) => {
    e.preventDefault()
    if (isUpdate) {
        updateThisNote(updatedNoteId)
        isUpdate = false
    } else {
        addNewNote()
    }
})
window.addEventListener("load", GenerateNotes)
$.addEventListener("click", (e) => {
    if (![...e.target.classList].includes("uil")) {
        if ($.querySelectorAll(".settings")) {
            $.querySelectorAll(".settings").forEach(set => set.classList.remove("show"))
        }
    }
})


