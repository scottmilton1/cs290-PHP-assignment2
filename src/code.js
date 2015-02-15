window.onload = init;


/****************************************************************************
 ** Function:         init()
 ** Description:      This function runs once the page loads and attaches
 **                   event handlers to the form buttons.
 ** Parameters:       none
 ** Pre-Conditions:   form buttons exist
 ** Post-Conditions:  event handlers are attached to the two form buttons
 ***************************************************************************/
function init() {
  document.getElementById('add-button').onclick = function() { addTitle(); };
  document.getElementById('delete-all').onclick = function() { deleteAll(); };
}



/****************************************************************************
 ** Function:         addTitle()
 ** Description:      This function adds a video to the database and creates
 **                   corresponding DOM elements.
 ** Parameters:       none
 ** Pre-Conditions:   database, page elements, and add.php exist
 ** Post-Conditions:  video is added to database and corresponding DOM 
 **                   elements added to page
 ***************************************************************************/
function addTitle() {

  var name = document.getElementById('name').value;
  var category = document.getElementById('category').value;
  var length = document.getElementById('length').value;
  var xmlhttp;

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
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
      var name = document.getElementById('name').value;
      var category = document.getElementById('category').value;
      var length = document.getElementById('length').value;

      // create new table row and cells for the added video
      var row = document.createElement('tr');
      var statusCell = document.createElement('td');
      var manageCell = document.createElement('td');
      var nameCell = document.createElement('td');
      var categoryCell = document.createElement('td');
      var lengthCell = document.createElement('td');
      var statusText = document.createTextNode('available');
      var toggleButton = document.createElement('span');
      var toggleText = document.createTextNode('Check out');
      var manageText = document.createTextNode('\u00A0');
      var deleteButton = document.createElement('span');
      var deleteText = document.createTextNode('Delete');
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
      var listBody = document.getElementById('list-body');
      listBody.appendChild(row);

      // set attributes for new table elements
      statusCell.setAttribute('class', 'status-col');
      manageCell.setAttribute('class', 'manage-col');
      nameCell.setAttribute('class', 'name-col');
      categoryCell.setAttribute('class', 'category-col');
      lengthCell.setAttribute('class', 'length-col');

      // use id to assign corresponding id's to row buttons
      toggleButton.setAttribute('id', 'c' + id);
      deleteButton.setAttribute('id', 'd' + id);

      // set up event handlers for manage buttons
      toggleButton.onclick = function() { toggleStatus(this); };
      deleteButton.onclick = function() { deleteTitle(this); };

      // check drop down menu for a match to new video's category
      var dropDown = document.getElementById('show');
      var match = false;
      var target; // for purposes of insertion

      // iterate over options and look for a match
      // and place to insert alphabetically
      // found help here:
      // stackoverflow.com/questions/610336/javascript-retrieving-the-text-of-the-selected-option-in-select-element
      for (var i = 0; i < dropDown.options.length; i++) {
        var current = dropDown.options[i].text;

        if (current === category)
         match = true;

        // determine target to maintain alphabetic order when inserting
        if (current < category)
          target = i;
       }

      // if match not found, add category to drop down menu
      // (unless category is blank)
      if (!match && !category == '') {
        var newOption = document.createElement('option');
        var optionText = document.createTextNode(category);
        newOption.appendChild(optionText);

        // if target was not set, append new option to end of list
        if (target === undefined) {
          dropDown.appendChild(newOption);

        } else { // insert alphabetically
          // found help here:
          // stackoverflow.com/questions/4793604/how-to-do-insert-after-in-javascript-without-using-a-library
          target = dropDown.options[target].nextSibling;
          dropDown.insertBefore(newOption, target);
        }
      }

      // clear values of form text boxes
      document.getElementById('name').value = '';
      document.getElementById('category').value = '';
      document.getElementById('length').value = '';

      // output success message
      alert(txt.slice(0, 13));
    }
  };

  // request that will add the row to the DB
  xmlhttp.open('GET', 'add.php?name=' + name + '&category=' + category +
    '&length=' + length + '&rand=' + Math.random(), true);
  xmlhttp.send();
}



/****************************************************************************
 ** Function:         deleteAll()
 ** Description:      This function removes all videos from the database and
 **                   deletes all corresponding page elements.
 ** Parameters:       none
 ** Pre-Conditions:   database, page elements, and delete_all.php exist
 ** Post-Conditions:  all videos are emoved from DB and corresponding page 
 **                   elements are deleted
 ***************************************************************************/
