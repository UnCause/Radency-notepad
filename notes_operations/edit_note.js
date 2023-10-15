import notes from "../app.js"
import createNote from "./create_note.js"
import getDates from "./getDates.js"

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
    var dates = getDates(content);
    notes[id] = {...notes[id], name, category, content, dates};
    var note_elem = createNote(notes[id]);
    var Notes_table_body = e.target.closest("tbody");
    Notes_table_body.insertBefore(note_elem, note);
    Notes_table_body.removeChild(note);
}

export default {EditNote, EditCancel, EditCompletion}