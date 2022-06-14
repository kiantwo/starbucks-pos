<?php
include "autoload.php";
require_once "Sessions/Session.php";

use Sessions\Session;

Session::start();

$cart = new OrderCart;

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['add'])) {
    // Adding Item to Cart
    $item = $data['item'];
    $result = array();
    $cart->addToCart($item);

    $result[] = count($_SESSION['items']);
    $result[] = getSessionPrice();

    $jsonResult = json_encode($result);
    echo $jsonResult;
}

else if(isset($data['remove'])) {
    // Remove Item from Cart
    $itemIndex = $data['index'];
    $result = array();
    $cart->removeFromCart($itemIndex);

    $result[] = count($_SESSION['items']);
    $result[] = getSessionPrice();

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

        $jsonResult = json_encode($result);
        echo $jsonResult;
    } else {
        echo false;
    }
}

function getSessionPrice() {
    // Get sum of all item prices in cart
    $session = $_SESSION['items'];
    $sum = 0;
    foreach($session as $key => $value) {
        $sum += $session[$key]["price"];
    }

    return $sum;
}