function deleteAll() {
  // confirm this operation in case user hit button by accident
  if (confirm('Do you really want to delete all videos in the database?')) {

    var listBody = document.getElementById('list-body');
    var dropDown = document.getElementById('show');
    var xmlhttp;

    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

        var txt = xmlhttp.responseText;

        if (txt != 'All videos deleted!') {
          // output error message and return
          alert(txt);
          return;
        }

        // remove all table rows from DOM
        // I found help here:
        // https://developer.mozilla.org/en-US/docs/Web/API/Node.childNodes
        while (listBody.firstChild)
          listBody.removeChild(listBody.firstChild);

        // remove all category options from drop down box on form
        while (dropDown.firstChild)
          dropDown.removeChild(dropDown.firstChild);

        // now put back the 'ALL CATEGORIES' option
        var newOption = document.createElement('option');
        var optionText = document.createTextNode('ALL MOVIES');
        newOption.appendChild(optionText);
        dropDown.appendChild(newOption);
        newOption.setAttribute('value', 'all');
        newOption.setAttribute('selected', 'selected');

        // output success message
        alert(txt);

      } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
        alert('Problem connecting to server! Error code: ' + xmlhttp.status);
        return;
      }
    };

    // request that will remove the rows from the DB
    xmlhttp.open('GET', 'delete_all.php?rand=' + Math.random(), true);
    xmlhttp.send();
  }
}



/****************************************************************************
 ** Function:         deleteTitle()
 ** Description:      This function removes a single video from the database
 **                   and deletes corresponding page elements from the DOM.
 ** Parameters:       none
 ** Pre-Conditions:   database, video to delete, page elements, and 
 **                   delete.php exist
 ** Post-Conditions:  video is removed from the DB and corrsponding page 
 **                   elements have been deleted
 ***************************************************************************/
function deleteTitle(ref) {

  // remove the letter from the button id to get the correspondng db row id
  var id = ref.id.slice(1);
  var xmlhttp;

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var txt = xmlhttp.responseText;
      var id = txt.slice(15);
      var listBody = document.getElementById('list-body');
      var refButton = document.getElementById('d' + id);
      var dropDown = document.getElementById('show');
      // this is a crazy way of getting the category for the record
      // there's probably a better way
      var category = refButton.parentNode.nextSibling.nextSibling.firstChild;
      category = (category === null) ? '' : category.textContent;

      if (!txt.match(/Video\sdeleted!/g)) {
        // display error message and exit
        alert(txt.slice(0, 14));
        return;

      } else if (category !== '' && txt.slice(14, 15) === 'f') {
        // no matching category in database, so remove option from drop down
        // iterate over options and delete the matching category
        for (var i = 0; i < dropDown.options.length; i++) {
          var current = dropDown.options[i].text;

          if (current === category) {
            dropDown.removeChild(dropDown.options[i]);
            break;
          }
        }
      } // matching category in database just falls through

      // remove corresponding row from table
      // (parent is the td, grandparent is row)
      var parentRow = listBody.removeChild(refButton.parentNode.parentNode);

      // ouput success message
      alert(txt.slice(0, 14));

    } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      alert('Problem connecting to server! Error code: ' + xmlhttp.status);
      return;
    }
  };

  // request that will remove the row from the DB
  xmlhttp.open('GET', 'delete.php?id=' + id + '&rand=' + Math.random(), true);
  xmlhttp.send();
}



/****************************************************************************
 ** Function:         toggleStatis()
 ** Description:      This function runs changes the status of a single
 **                   video in the database (i.e.-- availabe to checked out
 **                   or vice versa) and updates page text to reflect the 
 **                   change in availability
 ** Parameters:       ref (referring node)
 ** Pre-Conditions:   database, page elements, update.php exist
 ** Post-Conditions:  status of the referring video has been toggled and 
 **                   corresponding page text has been updated
 ***************************************************************************/
function toggleStatus(ref) {

  // parent is <td>, grandparent is <tr>, first child is the status column <td>
  var statusData = ref.parentNode.parentNode.firstChild;
  var status = (statusData.innerHTML == 'available') ? 1 : 0;

  // remove the letter from the button id to get the correspondng DB row id
  var id = ref.id.slice(1);

  var xmlhttp;

  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

      var txt = xmlhttp.responseText;

      if (txt == 'Unable to update database.') {
        alert(txt);
        return;
      }

    } else if (xmlhttp.readyState == 4 && xmlhttp.status != 200) {
      alert('Problem connecting to server! Error code: ' + xmlhttp.status);
      return;
    }
  };

  // update status in database
  xmlhttp.open('GET', 'update.php?id=' + id + '&status=' + status +
    '&rand=' + Math.random(), true);
  xmlhttp.send();

  // change text in table row to reflect new status
  if (statusData.innerHTML == 'available') {
    statusData.innerHTML = 'checked out';
    ref.innerHTML = '&nbsp;Check in&nbsp;';
  } else {
    statusData.innerHTML = 'available';
    ref.innerHTML = 'Check out';
  }
}
