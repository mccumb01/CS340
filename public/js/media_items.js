
// window.onload = function(){
//   console.log('Media Items page loaded ...');
//   getAllItems();
// }

/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 290, Section 400 Web Development Summer 2019 
 * 
 * Assignment Database Interaction
 * External sites referenced while working on the client-side of this project:
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 https://stackoverflow.com/questions/1056728/where-can-i-find-documentation-on-formatting-a-date-in-javascript 
 https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement
 https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
 https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reportValidity 
 https://stackoverflow.com/questions/17112852/get-the-new-record-primary-key-id-from-mysql-insert-query
 https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView 
 https://stackoverflow.com/questions/7852986/javascript-scroll-to-nth-row-in-a-table?noredirect=1&lq=1
 https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations 
 https://stackoverflow.com/questions/4618733/set-selected-radio-from-radio-group-with-a-value?noredirect=1&lq=1
 *******************************************************************************************/


/******************************************************************
"App"-level setup 
******************************************************************/

// let entries = [];
// let genres = [];
let mList;
window.onload = function(){
  mList = new MediaList();
  mList.getAllMediaItems();
  // tracker.getExerciseById(2);
  mList.addListeners();
  mList.clearForm();
}

function DataModel(input){
  return {
    id: input.media_item_id || null,
    title: input.title || "",
    o_title: input.original_language_title || null,
    m_type: input.media_type || null,
    pub_year: input.publication_year || null,
    rating: input.avg_user_rating,
    genres: input.genres || []
  }
}

// Maybe this approach isn't necessary, and it's clunky ... but it keeps things out of global scope this way.
function MediaList(){
  this.base = window.location;
  this.entries = [];
  this.genres = [];
  this.getAllMediaItems = getAllMediaItems;
  this.getMediaItemById = getMediaItemById;
  this.createEntries = createEntries;
  this.updateTable = updateTable;
  this.addTableRow = addTableRow;
  this.editTableRowAtIndex = editTableRowAtIndex;
  this.removeTableRowAtIndex = removeTableRowAtIndex;
  this.addMediaItem = addMediaItem;
  this.editEntry = editEntry;
  this.updateEntry = updateEntry;
  this.deleteEntry = deleteEntry;
  this.addListeners = addListeners;
  this.fillForm = fillForm;
  this.clearForm = clearForm;
  this.getFormValues = getFormValues;
}

// Called only on initial page load in getWorkoutList callback
function createEntries(list){
  let i = 0;
  let len = list.length;
  for (i; i < len; i++){
    let entry = new DataModel(list[i]);
    this.entries.push(entry);
  }
  this.updateTable();
}

function addListeners(){

  console.log("Adding listeners...", this.addMediaItem);

  document.getElementById('addGenre').addEventListener('click', function(event){
    addGenre(mList);
  });
  
  document.getElementById('saveBtn').addEventListener('click', function(event) {
    let id = document.getElementById('entryId').value;
    console.log("Add/Edit btn clicked with ID: ", id, mList);
    if (!id || id == -1){
      console.log('Adding Entry...');
      addMediaItem(mList);
    }
    else {
      console.log('Updating Entry...');
      updateEntry(mList);
    }
  });
}


function getAllMediaItems(){
  let req = new XMLHttpRequest();
  const self = this;
  req.open('GET', '/media_items/all_items', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      console.log(self);
      let response = JSON.parse(req.responseText);
      self.createEntries(response);     
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(null);
  event.preventDefault();
}

function getMediaItemById(id){
  let req = new XMLHttpRequest();
  req.open('GET', '//id='+id, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      console.log("All the items!");      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(null);
  event.preventDefault();
}

function addGenre(context){
  let self = context;
  let ng = document.getElementById('newGenre');
  let payload = { 'genre_name' : ng.value};
  console.log('Genre to add: ', payload);
  let req = new XMLHttpRequest();  
  req.open('POST', '/add_genre', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      payload.id = req.responseText.insertId;
      alert("Genre added!");      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  //event.preventDefault();
}

function addMediaItem(context){
  let self = context;
  let payload = getFormValues();
  let entry = new DataModel(payload);
  let req = new XMLHttpRequest();  
  req.open('POST', '/media_items', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      clearForm();
      console.log("self?", self, "this?", this);
      entry.id = req.responseText.insertId;
      self.entries.push(entry);
      addTableRow(entry);
      alert("Media Item added!");      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

function addGenres(){

}

function updateEntry(context){
  let self = context;
  let entry = getFormValues();
  let url = '/media_items';
  let req = new XMLHttpRequest();
  req.open('PUT', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      // alert("Data successfully edited!");  //replace this w/nice CSS animation instead if there's time?
      clearForm();
      let res = JSON.parse(req.responseText);
      let index = self.entries.findIndex(e => e.id == entry.id);
      self.entries.splice(index,1, entry);
      self.editTableRowAtIndex(entry, index);
    } else {
      console.error("Error in network request: " + req.statusText);
    }});
  req.send(JSON.stringify(entry));
  event.preventDefault();
}

function deleteEntry(e){
  console.log("Delete btn clicked: ", e, this);
  let row = e.target.parentElement.parentElement.rowIndex - 1;
  let entry = this.entries[row];
  let self = this;
  console.log("Delete btn clicked for row at index " , row, " with id ", entry.id);
  let payload = {"id" : entry.id};
  let req = new XMLHttpRequest();
  req.open('DELETE', '/media_items', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      // alert("Row deleted");
      self.entries.splice(row, 1);
      self.removeTableRowAtIndex(row);
    } else {
      console.error("Error in network request: " + req.statusText. req.error);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

function getFormValues(){
  let id = document.getElementById('entryId').value;
  let title = document.getElementById('itemTitle').value;
  let oTitle = document.getElementById('originalLangTitle').value;
  let pubYr = document.getElementById('pubYear').value;
  let type = document.getElementById('mediaType').value;
  let gSel = document.getElementById('genres');
  let rating = document.getElementById('user_rating');
  //https://stackoverflow.com/questions/5866169/how-to-get-all-selected-values-of-a-multiple-select-box
  let genres = Array(...gSel.options).reduce((acc, option) => {
    if (option.selected === true) {
      acc.push(option.value);
    }
    return acc;
  }, []);
  let payload = {
    media_item_id : id,
    title: title,
    original_language_title: oTitle,
    publication_year: pubYr,
    media_type: type,
    genres: genres,
    avg_user_rating : rating
  }
  
  return payload;
}

function editEntry(e){
  let row = e.target.parentElement.rowIndex - 1;
  let entry = this.entries[row];
  let self = this;
  this.fillForm(entry);
}

function fillForm(obj){
  console.log('Filling form with entry:', obj);
  document.getElementById('entryId').value = obj.id;
  document.getElementById('itemTitle').value = obj.title;
  document.getElementById('originalLangTitle').value = obj.o_title;
  document.getElementById('mediaType').value = obj.m_type;
  document.getElementById('pubYear').value = obj.pub_year;
  document.getElementById('genres').value = obj.genres;
  //document.querySelector('input[name="genres"][value="'+obj.genres+'"]').checked = true;  
}

function clearForm(){
  document.getElementById('theForm').reset();
  document.getElementById('entryId').value = -1; // Need to explicit reset hidden value or else it retains last entry's id
}