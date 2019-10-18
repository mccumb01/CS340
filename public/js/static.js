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
window.onload = function(){
  let tracker = new WorkoutTracker();
  tracker.getWorkoutList();
  // tracker.getExerciseById(2);
  tracker.addListeners();
}

function DataModel(input){
  return {
    id: input.id || null,
    exerciseName: input.exerciseName || "",
    numReps: input.numReps || null,
    weight: input.weight || null,
    exerciseDate: input.exerciseDate || null,
    unit: input.unit || ""
  }
}

// Maybe this approach isn't necessary, and it's clunky ... but it keeps things out of global scope this way.
function WorkoutTracker(){
  this.base = window.location;
  this.entries = [];
  this.getWorkoutList = getWorkoutList;
  this.getExerciseById = getExerciseById;
  this.createEntries = createEntries;
  this.updateTable = updateTable;
  this.addTableRow = addTableRow;
  this.editTableRowAtIndex = editTableRowAtIndex;
  this.removeTableRowAtIndex = removeTableRowAtIndex;
  this.addEntry = addEntry;
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
  document.getElementById('formSubmitBtn').addEventListener('click', ()=>{     
    let theForm = document.getElementById('theForm');
    if (!theForm.reportValidity()){
      alert('Exercise name is required - please check your entry and resubmit.');
      return false;
    }
    let id = document.getElementById('entryId').value;
    // console.log("Add/Edit btn clicked with ID: ",id);
    if (!id || id == -1){
      console.log('Adding Entry...');
      this.addEntry(this);
    }
    else {
      console.log('Updating Entry...');
      this.updateEntry(this);
    }
  });

  document.getElementById('cancelBtn').addEventListener('click', () => this.clearForm());
}

/************************************************************************
Utility functions for converting date formats between 
SQL, input[type=date], and the spec's stated "mm-dd-yyyy" display format 
************************************************************************/

// Converts to display as mm-dd-YYYY
function convertDateForDisplay(d){
  if (!d) {return null}
  let parts = d.split('-');
  let YYY, mm, dd;
  console.log(parts);
  
  // if year is first
  if (parts[0].length > 2){
    YYYY = parts[0];
    mm = parts[1];
    dd = parts[2];
  }
  // otherwise year is last
  else {
    mm = parts[0];
    dd = parts[1];
    YYYY = parts[2];
  }
  return `${mm}-${dd}-${YYYY}`;
}

// Converts to YYYY-mm-dd for input[type=date] form editing, or for sending to MySQL
function convertDateForInput(d){
  if (!d) {return null}
  let parts = d.split('-');
  let YYYY, mm, dd;
  console.log(parts);
  if (parts[0].length > 2){
    YYYY = parts[0];
    mm = parts[1];
    dd = parts[2];
  }
  else {
    mm = parts[0];
    dd = parts[1];
    YYYY = parts[2];  
  }
  return `${YYYY}-${mm}-${dd}`;
}