/******************************************************************
Functions that make Ajax calls to the server  
******************************************************************/

function getWorkoutList(){
  let req = new XMLHttpRequest();
  let url = this.base + 'workouts';
  req.open('GET', url, true);
  const self = this;
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      let response = JSON.parse(req.responseText);
      self.createEntries(response);
    } else {
      alert("Sorry, your request did not work: " + req.statusText);
    }
  });
  req.send(null);
}

// Turns out this isn't necessary, but it's here if there's a reason for it.
function getExerciseById(id){
  let req = new XMLHttpRequest();
    let url = this.base + 'workouts' + '/?id='+id;
    req.open('GET', url, true);
    req.addEventListener('load',function(){
      if(req.status >= 200 && req.status < 400){
        let response = JSON.parse(req.responseText);
      } else {
        alert("Sorry, your request did not work: " + req.statusText);
        console.error(req.error);
      }
    });
    req.send(null);
}

function addEntry(context){
  let self = context;
  console.log('Submit btn clicked');
  let req = new XMLHttpRequest();
  let entry = new DataModel(getFormValues());
  let payload = entry;
  let url = this.base + 'workouts';
  req.open('POST', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      // alert("Data successfully saved!"); //replace this w/nice CSS animation instead if there's time?
      let res = JSON.parse(req.responseText);
      entry.id = res.insertId;
      self.entries.push(entry);
      self.addTableRow(entry);
      clearForm();
    } else {
      console.error("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
};

function updateEntry(context){
  let self = context;
  let entry = new DataModel(getFormValues());
  let url = this.base + 'workouts/?id=' + entry.id;
  let req = new XMLHttpRequest();
  req.open('PUT', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      // alert("Data successfully edited!");  //replace this w/nice CSS animation instead if there's time?
      let res = JSON.parse(req.responseText);
      let index = self.entries.findIndex(e => e.id == entry.id);
      self.entries.splice(index,1, entry);
      self.editTableRowAtIndex(entry, index);
      clearForm();
    } else {
      console.error("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(entry));
  event.preventDefault();
}

function deleteEntry(e){
  let row = e.target.parentElement.rowIndex - 1;
  console.log("Delete btn clicked for row at index " , row);
  let entry = this.entries[row];
  let self = this;
  let req = new XMLHttpRequest();
  req.open('DELETE', '/workouts/?id='+entry.id, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      // alert("Row deleted");
      self.entries.splice(row, 1);
      self.removeTableRowAtIndex(row);
    } else {
      console.error("Error in network request: " + req.statusText. req.error);
    }});
  req.send(null);
  event.preventDefault();
}