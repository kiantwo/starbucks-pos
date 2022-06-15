<?php
declare(strict_types=1);

class Coffee extends Beverage implements IConsumable {
    public function __construct($id, $name, $image, $size, $price, $qty = 1){
        parent::__construct($id, $name, '', '', $image, $size, floatval($price), intval($qty));
    }
}