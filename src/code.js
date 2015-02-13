
window.onload = init; 

function init() {
  // attach event handler to form button
  document.getElementById("delete-all").onclick = function() { deleteAll(); };
}


function deleteAll() {
  confirm("Do you really want to delete all videos in the database?");
  // if user confirms,
  // this will loop over all elements in the database / array and remove them.
  // possibly by calling deleteTitle() for each row
  // also the rows must be removed from the DOM without refreshing the page
}


function deleteTitle(ref) {

  var listBody = document.getElementById("list-body");

  // delete video from database

  // remove corresponding row from table (parent is the td, grandparent is row)
  var parentRow = listBody.removeChild(ref.parentNode.parentNode);

  alert("Video Deleted!");
}


function toggleStatus(ref) {
  alert("Video checked in / out!");
  // read current status from database and update it
  // change text in table row to reflect new status
}