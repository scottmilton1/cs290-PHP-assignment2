
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

  // remove the letter from the button id to get the correspondng db row id
  var id = ref.id.slice(1); 
  var listBody = document.getElementById("list-body");
  var xmlhttp;

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var txt = xmlhttp.responseText;
      alert(txt);

      if (txt != "Video deleted!")
        exit(0);
 
    } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      alert("Problem connecting to server! Error code: " +  xmlhttp.status);
      return;
    }
  }

  // request that will remove the row from the db
  xmlhttp.open("GET", "delete.php?id=" + id + "&rand=" + Math.random(), true);
  xmlhttp.send();

  // remove corresponding row from table (parent is the td, grandparent is row)
  var parentRow = listBody.removeChild(ref.parentNode.parentNode);

}


function toggleStatus(ref) {
  alert("Video checked in / out!");
  // read current status from database and update it
  // change text in table row to reflect new status
}