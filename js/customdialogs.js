export function custom_dialogs() {
  let alert_button = document.getElementById("alert");
  alert_button.addEventListener('click', alert_message);

  let confirm_button = document.getElementById("confirm");  
  confirm_button.addEventListener('click', confirm_message);

  let prompt_button = document.getElementById("prompt");
  prompt_button.addEventListener('click', prompt_message);
}

function alert_message() {
  // Make output field empty
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";

  // Dim background and remove function from elements other than dialog
  popup_edit();

  // Hide cancel button and input field
  let dialog_buttons = document.querySelectorAll("dialog button");
  let cancel_button = dialog_buttons[1];
  cancel_button.style.display = "none";
  let input_field = document.querySelector("dialog input");
  input_field.style.display = "none";

  // Add message
  let dialog_para = document.querySelector("dialog p");
  dialog_para.innerHTML = "Intruder Alert, Intruder Alert!";

  // Undo Everything
  let ok_button = dialog_buttons[0];
  ok_button.addEventListener('click', ok_alert);
}

function confirm_message() {  
  // Make output field empty
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";

  // Dim background and remove function from elements other than dialog
  popup_edit();

  // Hide input field
  let input_field = document.querySelector("dialog input");
  input_field.style.display = "none";

  // Add message
  let dialog_para = document.querySelector("dialog p");
  dialog_para.innerHTML = "Do you confirm this?";

  let dialog_buttons = document.querySelectorAll("dialog button");

  // Undo everything and make output true
  let ok_button = dialog_buttons[0];
  ok_button.addEventListener('click', ok_confirm);

  // Undo everything and make output false
  let cancel_button = dialog_buttons[1];
  cancel_button.addEventListener('click', cancel_confirm);
}

function prompt_message() {
  // Make output field empty
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";

  // Dim background and remove function from elements other than dialog
  popup_edit();

  // Add message
  let dialog_para = document.querySelector("dialog p");
  dialog_para.innerHTML = "What is your name?";

  let dialog_buttons = document.querySelectorAll("dialog button");
  let input_field = document.querySelector("dialog input");

  // Undo everything and sanitize and display input
  let ok_button = dialog_buttons[0];
  ok_button.addEventListener('click', ok_prompt);

  // Undo everything and make output based on empty response
  let cancel_button = dialog_buttons[1];
  cancel_button.addEventListener('click', cancel_prompt);
}

function ok_alert() {
  let dialog_buttons = document.querySelectorAll("dialog button");
  let ok_button = dialog_buttons[0];
  let cancel_button = dialog_buttons[1];
  let dialog_para = document.querySelector("dialog p");
  let input_field = document.querySelector("dialog input");
  let output_element = document.querySelector("output");

  // Make cancel and input visible when dialog is called for other methods
  cancel_button.removeAttribute("style");
  input_field.removeAttribute("style");

  // Undo changes common to alert, confirm, and prompt
  undo_changes();

  // Make fields blank
  dialog_para.innerHTML = "";
  input_field.value = "";
  output_element.innerHTML = "";

  // Remove event listeners
  ok_button.removeEventListener('click', ok_alert);
}

function ok_confirm() {
  let dialog_buttons = document.querySelectorAll("dialog button");
  let ok_button = dialog_buttons[0];
  let cancel_button = dialog_buttons[1];
  let dialog_para = document.querySelector("dialog p");
  let input_field = document.querySelector("dialog input");
  let output_element = document.querySelector("output");

  // Make input visible when dialog is called for other methods
  input_field.removeAttribute("style");

  // Undo changes common to alert, confirm, and prompt
  undo_changes();

  // Make fields blank and output true
  dialog_para.innerHTML = "";
  input_field.value = "";
  output_element.innerHTML = "The value returned by the confirm method is : true";

  // Remove event listeners
  ok_button.removeEventListener('click', ok_confirm);
  cancel_button.removeEventListener('click', cancel_confirm);
}

