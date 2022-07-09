<?php 
// include database connection file 
require 'connection.php'; 

// Posted Values   
$as=$_POST['assessment'];
$cs=$_POST['course'];
$student=explode(',', $_POST['student']);
$marks=explode(',', $_POST['marks']);
// $marks=$_POST['marks'];
$cnt=0;
$rows = array();

foreach (array_combine($student, $marks) as $sid => $mark) {
	// Call the store procedure for insertion 
    $sql=mysqli_query($con,"call sp_result_insert(
        '$sid','$cs','$as','$mark')"
    ); 
    if(!$sql) {
        print json_encode([$sid,$cnt]);
        mysqli_close($con);
        exit;
    }
    $cnt++;
}
if($sql) 
    { // Message for successfull insertion 
        print json_encode('Success');
    } 
    else  
    { 
        // Message for unsuccessfull insertion 
        print json_encode('Fail');
    } 
    
mysqli_close($con);
?>   

