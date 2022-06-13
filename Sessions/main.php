<?php

require_once 'Session.php';

use Sessions\Session;
Session::start();

$test['first'] = 'test';

// Session::add('myKey','Hello World');
Session::add('myKey',$test);

// echo is_array($_SESSION['myKey']);

var_dump(Session::get('myKey'));

// echo $_SESSION['myKey'][0][0];

Session::stop();