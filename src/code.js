
window.onload = init; 

function init() {
  // attach event handler to form button
  document.getElementById("delete-all").onclick = function() { deleteAll(); };
}



function deleteAll() {
  // confirm this operation in case user hit button by accident
  if (confirm("Do you really want to delete all videos in the database?")) {

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

        if (txt != "All videos deleted!")
          exit(0);
   
      } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
        alert("Problem connecting to server! Error code: " +  xmlhttp.status);
        return;
      }
    }

    // request that will remove the row from the db
    xmlhttp.open("GET", "delete_all.php?rand=" + Math.random(), true);
    xmlhttp.send();

    // remove all table rows from DOM
    // I found help here: https://developer.mozilla.org/en-US/docs/Web/API/Node.childNodes
    while (listBody.firstChild) {
      listBody.removeChild(listBody.firstChild);
    }
  }
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

  // parent is <td>, grandparent is <tr>, first child is the status column <td>
  var statusData = ref.parentNode.parentNode.firstChild;
  var status = (statusData.innerHTML == "available") ? 1 : 0;

  // remove the letter from the button id to get the correspondng db row id
  var id = ref.id.slice(1); 

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

      if (txt == "Unable to update database.")
        exit(0);

    } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      alert("Problem connecting to server! Error code: " +  xmlhttp.status);
      return;
    }
  }

  // update status in database
  xmlhttp.open("GET", "update.php?id=" + id + "&status=" + status + "&rand=" + Math.random(), true);
  xmlhttp.send();

  // change text in table row to reflect new status
  if (statusData.innerHTML == "available") {
    statusData.innerHTML = "checked out";
    ref.innerHTML = "Check in";
  } else {
    statusData.innerHTML = "available";
    ref.innerHTML = "Check out";
  }
}