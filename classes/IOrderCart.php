<?php

interface IOrderCart {
    public function addToCart(IConsumable $item);
    public function removeFromCart($item);
    public function showCart();
    public function clearCart();
}