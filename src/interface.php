<?php 
  session_start();
?>

<!DOCTYPE html>
  <head>
    <!--
      CS290 PHP MySQL Assignment
      Author: Scott Milton
      Date: 2/15/15
      Description:  This project is a simple interface to work with a database that tracks a store's inventory of videos.
    -->
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

      <form action="#" method="post">
        <fieldset>
          <p>
            <label>
              Name:
              <input name="name" placeholder="enter video title">
            </label>
            <label>
              Category:
              <input name="category" placeholder="enter category">
            </label>
            <label>
              Length:
              <input name="length" placeholder="enter length">
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
      </form>

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