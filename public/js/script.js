let button = document.querySelector('#submit')
let input = document.querySelector('#search')
let output = document.querySelector('#output')

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
