<?php

spl_autoload_register(function ($className) {
    $file = $className . ".php";

    if (file_exists($file) and !class_exists($className))
        include $file;
});
