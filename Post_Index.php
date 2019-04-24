<?php
require_once "PostIslem/Base_Command.php";

if (isset($_POST['BaseCommand'])) {
    session_start();
    $komut = new BaseCommand();
    $komut->command();

} else {
    echo json_encode("BaseCommandHatasi");
}
