<?php
declare(strict_types=1);

class HealthyOptions extends Food implements IConsumable {
    public function __construct($id, $name, $image, $price, $qty = 1){
        parent::__construct($id, $name, '', $image, floatval($price), intval($qty));
    }
}