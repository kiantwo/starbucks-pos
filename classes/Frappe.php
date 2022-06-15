<?php
declare(strict_types=1);

class Frappe extends Beverage implements IConsumable {
    public function __construct($id, $name, $image, $size, $price, $qty = 1){
        $this->id = $id;
        $this->name = $name;
        $this->image = $image;
        $this->size = $size;
        $this->price = floatval($price);
        $this->qty = intval($qty);
    }
}