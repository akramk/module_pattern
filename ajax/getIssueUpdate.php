<?php 
require_once '../includes/db.php'; // The mysql database connection script
$status = '%';
if(isset($_GET['id'])){
$id = $_GET['id'];
}
session_start();
$user = $_SESSION['user'];
//$query="select NAME, DESCRIPTION from issue where createdBy like '$user' ";
$query = "SELECT issue_update.id as ID, issue_update.issueUpdate as UPDATEVALUE, issue_update.postedBy as POSTED FROM `issue_update` where id = '$id'" ;
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;	
	}
}

# JSON-encode the response
echo $json_response = json_encode($arr);
?>