window.onload = function(){

}


let isEditing = false;
 
let userId = document.getElementById('userId').textContent;
let username = document.getElementById('profile_username').textContent;
let email = document.getElementById('profile_email').textContent;
let nameInput = document.getElementById('username');
let emailInput = document.getElementById('user_email');
const displayedText = document.getElementsByClassName('displayed-text');
let user = {user_id: userId, username: username, user_email: email};
console.log(displayedText);
const saveBtn = document.getElementById('saveBtn');
const editBtn = document.getElementById('editBtn');
const cancelBtn = document.getElementById('cancelBtn');

saveBtn.addEventListener('click', (event) => {
  console.log('Save Btn clicked!');
  saveEdits();
  toggleEdit();
  event.preventDefault();
});

editBtn.addEventListener('click', (event) => {
  console.log('Edit Btn clicked!');
  toggleEdit();
  event.preventDefault();
});

cancelBtn.addEventListener('click', (event) => {
  console.log('Cancel Btn clicked!');
  cancelEdit();
  event.preventDefault();
});

function toggleEdit(){
  // if currently editing, show inputs, and populate inputs w/current values
  isEditing = !isEditing;
  if (isEditing) {
    populateForm();
    showFormInputs();
  }
  // if not editing, hide form fields and show static text instead  
  else {
    hideFormInputs();
    clearForm();
  }
}

function showFormInputs(){
  nameInput.classList.remove('hidden');
  emailInput.classList.remove('hidden');
  editBtn.classList.add('hidden');
  saveBtn.classList.remove('hidden');
  Array.from(displayedText).forEach(el => el.classList.add('hidden'));
}

function hideFormInputs(){
  nameInput.classList.add('hidden');
  emailInput.classList.add('hidden');
  saveBtn.classList.add('hidden');
  editBtn.classList.remove('hidden');
  Array.from(displayedText).forEach(el => el.classList.remove('hidden'));
}

function cancelEdit(){
  isEditing = false;
  this.hideFormInputs(); 
}
 
function saveEdits() {
  console.log('Save Edits called!');
  // get the current values from the form fields
  let name = nameInput.value;
  let email = emailInput.value;
  // save them in a 'User' object format
  let payload = getFormValues();
  console.log("User vals to update:", payload);

  // send the User object to client-side API method for updating the User's info
    let req = new XMLHttpRequest();  
    req.open('PUT', '/user-info', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        clearForm();
        user = payload;
        displayedText[0].textContent = payload.username;
        displayedText[1].textContent = payload.user_email;
        alert('Data successfully updated!');          
      } else {
        console.log('Error in network request: ' + req.statusText);
      }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
}
function getFormValues(){
  console.log('Getting form values!');
  let vals = {
    'user_id': parseInt(userId),
    'username': nameInput.value,
    'user_email': emailInput.value
  };
  return vals;
}

function populateForm() {
  console.log('Populate form called! ', userId, nameInput, emailInput);
  nameInput.value = user.username;
  emailInput.value = user.user_email;
}

function clearForm(){
  nameInput.value = '';
  emailInput.value = '';
}