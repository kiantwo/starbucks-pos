<?php
include "autoload.php";
require_once "Sessions/Session.php";

use Sessions\Session;

Session::start();

$cart = new OrderCart;

$data = json_decode(file_get_contents("php://input"), true);

if(isset($data['add'])) {
    $item = $data['item'];
    $cart->addToCart($item);
    echo count($_SESSION['items']);
}

else if(isset($data['clear'])) {
    $cart->clearCart();
}

if(isset($_GET['cart'])) {
    $jsonResult = json_encode($_SESSION['items']);
    echo $jsonResult;
}

else if(isset($_GET['session'])) {
    if (Session::has('items')) {
        echo count($_SESSION['items']);
    } else {
        echo false;
    }
}