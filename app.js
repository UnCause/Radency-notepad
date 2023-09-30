//Selectors and variables
let showForm = false;
let ShowArchivedNotes = false;
let notes = [{name: "kek", created: "Septemder 14, 2023", category: "Task", content: "some content", dates: "1/10/2024", isArchived: false, index: 0},
{name: "Lul", created: "Septemder 16, 2023", category: "Idea", content: "assgsergesr", dates: "1/10/2024", isArchived: false, index: 1},
{name: "Vasya", created: "Septemder 16, 2023", category: "Random Thought", content: "dlgbfjglnbdfg", dates: "1/10/2024", isArchived: false, index: 2},
{name: "huh", created: "Septemder 25, 2023", category: "Task", content: "ddss", dates: "1/10/2024", isArchived: true, index: 3},
{name: "meh", created: "Septemder 25, 2023", category: "Idea", content: "treq", dates: "1/10/2024", isArchived: true, index: 4},
{name: "wawa", created: "Septemder 25, 2023", category: "Random Thought", content: "jhgfds", dates: "1/10/2024", isArchived: true, index: 5}];
var doc_body = document.querySelector("body");
var btn_Show_create_form = document.querySelector(".show-create-form");
var Note_Form_div = document.querySelector(".create-note-form");
var Notes_table_body = document.querySelector(".notes-table-body");
var btn_Show_archive_notes = document.querySelector(".archived-notes-btn");
var archived_notes_table = document.querySelector(".archived-notes-div");
var row_task = document.querySelector(".row-task");
var row_idea = document.querySelector(".row-idea");
var row_rndm = document.querySelector(".row-rndm");
var td_task_active = document.createElement("td");
var td_task_archived = document.createElement("td");
var td_idea_active = document.createElement("td");
var td_idea_archived = document.createElement("td");
var td_rndm_active = document.createElement("td");
var td_rndm_archived = document.createElement("td");
row_task.appendChild(td_task_active);
row_task.appendChild(td_task_archived);
row_idea.appendChild(td_idea_active);
row_idea.appendChild(td_idea_archived);
row_rndm.appendChild(td_rndm_active);
row_rndm.appendChild(td_rndm_archived);
//Event Listeners
btn_Show_create_form.addEventListener('click', showCreateForm);
// Notes_table_body.addEventListener('click', NoteClick);
doc_body.addEventListener('click', NoteClick);
btn_Show_archive_notes.addEventListener('click', ShowArchived);
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
      btn_Show_create_form.innerHTML = "Hide";
      Note_Form_div.appendChild(Note_Form);
      var btn_note_form_submit = document.querySelector(".note_form_submit");
      btn_note_form_submit.addEventListener('click', addNote);
    } else {
        var noteForm = document.querySelector(".note-form-div");
        btn_Show_create_form.innerHTML = "Create";
        Note_Form_div.removeChild(noteForm);
        showForm = false;
    }
    
}
function addNote (e) {
    e.preventDefault();
    var category = document.addNote.Category.value;
    var name = document.addNote.Name.value;
    var content = document.addNote.Content.value;
    var date = new Date();
    var createdDate = months[date.getMonth()] + " " + date.getDate()  + 
    ", " + date.getFullYear();
    var dates = "to implement";
    notes.push({
        name, 
        created: createdDate, 
        category, 
        content, 
        dates, 
        isArchived: false, 
        index: notes.length});
    // console.log(notes[notes.length-1]);
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
    SummaryCounter();
    return note_tr;
}

