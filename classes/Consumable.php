<?php

require_once 'autoload.php';

class Consumable implements iConsumable{

    private int $consumableId;
    private int $foodTypeId;
    private int $bevTypeId;
    private int $foodId;
    private int $bevId;
    
    
    public function getConsumableId($id){
        $consumableId = $id;
        return $this->consumableId;
    }



}