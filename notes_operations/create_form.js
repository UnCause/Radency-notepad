let showForm = false;
var btn_Show_create_form = document.querySelector(".show-create-form");
var Note_Form_div = document.querySelector(".create-note-form");

export default function (e) {
    e.preventDefault();

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