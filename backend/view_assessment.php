<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$cid=$_POST['courseId']; 
$aid=$_POST['AssessmentId']; 
// Call the store procedure for insertion 
$sq2=mysqli_query($con,"call sp_results('$cid','$aid')"); 	
$rows = array();
while ($result=mysqli_fetch_array($sq2)) {            
	$rows[]=$result; 
}      
print json_encode($rows);
?>   
