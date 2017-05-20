<?php

   $dbhost = 'localhost';
   $dbuser = 'root';
   $dbpass = 'june1692';
   $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
   $result = array();

   if(! $conn ) {
      die('Could not connect: ' . mysqli_error());
   }
   
   $sql = 'SELECT * FROM tb_appointments';
   mysqli_select_db($conn,'appointments_db');
   $retval = mysqli_query($conn,$sql );
   
   if(! $retval ) {
      die('Could not get data: ' . mysqli_error($conn));
   }
   
   while($row = mysqli_fetch_assoc($retval)) {
      $result[] = $row;
   }
   
   print json_encode($result);
   mysqli_close($conn);
?>