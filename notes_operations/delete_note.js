import notes from "../app.js"

export default function DeleteNote (e) {
    var note = e.target.closest("tr");
    var Notes_table_body = e.target.closest("tbody");
    var id = parseInt(note.children[7].innerHTML);
    var note_index = notes.findIndex(note => note.index === id);
    notes.splice(note_index, 1);
    Notes_table_body.removeChild(note);
}