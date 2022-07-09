<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$courseId=$_POST['courseId'];
$course=$_POST['course'];
$instructor=$_POST['instructor'];
$loginCode=$_POST['loginCode'];

// Call the store procedure for updation 
$sq1 =mysqli_query($con, "call sp_update_courseDB('$courseId','$course','$instructor','$loginCode')"); 
	

print json_encode(mysqli_affected_rows($con));


    
mysqli_close($con);
// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      

?>   

