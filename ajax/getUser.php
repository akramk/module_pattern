<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['user'])){
$user = $_GET['user'];
$password = $_GET['password'];
}

$query="select username, password from user where username like '$user' and  password like '$password'";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

 $arr = array();
 if($result->num_rows > 0) {
 	while($row = $result->fetch_assoc()) {
 		$arr[] = $row;
 	}
 }
session_start();
if($result->num_rows == 1){
$_SESSION['user']= $user;
echo $_SESSION['user'];
}
 # JSON-encode the response
 echo $json_response = json_encode($arr);
?>