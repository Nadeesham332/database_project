<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$as=$_POST['assessmentId'];
$cs=$_POST['course'];
$st=$_POST['student'];
$ms=$_POST['marks'];
$up=$_POST['upDate'];

// Call the store procedure for updation 
$sq1 =mysqli_query($con, "call sp_update_resultDB('$cs','$as','$st','$ms','$up')"); 

// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      
mysqli_close($con);
?>   

