<?php

    require_once('Factory_VeriTabani.php');

    abstract class SqlVeriTabani {

        protected $nesneHavuzu;

        function __construct($FactoryVeritabani) {
            $this->dolurNesne($FactoryVeritabani);
        }

        private function dolurNesne($FactoryVeritabani){
            $this->setNesneHavuzuEleman("baglanti", $FactoryVeritabani->baglanti());
            $this->setNesneHavuzuEleman("sorgu", $FactoryVeritabani->sorgu());
            $this->setNesneHavuzuEleman("execSorgu", $FactoryVeritabani->execSorgu());
            $this->setNesneHavuzuEleman("fetchData", $FactoryVeritabani->fetchData());
        }
        
        private function setNesneHavuzuEleman($key, $value) {
            $this->nesneHavuzu[$key] = $value;
        }
        private function getNesneHavuzuEleman($key) {
            return $this->nesneHavuzu[$key];
        }

        public function setBaglanti() {
            $this->getNesneHavuzuEleman("baglanti")->setBaglanti();
        }
        public function setSorgu($sorguMetni) {
            $this->getNesneHavuzuEleman("sorgu")->setSorgu($sorguMetni, $this->getNesneHavuzuEleman("baglanti")->getBaglanti());
        }

        public function getVeritabaniData() {
            return  $this->getNesneHavuzuEleman("fetchData")->getData();
        }
        public function getSatirSayisi() {
            return $this->getNesneHavuzuEleman("fetchData")->getDataSayisi();
        }
        public function getSorguCalismaDurum() {
            return $this->getNesneHavuzuEleman("execSorgu")->getSorguCalismaDurum();
        }
        public function dataFetch() {
            $this->getNesneHavuzuEleman("fetchData")->fetchData($this->getNesneHavuzuEleman("execSorgu")->getVeritabaniDataObjesi());
        }
///////////////////////////////////////
        public function __call($method, $argc) {


            switch (count($argc)) {
                case 0:
                    call_user_func(array($this, "execSorgu1"));
                    break;
                case 1:
                    call_user_func_array( array($this, "execSorgu2"), $argc );
                    break;
                default:
                    break;
            }

        }
        private function execSorgu1() {
            $this->getNesneHavuzuEleman("execSorgu")->execute($this->getNesneHavuzuEleman("sorgu")->getSorgu());
        }
        private function execSorgu2($a_params) {
            $this->getNesneHavuzuEleman("execSorgu")->execute($this->getNesneHavuzuEleman("sorgu")->getSorgu(), $a_params);
        }
    }
    
    class Mysqli_Baglanti extends SqlVeriTabani{
        function __construct(){
            parent::__construct(new FactoryMysqli());
        }

    }

?>