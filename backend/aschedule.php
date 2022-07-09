<?php 
// include database connection file 
require_once 'connection.php'; 

$scourse=$_POST['course'];
$query="call sp_read_Ass('$scourse')";
$sq2 =mysqli_query($con, $query); 	
$rows = array();
while ($result=mysqli_fetch_array($sq2)) {            
	$rows[]=$result; 
}      
print json_encode($rows);

?>     


