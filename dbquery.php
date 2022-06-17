<?php
include "autoload.php";
require_once 'classes/IDBFuncs.php';
require_once 'classes/DBLibrary.php';
require_once "Sessions/Session.php";

use Sessions\Session;

try {
    $dbSource = new PDO('mysql:host=localhost;dbname=starbucks','root','');
} catch(PDOException $e) {
    echo $e->getMessage();
}

$db = new DBLibrary($dbSource);
// Catch $_POST data
$data = json_decode(file_get_contents("php://input"), true);

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

else if(isset($_GET['order'])) {
    // Get user's orders from order-detail table
    $orderID = $_GET['id'];
    $result = $db->select()->from('order_detail')->where('orderID', $orderID)->getAll();
    $innerResult = array();
    
    foreach($result as $key => $value) {
        // Get other details of item from its respective tables
        $itemMenu = $result[$key];

        if(!empty($itemMenu['bevMenuID'])) {
            // Get name, price and size of beverage
            $menuResult = $db->select(['beverageID', 'bevSizeID'])->from('beverage_menu')->where('bevMenuID', $itemMenu['bevMenuID'])->get();
            $innerResult = $db->select(['beverageName'])->from('beverage')->where('beverageID', $menuResult['beverageID'])->get();

            $result[$key]['size'] = $menuResult['bevSizeID'];
        }
        else if(!empty($itemMenu['foodMenuID'])) {
            // Get name and price of food
            $menuResult = $db->select(['foodID'])->from('food_menu')->where('foodMenuID', $itemMenu['foodMenuID'])->get();
            $innerResult = $db->select(['foodName'])->from('food')->where('foodID', $menuResult['foodID'])->get();
        }
        // Append to session array
        $result[$key]['name'] = $innerResult[0];
    }
    $jsonResult = json_encode($result);
    echo $jsonResult;
}
// POST requests
if(isset($data['start-checkout'])) {
    // Store orderID and user name to order-header table
    $customerName = $data['name'];
    $todayDate = $data['date'];
    $result = $db->table('order_header')->insert([0, $customerName, $todayDate]);   // Return orderID primary key

    $jsonResult = json_encode($result);
    echo $jsonResult;
}

else if(isset($data['checkout'])) {
    // Store session cart to database
    Session::start();
    $orderID = $data['id'];
    $session = $_SESSION['items'];

    foreach($session as $key => $value) {
        // Get all required parameters of order-detail table
        $item = $session[$key];
        $bevMenuID = null;
        $foodMenuID = null;
        $price = $item->getPrice();
        $qty = $item->getQty();

        if(is_subclass_of($item, 'Beverage')) {
            $bevMenuID = $item->getID();
        }

        else if(is_subclass_of($item, 'Food')) {
            $foodMenuID = $item->getID();
        }

        $price = $price * $qty; // Get Item Amount
        // Insert results to order-detail table
        $result = $db->table('order_detail')->insert([$orderID, $bevMenuID, $foodMenuID, $price, $qty]);
    }

    $jsonResult = json_encode($result);
    echo $jsonResult;
}
 
