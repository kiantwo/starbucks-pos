<?php
declare(strict_types=1);

class Food implements IConsumable, JsonSerializable {
    protected string $id;
    protected string $name;
    protected string $desc;
    protected string $image;
    protected float $price;
    protected int $qty;

    public function __construct($id, $name, $desc, $image, $price, $qty = 1){
        $this->id = $id;
        $this->name = $name;
        $this->desc = $desc;
        $this->image = $image;
        $this->price = $price;
        $this->qty = $qty;
    }

    public function jsonSerialize()
    {
        return get_object_vars($this);
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

    public function setPrice($price) {
        $this->price = $price;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setQty($qty) {
        $this->qty = $qty;
    }

    public function getQty() {
        return $this->qty;
    }

}