<?php
require_once("MongoDbPost_Islem.php");

class MongoDbCommand {
    
    private $komutDizisi;

    function __construct() {

        $this->setKomutDizisi("kayitYap", new MongoDbKayitYap());
        $this->setKomutDizisi("girisYap", new MongoDbGiris());  
        $this->setKomutDizisi("konulariGetir", new MongoDbKonulariGetir());
        $this->setKomutDizisi("yorumlariGetir", new MongoDbYorumlariGetir());
        $this->setKomutDizisi("konuAc", new MongoDbKonuAc());
        $this->setKomutDizisi("yorumYap", new MongoDbYorumYap());
        $this->setKomutDizisi("yorumSil", new MongoDbYorumSil());
        $this->setKomutDizisi("konuSil", new MongoDbKonuSil());

    }

    private function setKomutDizisi($key, $komutDizisi) {
        $this->komutDizisi[$key] = $komutDizisi;
    }

    public function execute() {
        $this->komutDizisi[$_POST['Command']]->template();
    }
}


?>