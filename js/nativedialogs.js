window.onload = native_dialogs;

// Binds respective functions to click on buttons
function native_dialogs() {
  let alert_button = document.getElementById("alert");
  alert_button.addEventListener('click', alert_message);

  let confirm_button = document.getElementById("confirm");  
  confirm_button.addEventListener('click', confirm_message);

  let prompt_button = document.getElementById("prompt");
  prompt_button.addEventListener('click', prompt_message);

  let safer_prompt_button = document.getElementById("safer_prompt");
  safer_prompt_button.addEventListener('click', safer_prompt_message);
}

function alert_message() {
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";

  setTimeout(() => {
    alert("Intruder Alert, Intruder Alert!");
  }, 10);
}

function confirm_message() {
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";
  let message = "Press OK or cancel";

  setTimeout(() => {
    if(confirm(message)) {
      message = "The value returned by the confirm method is : true";
    }
    else {
      message = "The value returned by the confirm method is : false";
    }
    output_element.innerHTML = message;
  }, 10);
}

function prompt_message() {
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";

  setTimeout(() => {
    let name_val = prompt("Please enter your name:");

    if(name_val) {
      output_element.innerHTML = `Hello, ${name_val}! How are you?`;
    }
    else {
      output_element.innerHTML = "User didn't enter anything";
    }
  }, 10);
}

function safer_prompt_message() {
  let output_element = document.querySelector("output");
  output_element.innerHTML = "";

  setTimeout(() => {
    let name_val = prompt("Please enter your name:");
    name_val = DOMPurify.sanitize(name_val, {ALLOWED_TAGS: []});
  
    if(name_val) {
      output_element.innerHTML = `Hello, ${name_val}! How are you?`;
    }
    else {
      output_element.innerHTML = "User didn't enter anything";
    }
  }, 10);
}