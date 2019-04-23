<?php
    require_once("PostIslem/NoSqlPost/NoSqlCommand.php");
    require_once("PostIslem/SqlPost/SqlCommand.php");
   

    class BaseCommand {
    
        private $komutDizisi;
    
        function __construct() {
            
            $this->setKomutDizisi("MongoDbCommand", new MongoDbCommand());
            $this->setKomutDizisi("MysqlCommand", new MysqlCommand());
    
        }
    
        private function setKomutDizisi($key, $komutDizisi) {
            $this->komutDizisi[$key] = $komutDizisi;
        }
    
        public function command() {
            if(array_key_exists ( $_POST['BaseCommand'] , $this->komutDizisi)){
                $this->komutDizisi[$_POST['BaseCommand']]->execute();
            }
            else{
                echo json_encode("BaseCommandHatasi");
            } 
    
        }
    }
?>