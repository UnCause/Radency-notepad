//Selectors and variables
let showForm = false;
var btn_Show_create_form = document.querySelector(".show-create-form");
var Note_Form_div = document.querySelector(".create-note-form");
var Notes_table_body = document.querySelector(".notes-table-body");
//Event Listeners
btn_Show_create_form.addEventListener('click', showCreateForm);
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

function addNote(Event) {
    Event.preventDefault();
    var note_tr = document.createElement("tr");
    Notes_table_body.appendChild(note_tr);
    var Ncategory = document.addNote.Category.value;
    var td_category = document.createElement("td");
    td_category.innerText = Ncategory;
    var td_icon = document.createElement("td");
    switch (Ncategory) {
        case "Task":
            td_icon.innerHTML = '<i class="fa-solid fa-paperclip"></i>';
            break;
        case "Idea":
            td_icon.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
            break;
        case "Random Thought":
            td_icon.innerHTML = '<i class="fa-solid fa-dice-d20"></i>';
    }
    var Nname = document.addNote.Name.value;
    var td_name = document.createElement("td");
    td_name.innerText = Nname;
    var td_created = document.createElement("td");
    var date = new Date();
    td_created.innerText = months[date.getMonth()] + " " + date.getDate()  + 
    ", " + date.getFullYear();
    var Ncontent = document.addNote.Content.value;
    var td_content = document.createElement("td");
    td_content.innerText = Ncontent;
    var td_dates = document.createElement("td");
    
    var td_buttons = document.createElement("td");
    td_buttons.innerHTML = `
    <i class="fa-solid fa-box-archive"></i>
    <i class="fa-solid fa-trash"></i>
    <i class="fa-solid fa-pen-to-square"></i>
    `;
    note_tr.appendChild(td_icon);
    note_tr.appendChild(td_name);
    note_tr.appendChild(td_created);
    note_tr.appendChild(td_category);
    note_tr.appendChild(td_content);
    note_tr.appendChild(td_buttons);
}

function ArchiveNote (note) {

}

function DeleteNote (note) {

}

function EditNote (note) {
    
}








//Just a task to check is a variable is an array, puttig out the numbers, 
// deleting first and last element and summing the rest of the elements

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