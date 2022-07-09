<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$st=$_POST['employee'];

// Call the store procedure for insertion 
$sq1 =mysqli_query($con, "call sp_delete_employeeDB('$st')"); 
// print json_encode(mysqli_affected_rows($con));
// print json_encode($sq1);
mysqli_close($con);
?>   

