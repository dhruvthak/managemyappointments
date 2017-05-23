<?php

require_once("Database.php");
//Accept three types of request. if no parameters are passed then do nothing else if parameter exist then ajax call response in json format else if form submission then get all values and process (insert) them.
/*

mode:value



*/

/** The name of the database */
define("DB_NAME", "appointments_db");

/** MySQL database username */
define("DB_USER", "appointment_user");

/** MySQL database password */
define("DB_PASSWORD", "3UYKzYSxPSPbGQz4");

/** MySQL hostname */
define("DB_HOST", "localhost");


/** MySQL tablename */
define("DB_TABLE", "tb_appointments");

if(!empty($_POST)){

	$data = array();
	foreach ($_POST as $key => $value) {
		$data[$key] = $value;
	}
}else{

	return false;
}

//print_r($data);


$dbObj = new Database(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_TABLE);

	switch ($data["mode"]) {
		
		case "select":
			header("Content-Type: application/json");
			$response = $dbObj->select($data["query"]);
			echo json_encode($response);
			break;
		
		case "insert":
			unset($data["mode"]);
			$response = $dbObj->insert($data);
			break;
	}

	$dbObj-> disconnect();

?>
