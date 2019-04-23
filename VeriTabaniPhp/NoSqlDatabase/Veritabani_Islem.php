<?php
require_once('Baglanti_Class.php');

class MongoDbIslem 
{
    private $mongoDbBaglanti;

    public function __construct() {
        $this->setMongoDbBaglanti();
    }

    private function setMongoDbBaglanti() {
        $this->mongoDbBaglanti = new MongoDb_Baglanti();
        $this->mongoDbBaglanti->setBaglanti();
    }
    private function getMonDbBaglanti() {
        return $this->mongoDbBaglanti;
    }

    public function getBaglanti() {
        return $this->getMonDbBaglanti()->getBaglanti();
    }

    public function mongoDbHazirla($collection) {
        $this->getMonDbBaglanti()->setCollection($collection);
    }

    public function getData($dataSecici, $dataElemankisitlayici) {

        $this->getMonDbBaglanti()->setSorgu($dataSecici, $dataElemankisitlayici);
        $this->getMonDbBaglanti()->fetchData();
        return $this->getMonDbBaglanti()->getData();
    }

    public function getDataUzunlugu() {
        return $this->getMonDbBaglanti()->getDataUzunlugu();
    }

    public function update($dataId, $islemData) {
       return $this->getMonDbBaglanti()->update($dataId, $islemData);
    }

    public function insert($yeniData) {
        return $this->getMonDbBaglanti()->insert($yeniData);
    }

    public function delete($dataId){
        return $this->getMonDbBaglanti()->delete($dataId);
    }

}



?>