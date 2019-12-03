/********************************************************************************************
 * Author: Sriram Narayanan
 * CS 340, Section 400 Web Development Summer 2019 
 *******************************************************************************************/

let button = document.querySelector('#submit')
let input = document.getElementById('new-title')
console.log(input.value)
//querySelector('#input')
let output = document.querySelector('#output')

addTitleQueue();
button.addEventListener('click', (e)=>{
    
    var med_typ =document.getElementById("mediaSelector").value;
    console.log(med_typ)
    if (med_typ === "book"){
    getBookDataFromItunes()
    }
    else{
    getOtherDataFromItunes()
    }
})
var visible=0;
function getBookDataFromItunes(){
    let url='https://itunes.apple.com/search?term='+input.value+'&limit=5'
    let cors = 'https://cors-anywhere.herokuapp.com/'
    fetch(cors+url)
    .then( data => data.json() )
    .then( json => {
        
        console.log(json)
        
        console.log("bookDataFromItunes")
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
        var cellText1 = document.createTextNode(item.collectionCensoredName)
        var cell2 = document.createElement("td")
        var cellText2 = document.createTextNode(item.wrapperType)
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
function getOtherDataFromItunes(){
    let url='https://itunes.apple.com/search?term='+input.value+'&limit=5'
    let cors = 'https://cors-anywhere.herokuapp.com/'
    fetch(cors+url)
    .then( data => data.json() )
    .then( json => {
        
        console.log(json)

        console.log("otherDataFromItunes")
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
        var titleCell1 = document.createElement("th")
        var titleCellText1 = document.createTextNode("Poster")
        var titleCell2 = document.createElement("th")
        var titleCellText2 = document.createTextNode("Title")
        var titleCell3 = document.createElement("th")
        var titleCellText3 = document.createTextNode("Type")
        var titleCell4 = document.createElement("th")
        var titleCellText4 = document.createTextNode("Release Date")
        var titleCell5 = document.createElement("th")
        var titleCellText5 = document.createTextNode("Add to Queue")
        titleCell1.appendChild(titleCellText1);
        titleCell2.appendChild(titleCellText2);
        titleCell3.appendChild(titleCellText3);
        titleCell4.appendChild(titleCellText4);
        titleCell5.appendChild(titleCellText5);
        titleRow.appendChild(titleCell1);
        titleRow.appendChild(titleCell2);
        titleRow.appendChild(titleCell3);
        titleRow.appendChild(titleCell4);
        titleRow.appendChild(titleCell5);
        header.appendChild(titleRow);
        tbl.appendChild(header);
        output.appendChild(tbl);
        result = json.results;

        result.forEach(function(item, index){
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
            
            var addBtnCell = document.createElement('td');
            var addBtn = document.createElement("button");
            addBtn.textContent = "Add";
            addBtn.setAttribute('align', 'center');
            addBtn.setAttribute('type', 'button');
            addBtn.setAttribute('id', 'result-' + (index + 1));
            addBtn.setAttribute('class', 'add-btn');
            addBtn.addEventListener('click', $event =>{
                let id = $event.target.id.substring(7);
                addQueue(id);
                //alert("Adding item " + id + " : '" + item.trackCensoredName + "' to the queue!");
            });
            addBtnCell.appendChild(addBtn);


            cell1.appendChild(cellText1);
            cell2.appendChild(cellText2);
            cell3.appendChild(cellText3);
            imgCell.appendChild(img);
            row.appendChild(imgCell);
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(addBtnCell);
            tblBody.appendChild(row);
            tbl.appendChild(tblBody);
            output.appendChild(tbl);

            // sets the border attribute of tbl to 2; // preferable to use a CSS class
            tbl.setAttribute("border", "2");
        });
    }).catch(error => console.log("ERROR!"))

}
function addTitleQueue(){
    var tbody = document.getElementById("queue");
    var titleRow = document.createElement("tr")
    var titleCell2 = document.createElement("th")
    var titleCellText2 = document.createTextNode("Title")
    var titleCell3 = document.createElement("th")
    var titleCellText3 = document.createTextNode("Genre")
    var titleCell4 = document.createElement("th")
    var titleCellText4 = document.createTextNode("Status")
    var titleCell5 = document.createElement("th")
    var titleCellText5 = document.createTextNode("Date Added")
    var titleCell6 = document.createElement("th")
    var titleCellText6 = document.createTextNode("Priority")
    var titleCell7 = document.createElement("th")
    var titleCellText7 = document.createTextNode("Delete")
    titleCell2.appendChild(titleCellText2);
    titleCell3.appendChild(titleCellText3);
    titleCell4.appendChild(titleCellText4);
    titleCell5.appendChild(titleCellText5);
    titleCell6.appendChild(titleCellText6);
    titleCell7.appendChild(titleCellText7);
    titleRow.appendChild(titleCell2);
    titleRow.appendChild(titleCell3);
    titleRow.appendChild(titleCell4);
    titleRow.appendChild(titleCell5);
    titleRow.appendChild(titleCell6);
    titleRow.appendChild(titleCell7);
    tbody.appendChild(titleRow);
}

function addQueue(id){
    var sourceRow = document.getElementsByTagName('tbody');
    var mediaTitle = sourceRow[0].childNodes[id-1].childNodes[1].innerHTML;
    addMediaQueue(mediaTitle);
    var tbody = document.getElementById("queue");
    var titleRow = document.createElement("tr")
    /*var titleCell1 = document.createElement("th")
    var titleCellText1 = document.createTextNode(id)*/
    var titleCell2 = document.createElement("td")
    var titleCellText2 = document.createTextNode(mediaTitle)
    var titleCell3 = document.createElement("td")
    var titleCellText3 = document.createTextNode("Action")
    var titleCell4 = document.createElement("td")
    var status1 = document.createElement("select")
    var option1 = document.createElement("option")
    var option1text = document.createTextNode("Unwatched")
    var option2 = document.createElement("option")
    var option2text = document.createTextNode("In Progress")
    //var titleCellText4 = document.createTextNode("Status")
    var titleCell5 = document.createElement("td")
    var d = new Date();
    day = d.getDate();
    month = d.getMonth()+1;
    year = d.getFullYear()
    compDate = month+"-"+day+"-"+year
    var titleCellText5 = document.createTextNode(compDate)
    var titleCell6 = document.createElement("td")
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "name";
    checkbox.value = "value";
    checkbox.id = "id";

    var label = document.createElement('label')
    label.htmlFor = "id";
    label.appendChild(document.createTextNode('text for label after checkbox'));
    var titleCell7 = document.createElement("td");
    var element = document.createElement('input');
    //Assign different attributes to the element. 
    element.setAttribute("type", 'button');
    element.setAttribute("value", 'Delete');
    var titleCellText7 = document.createTextNode("Delete")
    titleCell2.appendChild(titleCellText2);
    titleCell3.appendChild(titleCellText3);
    titleCell4.appendChild(status1);
    option1.appendChild(option1text);
    option2.appendChild(option2text);
    status1.appendChild(option1);
    status1.appendChild(option2);
    titleCell5.appendChild(titleCellText5);
    titleCell6.appendChild(checkbox);
    //titleCell6.appendChild(label);
    titleCell7.appendChild(element);
    titleRow.appendChild(titleCell2);
    titleRow.appendChild(titleCell3);
    titleRow.appendChild(titleCell4);
    titleRow.appendChild(titleCell5);
    titleRow.appendChild(titleCell6);
    titleRow.appendChild(titleCell7);
    tbody.appendChild(titleRow);
}

function traverseSearch(id){
    //console.log("id of element is "+id);
    var sourceRow = document.getElementsByTagName('tbody');
    var mediaTitle = sourceRow[0].childNodes[id-1].childNodes[1].innerHTML;
    console.log(mediaTitle); 
    let url='https://itunes.apple.com/search?term='+mediaTitle+'&limit=5'
    let cors = 'https://cors-anywhere.herokuapp.com/'
    fetch(cors+url)
    .then( data => data.json() )
    .then( json => {
        
        result = json.results;
        console.log(result[0])
        
    }).catch(error => console.log("ERROR!"))
}
/*module.exports.*/
/*addMediaQueue = function addMediaQueue(json){
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO genres (genre_name) VALUES (?);',[body.genre_name], function (err, rows){
        pool.query('INSERT INTO media_items (media_type,title,original_language) VALUES (?);',[body.genre_name], function (err, rows){
      //(1, 'Book', 'A Common Sense Guide to Data Structures and Algorithms', NULL , 2017, NULL)
        if (err){
          console.log("ERROR GETTING ENTRIES");
          return reject(err);
        }
        resolve(rows);
      });
    });}*/
    addMediaQueue = function addMediaQueue(mediaTitle){
        console.log(mediaTitle);
        let url='https://itunes.apple.com/search?term='+mediaTitle+'&limit=5'
        let cors = 'https://cors-anywhere.herokuapp.com/'
        fetch(cors+url)
        .then( data => data.json() )
        .then( json => {
            
            result = json.results;
            console.log(result[0].kind,result[0].trackCensoredName,result[0].primaryGenreName,result[0].releaseDate)
            pool.query('INSERT INTO media_items (media_type,title,original_language_title,publication_year) VALUES (?);',[result[0].kind,result[0].trackCensoredName,result[0].trackName,result[0].releaseDate], function (err, rows){
                  if (err){
                    console.log("ERROR GETTING ENTRIES");
                    return reject(err);
                  }
                  resolve(rows);
                });
        }).catch(error => console.log("ERROR!"))
    };