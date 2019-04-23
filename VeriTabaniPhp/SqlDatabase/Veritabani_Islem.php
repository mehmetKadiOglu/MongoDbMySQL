<?php

require_once('Baglanti_Class.php');

    class MysqliIslem // VeriTabani sınıfı işlemleri bu sınıf üzerinden yapılıyor.
    {
        private $mysqliBaglanti;
        public function __construct() {
            $this->mysqliBaglanti = new Mysqli_Baglanti();
            $this->mysqliBaglanti->setBaglanti();
        }
        public function __call( $medhod, $argc) {
            switch (count($argc)) {
                case 1:
                        call_user_func_array(array($this, "veriTabaniExecute1"), $argc);
                    break;
                case 2:
                        call_user_func_array(array($this, "veriTabaniExecute2"), $argc);
                    break;    
                default:
                    # code...
                    break;
            }
        }
        private function veriTabaniExecute1($sorguMetni) {
            
            $this->mysqliBaglanti->setSorgu($sorguMetni);
            $this->mysqliBaglanti->execSorgu();
        }
        private function veriTabaniExecute2($sorguMetni, $a_params) {
            
            $this->mysqliBaglanti->setSorgu($sorguMetni);
            $this->mysqliBaglanti->execSorgu($a_params);
           
        }
        
        public function getData() {
            $this->mysqliBaglanti->dataFetch();
            return $this->mysqliBaglanti->getVeritabaniData();
        }
        public  function getDataSayisi() {
            return $this->mysqliBaglanti->getSatirSayisi();
        }
        public function getSorguDurumu() {
            return $this->mysqliBaglanti->getSorguCalismaDurum();
        }
    }
?>