<?php


require_once('NoSqlTemplate.php');

class MongoDbKayitYap extends MongoDbKayitYapTemplate {
    
    public function jsonHazirla() {

        if ( is_object($this->getSonucDiziEleman("BasariDurum")) ) 
            $this->setSonucDiziAjaxEleman("Basarili", "Kayit Yapıldı");
        else if( $this->getSonucDiziEleman("BasariDurum") == "Kayit Var" )
            $this->setSonucDiziAjaxEleman("Hata", "Kayit Yapılamadı. Ayni Mail Kaydı var");
        else
            $this->setSonucDiziAjaxEleman("Hata", "Kayit Yapılamadı. Veri Tabani Hatasi");

    }
}
class MongoDbGiris extends MongoDbGirisTemplate {

    public function jsonHazirla() {

        if ( $this->getSonucDiziEleman("dataSayi") ) {

            $_SESSION['kullanici'] = new Kullanici();
            
            $_SESSION['kullanici']->setKullaniciAd($this->getSonucDiziEleman("data")[0]["kullaniciAd"]);
            $_SESSION['kullanici']->setKullaniciSoyAd($this->getSonucDiziEleman("data")[0]["kullaniciSoyAd"]);
            $_SESSION['kullanici']->setKullaniciMail($_POST['mail']);
            $this->setSonucDiziAjaxEleman("kullanici", $_POST['mail']);
            
        }
        else 
            $this->setSonucDiziAjaxEleman("Hata", "Kullanici adi veya şifre yanliş");  
    }
}
class MongoDbKonulariGetir extends MongoDbKonulariGetirTemplate {

    public function jsonHazirla() {
        $this->setSonucDiziAjaxEleman("data", $this->getSonucDiziEleman("data"));  
    }
}
class MongoDbYorumlariGetir extends MongoDbYorumlariGetirTemplate{

    public function jsonHazirla() {
        $this->setSonucDiziAjaxEleman("data", $this->getSonucDiziEleman("data"));  
    }
}
class MongoDbKonuAc extends MongoDbKonuAcTemplate {

    public function jsonHazirla() {

        if(is_object($this->getSonucDiziEleman("key")))
        {
            $this->setSonucDiziAjaxEleman("kullanici", $this->getSonucDiziEleman("ortakArray")['yazanKullanici']);
            $this->setSonucDiziAjaxEleman("metin",  $this->getSonucDiziEleman("ortakArray")['metin']);
            $this->setSonucDiziAjaxEleman("konu", $_POST['konu']);
            $this->setSonucDiziAjaxEleman("tarih", $this->getSonucDiziEleman("ortakArray")['tarih']);
            $this->setSonucDiziAjaxEleman("anahtar", $this->getSonucDiziEleman("key")->getInsertedId());
        }
        else
            $this->setSonucDiziAjaxEleman("Hata", "Veri Tabani Kayit Hatasi");
  
    }
}
class MongoDbYorumYap extends MongoDbYorumYapTemplate {

    public function jsonHazirla() {

        if(is_object($this->getSonucDiziEleman("key")))
        {
            $this->setSonucDiziAjaxEleman("kullanici", $this->getSonucDiziEleman("ortakArray")['yazanKullanici']);
            $this->setSonucDiziAjaxEleman("metin",  $this->getSonucDiziEleman("ortakArray")['metin']);
            $this->setSonucDiziAjaxEleman("tarih", $this->getSonucDiziEleman("ortakArray")['tarih']); 
            $this->setSonucDiziAjaxEleman("anahtar", $this->getSonucDiziEleman("ortakArray")['_id']);
        }
        else
            $this->setSonucDiziAjaxEleman("Hata", "Veri Tabani Kayit Hatasi");
  
    }
}
class MongoDbKonuSil extends MongoDbKonuSilTemplate {
    public function jsonHazirla() {

        if(is_object($this->getSonucDiziEleman("basariDurum")))
        {
            $this->setSonucDiziAjaxEleman("Basarili","Konu veritabanından silinmiştir");
        }
        else
            $this->setSonucDiziAjaxEleman("Hata", "Veri Tabani Silme Hatasi");
  
    }
}
class MongoDbYorumSil extends MongoDbYorumSilTemplate {
    public function jsonHazirla() {

        if(is_object($this->getSonucDiziEleman("basariDurum")))
            $this->setSonucDiziAjaxEleman("Basarili","Yorum veritabanından silinmiştir");
        else
            $this->setSonucDiziAjaxEleman("Hata", "Veri Tabani Silme Hatasi");
  
    }
}
?>