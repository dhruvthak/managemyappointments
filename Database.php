<?php

/**
 *
 *
 * */
class Database
{

    private $db_user;
    private $db_pass;
    private $db_name;
    private $db_conn;
    private $db_host;
    private $is_connected = false;
    private $db_query;
    private $db_result;
    private $db_table;

    /**
     * Database Constructor function. Just assigns variables.
     * @param String|null $host
     * @param String|null $username
     * @param String|null $password
     * @param String|null $db
     * @param String|null $table
     *
     */
    public function __construct($host = null, $username = null, $password = null, $db = null, $table = null)
    {
        $this->db_host  = $host;
        $this->db_user  = $username;
        $this->db_pass  = $password;
        $this->db_name  = $db;
        $this->db_table = $table;
    }

    /**
     * Private Connect function, called to open a connection with MySQL DB.
     *
     * @return bool
     */
    public function connect()
    {
        if (empty($this->db_host) || empty($this->db_name)) {
            throw new Exception('Something went wrong!');
        }

        if (!$this->is_connected) {
            $this->db_conn = mysqli_connect($this->db_host, $this->db_user, $this->db_pass, $this->db_name);
            if ($this->db_conn->connect_error) {
                throw new Exception('Unable to connect!');
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    /**
     * Function to insert Data into the database.
     * @param array $data 
     * @return bool
     */
    public function insert($data)
    {

        if (!$this->is_connected) {
            $this->connect();
        }

        if (isset($data)) {

            $this->prepare('insert', $data);
            $this->db_query->execute();
            $this->db_result = $this->db_query->get_result();
            return true;
        }
        return false;
    }

    /**
     * Function to select data from database based on condition or return all rows.
     * @param String|null $condition 
     * @return assoc_array
     */
    public function select($condition = null)
    {
        if (!$this->is_connected) {
            $this->connect();
        }
        if (isset($condition)) {

            $this->prepare('selectSome', $condition);

        } else {

            $this->prepare('selectAll');
        }

        $this->db_query->execute();
        $this->db_result = $this->db_query->get_result();

        if (isset($this->db_result)) {
            while ($result = $this->db_result->fetch_assoc()) {
                $row[] = $result;
            }
        } else {
            $row = [];
        }
        return $row;
    }

    /**
     * Function to close connection with the Database.
     * 
     */
    public function disconnect()
    {
        if (!$this->is_connected) {
            return;
        }

        $this->db_conn->close();
        $this->db_conn = null;
    }

    /**
     * Function to return a prepared query before triggering it. For select and insert.
     * @param String $type -> [ selectSome | insert | selectAll ] 
     * @param String|array|null $condition 
     *
     */
    public function prepare($type, $condition = null)
    {

        switch ($type) {

            case 'insert':

                $this->db_query = "INSERT INTO " . $this->db_table . " (app_date,app_description) VALUES (?,?) ";
                $this->db_query = $this->db_conn->prepare($this->db_query);
                $this->db_query->bind_param("ss", $condition["date"], $condition["description"]);
                break;

            case 'selectAll':

                $this->db_query = "SELECT * FROM " . $this->db_table;
                $this->db_query = $this->db_conn->prepare($this->db_query);
                break;

            case 'selectSome':

                $condition      = "%" . $condition . "%";
                $this->db_query = "SELECT * FROM " . $this->db_table . " WHERE app_description LIKE ? ";
                $this->db_query = $this->db_conn->prepare($this->db_query);
                $this->db_query->bind_param("s", $condition);

                break;

            default:

                throw new Exception('Something went wrong!');
                break;
        }
    }
}
