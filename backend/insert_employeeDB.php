<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$empID=$_POST['empID'];
$fName=$_POST['fName'];
$minit=$_POST['minit'];
$lName=$_POST['lName'];
$sex=$_POST['sex'];
$dob=$_POST['dob'];
$email=$_POST['email'];
$eduacationStatus=$_POST['eduacationStatus'];
$loginCode=$_POST['loginCode'];

// Call the store procedure for insertion
$sq1 =mysqli_query($con, "call sp_insert_employeeDB('$empID','$fName','$minit','$lName','$sex','$dob','$email','$eduacationStatus','$loginCode')"); 


print json_encode(mysqli_affected_rows($con));
    
mysqli_close($con);

// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      

?>   

