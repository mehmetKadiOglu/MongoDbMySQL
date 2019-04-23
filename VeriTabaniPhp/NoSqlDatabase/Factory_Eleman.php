<?php
    require_once('..\vendor\autoload.php');

    abstract class NoSqlFactoryBaglanti {

        protected $baglanti;

        abstract function setBaglanti();
        public function getBaglanti() {
            return $this->baglanti;
        }

    }

    class MongoDbBaglanti extends NoSqlFactoryBaglanti {

        public function setBaglanti() {
            $this->baglanti = new MongoDB\Client("mongodb://localhost:27017");
        }

    }

    ////////////////////////////////////////////

    abstract class NoSqlFactoryCollection {

        protected $collection;

        abstract function setCollection($collect);
        public function getCollection() {
            return $this->collection;
        }

    }

    class MongoDbCollection extends NoSqlFactoryCollection {

        public function setCollection($collect) {
            $this->collection = $collect;
        }

    }

    ////////////////////////////////////////////


    abstract class NoSqlFactorySorgu {

        protected $sorgu; 

        abstract function setSorgu($dataSecici, $dataElemankisitlayici, $collection);
        public function getSorgu() {
            return $this->sorgu;
        }
    }

    class MongoDbSorgu extends NoSqlFactorySorgu {

        public function setSorgu($dataSecici, $dataElemankisitlayici, $collection) {
            $this->sorgu = $collection->find($dataSecici, $dataElemankisitlayici);
        }

    }


    //////////////////////////////////////////////////

    interface INoSqlFactoryUpdate {
        function update($dataSecici, $yeniData, $collection);
    } 

    class MongoDbUpdate implements INoSqlFactoryUpdate {

        public function update($dataSecici, $yeniData, $collection) {
           return $collection->updateOne($dataSecici, $yeniData);
        }

    }

    ///////////////////////////////////////////////////

    interface NoSqlFactoryInsert {
        function insert($yeniData, $collection);
    } 

    class MongoDbInsert implements NoSqlFactoryInsert {

        public function insert($yeniData, $collection) {
           return $collection->insertOne($yeniData);
        }

    }

    /////////////////////////////////////////////////

    interface NoSqlFactoryDelete {
        function delete($dataId, $collection);
    }

    class MongoDbDelete implements NoSqlFactoryDelete{
        public function delete($dataId, $collection){
           return $collection->deleteOne($dataId);
        }
    }
    /////////////////////////////////////////////////

    abstract class NoSqlFactoryFetchData{
        
       protected $fetchDataArray = [];
       protected $dataUzunlugu = 0;

        abstract function fetchData($collection);

        protected function setData($key, $value) {
            $this->fetchDataArray[$this->getDataUzunlugu()][$key] = $value;
        }
        public function getData() {
            return $this->fetchDataArray;
        }

        protected function setDataUzunlugu() {
            $this->dataUzunlugu++;
        }
        public function getDataUzunlugu() {
            return $this->dataUzunlugu;
        }

        protected function rekursitData($data){

            foreach ($data as $key => $value){

                if(is_string($value)) {

                    $this->dataYaz($data);
                    break;
                }
                else if(is_object($value))
                    $this->rekursitData($value);
            }
        }

        abstract protected function dataYaz($data);


    } 

    class MongoDbFetchData extends NoSqlFactoryFetchData {

        public function fetchData($collection) {
            $this->rekursitData($collection->toArray());
        }

        protected function dataYaz($data){

            foreach ($data as $key => $sonuc) 
                $key == "_id" ? $this->setData("anahtar", $sonuc) : $this->setData($key, $sonuc);
        
                $this->setDataUzunlugu();
        }
    }

?>