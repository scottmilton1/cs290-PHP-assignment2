<?php 
  /*
    CS290 PHP MySQL Assignment
    Author: Scott Milton
    Date: 2/15/15
    Description:  This project is a simple interface to work with a database that tracks a store's inventory of videos.
  */
  session_start();
  $name = $_POST['name'];
  $category = $_POST['category'];
  $length = $_POST['length'];
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
        method="post">
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
            <button id="add-button" type="submit">
              Add New Video
            </button>
            <button id="delete-all" type="button">
              Delete All Videos
            </button>
            <input type="hidden" name="add" value="yes" />
          </p>
        </fieldset>
      </form>

      <?php
        $add = ($_POST['add'] == 'yes');
        
        if ($add) {

          // strip excess white space - found help here: http://php.net/manual/en/function.preg-replace.php
          $name = preg_replace('/\s\s+/', ' ', $name);

          if (empty($name)) {
            echo '<p class="red">Name is a required field.
                Please enter the video name. </p>';

          // check if 
          } elseif (!empty($category) && !(ctype_alpha($category))) {
            echo '<p class="red">Category must be alphabetic.
             No numbers, spaces, or special characters, please.</p>';

          // check to make sure length is numeric and not a float (if not empty since this is not a required field)
          } elseif (!empty($length) && !(is_numeric($length)) && (!is_float($length += 0))) {
            echo '<p class="red">Length must be an integer value.</p>';

          } else { // if all valid 
            // add video to database

            // ADD CODE HERE

            // clear variable values for the added video
            $_POST['name'] = $name = '';
            $_POST['category'] = $category = '';
            $_POST['length'] = $length = '';
            $_POST['add'] = $add = '';

            // clear values of form text boxes 
            echo '<script>
                    document.getElementById("name").value="";
                    document.getElementById("category").value="";
                    document.getElementById("length").value="";
                  </script>';

            // output success message
            echo '<p class="green">Video added!</p>'; // this would be better with a hide button
          }
        }
      ?>

      <table id="video-list">
        <caption>
          Current Inventory
        </caption>
        <thead>
          <tr>
            <th class="status-col">status
            <th class="manage-col">manage
            <th class="name-col">name
            <th class="category-col">category
            <th class="length-col">length
          </tr>
        </thead>

          <?php
            // code to connect to MySQL database and retrieve values adapted from examples provided in "PHP and MySQL for Beginners" by Mark Lassoff pg. 419-420
            define('DB_HOST', 'localhost');
            define('DB_USER', 'root');
            define('DB_PASSWORD', 'root');
            define('DB_NAME', 'inventory');

            $link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

            if ($link->connect_errno) {
              echo("<br>Failed to connect to MySQL:(" . $link->connect_errno . ") " . $link->connect_error );
              exit(0);
            }

            // get all entries from database
            $sql = "SELECT * FROM inventory";
            $rs = $link->query($sql);

            if ($rs === false) {

              trigger_error("Wrong SQL: " . $sql . " Error: " . $link->error, E_USER_ERROR);

            } else {

              // output all inventory items to table
              while ($arr = $rs->fetch_array(MYSQLI_ASSOC)) {
                echo '<tr><td class="status-col">';
                if ($arr['rented'] == 0) 
                  echo 'available';
                else
                  echo 'checked out';
                echo '<td class="manage-col">
                        <span id="c'.$arr['id'].'" onclick="toggleStatus(this);">Check in</span>
                        <span id="d'.$arr['id'].'" onclick="deleteTitle(this);">Delete</span>';
                echo '<td class="name-col">'.$arr['name'];
                echo '<td class="category-col">'.$arr['category'];
                echo '<td class="length-col">'.$arr['length'].'</tr>';
              }
            }
          ?>

      </table>

    </section>
  </body>
</html>