function NoteClick (e) {
    item = e.target;
    console.log(item.classList[0]);
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

function loadNotes () {
    notes.forEach(note => {
        if(!note.isArchived) {
            var note_elem = createNote(note);
            Notes_table_body.appendChild(note_elem);
        }
    });
}

function ArchiveNote (e) {
    var Notes_table_body = e.target.closest("tbody");
    var note = e.target.closest("tr");
    var id = parseInt(note.children[7].innerHTML);
    var note_obj = notes.filter(note => {
        return note.index === id;
    });
    switch (Notes_table_body.className) {
        case "notes-table-body":
            note_obj[0].isArchived = true;
            if(ShowArchivedNotes) {
                var arch_table_body = document.querySelector(".archived-notes-table-body");
                arch_table_body.appendChild(note);
            } else {
                Notes_table_body.removeChild(note);
            }
            break;
        case "archived-notes-table-body":
            var Notes_table_body = document.querySelector(".notes-table-body");
            note_obj[0].isArchived = false;
            Notes_table_body.appendChild(note);
            break;
        default:
            break;
    }
    SummaryCounter();
}

function SummaryCounter() {
    var task_counter = [0, 0];
    var idea_counter = [0, 0];
    var rndm_counter = [0, 0];
    notes.forEach(note => {
        switch (note.category) {
            case "Task":
                if(!note.isArchived){
                    task_counter[0]++;
                } else {
                    task_counter[1]++;
                }
                break;
            case "Idea":
                if(!note.isArchived){
                    idea_counter[0]++;
                } else {
                    idea_counter[1]++;
                }
                break;
            case "Random Thought":
                if(!note.isArchived){
                    rndm_counter[0]++;
                } else {
                    rndm_counter[1]++;
                }
                break;
            default:
                break;
        }
    });
    td_task_active.innerText = task_counter[0];
    td_task_archived.innerText = task_counter[1];
    td_idea_active.innerText = idea_counter[0];
    td_idea_archived.innerText = idea_counter[1];
    td_rndm_active.innerText = rndm_counter[0];
    td_rndm_archived.innerText = rndm_counter[1];
    
}

function DeleteNote (e) {
    var note = e.target.closest("tr");
    var Notes_table_body = e.target.closest("tbody");
    var id = parseInt(note.children[7].innerHTML);
    var note_index = notes.findIndex(note => note.index === id);
    notes.splice(note_index, 1);
    SummaryCounter();
    Notes_table_body.removeChild(note);
}

function EditNote (e) {
    var note = e.target.closest("tr");
    var Notes_table_body = e.target.closest("tbody");
    var tr_edit = document.createElement("tr");
    tr_edit.setAttribute("class", "edit-note-tr");
    var note_data = note.children;
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
    <form name="EditNote" autocomplete="off">
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
            <td class="note-index" style="visibility: hidden;">${note_data[7].innerHTML}</td>
    </form>
    `;
    Notes_table_body.insertBefore(tr_edit, note);
    Notes_table_body.removeChild(note);
    return note;
}

function EditCancel (e) {
    var note = e.target.closest("tr");
    var Notes_table_body = e.target.closest("tbody");
    var id = parseInt(note.children[8].innerHTML);
    var note_object = {}
    notes.forEach(note => {
        if (note.index === id) {
            note_object = note;
        };
    });
    var note_elem = createNote(note_object);
    Notes_table_body.insertBefore(note_elem, note);
    Notes_table_body.removeChild(note);
}

function EditCompletion (e) {
    var note = e.target.closest("tr");
    var id = parseInt(note.children[8].innerHTML);
    var name = note.children[2].children[0].value;
    var category = note.children[4].children[0].value;
    var content = note.children[5].children[0].value;
    notes[id] = {...notes[id], name, category, content};
    var note_elem = createNote(notes[id]);
    var Notes_table_body = e.target.closest("tbody");
    Notes_table_body.insertBefore(note_elem, note);
    Notes_table_body.removeChild(note);
    SummaryCounter();
}

function ShowArchived (e) {
    if (!ShowArchivedNotes) {
        var archived_notes_table_div = document.createElement("div");
        archived_notes_table_div.setAttribute("class", "archived_notes_table_div");
        archived_notes_table_div.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Created</th>
                    <th>Category</th>
                    <th>Content</th>
                    <th>Dates</th>
                    <th><i class="fa-solid fa-box-archive"></i><i class="fa-solid fa-trash"></i></th>
                </tr>
            </thead>
            <tbody class="archived-notes-table-body">

            </tbody>
        </table>
        `;
        archived_notes_table.appendChild(archived_notes_table_div);
        ShowArchivedNotes = true;
        btn_Show_archive_notes.innerHTML = "Hide archived notes";
        var arch_table_body = document.querySelector(".archived-notes-table-body")
        notes.forEach(note => {
            if(note.isArchived) {
                var note_elem = createNote(note);
                arch_table_body.appendChild(note_elem);
            }
        });
    } else {
        var archived_notes_table_div = document.querySelector(".archived_notes_table_div");
        archived_notes_table.removeChild(archived_notes_table_div);
        ShowArchivedNotes = false;
        btn_Show_archive_notes.innerHTML = "Show archived notes";
    }
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