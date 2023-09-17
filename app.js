//Selectors and variables
let showForm = false;
let notes = [{name: "kek", created: "Septemder 14, 2023", category: "Task", content: "some content", dates: "1/10/2024", isArchived: false, index: 0},
{name: "Lul", created: "Septemder 16, 2023", category: "Idea", content: "assgsergesr", dates: "1/10/2024", isArchived: false, index: 1},
{name: "Vasya", created: "Septemder 16, 2023", category: "Random Thought", content: "dlgbfjglnbdfg", dates: "1/10/2024", isArchived: false, index: 2}];
var btn_Show_create_form = document.querySelector(".show-create-form");
var Note_Form_div = document.querySelector(".create-note-form");
var Notes_table_body = document.querySelector(".notes-table-body");
//Event Listeners
btn_Show_create_form.addEventListener('click', showCreateForm);
Notes_table_body.addEventListener('click', NoteClick);
window.onload = loadNotes;

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
    var note_elem = createNote(notes[notes.length-1]);
    Notes_table_body.appendChild(note_elem);
}
function createNote(note) {

    var note_tr = document.createElement("tr");
    // Notes_table_body.appendChild(note_tr);
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
    td_created.innerText = note.created;
    var td_content = document.createElement("td");
    td_content.innerText = note.content;
    var td_dates = document.createElement("td");
    td_dates.innerText = note.dates;
    var td_buttons = document.createElement("td");
    td_buttons.innerHTML = `
    <i class="btn-archive fa-solid fa-box-archive"></i>
    <i class="btn-delete fa-solid fa-trash"></i>
    <i class="btn-edit fa-solid fa-pen-to-square"></i>
    `;
    var td_index = document.createElement("td");
    td_index.setAttribute("class", "note-index");
    td_index.innerText = note.index;
    // td_index.style.visibility = "hidden";
    note_tr.appendChild(td_icon);
    note_tr.appendChild(td_name);
    note_tr.appendChild(td_created);
    note_tr.appendChild(td_category);
    note_tr.appendChild(td_content);
    note_tr.appendChild(td_dates);
    note_tr.appendChild(td_buttons);
    note_tr.appendChild(td_index);
    return note_tr;
}

function NoteClick (e) {
    item = e.target;
    switch (item.classList[0]) {
        case "btn-archive":
            ArchiveNote(e);
            break;
        case "btn-delete":
            DeleteNote(e);
            break;
        case "btn-edit":
            EditNote(e);
            break;
        case "edit-submit":
            EditCompletion(e);
            break;
        case "edit-cancel":
            EditCancel(e);
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

function getNoteObject (id) {
    // var note_id = parseInt(id);
    // // console.log(note_id + "   " + typeof note_id);
    // notes.forEach(note => {
    //     if (note.index === note_id) {
    //         console.log(note);
    //         return note;
    //     };
    // });
}

function loadNotes () {
    notes.forEach(note => {
        var note_elem = createNote(note);
        Notes_table_body.appendChild(note_elem);
    });
}

function ArchiveNote (e) {
    var note = getNote(e);
    console.log(note[0]);
}

function DeleteNote (e) {
    var note = getNote(e);
    Notes_table_body.removeChild(note);
}

function EditNote (e) {
    // console.log(e.target);
    var note = getNote(e);
    var tr_edit = document.createElement("tr");
    tr_edit.setAttribute("class", "edit-note-tr")
    var note_data = note.children;
    console.log(note_data);
    var category = [];
    switch (note_data[3].innerText) {
        case "Task":
            category[0] = "selected";
            break;
        case "Idea":
            category[1] = "selected";
            break;
        case "Random Thought":
            category[2] = "selected";
            break;
        default:
            break;
    }
    tr_edit.innerHTML = `
    <form>
        <td>${note_data[0].innerHTML}</td>
            <td><input type="text" required name="Name" placeholder="Name" value="${note_data[1].innerText}"></td>
            <td>${note_data[2].innerText}</td>
            <td><select>
                <option value="Task" ${category[0]}>Task</option>
                <option value="Idea" ${category[1]}>Idea</option>
                <option value="Random Thought" ${category[2]}>Random Thought</option>
            </select></td>
            <td><textarea type="text" required name="Content" placeholder="Content">${note_data[4].innerText}</textarea></td>
            <td>${note_data[5].innerText}</td>
            <td><input type="submit" class="edit-submit" value="Save"> <input type="button" class="edit-cancel" value="Cancel"></td>
            <td class="note-index">${note_data[7].innerText}</td>
    </form>
    `;
    Notes_table_body.insertBefore(tr_edit, note);
    Notes_table_body.removeChild(note);
    return note;
}

function EditCancel (e) {
    // var note_id = document.querySelector(".note-index");
    var note = getNote(e);
    // console.log(note.children[8].innerText);
    var Notes_table_body_temp = document.querySelector(".notes-table-body");
    var tr_edit = document.querySelector(".edit-note-tr");
    var id = parseInt(note.children[8].innerText);
    var note_object = {}
    notes.forEach(note => {
        if (note.index === id) {
            // console.log(note);
            note_object = note;
        };
    });
    var note_elem = createNote(note_object)
    console.log(note_elem);
    Notes_table_body_temp.insertBefore(note_elem, tr_edit);
    Notes_table_body_temp.removeChild(tr_edit);
}

function EditCompletion (e) {
    
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