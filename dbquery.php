<?php
require_once 'classes/IDBFuncs.php';
require_once 'classes/DBLibrary.php';

try {
    $dbSource = new PDO('mysql:host=localhost;dbname=starbucks','root','');
} catch(PDOException $e) {
    echo $e->getMessage();
}

$db = new DBLibrary($dbSource);

if(isset($_GET['consumables'])) {
    // Get Consumable (Food/Beverage)
    $result = $db->select()->from('consumable')->getAll();
    $jsonResult = json_encode($result);
    echo $jsonResult;
}

else if(isset($_GET['consumable-type'])) {
    // Get Consumable Sub-types
    $consumableType = $_GET['consumable-type'];
    $result = $consumableType == '100' ? $db->select()->from('beverage_type')->getAll() : $db->select()->from('food_type')->getAll();
    $jsonResult = json_encode($result);
    echo $jsonResult;
}

else if(isset($_GET['items'])) {
    // Get Consumable Items
    $itemType = $_GET['items'][0];
    $consumableType = $_GET['items'][1];
    $result = $consumableType == '100' ? $db->select()->from('beverage')->where('bevTypeID', $itemType)->getAll() : $db->select()->from('food')->where('foodTypeID', $itemType)->getAll();
    $jsonResult = json_encode($result);
    echo $jsonResult;
    
}
 
