// window.onload = function(){
//   console.log('Media Items page loaded ...');
//   getAllItems();
// }

document.getElementById('addGenre').addEventListener('click', function(event){
  addGenre(event);
});

document.getElementById('saveBtn').addEventListener('click', function(event){
  addMediaItem(event);
});

function getAllMediaItems(){
  let req = new XMLHttpRequest();
  const self = this;
  req.open('GET', '/media_items/all_items', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      console.log(req.responseText);
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

function addGenre(e){
  let ng = document.getElementById('newGenre');
  let payload = { 'genre_name' : ng.value};
  console.log('Genre to add: ', payload);
  let req = new XMLHttpRequest();  
  req.open('POST', '/add_genre', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      alert("Genre added!");      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

function addMediaItem(e){
  let payload = getFormValues();
  console.log('Item to add: ', payload);
  let req = new XMLHttpRequest();  
  req.open('POST', '/media_items', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load',function(response){
    if(req.status >= 200 && req.status < 400){
      console.log("item id", req.responseText);
      alert("Media Item added!");      
    } else {
      console.log('Error in network request: ' + req.statusText);
    }});
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

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

function getFormValues(){
  let title = document.getElementById('itemTitle').value;
  let oTitle = document.getElementById('originalLangTitle').value;
  // let pubYr = new Date(document.getElementById('pubYear').value).getFullYear();
  let pubYr = document.getElementById('pubYear').value;
  let type = document.getElementById('mediaType').value;
  let gSel = document.getElementById('genres');
  // let rating = 0;
  //https://stackoverflow.com/questions/5866169/how-to-get-all-selected-values-of-a-multiple-select-box
  let genres = Array(...gSel.options).reduce((acc, option) => {
    if (option.selected === true) {
      acc.push(option.value);
    }
    return acc;
  }, []);
  let payload = {
    title: title,
    original_language_title: oTitle,
    publication_year: pubYr,
    media_type: type,
    genres: genres
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
  //document.querySelector('input[name="genres"][value="'+obj.genres+'"]').checked = true;  
}

function clearForm(){
  document.getElementById('theForm').reset();
  document.getElementById('entryId').value = -1; // Need to explicit reset hidden value or else it retains last entry's id
}