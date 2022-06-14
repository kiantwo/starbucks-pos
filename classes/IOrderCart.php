<?php

interface IOrderCart {
    public function addToCart($item);
    public function removeFromCart($item);
    public function showCart();
    public function clearCart();
    public function checkout();
}