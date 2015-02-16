<?php 
  /***************************************************************************
   ** CS290 PHP MySQL Assignment
   ** Author: Scott Milton
   ** Date: 2/15/15
   ** Description:  This project is a simple interface to work with a database
   ** that tracks a store's inventory of videos.
   ***************************************************************************/

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
                <php? echo 'value="'.$name.'"' ?> >
            </label>
            <label>
              Category:
              <input id="category" name="category" placeholder="enter category"
                <php? echo 'value="'.$category.'"' ?> >
            </label>
            <label>
              Length:
              <input id="length" name="length" placeholder="enter length"
                <php? echo 'value="'.$length.'"' ?> >
            </label>
            <br>
            <button id="add-button" type="button">
              Add New Video
            </button>
            <button id="delete-all" type="button">
              Delete All Videos
            </button>
          </p>
        </fieldset>

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

                      define('DB_HOST', 'localhost');
                      define('DB_USER', 'root');
                      define('DB_PASSWORD', 'root');
                      define('DB_NAME', 'inventory');

                      $link = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

                      if ($link->connect_errno) {
                        echo('<p class="red">Failed to connect to MySQL</p>');
                        exit(0);
                      }

                      // read current filter to set drop-down option as selected
                      if (isset($_GET['show'])) 
                        $show = $_GET['show']; 
                      else
                        $show = 'all';

                      echo '<option value="all"';
                      if ($show === 'all')
                        echo ' selected="selected"';
                      echo '>ALL MOVIES</option>';

                      // get all entries from database
                      $sql = "SELECT inventory.category FROM inventory GROUP BY category";
                      $rs = $link->query($sql);

                      if ($rs === false) {
                        echo '<script>alert("Unable to link to SQL database.");</script>'; 

                      } else {
                        // output all inventory items to table
                        while ($arr = $rs->fetch_array(MYSQLI_ASSOC)) {
                          if ($arr['category'] === '') { continue; }
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
                  if ($arr['rented'] == 0) {
                    echo 'available';
                  } else {
                    echo 'checked out';
                  }
                  echo '<td class="manage-col">
                          <span id="c'.$arr['id'].'" onclick="toggleStatus(this);">';
                  if ($arr['rented'] == 0) {
                    echo 'Check out';
                  } else {
                    echo '&nbsp;Check in&nbsp;';
                  }
                  echo '</span>&nbsp;<span id="d'.$arr['id'].'" onclick="deleteTitle(this);">Delete</span>';
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