function cancel_confirm() {
  let dialog_buttons = document.querySelectorAll("dialog button");
  let ok_button = dialog_buttons[0];
  let cancel_button = dialog_buttons[1];
  let dialog_para = document.querySelector("dialog p");
  let input_field = document.querySelector("dialog input");
  let output_element = document.querySelector("output");

  // Make input visible when dialog is called for other methods
  input_field.removeAttribute("style");

  // Undo changes common to alert, confirm, and prompt
  undo_changes();

  // Make fields blank and output false
  dialog_para.innerHTML = "";
  input_field.value = "";
  output_element.innerHTML = "The value returned by the confirm method is : false";

  // Remove event listeners
  ok_button.removeEventListener('click', ok_confirm);
  cancel_button.removeEventListener('click', cancel_confirm);
}

function ok_prompt() {
  let dialog_buttons = document.querySelectorAll("dialog button");
  let ok_button = dialog_buttons[0];
  let cancel_button = dialog_buttons[1];
  let dialog_para = document.querySelector("dialog p");
  let input_field = document.querySelector("dialog input");
  let output_element = document.querySelector("output");

  // Undo changes common to alert, confirm, and prompt
  undo_changes();

  // Make fields blank and respond to user prompt
  let name_val = input_field.value;
  name_val = DOMPurify.sanitize(name_val, {ALLOWED_TAGS: []});
  dialog_para.innerHTML = "";
  input_field.value = "";

  if(name_val == "") {
    output_element.innerHTML = "User didn't enter anything";
  }
  else {
    output_element.innerHTML = `Hello, ${name_val}! How are you?`;
  }

  // Remove event listeners
  ok_button.removeEventListener('click', ok_prompt);
  cancel_button.removeEventListener('click', cancel_prompt);
}

function cancel_prompt() {
  let dialog_buttons = document.querySelectorAll("dialog button");
  let ok_button = dialog_buttons[0];
  let cancel_button = dialog_buttons[1];
  let dialog_para = document.querySelector("dialog p");
  let input_field = document.querySelector("dialog input");
  let output_element = document.querySelector("output");

  // Undo changes common to alert, confirm, and prompt
  undo_changes();

  // Make fields blank
  input_field.value = "";
  dialog_para.innerHTML = "";
  output_element.innerHTML = "User didn't enter anything";

  // Remove event listeners
  ok_button.removeEventListener('click', ok_prompt);
  cancel_button.removeEventListener('click', cancel_prompt);
}

function undo_changes() {
  let dialog_element = document.querySelector("dialog");
  let body_element = document.querySelector("body");

  // Make dialog invisible
  dialog_element.removeAttribute("open");
  dialog_element.removeAttribute("style");

  // Make everything clickable again
  body_element.removeAttribute("style");

  // Undim everything
  opacity_change(1);
}

export function popup_edit() {
  // Display the dialog element and make everything else dim
  let dialog_element = document.querySelector("dialog");
  dialog_element.setAttribute("open", "");
  opacity_change(0.5);

  // Make only the dialog element clickable
  dialog_element.style.pointerEvents = "all";
  let body_element = document.querySelector("body");
  body_element.style.pointerEvents = "none";  
}

export function opacity_change(opacity) {
  let main_element = document.querySelector("main");
  let header_element = document.querySelector("header");

  if(opacity == 1) {
    // Undim
    for(let i = 0; i < main_element.children.length; i++) {
      if(main_element.children[i].nodeName == "DIALOG") {
        continue;
      }
      else {
        main_element.children[i].removeAttribute("style");
      }
    }
    header_element.removeAttribute("style");
  }
  else {
    // Dim
    for(let i = 0; i < main_element.children.length; i++) {
      if(main_element.children[i].nodeName == "DIALOG") {
        continue;
      }
      else {
        main_element.children[i].style.opacity = opacity;
      }
    }
    header_element.style.opacity = opacity;
  }
}