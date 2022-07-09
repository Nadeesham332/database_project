<?php 
// include database connection file 
require_once 'connection.php';  

$sql =mysqli_query($con, "call sp_read_Courses()"); 
$rows = array();
while ($result=mysqli_fetch_array($sql)) {            
	$rows[]=$result;
} 
print json_encode($rows);
?>     
