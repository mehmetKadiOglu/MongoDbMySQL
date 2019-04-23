<?php
require_once('Factory_Eleman.php');
////////////////////////////
interface ISqlFactoryVeritabani {
    function baglanti();
    function sorgu();
    function execSorgu();
    function fetchData();
}

class FactoryMysqli implements  ISqlFactoryVeritabani {

    public function baglanti() {
        return new MysqliBaglanti();
    }
    public function sorgu() {
        return new MysqliSorgu();
    }
    public function execSorgu() {
        return new MysqliExecSorgu();
    }
    public function fetchData() {
       return new MysqliFetchData();
    }
}

?>