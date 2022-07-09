<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$stdID=$_POST['stdID'];
$fName=$_POST['guardianName'];
$relationship=$_POST['relationship'];
$contactNo=$_POST['contactNo'];
$loginCode=$_POST['loginCode'];

// Call the store procedure for updation 
$sq1 =mysqli_query($con, "call sp_update_guardianDB('$stdID','$fName','$relationship','$contactNo','$loginCode')"); 
	

print json_encode(mysqli_affected_rows($con));


    
mysqli_close($con);
// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      

?>   

