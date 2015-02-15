
window.onload = init; 

function init() {
  // attach event handlers to form buttons
  document.getElementById("add-button").onclick = function() { addTitle(); };
  document.getElementById("delete-all").onclick = function() { deleteAll(); };
}



function addTitle() {

  var name = document.getElementById("name").value;
  var category = document.getElementById("category").value;
  var length = document.getElementById("length").value;
  var xmlhttp;

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var txt = xmlhttp.responseText;

      if (!txt.match(/Video\sadded!/g)) {
        alert(txt);
        return;
      } 

      // remove the words "Video added!" from response to get id of new row
      var id = txt.slice(13);
      var name = document.getElementById("name").value;
      var category = document.getElementById("category").value;
      var length = document.getElementById("length").value;

      // create new table row and cells for the added video
      var row = document.createElement("tr");
      var statusCell = document.createElement("td");
      var manageCell = document.createElement("td");
      var nameCell = document.createElement("td");
      var categoryCell = document.createElement("td"); 
      var lengthCell = document.createElement("td");
      var statusText = document.createTextNode("available");
      var toggleButton = document.createElement("span");
      var toggleText = document.createTextNode("Check out");
      var manageText = document.createTextNode("\u00A0"); 
      var deleteButton = document.createElement("span"); 
      var deleteText = document.createTextNode("Delete");
      var nameText = document.createTextNode(name);
      var categoryText = document.createTextNode(category);
      var lengthText = document.createTextNode(length);

      // build DOM tree in reverse and append to table body
      statusCell.appendChild(statusText);
      toggleButton.appendChild(toggleText);
      manageCell.appendChild(toggleButton);
      manageCell.appendChild(manageText);
      deleteButton.appendChild(deleteText);
      manageCell.appendChild(deleteButton);
      nameCell.appendChild(nameText);
      categoryCell.appendChild(categoryText);
      lengthCell.appendChild(lengthText);
      row.appendChild(statusCell);
      row.appendChild(manageCell);
      row.appendChild(nameCell);
      row.appendChild(categoryCell);
      row.appendChild(lengthCell);
      var listBody = document.getElementById("list-body");
      listBody.appendChild(row);

      // set attributes for new table elements
      statusCell.setAttribute("class", "status-col");
      manageCell.setAttribute("class", "manage-col");
      nameCell.setAttribute("class", "name-col");
      categoryCell.setAttribute("class", "category-col");
      lengthCell.setAttribute("class", "length-col");

      // use id to assign corresponding id's to row buttons
      toggleButton.setAttribute("id", "c" + id);
      deleteButton.setAttribute("id", "d" + id);

      // set up event handlers for manage buttons
      toggleButton.onclick = function() { toggleStatus(this); };
      deleteButton.onclick = function() { deleteTitle(this); };

  // request that will add the row to the DB
  xmlhttp.open("GET", "add.php?name=" + name + "&category=" + category + "&length=" + length + "&rand=" + Math.random(), true);
  xmlhttp.send();
}



function deleteAll() {
  // confirm this operation in case user hit button by accident
  if (confirm("Do you really want to delete all videos in the database?")) {

    var listBody = document.getElementById("list-body");
    var dropDown = document.getElementById("show");
    var xmlhttp;

    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var txt = xmlhttp.responseText;

        if (txt != "All videos deleted!") {
          // output error message and return
          alert(txt);
          return;
        }

        // remove all table rows from DOM
        // I found help here: https://developer.mozilla.org/en-US/docs/Web/API/Node.childNodes
        while (listBody.firstChild)
          listBody.removeChild(listBody.firstChild);

        // remove all category options from drop down box on form
        while (dropDown.firstChild)
          dropDown.removeChild(dropDown.firstChild);

        // now put back the 'ALL CATEGORIES' option
        var newOption = document.createElement("option");
        var optionText = document.createTextNode("ALL CATEGORIES");
        newOption.appendChild(optionText);
        dropDown.appendChild(newOption);
        newOption.setAttribute("value", "all");
        newOption.setAttribute("selected", "selected");

        // output success message
        alert(txt);

      } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
        alert("Problem connecting to server! Error code: " +  xmlhttp.status);
        return;
      }
    }

    // request that will remove the rows from the DB
    xmlhttp.open("GET", "delete_all.php?rand=" + Math.random(), true);
    xmlhttp.send();
  }
}



function deleteTitle(ref) {

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

      if (txt != "Video deleted!")
        return;

      // create another xhttp request to see if category still exists in db
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }

      // create another callback to check for category match 
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

          var txt = xmlhttp.responseText;
          // alert(txt);
          if (txt = "error") {
            alert("Unable to connect to database to update category menu. Please refresh the page.");
            return;

          } else if (txt = "match found") {
            // category still exists so no need to remove it from drop down menu
alert("match found in DB - no need to remove option from drop down");
            return;

          } else { // no matching category in database, so remove option from drop down
alert("no matching category in database, so remove option from drop down");
          }

          // if (!txt.match(/Video\sadded!/g)) {
          //   alert(txt);
          //   return;

          var category = document.getElementById("category").value;

          // clear values of form text boxes 
          document.getElementById("name").value = '';
          document.getElementById("category").value = '';
          document.getElementById("length").value = '';

          ouput success message
          alert(txt);
          // alert(txt.slice(0,13));

        } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
          alert("Unable to connect to server to update category menu. Please refresh the page.");
          return;
        }
      }

      // request that will check the DB for a category match
      xmlhttp.open("GET", "matchCategory.php?category=" + category + "&rand=" + Math.random(), true);
      xmlhttp.send();

      // remove corresponding row from table (parent is the td, grandparent is row)
      var listBody = document.getElementById("list-body");
      var parentRow = listBody.removeChild(ref.parentNode.parentNode);
 
    } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      alert("Problem connecting to server! Error code: " +  xmlhttp.status);
      return;
    }
  }

  // request that will remove the row from the DB
  xmlhttp.open("GET", "delete.php?id=" + id + "&rand=" + Math.random(), true);
  xmlhttp.send();
}



function toggleStatus(ref) {

  // parent is <td>, grandparent is <tr>, first child is the status column <td>
  var statusData = ref.parentNode.parentNode.firstChild;
  var status = (statusData.innerHTML == "available") ? 1 : 0;

  // remove the letter from the button id to get the correspondng DB row id
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

      if (txt == "Unable to update database.") {
        alert(txt);
        return;
      }

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
    ref.innerHTML = "&nbsp;Check in&nbsp;";
  } else {
    statusData.innerHTML = "available";
    ref.innerHTML = "Check out";
  }
}