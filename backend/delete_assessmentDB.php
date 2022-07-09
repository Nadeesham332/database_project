<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$asId=$_POST['assessment'];
$csId=$_POST['course'];

// Call the store procedure for deletion 
$sq1 =mysqli_query($con, "call sp_delete_assessmentDB('$csId','$asId')"); 
print json_encode($sq1);
mysqli_close($con);
?>   

