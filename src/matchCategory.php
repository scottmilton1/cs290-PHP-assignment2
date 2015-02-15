<?php

  $category = $_GET['category'];

  if (!defined('DB_HOST')) { define('DB_HOST', 'localhost'); }
  if (!defined('DB_USER')) { define('DB_USER', 'root'); }
  if (!defined('DB_PASSWORD')) { define('DB_PASSWORD', 'root'); }
  if (!defined('DB_NAME')) { define('DB_NAME', 'inventory'); }

  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

  if ($conn->connect_errno) {
    echo 'error1';
    exit(0);
  }

  // check to see if category exists in database
  $sql = 'SELECT * FROM inventory WHERE category = "'.$category.'";';

  $rs = $conn->query($sql);

  if ($rs === false) {
    // if unable to insert values in db, output custom error message
    echo 'error2';
    exit(0);
  } 

  $arr = $rs->fetch_array(MYSQLI_ASSOC);

  // report results of query
  if (count($arr) >= 1)
    echo 'match found';
  else 
    echo 'no match found';

  // close connection to database
  $conn->close();
?>