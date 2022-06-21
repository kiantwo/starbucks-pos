<?php
declare(strict_types=1);
require_once "Sessions/Session.php";

use Sessions\Session;

class OrderCart implements IOrderCart {
    private $cartCollection = array();
    private int $totalPrice = 0;

    public function addToCart(IConsumable $item)
    {
        if (Session::has('items')) {
            $temporaryValue = $this->showCart();
            array_push($temporaryValue, $item);
            Session::add('items', $temporaryValue);
        } else {
            $this->cartCollection[] = $item;
            Session::add('items', $this->cartCollection);
        }
    }

    public function getItem($index) {
        return Session::get('items', $index);
    }

    public function removeFromCart($item)
    {
        Session::remove('items', $item);
    }

    public function showCart()
    {
        return Session::get('items');
    }

    public function getCartCost() {
        // Get sum of all item prices in cart
        $cart = $this->showCart();
        $sum = 0;
        foreach($cart as $key => $value) {
            $item = $cart[$key];
            $itemPrice = $item->getPrice();
            $itemQty = $item->getQty();
            $sum = $sum + ($itemPrice * $itemQty);
        }
        return $sum;
    }

    public function clearCart() {
        return Session::stop();
    }
}
