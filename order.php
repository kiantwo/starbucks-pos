<?php
include "autoload.php";
require_once "Sessions/Session.php";

use Sessions\Session;

Session::start();

$cart = new OrderCart;
$consumableFactory = new ConsumableFactory;
// Catch $_POST data
$data = json_decode(file_get_contents("php://input"), true);
// POST requests
if(isset($data['add'])) {
    // Adding Item to Cart
    $item = $data['item'];
    $result = array();
    // Build consumable object first before storing to cart
    $itemObj = $consumableFactory->createConsumable($item);
    $cart->addToCart($itemObj);

    $result[] = count($_SESSION['items']);  // Store updated count of items in cart to result
    $result[] = getSessionPrice();  // Store updated price of all items in cart to result

    $jsonResult = json_encode($result);
    echo $jsonResult;
}

else if(isset($data['remove'])) {
    // Remove Item from Cart
    $itemIndex = $data['index'];
    $result = array();
    $cart->removeFromCart($itemIndex);

    $result[] = count($_SESSION['items']);  // Store updated count of items in cart to result
    $result[] = getSessionPrice();  // Store upated price of all items in cart to result

    $jsonResult = json_encode($result);
    echo $jsonResult;
}

else if(isset($data['clear'])) {
    // Clear cart
    $cart->clearCart();
}

if(isset($_GET['cart'])) {
    // Get All Cart Items
    $jsonResult = json_encode($_SESSION['items']);
    echo $jsonResult;
}

else if(isset($_GET['session'])) {
    // Get Session Info
    if (Session::has('items')) {
        $result = array();
        $result[] = count($_SESSION['items']);
        $result[] = getSessionPrice();
        // Return session info if it exists
        $jsonResult = json_encode($result);
        echo $jsonResult;
    } else {
        // Return false if it doesn't
        echo false;
    }
}
else if(isset($data['method'])){
    $itemIndex = $data['index'];
    $method = $data['method'];
    $session = $_SESSION['items'];

    if($method == 'plus'){
        $cart->update('qty', $session[$itemIndex]['qty']++);
        // $_SESSION['qty'] =+ 1;
    }
    else{
        $session[$itemIndex]['qty']--;
    }
    $jsonResult = json_encode( $session[$itemIndex]['qty']);
    echo  $session[$itemIndex]['qty'];
}

function getSessionPrice() {
    // Get sum of all item prices in cart
    $session = $_SESSION['items'];
    $sum = 0;
    foreach($session as $key => $value) {
        $item = $session[$key];
        $sum += $item->getPrice();
    }

    return $sum;
}