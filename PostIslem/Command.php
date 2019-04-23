<?php
    require_once("PostIslem/NoSqlPost/Command.php");
    require_once("PostIslem/SqlPost/Command.php");
   

    class BaseCommand {
    
        private $komutDizisi;
    
        function __construct() {
            
            $this->setKomutDizisi("MongoDbCommand", new MongoDbCommand());
            $this->setKomutDizisi("MysqlCommand", new MysqlCommand());
    
        }
    
        private function setKomutDizisi($key, $komutDizisi) {
            $this->komutDizisi[$key] = $komutDizisi;
        }
    
        public function command($key) {
            $this->komutDizisi[$key]->execute();
    
        }
    }
?>