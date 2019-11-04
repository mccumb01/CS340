
let button = document.querySelector('#submit')
let input = document.querySelector('#search')
let output = document.querySelector('#output')

button.addEventListener('click', (e)=>{
    getDataFromItunesAPI()
})
var visible=0;
function getDataFromItunesAPI(){
    let url='https://itunes.apple.com/search?term='+input.value+'&limit=5'
    let cors = 'https://cors-anywhere.herokuapp.com/'
    fetch(cors+url)
    .then( data => data.json() )
    .then( json => {
        
        console.log(json)

        if (output.childElementCount >0){
            output.innerHTML=''
        }
        var body = document.getElementsByTagName("body")[0];
        // creates a <table> element and a <tbody> element
        var tbl = document.createElement("table");
        // Create an empty <thead> element and add it to the table:
        var header = document.createElement("thead");
        var tblBody = document.createElement("tbody");
        var titleRow = document.createElement("tr")
        var titleCell1 = document.createElement("td")
        var titleCellText1 = document.createTextNode("Poster")
        var titleCell2 = document.createElement("td")
        var titleCellText2 = document.createTextNode("Title")
        var titleCell3 = document.createElement("td")
        var titleCellText3 = document.createTextNode("Type")
        var titleCell4 = document.createElement("td")
        var titleCellText4 = document.createTextNode("Release Date")
        titleCell1.appendChild(titleCellText1);
        titleCell2.appendChild(titleCellText2);
        titleCell3.appendChild(titleCellText3);
        titleCell4.appendChild(titleCellText4);
        titleRow.appendChild(titleCell1);
        titleRow.appendChild(titleCell2);
        titleRow.appendChild(titleCell3);
        titleRow.appendChild(titleCell4);
        header.appendChild(titleRow);
        tbl.appendChild(header);
        output.appendChild(tbl);
        result = json.results
        result.forEach(function(item){
        var row = document.createElement("tr")
        var cell1 = document.createElement("td")
        var cellText1 = document.createTextNode(item.trackCensoredName)
        var cell2 = document.createElement("td")
        var cellText2 = document.createTextNode(item.kind)
        var cell3 = document.createElement("td")
        var date = new Date(item.releaseDate)
        var cellText3 = document.createTextNode(date.getFullYear())
        var img = document.createElement('img')
        var imgCell = document.createElement("td")
        link_img=item.artworkUrl100
        img.src = link_img
        
        cell1.appendChild(cellText1);
        cell2.appendChild(cellText2);
        cell3.appendChild(cellText3);
        imgCell.appendChild(img);
        row.appendChild(imgCell);
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        tblBody.appendChild(row);
        tbl.appendChild(tblBody);
        output.appendChild(tbl);

        // sets the border attribute of tbl to 2;
        tbl.setAttribute("border", "2");
        });
    }).catch(error => console.log("ERROR!"))

}


var mediaType;
var a = document.getElementById('activitySelector');
a.addEventListener('change', function() {
  mediaType=this.value;
}, false);

function yearExtractor(){
    var json = "\"2014-01-01T23:28:56.782Z\"";

    var dateStr = JSON.parse(json);  
    console.log(dateStr); // 2014-01-01T23:28:56.782Z
        
    var date = new Date(dateStr);
    console.log(date);  
}
// Create AJAX request

