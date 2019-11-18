window.onload = function(){
  console.log('Media Items page loaded ...');
}

document.getElementById('addGenre').addEventListener('click', function(event){
  addGenre(event);
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