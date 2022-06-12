<?php

class Beverage extends Consumable implements iConsumable{
    private $dbConnection;

    public function __construct($db){
        $this->dbConnection = $db;
    }	
}