/*

var req = new XMLHttpRequest();

req.open("GET", "/get-data", true);

req.setRequestHeader('Content-Type', 'application/json');

// Add Event Listener to check valid status
req.addEventListener('load',function(){

  if(req.status >= 200 && req.status < 400){

    createTable(JSON.parse(req.responseText));
  
  }
 
 });

req.send();

//Create table
function createTable(dataArray){

  var tableDiv = document.getElementById("queue-table");

  if(tableDiv.firstChild != null){

    tableDiv.removeChild(tableDiv.firstChild);
  }
  //Create exercise table 
  var table = document.createElement("table");

  // Create header row
  var headRow = document.createElement("tr");
  var headCell1 = document.createElement("th");
  var headCell2 = document.createElement("th");
  var headCell3 = document.createElement("th");
  var headCell4 = document.createElement("th");
  var headCell5 = document.createElement("th");
  var headCell6 = document.createElement("th");
  var headCell7 = document.createElement("th");

  // Populate header cells with appropriate titles
  headCell1.innerText = "Queue ID";
  headRow.appendChild(headCell1);
  headCell2.innerText = "Status";
  headRow.appendChild(headCell2);
  headCell3.innerText = "Priority";
  headRow.appendChild(headCell3);
  headCell4.innerText = "Date Added";
  headRow.appendChild(headCell4);

  table.appendChild(headRow);

  // For each exercise returned in array, add a row with exercise information

  dataArray.forEach(function(row){
    var dataRow = document.createElement("tr");
    var dateCell = document.createElement("td");
    var nameCell = document.createElement("td");
    var repCell = document.createElement("td");
    var weightCell = document.createElement("td");
    var unitCell = document.createElement("td");
    var editCell = document.createElement("td");
    var deleteCell = document.createElement("td");

    if(row["date"] != null){
      dateCell.innerText = row["date"].substring(0,10);
    }
    dataRow.appendChild(dateCell);
    nameCell.innerText = row["name"];
    dataRow.appendChild(nameCell);
    repCell.innerText = row["reps"];
    dataRow.appendChild(repCell);
    weightCell.innerText = row["weight"];
    dataRow.appendChild(weightCell);
    if(row["lbs"] == 1){
      unitCell.innerText = "lbs";
    }
    else if(row["lbs"] == 0){
      unitCell.innerText = "kgs";
    }
    dataRow.appendChild(unitCell);

      // DOM creation of Edit option button
      var form = document.createElement('form');
        var inputId = document.createElement('input');
          inputId.setAttribute('type',"hidden");
          inputId.setAttribute('value',row["id"]);
        var button = document.createElement('input');
          button.setAttribute('type',"button");
          button.setAttribute('value', "Edit");
          button.setAttribute('class', "edit");
        form.appendChild(inputId);
        form.appendChild(button);
      editCell.appendChild(form);
    dataRow.appendChild(editCell);

      // DOM creation of Delete option button
    var form = document.createElement('form');
      var inputId = document.createElement('input');
        inputId.setAttribute('type',"hidden");
        inputId.setAttribute('value',row["id"]);
      var button = document.createElement('input');
        button.setAttribute('type',"button");
        button.setAttribute('value', "Delete");
        button.setAttribute('class', "delete");
      form.appendChild(inputId);
      form.appendChild(button);
    deleteCell.appendChild(form);
    dataRow.appendChild(deleteCell);

    table.appendChild(dataRow);
  });
  tableDiv.appendChild(table);

  // Add click functions to edit buttons
  var editButtons = document.getElementsByClassName("edit");
  for (var i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', editEvent, false);
  }

  // Add click functions to delete buttons
  var deleteButtons = document.getElementsByClassName("delete");
  for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener('click', deleteEvent, false);
  }
}

// Clicking to add exercise will send payload of information to store
document.getElementById("addExercise").addEventListener("click", function(e){
  var req = new XMLHttpRequest();
  var payload = {date:null, name:null, reps:null, weight:null, unit:null};
    payload.date = document.getElementById('new-date').value || null;
    document.getElementById('new-date').value = null;
    payload.name = document.getElementById('new-name').value || null;
    document.getElementById('new-name').value = null;
    payload.reps = document.getElementById('new-reps').value || null;
    document.getElementById('new-reps').value = null;
    payload.weight = document.getElementById('new-weight').value || null;
    document.getElementById('new-weight').value = null;
    if(document.getElementById('new-unit').checked == true){
      payload.unit = 1;
    }
    else{
      payload.unit = 0;
    }

    if(payload.name == null){
      alert("Exercise name missing. Try Again!");
      e.preventDefault();
      return;
    }
  req.open("POST", "/add", true);
  req.setRequestHeader('Content-Type', 'application/json');

  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      createTable(JSON.parse(req.responseText));
    }
    else {
        console.log("Error in network request: " + req.statusText);
      }
  });
  req.send(JSON.stringify(payload));
  e.preventDefault();
});

// After update button is clicked, send values to update database
function updateEvent(event){
  var id = this.previousSibling.value;
  var req = new XMLHttpRequest();
  var payload = {id:null, date:null, name:null, reps:null, weight:null, unit:null};
    payload.date = document.getElementById('update-date').value || null;
    payload.name = document.getElementById('update-name').value;
    payload.reps = document.getElementById('update-reps').value || null;
    payload.weight = document.getElementById('update-weight').value || null;
    payload.unit = document.getElementById('update-unit').value;
    payload.id = id;
  req.open("POST", "/update", true);
  req.setRequestHeader('Content-Type', 'application/json');

  req.addEventListener('load',function(){
    if(req.status >= 200 && req.status < 400){
      createTable(JSON.parse(req.responseText));
    }
    else {
        console.log("Error in network request: " + req.statusText);
      }
  });
  req.send(JSON.stringify(payload));
  event.preventDefault();
}

// If an edit button is clicked, make the selected row ready to edit 
function editEvent(event){
  var updateButtons = document.getElementsByClassName("update");
  if(updateButtons.length > 0){
      alert("Finish modifying before continuing");
      return;
  }
  var curRow = this.parentElement.parentElement.parentElement; 
  // Replace date field -> form input
  var dateInput = document.createElement("input");
  dateInput.setAttribute("value",curRow.children[0].innerText);
  dateInput.setAttribute("type", "date");
  dateInput.setAttribute("id","update-date");
  curRow.children[0].innerText = "";
  curRow.children[0].appendChild(dateInput);

  // Replace name field -> form input
  var nameInput = document.createElement("input");
  nameInput.setAttribute("value",curRow.children[1].innerText);
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id","update-name");
  curRow.children[1].innerText = "";
  curRow.children[1].appendChild(nameInput);

  // Replace reps field -> form input
  var repInput = document.createElement("input");
  repInput.setAttribute("value",curRow.children[2].innerText);
  repInput.setAttribute("type", "number");
  repInput.setAttribute("id","update-reps");
  repInput.setAttribute("class","num-input");
  curRow.children[2].innerText = "";
  curRow.children[2].appendChild(repInput);

  // Replace weight field -> form input
  var weightInput = document.createElement("input");
  weightInput.setAttribute("value",curRow.children[3].innerText);
  weightInput.setAttribute("type", "number");
  weightInput.setAttribute("id","update-weight");
  weightInput.setAttribute("class","num-input");
  curRow.children[3].innerText = "";
  curRow.children[3].appendChild(weightInput);

  // Replace unit field -> drop down
  var unitInput = document.createElement("select");
  unitInput.setAttribute("id","update-unit");
    var option1 = document.createElement("option");
    option1.setAttribute("value","1")
    option1.innerText = "lbs";
    unitInput.appendChild(option1);

    var option2 = document.createElement("option");
    option2.setAttribute("value","0")
    option2.innerText = "kgs";
    unitInput.appendChild(option2);

  if(curRow.children[4].innerText == "lbs"){
    option1.selected = true;
  }
  else{
    option2.selected = true;
  }
  curRow.children[4].innerText = "";
  curRow.children[4].appendChild(unitInput);

  // Replace edit button -> update button
var id = this.previousSibling.value;
  curRow.children[5].innerHTML = '';
  var form = document.createElement('form');
  var updateButton = document.createElement('form');
  var inputId = document.createElement('input');
    inputId.setAttribute('type',"hidden");
    inputId.setAttribute('value',id);
  var button = document.createElement('input');
    button.setAttribute('type',"button");
    button.setAttribute('value', "Update");
    button.setAttribute('class', "update");
  form.appendChild(inputId);
  form.appendChild(button);
  curRow.children[5].appendChild(form);

  // Add click event to newest update button
  button.addEventListener("click", updateEvent, false);
  event.preventDefault();
}

// When a delete button is clicked, send that button's data to server to be deleted
function deleteEvent(event){
  var req = new XMLHttpRequest();
  var id = this.previousSibling.value;
  var payload = {"id":id};
  req.open("POST", "/delete", true);
  req.setRequestHeader("Content-Type","application/json");
  req.addEventListener("load",function(){
    if(req.status >= 200 && req.status < 400){
      createTable(JSON.parse(req.responseText));
    }
    else {
        console.log("Error in network request: " + req.statusText);
      }
  });
  req.send(JSON.stringify(payload));
  event.preventDefault();
}
*/