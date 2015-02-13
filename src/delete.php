<?php

  $id = $_GET['id'];

  if (!defined('DB_HOST')) { define('DB_HOST', 'localhost'); }
  if (!defined('DB_USER')) { define('DB_USER', 'root'); }
  if (!defined('DB_PASSWORD')) { define('DB_PASSWORD', 'root'); }
  if (!defined('DB_NAME')) { define('DB_NAME', 'inventory'); }

  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

  if ($conn->connect_errno) {
    echo 'Failed to connect to MySQL!';
    exit(0);
  }

  // create query and run it
  $sql = 'DELETE FROM inventory WHERE id = "'.$id.'";';
  $rs = $conn->query($sql);

  // check that query was successful
  if ($rs === false) {
    // return response that indicates failure
    echo 'Unable to remove video from database.';
  } else {
    // return respons that indicates success
    echo 'Video deleted!';
  }

  // close connection to database
  $conn->close();
?>