import {remove_listener, opacity_change, popup_edit} from './customdialogs.js';

window.onload = main;

let post_arr = [];
let post_1 = {num_id: 1677372200579, 
              title: "Made portfolio with HTML", 
              date: "2023-02-01", 
              summary: "Built up the base of my website using a variety of different tags."};
let post_2 = {num_id: 1677372203323, 
              title: "Stylized portfolio using CSS", 
              date: "2023-02-16", 
              summary: "Added device breakpoints, animations, and textures to the portfolio."};
post_arr.push(post_1);
post_arr.push(post_2);

function main() {
  for(let i = 0; i < post_arr.length; i++) {
    add_rows_table(post_arr[i].num_id, post_arr[i].title, post_arr[i].date, post_arr[i].summary);
  }
  let add_button = document.querySelector("main > button");
  add_button.addEventListener('click', add_row);
}

function add_rows_table(num_id, title, date, summary) {
  let table_body = document.querySelector("main table tbody");
  let table_row = table_body.insertRow(table_body.rows.length);
  table_row.setAttribute("data-num_id", num_id);
  
  let post_title = table_row.insertCell(0);
  post_title.innerHTML = title;

  let post_date = table_row.insertCell(1);
  post_date.innerHTML = date;
  
  let post_summary = table_row.insertCell(2);
  post_summary.innerHTML = summary;

  let post_edit = table_row.insertCell(3);
  let edit_button = document.createElement("button");
  edit_button.appendChild(document.createTextNode("Edit"));
  post_edit.appendChild(edit_button);

  edit_button.addEventListener('click', () => {
    edit_row(table_row);
  });

  let post_delete = table_row.insertCell(4);
  let delete_button = document.createElement("button");
  delete_button.appendChild(document.createTextNode("Delete"));
  post_delete.appendChild(delete_button);

  delete_button.addEventListener('click', () => {
    delete_row(table_row);
  });
}

function add_row() {
  // Change title of dialog
  let h1_element = document.querySelector("dialog h1");
  h1_element.innerHTML = "Add Post";
  
  // Dim background and remove function from elements other than dialog
  popup_edit();

  let dialog_buttons = document.querySelectorAll("dialog button");
  let input_elements = document.querySelectorAll("dialog input");
  let textarea_element = document.querySelector("dialog textarea");

  // Add row to table and array
  let ok_button = dialog_buttons[0];
  ok_button.addEventListener('click', ()=> {
    // Sanitize inputs
    let row_title = input_elements[0].value;
    row_title = DOMPurify.sanitize(row_title, {ALLOWED_TAGS: []});
    let row_date = input_elements[1].value;
    row_date = DOMPurify.sanitize(row_date, {ALLOWED_TAGS: []});
    let row_summary = textarea_element.value;
    row_summary = DOMPurify.sanitize(row_summary, {ALLOWED_TAGS: []});

    // if none of the fields are empty, add to table and row
    if(!(row_title == "" || row_date == "" || row_summary == "")) {
      let num_id = Date.now();
      add_rows_table(num_id, row_title, row_date, row_summary);
      post_arr.push({num_id: num_id, 
                     title: row_title, 
                     date: row_date, 
                     summary: row_summary});
    }

    // Undo changes common for edit, add, and delete
    undo_changes();

    // Use cloning to remove event listeners
    remove_listener();
  });

  // Undo everything with no changes
  let cancel_button = dialog_buttons[1];
  cancel_button.addEventListener('click', undo_changes, {once: true});
}

