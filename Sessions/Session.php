<?php
namespace Sessions;

class Session {
     
    public static function start(){
        session_save_path('../Sessions');
        session_start();
    } 

    public static function stop(){
        session_destroy();
    }

    public static function add($key,$value){
        return $_SESSION[$key] = $value;
    }

    public static function get($key,$indexList=null){
        $numberOfArguments = func_num_args();
        if($numberOfArguments > 1){
            // echo "I'm here";
            if(is_array($indexList)){    //check if it is an array

                $current = $_SESSION[$key]; //identify the starting point

                foreach($indexList as $indexKey){
                      $current = $current[$indexKey];  
                }

                return $current;

            } elseif (is_string($indexList) or is_numeric($indexList)){

                  return $_SESSION[$key][$indexList];
            } 
        } elseif($numberOfArguments <= 1){
            // echo "This is processed";
            return $_SESSION[$key];   
        }           
    }

    public static function remove($key){
            unset($_SESSION[$key]);
        return true;
    }

    public static function has($key){
        if(isset($_SESSION[$key]))
            return true;
        else
            return false;
    }

}
