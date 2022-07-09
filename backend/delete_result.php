<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$as=$_POST['assessment'];
$cs=$_POST['course'];
$st=$_POST['student'];

// Call the store procedure for insertion 
$sq1 =mysqli_query($con, "call sp_delete_result('$st','$cs','$as')"); 
 
mysqli_close($con);
?>   

