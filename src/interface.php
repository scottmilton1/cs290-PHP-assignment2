<?php 
  /*
    CS290 PHP MySQL Assignment
    Author: Scott Milton
    Date: 2/15/15
    Description:  This project is a simple interface to work with a database that tracks a store's inventory of videos.
  */
  session_start();
  $name = (isset($_GET['name'])) ? $_GET['name'] : '';
  $category = (isset($_GET['category'])) ? $_GET['category'] : '';
  $length = (isset($_GET['length'])) ? $_GET['length'] : '';
?>

<!DOCTYPE html>
  <head>
    <meta charset="UTF-8">

    <title>
      CS 290 PHP Assignment 2
    </title>

    <link href="style.css" rel="stylesheet">
    <script src="code.js"></script>

  </head>
  <body>
    <section>
      <h1>
        Video Store Inventory System
      </h1>

      <!-- strip special characters to improve security -->
      <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>"
        method="get">
        <fieldset>
          <p>
            <label>
              Name:
              <input id="name" name="name" placeholder="enter video title"
                <? echo 'value="'.$name.'"' ?> >
            </label>
            <label>
              Category:
              <input id="category" name="category" placeholder="enter category"
                <? echo 'value="'.$category.'"' ?> >
            </label>
            <label>
              Length:
              <input id="length" name="length" placeholder="enter length"
                <? echo 'value="'.$length.'"' ?> >
            </label>
            <br>
            <button id="add-button" type="button">
              Add New Video
            </button>
            <button id="delete-all" type="button">
              Delete All Videos
            </button>
            <input type="hidden" name="add" value="no" />
          </p>
        </fieldset>

        <?php

          define('DB_HOST', 'localhost');
          define('DB_USER', 'root');
          define('DB_PASSWORD', 'root');
          define('DB_NAME', 'inventory');

          $link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

          if ($link->connect_errno) {
            echo('<p class="red">Failed to connect to MySQL</p>');
            exit(0);
          }

          $add = (isset($_GET['add'])) ? $_GET['add'] : 'no';

          if ($add === 'yes') {

            // strip excess white space - found help here: http://php.net/manual/en/function.preg-replace.php
            $name = preg_replace('/\s\s+/', ' ', $name);

            if (empty($name)) {
              echo '<p class="red">Name is a required field.
                  Please enter the video name. </p>';

            // check that category does not contain numbers
            } elseif (!empty($category) && !empty(preg_match('/\d+/', $category))) {
              echo '<p class="red">Category should be alphabetic.
               No numbers please.</p>';

            // check to make sure length is numeric and not a float (if not empty since this is not a required field)
            } elseif (!empty($length) && !(is_numeric($length)) && (!is_float($length += 0))) {
              echo '<p class="red">Length must be an integer value.</p>';

            } else { // if all valid,

              // add video to database
              $sql = 'INSERT INTO inventory VALUES ("", "'.$name.'", "'.$category.'", "'.$length.'", "0");';

              $rs = $link->query($sql);

              if ($rs === false) {
                // if unable to insert values in db, output custom error message
                echo '<p class="red">Unable to add video to database</p>';
                exit(0);
              } 

              // clear variable values for the added video
              $name = '';
              $category = '';
              $length = '';
              $add = 'no';

              // clear values of form text boxes 
              echo '<script>
                      document.getElementById("name").value="";
                      document.getElementById("category").value="";
                      document.getElementById("length").value="";
                    </script>';

              // output success message
              echo '<p class="green">Video added!</p>'; // this would be better with a hide button or if it automatically went away / was replaced after the next user action
            }
          }
        ?>

        <table id="video-list">
          <caption>
            Current Inventory
          </caption>
          <thead>
            <tr>
              <th colspan="5">
                <fieldset id="filter-field">
                  <label>Filter by category: </label>
                  <select name="show" id="show" size="1">

                    <?php

                      // read current filter to set drop-down option as selected
                      if (isset($_GET['show'])) 
                        $show = $_GET['show']; 
                      else
                        $show = 'all';

                      echo '<option value="all"';
                      if ($show === 'all')
                        echo ' selected="selected"';
                      echo '>ALL CATEGORIES</option>';

                      // get all entries from database
                      $sql = "SELECT inventory.category FROM inventory GROUP BY category";
                      $rs = $link->query($sql);

                      if ($rs === false) {
                        echo '<script>alert("Unable to link to SQL database.");</script>'; 

                      } else {
                        // output all inventory items to table
                        while ($arr = $rs->fetch_array(MYSQLI_ASSOC)) {
                          echo '<option value="'.$arr['category'].'"';
                          if ($show == $arr['category'])
                            echo ' selected="selected"';
                          echo '>'.$arr['category'].'</option>';
                        }
                      }
                    ?>

                  </select>
                  <button id="filter-button" type="submit">
                    Update
                  </button>
                </fieldset>
            <tr>
              <th class="status-col">status
              <th class="manage-col">manage
              <th class="name-col">name
              <th class="category-col">category
              <th class="length-col">length
          </thead>
          <tbody id="list-body">

            <?php

              // get all entries from database
              $sql = 'SELECT * FROM inventory';
              if ($show !== "all") 
                $sql .= ' WHERE category = "'.$show.'"';
              $sql .= ';';

              $rs = $link->query($sql);

              if ($rs === false) {
                echo '<script>alert("Unable to link to SQL database.");</script>'; 

              } else {
                // output all inventory items to table
                while ($arr = $rs->fetch_array(MYSQLI_ASSOC)) {
                  echo '<tr><td class="status-col">';
                  if ($arr['rented'] == 0) 
                    echo 'available';
                  else
                    echo 'checked out';
                  echo '<td class="manage-col">
                          <span id="c'.$arr['id'].'" onclick="toggleStatus(this);">Check out</span>
                          <span id="d'.$arr['id'].'" onclick="deleteTitle(this);">Delete</span>';
                  echo '<td class="name-col">'.$arr['name'];
                  echo '<td class="category-col">'.$arr['category'];
                  echo '<td class="length-col">'.$arr['length'].'</tr>';
                }

                // close connection to database
                $link->close();
              }
            ?>
          </tbody>
        </table>
      </form>
    </section>
  </body>
</html>