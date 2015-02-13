
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

  // read current status from database and update it
  // change text in table row to reflect new status

  // parent is <td>, grandparent is <tr>, first child is the status column <td>
  var statusData = ref.parentNode.parentNode.firstChild;

  // toggle the value in the table - better to read the new value from the db and make it match here 
  if (statusData.innerHTML == "available") {
    statusData.innerHTML = "checked out";
    ref.innerHTML = "Check in";
    alert("Video checked out!");
  } else {
    statusData.innerHTML = "available";
    ref.innerHTML = "Check out";
    alert("Video checked in!");
  }
}