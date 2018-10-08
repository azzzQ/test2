<?php
  header("Content-Type:text/html;charset=utf-8");

  $x = new mysqli("localhost","root","root","ssys");

if ( $x->connect_error) {
  die("连接失败". $x->connect_error);
}

  $x->query("set names utf8");

 ?>
