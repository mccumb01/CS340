
const guestBtn = document.getElementById('guestUserLink');
const newUserSubmit = document.getElementById('newUserSubmit');
const newSession = document.getElementById('newSessionSubmit');
const cancelBtns = document.getElementsByClassName('cancel-btn');

let loggedIn = false;
let showWarning = true;

window.onload = function(){
  setTimeout(hideWarning, 3000);
}

newSession.addEventListener('click', (event) => {
  console.log('login btn clicked!');
  login();
  event.preventDefault();
});

newUserSubmit.addEventListener('click', (event) => {
  console.log('new user clicked!');
  createUser();
  event.preventDefault();
});

guestBtn.addEventListener('click', (event) => {
  console.log('Guest login clicked!');
  login('Guest User');
  event.preventDefault();
});

for (let btn of cancelBtns) {
  btn.addEventListener('click', (event) => {
    console.log('Cancel Btn clicked!');
    clearForms();
    event.preventDefault();
  });  
};

function hideWarning(){
  showWarning = false;
  let box = document.getElementById('loginWarning');
  box.classList.add('hidden');  
}

function login(name){
  if (!name || name.length === 0){
    name = document.getElementById('username').value;
  }
  console.log(name);
  pw = document.getElementById('pw').value;
  let req = new XMLHttpRequest();  
  let payload = {username: name, pw : pw, "New Session" : "New Session"};
  req.open('POST', '/login', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    console.log(req.status, response);
    if(req.status >= 200 && req.status < 400){
      window.location.href = "/user";
      clearForms();
    } else {
      alert('Login Error: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

function createUser(){
  name = document.getElementById('new_username').value;
  email = document.getElementById('new_user_email').value;
  pw = document.getElementById('new_pw').value;
  pw2 = document.getElementById('new_pw2').value;
  let req = new XMLHttpRequest();  
  let payload = {username: name, user_email: email, pw : pw, "New User" : "New User"};
  req.open('POST', '/user-info', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    console.log(req.status, response);
    if(req.status >= 200 && req.status < 400){
      window.location.href = "/user";
      clearForms();
    } else {
      alert('Error Creating User: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();

}

function clearForms(){
  document.getElementById('username').value = '';
  document.getElementById('pw').value = '';
  document.getElementById('new_username').value = '';
  document.getElementById('new_user_email').value = '';
  document.getElementById('new_pw').value = '';
  document.getElementById('new_pw2').value = '';
  
}