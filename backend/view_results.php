<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$sid=$_POST['student']; 
// Call the store procedure for insertion 
$sq2=mysqli_query($con,"call sp_view_results('$sid')"); 	
$rows = array();
while ($result=mysqli_fetch_array($sq2)) {            
	$rows[]=$result; 
}      
print json_encode($rows);
?>   
