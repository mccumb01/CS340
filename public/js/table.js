/******************************************************************
Functions that build and/or manipulate the table  
******************************************************************/

function updateTable(){
  let i = 0;
  let len = this.entries.length;
  for (i; i < len; i++){
    let obj = this.entries[i];
    this.addTableRow(obj);
  }
}

function addTableRow(obj, index){
  if (!index) { 
    index = -1 
  }
  let tbody = document.getElementById('tbody');
  let row = tbody.insertRow(index);
  row.classList.add('table-entry');

  let title = row.insertCell(0);
  title.textContent = obj.title;

  let o_title = row.insertCell(1);
  o_title.textContent = obj.o_title;

  let type = row.insertCell(2);
  type.textContent = obj.m_type;

  let yr = row.insertCell(3);
  yr.textContent = obj.pub_year;

  let genres = row.insertCell(4);          
  genres.textContent = obj.genres;

  let rating = row.insertCell(5);          
  rating.textContent = obj.rating;

  let edit = row.insertCell(6);
  edit.textContent = "Edit";
  edit.classList.add("edit-btn");
  edit.addEventListener('click', this.editEntry.bind(this));

  let del = row.insertCell(7);
  del.textContent = "Delete";
  del.classList.add("delete-btn");
  del.addEventListener('click', this.deleteEntry.bind(this));
  
  scrollToRowAtIndex(index);
  row.classList.add('row-highlight-animated');
  setTimeout(() => row.classList.remove('row-highlight-animated'), 2000);
}

function editTableRowAtIndex(obj, index){
  let tbody = document.getElementById('tbody');
  
  let row = tbody.rows[index]; 
  row.classList.add('table-entry');

  let name = row.cells[0];
  name.textContent = obj.exerciseName;

  let numReps = row.cells[1];
  numReps.textContent = obj.numReps;

  let weight = row.cells[2];
  weight.textContent = obj.weight;

  let exerciseDate = row.cells[3];
  exerciseDate.textContent = convertDateForDisplay(obj.exerciseDate);

  let unit = row.cells[4];          
  unit.textContent = obj.unit;

  scrollToRowAtIndex(index);
  row.classList.add('row-highlight-animated');
  setTimeout(() => row.classList.remove('row-highlight-animated'), 2000);

}

function removeTableRowAtIndex(index){
  let tbody = document.getElementById('tbody');
  let row = tbody.rows[index];
  row.classList.add('row-delete-animated');
  setTimeout(() => {
    row.classList.remove('row-delete-animated')
    tbody.deleteRow(index);
  }, 300);
}

function scrollToRowAtIndex(index){
  console.log('scrolling to row?', index); 
  let tbody = document.querySelector('#tbody'); 
  let rows = tbody.querySelectorAll('tr');
  if (index == -1) {index = rows.length - 1}
  
  console.log(rows[index]);
  rows[index].scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });  
  // let scrolledY = window.scrolledY;
  // if (scrolledY) {
  //   tbody.scroll(0, scrollY - theadHeight);
  // }
}
