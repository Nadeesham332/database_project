<?php 
// include database connection file 
require_once 'connection.php';  

$scourse=$_POST['course'];
$sql =mysqli_query($con, "call sp_read_a_Course('$scourse')"); 
$rows = array();
while ($result=mysqli_fetch_array($sql)) {            
	$rows[]=$result;
} 
print json_encode($rows);
?>     
