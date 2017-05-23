<?php

/* Helper Database Class */
require_once("Database.php");

/*
Handles two modes of query ie., Select and Insert.
Incase of Select, if query is empty, returns everything(JSON formatted data) else return based on pattern match of query.
Incase of Insert, insert data into the MySQL and redirect to index page.
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

	// If there is no POST data then do nothing else capture data in associative array.	

	$data = array();
	foreach ($_POST as $key => $value) {
		$data[$key] = $value;
	}

}else{

	return false;
}


$dbObj = new Database(DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_TABLE); // Calls the helper class constructor

	switch ($data["mode"]) {
		
		case "select":
			header("Content-Type: application/json");
			$response = $dbObj->select($data["query"]);
			echo json_encode($response);
			break;
		
		case "insert":
			unset($data["mode"]); // Not required anymore
			$data["date"] = $data["date"]." ".$data["time"]; // Concat Date and Time for insertion.
			unset($data["time"]); // Not required anymore
			$response = $dbObj->insert($data);
			header("Location: index.html"); // Redirect browser
			break;
	}

	$dbObj-> disconnect(); // Close connection

?>