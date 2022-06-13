<?php

class Food extends Consumable implements iConsumable{

    private $foodType;
    private $foodName;
    private $foodImage;
    private $foodPrice;

    public function __construct(){
        if (func_num_args() == 4) {
            $this->foodType = func_get_arg(0);
            $this->foodName = func_get_arg(1);
            $this->foodImage = func_get_arg(2);
            $this->foodPrice = func_get_arg(3);
          }
    }

    public function getType(){
        return $this->foodType;
    }
    public function getImage(){
        return $this->foodImage;
    }
    public function getPrice(){
        return $this->$foodPrice;
    }
    public function getName(){
        return $this->$foodName;
    }

    

}