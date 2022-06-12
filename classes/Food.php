<?php

class Food extends Consumable implements iConsumable{
    #120 = Salad, 121 = Cake, 122, Wrap
    public int $foodTypeId;
    private String $foodName;
    private $dbConnection;

    public function __construct($db){
        $this->dbConnection = $db;
    }	


    public function getFoodTypeId($id){
        $this->foodTypeId = $id;

        return $this->foodTypeId;
    }

}