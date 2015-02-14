
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

  // // create query to delete all table rows
  // $sql = 'DELETE FROM inventory;';
  // $rs = $conn->query($sql);

  // // check that query was successful
  // if ($rs === false) {
  //   // return response that indicates failure
  //   echo 'Unable to update database.';
  // } else {
  //   // return respons that indicates success
  //   echo 'All videos deleted!';
  // }

  // close connection to database
  $conn->close();
?>