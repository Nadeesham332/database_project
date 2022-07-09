<?php 
// include database connection file 
require_once 'connection.php'; 

// Posted Values   
$asId=$_POST['assessmentId'];
$csId=$_POST['course'];
$as=$_POST['assessment'];
$super=$_POST['supervisor'];
$asses=$_POST['assessor'];
$sched=$_POST['schedDate'];
$code=$_POST['assessCode'];

// Call the store procedure for updation 
$sq1 =mysqli_query($con, "call sp_update_assess('$csId','$asId','$as','$super','$asses','$sched','$code')"); 
	

print json_encode(mysqli_affected_rows($con));


    
mysqli_close($con);
// $rows = array();
// while ($result=mysqli_fetch_array($sq1)) {            
// 	$rows[]=$result; 
// }      

?>   

