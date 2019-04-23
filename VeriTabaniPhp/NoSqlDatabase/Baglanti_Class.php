<?php
require_once('Factory_VeriTabani.php');

abstract class NoSqlVeriTabani {

    protected $nesneHavuzu;

    function __construct($FactoryVeritabani) {
        $this->dolurNesne($FactoryVeritabani);
    }

    private function dolurNesne($FactoryVeritabani) {
        $this->setNesneHavuzuEleman("baglanti", $FactoryVeritabani->baglanti());
        $this->setNesneHavuzuEleman("collection", $FactoryVeritabani->collection());
        $this->setNesneHavuzuEleman("sorgu", $FactoryVeritabani->sorgu());
        $this->setNesneHavuzuEleman("uptade", $FactoryVeritabani->uptade());
        $this->setNesneHavuzuEleman("insert", $FactoryVeritabani->insert());
        $this->setNesneHavuzuEleman("delete", $FactoryVeritabani->delete());
        $this->setNesneHavuzuEleman("fetchData", $FactoryVeritabani->fetchData());

    }
    private function setNesneHavuzuEleman($key, $value) {
        $this->nesneHavuzu[$key] = $value;
    }
    protected function getNesneHavuzuEleman($key) {
        return $this->nesneHavuzu[$key];
    }

    public function setBaglanti() {
        $this->getNesneHavuzuEleman("baglanti")->setBaglanti();
    }
    public function getBaglanti() {
       return $this->getNesneHavuzuEleman("baglanti")->getBaglanti();
    }

    public function setCollection($collect) {
        $this->getNesneHavuzuEleman("collection")->setCollection($collect);
    }
    protected function getCollection() {
        return $this->getNesneHavuzuEleman("collection")->getCollection();
    }

    public function setSorgu($dataSecici, $dataElemankisitlayici) {
        $this->getNesneHavuzuEleman("sorgu")->setSorgu($dataSecici, $dataElemankisitlayici, $this->getCollection());
    }
    public function getSorgu() {
       return $this->getNesneHavuzuEleman("sorgu")->getSorgu();
    }
    
    public function update($dataSecici, $yeniData) {
       return $this->getNesneHavuzuEleman("uptade")->update($dataSecici, $yeniData, $this->getCollection());
    }
    public function insert($yeniData) {
        return  $this->getNesneHavuzuEleman("insert")->insert($yeniData, $this->getCollection());
    }
    public function delete($dataId){
        return  $this->getNesneHavuzuEleman("delete")->delete($dataId, $this->getCollection());
    }
    public function fetchData() {
        $this->getNesneHavuzuEleman("fetchData")->fetchData($this->getSorgu());
    }
    public function getData() {
        return $this->getNesneHavuzuEleman("fetchData")->getData();
    }
    public function getDataUzunlugu() {
        return $this->getNesneHavuzuEleman("fetchData")->getDataUzunlugu();
    }

}

class MongoDb_Baglanti extends NoSqlVeriTabani {

    function __construct() {
        parent::__construct(new FactoryMangoDb());
    }
}


?>