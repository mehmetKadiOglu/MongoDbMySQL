<?php

require_once('Factory_Eleman.php');

interface INoSqlFactoryVeritabani {
    function baglanti();
    function collection();
    function sorgu();
    function uptade();
    function insert();
    function delete();
    function fetchData();
}

class FactoryMangoDb implements  INoSqlFactoryVeritabani {

    public function baglanti() {
        return new MongoDbBaglanti();
    }

    public function collection() {
        return new MongoDbCollection();
    }

    public function sorgu() {
        return new MongoDbSorgu();
    }

    public function uptade() {
        return new MongoDbUpdate();
    }

    public function insert() {
       return new MongoDbInsert();
    }

    public function delete(){
        return new MongoDbDelete();
    }

    public function fetchData() {
        return new MongoDbFetchData();
     }
}

?>