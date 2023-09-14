//Selectors and variables
let showForm = false;
let notes = [{name: "kek", created: "Septemder 14, 2023", category: "Task", content: "some content", dates: "1/10/2024", isArchived: false, index: 0}];
var btn_Show_create_form = document.querySelector(".show-create-form");
var Note_Form_div = document.querySelector(".create-note-form");
var Notes_table_body = document.querySelector(".notes-table-body");
//Event Listeners
btn_Show_create_form.addEventListener('click', showCreateForm);
Notes_table_body.addEventListener('click', NoteClick);
// Notes_table_body.addEventListener('beforeprint', loadNotes);
window.onload = loadNotes;

// btn_note_form_submit.addEventListener('click', addNote);

//to export in external file
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "February", "March", "April", "May", "June", 
            "July", "August", "Septemder", "October", "November", "December"];
// var fullDate = "Сегодня: " + myDate.getDate() + " " + months[myDate.getMonth()] + 
//                 " " + myDate.getFullYear() + ", " + days[myDate.getDay()];

//Functions
function showCreateForm (Event) {
    Event.preventDefault();

    if (!showForm) {
        var Note_Form = document.createElement("div");
        Note_Form.setAttribute("class", "note-form-div");
        Note_Form.innerHTML = `
        <form name="addNote" autocomplete="off">
            <input class="note-form-input" type="text" required name="Name" placeholder="Name"><br>
            <input class="note-form-input" type="text" required name="Content" placeholder="Content"><br>
            <p>
                <input name="Category" type="radio" value="Task"/>Task
            </p>
            <p>
                <input name="Category" type="radio" value="Idea"/>Idea
            </p>
            <p>
                <input name="Category" type="radio" value="Random Thought"/>Random Thought
            </p>
            <button class="note_form_submit" type="submit">Submit</button>
        </form>
      `;
      showForm = true;
      btn_Show_create_form.innerHTML = "Hide"
      Note_Form_div.appendChild(Note_Form);
      var btn_note_form_submit = document.querySelector(".note_form_submit");
      btn_note_form_submit.addEventListener('click', addNote);
    } else {
        var noteForm = document.querySelector(".note-form-div")
        btn_Show_create_form.innerHTML = "Create"
        Note_Form_div.removeChild(noteForm);
        showForm = false;
    }
    
}
function addNote (e) {
    e.preventDefault();
    console.log();
    var Ncategory = document.addNote.Category.value;
    var Nname = document.addNote.Name.value;
    var Ncontent = document.addNote.Content.value;
    var date = new Date();
    var createdDate = months[date.getMonth()] + " " + date.getDate()  + 
    ", " + date.getFullYear();
    var Ndates = "to implement"
    notes.push({name: Nname, created: createdDate, category: Ncategory, content: Ncontent, dates: Ndates, isArchived: false, index: notes.length});
    console.log(notes[notes.length-1]);
    createNote(notes[notes.length-1])
}
function createNote(note) {
    // Event.preventDefault();
    var note_tr = document.createElement("tr");
    Notes_table_body.appendChild(note_tr);
    var td_category = document.createElement("td");
    td_category.innerText = note.category;
    var td_icon = document.createElement("td");
    switch (note.category) {
        case "Task":
            td_icon.innerHTML = '<i class="fa-solid fa-paperclip"></i>';
            break;
        case "Idea":
            td_icon.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
            break;
        case "Random Thought":
            td_icon.innerHTML = '<i class="fa-solid fa-dice-d20"></i>';
    }
    var td_name = document.createElement("td");
    td_name.innerText = note.name;
    var td_created = document.createElement("td");
    td_created.innerText = note.createdDate;
    var td_content = document.createElement("td");
    td_content.innerText = note.content;
    var td_dates = document.createElement("td");
    td_dates.innerText = note.dates;
    var td_buttons = document.createElement("td");
    td_buttons.innerHTML = `
    <i class="fa-solid btn-archive fa-box-archive"></i>
    <i class="fa-solid btn-delete fa-trash"></i>
    <i class="fa-solid btn-edit fa-pen-to-square"></i>
    `;
    note_tr.appendChild(td_icon);
    note_tr.appendChild(td_name);
    note_tr.appendChild(td_created);
    note_tr.appendChild(td_category);
    note_tr.appendChild(td_content);
    note_tr.appendChild(td_dates);
    note_tr.appendChild(td_buttons);
}

function NoteClick (e) {
    item = e.target;

    switch (item.classList[1]) {
        case "btn-archive":
            ArchiveNote(e);
            break;
        case "btn-delete":
            DeleteNote(e);
            break;
        case "btn-edit":
            EditNote(e);
            break;
        default:
            break;
    }
}

function getNote (node) {
    var btns = node.target.parentNode;
    var note = btns.parentNode;
    return note;
}

function loadNotes () {
    alert("kek");
}

function ArchiveNote (e) {
    var note = getNote(e);
    console.log(note);
}

function DeleteNote (e) {
    var note = getNote(e);
    Notes_table_body.removeChild(note);
    // console.log(e.target.classList);
}

function EditNote (e) {
    alert("editing");
    var note = getNote(e);
    
}








//Just a task to check is a variable is an array, puttig out the numbers, 
// deleting first and last element and summing the rest of the elements.

// let arr = [7, 2, null, undefined, true, 1, 8, 10, "asd", {Age: 4}, [1, 4, 21]];
// // let arr = 5;

// if(Array.isArray(arr)){
//     let flattenArr= arr.flat(Infinity);
//     console.log(flattenArr);
//     let arrr = [];
//     for (let i = 0; i < flattenArr.length; i++) {
//         if(typeof flattenArr[i] === "number") {
//             arrr.push(flattenArr[i]);
//         };      
//     };
//     arrr.sort( (a, b) =>  a - b);

//     console.log(arrr);
//     arrr.splice(0, 1);
//     arrr.splice(arrr.length-1, 1);
//     console.log(arrr);

//     let res = arrr.reduce(function (previousValue, currentValue) {
//         return previousValue + currentValue;
//     });
//     console.log(res);
// } else {
//     console.log("there is no array");
// };