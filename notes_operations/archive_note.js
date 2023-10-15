import notes from "../app.js"
import createNote from "./create_note.js"
let ShowArchivedNotes = false;
var archived_notes_table = document.querySelector(".archived-notes-div");
var btn_Show_archived_notes = document.querySelector(".archived-notes-btn");

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
}

function ShowArchived (e) {
    e.preventDefault();

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
        btn_Show_archived_notes.innerHTML = "Hide archived notes";
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
        btn_Show_archived_notes.innerHTML = "Show archived notes";
    }
}

export default {ArchiveNote, ShowArchived}