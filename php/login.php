<?php
  header('Access-Control-Allow-Origin:*');

  include 'public.php';

  $uname = $_REQUEST["uname"];
  $pwd = $_REQUEST["pwd"];

    $ifName = "select * from `oneplus` where uname = '$uname'";
    $sName=mysqli_query($x,$ifName);

    $n = mysqli_num_rows($sName);

    if ($n == 0) {
      echo 2;
    }else {
      $data = mysqli_fetch_array($sName);
      if ($data['pwd'] == $pwd) {
        echo 1;
      }else {
        echo 0;
      }
    }
 ?>
