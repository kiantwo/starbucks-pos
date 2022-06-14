<?php

class Beverage extends Consumable implements iConsumable{

    private $bevType;
    private $bevName;
    private $bevImage;
    private $bevPrice;

    public function __construct(){
        if (func_num_args() == 4) {
            $this->bevType = func_get_arg(0);
            $this->bevName = func_get_arg(1);
            $this->bevImage = func_get_arg(2);
            $this->bevPrice = func_get_arg(3);
          }
    }

    public function getType(){
        return $this->bevType;
    }
    public function getImage(){
        return $this->bevImage;
    }
    public function getPrice(){
        return $this->$bevPrice;
    }
    public function getName(){
        return $this->$bevName;
    }

}