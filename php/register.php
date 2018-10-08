<?php

header('Access-Control-Allow-Origin:*');
  include 'public.php';

  $uname=$_REQUEST["uname"];
  $pwd=$_REQUEST["pwd"];
  $phone=$_REQUEST["phone"];
  $email=$_REQUEST["email"];

  // $uname='z123';
  // $pwd='123z123';
  // $phone='13111111111';
  // $email='123123';
  // echo $uname.$pwd.$email.$phone;
  $sqlf = "select * from `oneplus` where uname = '$uname'";

  $rowss = mysqli_query($x,$sqlf);
  $n = mysqli_num_rows($rowss);

  if ($n == 1) {
    echo 2;
  }else{
    $sql = "insert into `oneplus` (uname,pwd,phone,email) values ('$uname','$pwd','$phone','$email')";
    $rows=mysqli_query($x,$sql);
    if ($rows) {
      echo 1;
    }else {
      echo 0;
    }
  }

 ?>
