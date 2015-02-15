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

  // get requested record to obtain its category for later
  $sql = 'SELECT * FROM inventory WHERE id = "'.$id.'";';
  $rs = $conn->query($sql);

  // check that query was successful
  if ($rs === false) {
    // return response that indicates failure
    echo 'Unable to remove video from database.';
    exit(0);
  } 

  $arr = $rs->fetch_array(MYSQLI_ASSOC);
  $category = $arr['category'];

  // delete record from database
  $sql = 'DELETE FROM inventory WHERE id = "'.$id.'";';
  $rs = $conn->query($sql);

  // check that query was successful
  if ($rs === false) {
    // return response that indicates failure
    echo 'Unable to remove video from database.';
    exit(0);
  } 

  // check to see if category of deleted record still exists in database
  // this will allow the drop down menu option to be adjusted accordingly
  $sql = 'SELECT * FROM inventory WHERE category = "'.$category.'";';
  $rs = $conn->query($sql);

  // check that query was successful
  if ($rs === false) {
    // return response that indicates failure
    echo 'Unable to connect to database to update category menu. Please refresh the page.';
    exit(0);
  } 

  $arr = $rs->fetch_array(MYSQLI_ASSOC);

  $remaining = (count($arr) >= 1) ? "t" : "f";

  // return respons that indicates success and whether or not the category remains in the DB
  echo 'Video deleted!'. $remaining . $id;

  // close connection to database
  $conn->close();
?>