<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$stdID=$_POST['stdID'];
$fName=$_POST['fName'];
$minit=$_POST['minit'];
$lName=$_POST['lName'];
$sex=$_POST['sex'];
$dob=$_POST['dob'];
$address=$_POST['address'];
$loginCode=$_POST['loginCode'];

// Call the store procedure for updation 
$sq1 =mysqli_query($con, "call sp_update_stdDB('$stdID','$fName','$minit','$lName','$sex','$dob','$address','$loginCode')"); 
	

print json_encode(mysqli_affected_rows($con));


    
mysqli_close($con);
// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      

?>   

