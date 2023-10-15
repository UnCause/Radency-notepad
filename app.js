import createNote from "./notes_operations/create_note.js"
import showCreateForm from "./notes_operations/create_form.js"
import Edit from "./notes_operations/edit_note.js"
import DeleteNote from "./notes_operations/delete_note.js"
import Archive from "./notes_operations/archive_note.js"
import getDates from "./notes_operations/getDates.js"

//Selectors and variables
let notes = [{name: "kek", created: "Septemder 14, 2023", category: "Task", content: "some content", dates: "1/10/2024", isArchived: false, index: 0},
{name: "Lul", created: "Septemder 16, 2023", category: "Idea", content: "assgsergesr", dates: "1/10/2024", isArchived: false, index: 1},
{name: "Vasya", created: "Septemder 16, 2023", category: "Random Thought", content: "dlgbfjglnbdfg", dates: "1/10/2024", isArchived: false, index: 2},
{name: "huh", created: "Septemder 25, 2023", category: "Task", content: "ddss", dates: "1/10/2024", isArchived: true, index: 3},
{name: "meh", created: "Septemder 25, 2023", category: "Idea", content: "treq", dates: "1/10/2024", isArchived: true, index: 4},
{name: "wawa", created: "Septemder 25, 2023", category: "Random Thought", content: "jhgfds", dates: "1/10/2024", isArchived: true, index: 5}];
export default notes
var doc_body = document.querySelector("body");
var btn_Show_create_form = document.querySelector(".show-create-form");
var Notes_table_body = document.querySelector(".notes-table-body");
var btn_Show_archived_notes = document.querySelector(".archived-notes-btn");
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
doc_body.addEventListener('click', NoteClick);
btn_Show_archived_notes.addEventListener('click', Archive.ShowArchived);
window.onload = loadNotes;

var months = ["January", "February", "March", "April", "May", "June", 
            "July", "August", "Septemder", "October", "November", "December"];

//Functions

function addNote (e) {
    e.preventDefault();
    var category = document.addNote.Category.value;
    var name = document.addNote.Name.value;
    var content = document.addNote.Content.value;
    var date = new Date();
    var createdDate = months[date.getMonth()] + " " + date.getDate()  + 
    ", " + date.getFullYear();
    var dates = getDates(content);
    notes.push({
        name, 
        created: createdDate, 
        category, 
        content, 
        dates, 
        isArchived: false, 
        index: notes.length});
    var note_elem = createNote(notes[notes.length-1]);
    Notes_table_body.appendChild(note_elem);
    SummaryCounter();
}

function NoteClick (e) {
    let item = e.target;
    console.log(item.classList[0]);
    switch (item.classList[0]) {
        case "note_form_submit":
            addNote(e);
            SummaryCounter();
            break;
        case "btn-archive":
            Archive.ArchiveNote(e);
            SummaryCounter();
            break;
        case "btn-delete":
            DeleteNote(e);
            SummaryCounter();
            break;
        case "btn-edit":
            Edit.EditNote(e);
            SummaryCounter();
            break;
        case "edit-submit":
            Edit.EditCompletion(e);
            SummaryCounter();
            break;
        case "edit-cancel":
            Edit.EditCancel(e);
            SummaryCounter();
            break;
        default:
            break;
    }
    console.log(notes);
}

function loadNotes () {
    notes.forEach(note => {
        if(!note.isArchived) {
            var note_elem = createNote(note);
            Notes_table_body.appendChild(note_elem);
        }
    });
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