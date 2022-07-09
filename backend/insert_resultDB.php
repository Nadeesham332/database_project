<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$as=$_POST['assessmentId'];
$cs=$_POST['course'];
$st=$_POST['student'];
$ms=$_POST['marks'];

// Call the store procedure for insertion 
$sq1 =mysqli_query($con, "call sp_result_insert('$st','$cs','$as','$ms')"); 
	

print json_encode(mysqli_affected_rows($con));
    
mysqli_close($con);  

?>   

