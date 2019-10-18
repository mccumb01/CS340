/******************************************************************
Functions that manipulate the entry form  
******************************************************************/

function getFormValues(){
  let id = document.getElementById('entryId').value;
  if (id == -1) {
    id = null; // otherwise sends -1 to DB which doesn't currently handle this, but should I suppose ... 
  }
  else {
    id = parseInt(id);
  }
  const name = document.getElementById('exerciseName').value.trim();
  const reps = document.getElementById('numReps').value;
  const weight = document.getElementById('weight').value;
  const unit = document.querySelector('input[name="units"]:checked').value
  const d = document.getElementById('exerciseDate').value;
  let date;
  if (d && d.length > 0){
    date = new Date(d).toJSON().split('T')[0];
  }
  else {
    date = null; // otherwise sends empty string '' which causes a SQL error
  }
  // Note: basic HTML5 DOM validation happens in the click handler, so these values should be ok.  
  return obj = {
    id: id,
    exerciseName: name,
    numReps: parseInt(reps),
    weight: parseInt(weight),
    exerciseDate: date,
    unit: unit
  }
}

function editEntry(e){
  let row = e.target.parentElement.rowIndex - 1;
  let entry = this.entries[row];
  let self = this;
  this.fillForm(entry);
}

function fillForm(obj){
  document.getElementById('entryId').value = obj.id;
  document.getElementById('exerciseName').value = obj.exerciseName;
  document.getElementById('numReps').value = obj.numReps;
  document.getElementById('weight').value = obj.weight;
  let dateString = (obj.exerciseDate != null) ? convertDateForInput(obj.exerciseDate) : null;
  document.getElementById('exerciseDate').value = dateString;
  document.querySelector('input[name="units"][value="'+obj.unit+'"]').checked = true;  
}

function clearForm(){
  document.getElementById('theForm').reset();
  document.getElementById('entryId').value = -1; // Need to explicit reset hidden value or else it retains last entry's id
}
