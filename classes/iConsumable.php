<?php

interface iConsumable {

    public function getConsumableId($id);

    public function getBevId();
    public function getFoodId();
    public function getBevTypeId();
    public function getFoodTypeId($id);
    
}