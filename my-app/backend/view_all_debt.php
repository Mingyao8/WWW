<?php
session_start(); // 啟用交談期
// Start the session
include "index.php";
$user_id = $_SESSION['id'];
$sql = "SELECT  list.id 'list_id',  list.amount 'money',list.debt_date 'date' 
        ,list.debt_note 'note'
        ,list.debt_user_id_1 
        ,list.debt_user_id_2 
        , user.name 'debt_name'
        , user2.name 'back_name'
        ,case
        when user.id = 1 then 0
        when user2.id = 1 then 1
        END
        AS tag
        FROM www.list
        LEFT JOIN www.user ON list.debt_user_id_1 = user.id 
        LEFT JOIN www.user user2 ON list.debt_user_id_2 = user2.id
        WHERE user.id = $user_id or user2.id = $user_id 
        ORDER BY list.debt_date";
$result = mysqli_query($con, $sql);
while ($row = mysqli_fetch_assoc($result)) {
    $array[] = $row;
}
$dataset = array(
    "total" => count($array),
    "data" => $array
);
echo json_encode($dataset);