function edit_row(row) {
  // Change title of dialog
  let h1_element = document.querySelector("dialog h1");
  h1_element.innerHTML = "Edit Post";

  // Dim background and remove function from elements other than dialog
  popup_edit();

  // Make default values the values from the table
  let input_elements = document.querySelectorAll("dialog input");
  input_elements[0].value = row.children[0].innerHTML;
  input_elements[1].value = row.children[1].innerHTML;
  let textarea_element = document.querySelector("dialog textarea");
  textarea_element.value = row.children[2].innerHTML;

  let dialog_buttons = document.querySelectorAll("dialog button");

  // Edit the data in the row and array
  let ok_button = dialog_buttons[0];
  ok_button.addEventListener('click', () => {
    // Sanitize inputs
    let row_title = input_elements[0].value;
    row_title = DOMPurify.sanitize(row_title, {ALLOWED_TAGS: []});
    let row_date = input_elements[1].value;
    row_date = DOMPurify.sanitize(row_date, {ALLOWED_TAGS: []});
    let row_summary = textarea_element.value;
    row_summary = DOMPurify.sanitize(row_summary, {ALLOWED_TAGS: []});

    edit_array(row.getAttribute("data-num_id"), row_title, row_date, row_summary);
    row.children[0].innerHTML = row_title;
    row.children[1].innerHTML = row_date;
    row.children[2].innerHTML = row_summary;

    // Undo changes common for edit, add, and delete
    undo_changes();

    // Use cloning to remove event listeners
    remove_listener();
  });

  // Undo everything with no changes
  let cancel_button = dialog_buttons[1];
  cancel_button.addEventListener('click', () => {
    // Undo changes common for edit, add, and delete
    undo_changes();

    // Use cloning to remove event listeners
    remove_listener();
  });
}

function delete_row(row) {
  // Change title, ask are you sure while hiding other paragraph elements in dialog
  let h1_element = document.querySelector("dialog h1");
  h1_element.innerHTML = "Delete Post";
  let p_elements = document.querySelectorAll("dialog p");
  p_elements[0].innerHTML = "Are you sure?";
  p_elements[1].style.display = "none";
  p_elements[2].style.display = "none";

  // Hide other elements in the dialog
  let input_elements = document.querySelectorAll("dialog input");
  input_elements[0].style.display = "none";
  input_elements[1].style.display = "none";
  let textarea_element = document.querySelector("dialog textarea");
  textarea_element.style.display = "none";

  // Dim background and remove function from elements other than dialog
  popup_edit();

  let dialog_buttons = document.querySelectorAll("dialog button");

  // Delete from array and table
  let ok_button = dialog_buttons[0];
  ok_button.addEventListener('click', () => {
    // Delete row from table and array
    delete_from_array(row.getAttribute("data-num_id"));
    row.remove(); 

    // Undo changes specific to delete
    p_elements[0].innerHTML = "Post Title:";
    p_elements[1].removeAttribute("style");
    p_elements[2].removeAttribute("style");
    input_elements[0].removeAttribute("style");
    input_elements[1].removeAttribute("style");
    textarea_element.removeAttribute("style");

    // Undo changes common for edit, add, and delete
    undo_changes();

    // Use cloning to remove event listeners
    remove_listener();
  });

  // Undo everything with no changes
  let cancel_button = dialog_buttons[1];
  cancel_button.addEventListener('click', () => {
    // Undo changes specific to delete
    p_elements[0].innerHTML = "Post Title:";
    p_elements[1].removeAttribute("style");
    p_elements[2].removeAttribute("style");
    input_elements[0].removeAttribute("style");
    input_elements[1].removeAttribute("style");
    textarea_element.removeAttribute("style");

    // Undo changes common for edit, add, and delete
    undo_changes();

    // Use cloning to remove event listeners
    remove_listener();
  });
}

function delete_from_array(num_id) {
  for(let i = 0; i < post_arr.length; i++) {
    if(post_arr[i].num_id == num_id) {
      post_arr.splice(i,1);
      break;
    }
  }
}

function edit_array(num_id, title, date, summary) {
  for(let i = 0; i < post_arr.length; i++) {
    if(post_arr[i].num_id == num_id) {
      post_arr[i].title = title;
      post_arr[i].date = date;
      post_arr[i].summary = summary;
      break;
    }
  }
}

function undo_changes() {
  let dialog_element = document.querySelector("dialog");
  let body_element = document.querySelector("body");
  let input_elements = document.querySelectorAll("dialog input");
  let textarea_element = document.querySelector("dialog textarea");

  // Make dialog invisible
  dialog_element.removeAttribute("open");
  dialog_element.removeAttribute("style");

  // Make everything clickable again
  body_element.removeAttribute("style");

  // Make input empty
  input_elements[0].value = "";
  input_elements[1].value = "";
  textarea_element.value = "";

  // Undim everything
  opacity_change(1);
}