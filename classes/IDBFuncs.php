<?php
declare(strict_types=1);


interface iDBFuncs {
	  public function table($tablename);
	  public function insert(Array $values);
	  public function get(); 
	  public function getAll();
	  public function select(Array $fieldList=null);
	  public function from($table);
	  public function where();
	  public function whereOr();
	  public function showQuery();
	  public function update(Array $values);
      public function delete();
}