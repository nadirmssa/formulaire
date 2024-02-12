<?php
if (session_status() !== PHP_SESSION_ACTIVE) session_start();

$method = $_SERVER['REQUEST_METHOD'];

if (!isset($_SESSION['id'])) {
    $_SESSION['id'] = 0;
}

$rawData = trim(file_get_contents("php://input"));
$data = json_decode($rawData, true);

if ($method === 'POST') {
    $_SESSION['perso' . $_SESSION['id']] = $data;
    $_SESSION['id'] = $_SESSION['id'] + 1;
    print json_encode($_SESSION);
} elseif ($method === 'GET') {
    if(isset($_GET['id'])){
        print json_encode($_SESSION[$_GET['id']]);
    } else {
         print json_encode($_SESSION);
    }
} elseif ($method === 'PUT') {
    $_SESSION[$_GET['id']] = $data;
    print json_encode($_SESSION[$_GET['id']]);
} elseif ($method === 'DELETE') {
    if(isset($_SESSION[$_GET['id']])) {
        unset($_SESSION[$_GET['id']]);
        print json_encode("deleted " . $_GET['id'] . " OK");
    } else {
        print json_encode("no found personne");
    }
}
