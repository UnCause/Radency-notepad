export default function (note) {

    var note_tr = document.createElement("tr");
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
    td_index.style.visibility = "hidden";
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