<?php
require_once("PostIslem/Command.php");
    
    if(isset($_POST['BaseCommand']))
    {
        session_start();
        $komut = new BaseCommand();
        $komut->command($_POST['BaseCommand']);
    }

?>