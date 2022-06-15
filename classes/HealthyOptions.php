<?php
declare(strict_types=1);

class HealthyOptions implements Food, IConsumable {
    public function __construct($id, $name, $image, $price, $qty = 1){
        $this->id = $id;
        $this->name = $name;
        $this->image = $image;
        $this->price = floatval($price);
        $this->qty = intval($qty);
    }
}