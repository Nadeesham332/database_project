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
$gName=$_POST['guardianName'];
$relationship=$_POST['relationship'];
$contactNo=$_POST['contactNo'];
$gloginCode=$_POST['gloginCode'];

// Call the store procedure for insertion 
$sq1 =mysqli_query($con, "call sp_insert_stdDB('$stdID','$fName','$minit','$lName','$sex','$dob','$address','$loginCode','$gName','$relationship','$contactNo','$gloginCode')"); 
	

print json_encode(mysqli_affected_rows($con));
    
mysqli_close($con);

// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      

?>   

