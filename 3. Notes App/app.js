const addBtn = document.querySelector(".addBtn");
// const editBtn = document.querySelector(".edit");
// const deleteBtn = document.querySelector(".delete");
// const main = document.querySelector(".main");
// const textarea = document.querySelector("textarea");

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote() {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `<div class="notes">
    <div class="toolbar">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main hidden"></div>
    <textarea></textarea>
  </div>`;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textarea = note.querySelector("textarea");

  editBtn.addEventListener("click", () => {
    // console.log(main.textContent);
    if (main.textContent === "") {
      alert("Can't save empty notes");
    } else {
      main.classList.toggle("hidden");
      textarea.classList.toggle("hidden");
    }
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
  });

  document.body.appendChild(note);
}
