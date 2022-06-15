<?php
declare(strict_types=1);

class Frappe extends Beverage implements IConsumable {
    public function __construct($id, $name, $image, $size, $price, $qty = 1){
        parent::__construct($id, $name, '', '', $image, $size, floatval($price), intval($qty));
    }
}