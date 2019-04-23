<?php

    abstract class SqlFactoryBaglanti {

        protected $baglanti;
        abstract function setBaglanti();

        public function getBaglanti() {
            return $this->baglanti;
        }

    }

    class MysqliBaglanti extends SqlFactoryBaglanti {

        public function setBaglanti() {
            $this->baglanti = new mysqli("localhost","root","","sinav");
            $this->baglanti->set_charset("utf8");
        }

    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    abstract class SqlFactorySorgu {

        protected $sorgu; 

        abstract function setSorgu($sorguMetni, $baglanti);

        public function getSorgu() {
            return $this->sorgu;
        }
    }

    class MysqliSorgu extends SqlFactorySorgu {

        public function setSorgu($sorguMetni, $baglanti) {
           $this->sorgu = $baglanti->prepare($sorguMetni);
        }
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    abstract class SqlFactoryExecSorgu {

        protected $sorguCalismaDurum; 
        protected $veritabaniDataObjesi; 

        abstract function exec_Sorgu1($sorgu); 
        abstract function exec_Sorgu2($sorgu, $a_params); 


        protected function setSorguCalismaDurum($sorguCalismaDurum) {
            $this->sorguCalismaDurum = $sorguCalismaDurum;
        }
        public function getSorguCalismaDurum() {
            return $this->sorguCalismaDurum;
        }

        protected function setVeritabaniDataObjesi($veritabaniDataObjesi) {
            $this->veritabaniDataObjesi = $veritabaniDataObjesi;
        }
        public function getVeritabaniDataObjesi() {
            return $this->veritabaniDataObjesi;
        }

    }

    class MysqliExecSorgu extends SqlFactoryExecSorgu {

        public function  __call($method, $args) {
            switch (count($args)) {
                case 1:
                        call_user_func_array(array($this, "exec_Sorgu1"), $args);
                        break;
                case 2:
                        call_user_func_array(array($this, "exec_Sorgu2"), $args);
                        break;
                default:
                    break;
            }
        }
        public function exec_Sorgu1($sorgu) {

            $this->setSorguCalismaDurum($sorgu->execute());
            $this->setVeritabaniDataObjesi($sorgu->get_result());

        }
        public function exec_Sorgu2($sorgu, $a_params) {

            call_user_func_array(array($sorgu,"bind_param"), $a_params);
            $this->setSorguCalismaDurum($sorgu->execute());

            $this->setVeritabaniDataObjesi($sorgu->get_result());
        }
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    abstract class SqlFactoryFetchData {

        protected $dataSayisi = 0;
        protected $data = [];

        abstract function fetchData($veritabaniData);


        public function getDataSayisi() {
            return  $this->dataSayisi;
        }
        protected function setDataSayisi() {
            $this->dataSayisi++;
        }
        protected function setData($key, $value) {
            $this->data[$this->getDataSayisi()][$key] = $value;
        }
        public function getData() {
            return $this->data;
        }

    }

    class MysqliFetchData extends SqlFactoryFetchData {

        public function fetchData($veritabaniDataObjesi) {

            while( $row = $veritabaniDataObjesi->fetch_assoc() )
            {
                foreach ($row as $key => $value) 
                   $this->setData( $key, $value );
                
                $this->setDataSayisi();
            }
        }
    }
?>