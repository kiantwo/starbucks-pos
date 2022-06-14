<?php

interface iConsumable {

    public function getConsumableId(string $id);
    public function getType();
    public function getPrice();
    public function getImage();
    public function getName();


    // public function getBevId();
    // public function getFoodId();
    // public function getBevTypeId();
    // public function getFoodTypeId($id);
    
}