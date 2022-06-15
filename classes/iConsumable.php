<?php

interface IConsumable {
    public function setName($name);
    public function getName();
    public function setPrice($price);
    public function getPrice();
    public function setQty($qty);
    public function getQty();
}