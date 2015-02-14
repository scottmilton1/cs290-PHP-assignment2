
<?php

  if (!defined('DB_HOST')) { define('DB_HOST', 'localhost'); }
  if (!defined('DB_USER')) { define('DB_USER', 'root'); }
  if (!defined('DB_PASSWORD')) { define('DB_PASSWORD', 'root'); }
  if (!defined('DB_NAME')) { define('DB_NAME', 'inventory'); }

  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

  if ($conn->connect_errno) {
    echo 'Failed to connect to MySQL!';
    exit(0);
  }

  $name = (isset($_GET['name'])) ? $_GET['name'] : '';
  $category = (isset($_GET['category'])) ? $_GET['category'] : '';
  $length = (isset($_GET['length'])) ? $_GET['length'] : '';

  $name = preg_replace('/\s\s+/', ' ', $name);

  if (empty($name)) {
    echo 'Name is a required field. Please enter the video name.';

  // check that category does not contain numbers
  } elseif (!empty($category) && !empty(preg_match('/\d+/', $category))) {
    echo 'Category should be alphabetic. No numbers please.';

  // if length provided, but not numeric or given as a float, display error
  } elseif (!empty($length) && (!is_numeric($length) || is_float($length += 0))) {
    echo 'Length must be an integer value.';

  } else { // if all valid,

    // check to see if video title to add already exists in database
    $sql = 'SELECT * FROM inventory WHERE name = "'.$name.'"';

    $rs = $conn->query($sql);

    if ($rs === false) {
      // if unable to insert values in db, output custom error message
      echo 'Unable to add video to database.';
      exit(0);
    } 

    $arr = $rs->fetch_array(MYSQLI_ASSOC);

    if (count($arr) >= 1) {
      echo 'That video is already in the database!';
      exit(0);
    }

    // add video to database
    $sql = 'INSERT INTO inventory VALUES ("", "'.$name.'", "'.$category.'", "'.$length.'", "0");';

    $rs = $conn->query($sql);

    if ($rs === false) {
      // if unable to insert values in db, output custom error message
      echo 'Unable to add video to database.';
      exit(0);
    } 

    // clear variable values for the added video
    $name = '';
    $category = '';
    $length = '';

    // get the id of the new database record and return it along with success message
    echo 'Video added!' . $conn->insert_id;
  }

  $conn->close();
?>