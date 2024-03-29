/********************************************************************************************
 * Author: Mike Cumberworth
 * CS 340, Section 400 Databases Fall 2019 
 *******************************************************************************************/

/******************************************************************
"App"-level setup 
******************************************************************/

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
  this.clearTable = clearTable;
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

// Called only on initial page load in callback to get all media items
function createEntries(list){
  this.entries = [];
  this.clearTable();
  let i = 0;
  let len = list.length;
  if (len === 0){
    return;
  }
  for (i; i < len; i++){
    let entry = new DataModel(list[i]);
    this.entries.push(entry);
  }
  this.updateTable();
}

/********************************************************************************************
 Add Event Listeners
 *******************************************************************************************/
function addListeners(){

  console.log("Adding listeners...", this.addMediaItem);

  document.getElementById('addGenre').addEventListener('click', function(event){
    let newGenre = document.getElementById('newGenre').value;
    if (validateEntry(newGenre)){
      newGenre = capitalize(newGenre);
      console.log(newGenre);
      addGenre(newGenre, mList);
      return;
    }
    alert('Cannot add a blank genre.');
  });

  document.getElementById('genre_filter').addEventListener('change', function(event){
    console.log(event);
    let index = event.target.value;
    index == -1 ? getAllMediaItems() : getMediaByGenre(index, mList);
  });
  
  document.getElementById('type_filter').addEventListener('change', function(event){
    console.log(event);
    let index = event.target.value;
    index == -1 ? getAllMediaItems() : getMediaByType(index, mList);
  });
  
  document.getElementById('saveBtn').addEventListener('click', function(event) {
    let id = document.getElementById('entryId').value;
    console.log("Add/Edit btn clicked with ID: ", id, mList);
    let entry = getFormValues();
    
      console.log('Adding Entry...');
    if (validateEntry(entry.title)){
      if (!id || id == -1){
        addMediaItem(entry, mList);
      }
      else {
        console.log('Updating Entry...');
        updateEntry(entry,mList);
      }  
    }
    else {
      alert("Invalid entry! Please provide a title.");
    }
  });
}

/********************************************************************************************
 HTTP Requests
 - Using old-school XMLHttpRequest because that's what CS290 uses. Should've used fetch() 
 *******************************************************************************************/
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

function getMediaByGenre(genre_id, context){
  let req = new XMLHttpRequest();
  const self = context;
  req.open('GET', '/media_items/all_items/genre/'+ genre_id, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      let response = JSON.parse(req.responseText);
      console.log(response);
      self.createEntries(response);     
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(null);
  event.preventDefault();
}

function getMediaByType(media_type, context){
  let req = new XMLHttpRequest();
  const self = context;
  console.log("Filter by Media Type: ", media_type);
  req.open('GET', '/media_items/all_items/type/'+ media_type, true);
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

function getMediaItemById(context, id){
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

function addGenre(genre, context){
  let self = context;
  let payload = { 'genre_name' : genre};
  console.log('Genre to add: ', payload);
  let req = new XMLHttpRequest();  
  req.open('POST', '/add_genre', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      payload.id = req.responseText.insertId;
      alert("Genre added!");
      window.location.href = "/media_items";      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  //event.preventDefault();
}

function addMediaItem(payload, context){
  let self = context;
  let req = new XMLHttpRequest();  
  req.open('POST', '/media_items', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      clearForm();
      let res = JSON.parse(req.responseText);
      let entry = new DataModel(payload);
      entry.id = res.insertId;
      console.log("id?:", entry.id, res);
      self.entries.push(entry);
      self.addTableRow(entry);
      alert("Media Item added!");      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

function updateEntry(entry, context){
  let self = context;
  let url = '/media_items';
  let req = new XMLHttpRequest();
  req.open('PUT', url, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      // alert("Data successfully edited!");  //replace this w/nice CSS animation instead if there's time?
      clearForm();
      let res = JSON.parse(req.responseText);
      let index = self.entries.findIndex(e => e.id === entry.media_item_id);
      let e = new DataModel(entry);
      self.entries.splice(index,1, e);
      self.editTableRowAtIndex(e, index);
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

/********************************************************************************************
 DOM Manipulation functions for filling & getting form values and prepping payload to send
*********************************************************************************************/
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
      if (option.value === ""){ return acc; }
      acc.push({genre_id : option.value, genre_name : option.text});
    }
    return acc;
  }, []);
  let payload = {
    media_item_id : +id, 
    title: title,
    original_language_title: oTitle,
    publication_year: +pubYr,
    media_type: type,
    genres: genres,
    avg_user_rating : rating
  }
  console.log(payload)
  return payload;
}

function editEntry(e){
  let row = e.target.parentElement.rowIndex - 1;
  let entry = this.entries[row];
  let self = this;
  setFormTitle('Edit Item');
  this.fillForm(entry);
}

function fillForm(obj){
  console.log('Filling form with entry:', obj);
  document.getElementById('entryId').value = obj.id;
  document.getElementById('itemTitle').value = obj.title;
  document.getElementById('originalLangTitle').value = obj.o_title;
  document.getElementById('mediaType').value = obj.m_type;
  document.getElementById('pubYear').value = obj.pub_year;
  setFormGenreValues(obj.genres);
}

function setFormGenreValues(list){
  let genreList = Array.from(document.getElementById('genres').options);
  console.log(genreList);
  if (list.length > 0){
    list.forEach(v => {
      genreList.find(g => +g.value == v.genre_id).selected = true;
    });
  }
}

function setFormTitle(title){
  document.getElementsByClassName('form-title')[0].textContent = title;
}

function clearForm(){
  setFormTitle('Add Item');
  document.getElementById('theForm').reset();
  document.getElementById('entryId').value = -1; // Need to explicitly reset hidden value or else it retains last entry's id
}


/********************************************************************************************
 Minor utility functions
 *******************************************************************************************/
function validateEntry(entry){
  if (typeof entry != 'string'){
    return false;
  }
  if (!entry || entry.length === 0){
    return false;
  }
  return true;
}

function capitalize(s) {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}