window.onload = function(){
  console.log('Media Items page loaded ...');
}

document.getElementById('addGenre').addEventListener('click', function(event){
  addGenre(event);
});

document.getElementById('saveBtn').addEventListener('click', function(event){
  addMediaItem(event);
});

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