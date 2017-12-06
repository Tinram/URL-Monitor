<?php

/**
    * Generate different HTTP responses using query parameters.
    *
    * @author         Martin Latter 10/11/2017
    * @version        0.01
    * @link           https://github.com/Tinram/URL-Monitor.git
*/


session_start();

$aRequest = $_GET;

/* reset */
if (isset($aRequest['sd'])) {
    session_destroy();
    exit;
}

if ( ! isset($aRequest['status'])) {
    die('No status parameter passed - please use ?status=n');
}

if (isset($aRequest['create_single_error'])) {

    if ( ! isset($_SESSION['error_sent'])) {
        $_SESSION['error_sent'] = 1;
        http_response_code(500);
    }
    else {
        $iCode = (int) $_GET['status'];
        http_response_code($iCode);
    }
}
else {
    $iCode = (int) $_GET['status'];
    http_response_code($iCode);
}

?>