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

else if(isset($_GET['item-specific'])) {
    // Get Item's details in menu table
    $item = $_GET['item-specific'][0];  // ItemID
    $consumableType = $_GET['item-specific'][1];    // Type of consumable (beverage or food)
    $result[] = array();

    if($consumableType == '100') {
        $result = $db->select(['bevMenuID', 'bevSizeID', 'price'])->from('beverage_menu')->where('beverageID', $item)->getAll();
    }

    else if($consumableType == '101') {
        $result = $db->select(['foodMenuID', 'price'])->from('food_menu')->where('foodID', $item)->getAll();
    }

    $jsonResult = json_encode($result);
    echo $jsonResult;
}
 
