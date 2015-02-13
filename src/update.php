<?php

  $id = $_GET['id'];
  $status = $_GET['status'];

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
  $sql = 'UPDATE inventory SET rented = "'.$status.'" WHERE id = "'.$id.'";';
  $rs = $conn->query($sql);

  // check that query was successful
  if ($rs === false) {
    // return response that indicates failure
    echo 'Unable to update database.';
  } else {
    echo 'Video status updated!';
  }

  // close connection to database
  $conn->close();
?>