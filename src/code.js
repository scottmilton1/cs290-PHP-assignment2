
window.onload = init; 

function init() {
  // attach event handlers to form buttons
  document.getElementById("add-button").onclick = function() { addVideo(); };
  document.getElementById("delete-all").onclick = function() { deleteAll(); };
}


function addVideo() {
  alert("Video Added!");
  // add video to database
  // create table elements and append to DOM
}


function deleteAll() {
  confirm("Do you really want to delete all videos in the database?");
  // if user confirms,
  // this will loop over all elements in the database / array and remove them.
  // possibly by calling deleteTitle() for each row
  // also the rows must be removed from the DOM without refreshing the page
}


function deleteTitle(ref) {
  alert("Video Deleted!");
  // delete video from database
  // remove corresponding page elements from DOM
}


function toggleStatus(ref) {
  alert("Video checked in / out!");
  // read current status from database and update it
  // change text in table row to reflect new status
}