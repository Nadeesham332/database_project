<?php 
// include database connection file 
require_once 'connection.php'; 

// Call the store procedure for insertion 
$sq1=mysqli_query($con,"call sp_assessment_db()"); 
$rows = array();
while ($result=mysqli_fetch_array($sq1)) {            
	$rows[]=$result;
} 

print json_encode($rows);
?>  


