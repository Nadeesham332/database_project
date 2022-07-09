<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$as=$_POST['assessment'];
$cs=$_POST['course'];
$st=$_POST['student'];
$ms=$_POST['marks'];

// Call the store procedure for insertion 
$sq1 =mysqli_query($con, "call sp_update_result('$cs','$as','$st','$ms')"); 
	
// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      
mysqli_close($con);
?>   

