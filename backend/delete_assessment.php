<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$asId=$_POST['assessment'];
$csId=$_POST['course'];
$super=$_POST['supervisor'];
$asses=$_POST['assessor'];
 
// Call the store procedure for deletion 
$sq1 =mysqli_query($con, "call sp_delete_assess('$csId','$asId','$super','$asses')"); 
print json_encode($sq1);
mysqli_close($con);
?>   

