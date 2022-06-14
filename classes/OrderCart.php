<?php
declare(strict_types=1);
require_once "Sessions/Session.php";

use Sessions\Session;

class OrderCart implements IOrderCart {
    private $cartCollection = array();
    private int $totalPrice = 0;

    public function addToCart($item)
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

    public function removeFromCart($item)
    {
        Session::remove('items', $item);
    }

    public function showCart()
    {
        return Session::get('items');
    }

    public function clearCart() {
        return Session::stop();
    }

    public function checkOut()
    {
        return Session::stop();
    }
}
