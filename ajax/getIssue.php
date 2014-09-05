<?php 
require_once '../includes/db.php'; // The mysql database connection script
$status = '%';
if(isset($_GET['user'])){
$user = $_GET['user'];
}
session_start();
$user = $_SESSION['user'];
//$query="select NAME, DESCRIPTION from issue where createdBy like '$user' ";
$query = "SELECT issue_persmission.id as ID, issue1.issuename as ISSUENAME, issue1.description as DESCRIPTION, issue1.createdBy as POSTED FROM `issue_persmission` JOIN issue1 ON (issue1.id = issue_persmission.id) and issue_persmission.username = '$user' and issue1.status = 'open'";
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