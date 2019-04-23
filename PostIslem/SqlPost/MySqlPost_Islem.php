<?php
require_once('SqlTemplate.php');

class MySqlCikis {

    public function template(){
        
        $sonuc['Basarili'] = "Cıkış Yapıldı";
        unset($_SESSION['kullanici']);
        echo json_encode($sonuc);

    }
}


class MySqlKayitYap extends MySqlKayitYapTemplate {

    public function jsonHazirla() {

        if( $this->getSonucDiziEleman("sorguDurum") )
            $this->setSonucDiziAjaxEleman("Basarili", "Kayit Yapıldı");
        else 
            $this->setSonucDiziAjaxEleman("Hata", "Kayit Yapılamadı. Veri Tabanı Hatası");

    }
}

class MySqlGiris extends MySqlGirisTemplate {

    public function jsonHazirla() {

        if ( $this->getSonucDiziEleman("dataSayi") == 1 ) {

            $_SESSION['kullanici'] = new Kullanici();
            
            $_SESSION['kullanici']->setKullaniciAd($this->getSonucDiziEleman( "data" )[0]["kullaniciAd"]);
            $_SESSION['kullanici']->setKullaniciSoyAd($this->getSonucDiziEleman( "data" )[0]["kullaniciSoyAd"]);
            $_SESSION['kullanici']->setKullaniciMail($_POST['mail']);
            $this->setSonucDiziAjaxEleman("kullanici", $_POST['mail']);
            
        }
        else 
            $this->setSonucDiziAjaxEleman("Hata", "Kullanici adi veya şifre yanliş");
    }
}

class MySqlKonuAc extends MySqlKonuAcTemplate  {

    public function jsonHazirla() { 

        if( $this->getSonucDiziEleman("sorguDurum") ) {

            $this->setSonucDiziAjaxEleman("kullanici", $_SESSION['kullanici']->getKullaniciAd() ." ". $_SESSION['kullanici']->getKullaniciSoyAd());
            $this->setSonucDiziAjaxEleman("metin", $_POST['yazilanMetin']);
            $this->setSonucDiziAjaxEleman("konu", $_POST['konu']);
            $this->setSonucDiziAjaxEleman("tarih", $this->getSonucDiziEleman("tarih"));
            $this->setSonucDiziAjaxEleman("anahtar", $this->getSonucDiziEleman("key"));
            
        }
        else
            $this->setSonucDiziAjaxEleman("Hata", "Metin Kaydolamadı. Veri tabanı hatası");
    }
}

class MySqlYorumYap extends MySqlYorumYapTemplate  {

    public function jsonHazirla() {
            
            if( $this->getSonucDiziEleman("sorguDurum") ) {

                $this->setSonucDiziAjaxEleman("kullanici", $_SESSION['kullanici']->getKullaniciAd() ." ". $_SESSION['kullanici']->getKullaniciSoyAd());
                $this->setSonucDiziAjaxEleman("yorum", $_POST['yazilanMetin']);
                $this->setSonucDiziAjaxEleman("tarih", $this->getSonucDiziEleman("tarih"));
            }
            else
                $this->setSonucDiziAjaxEleman("Hata", "Yorum Kaydolamadı. Veri tabanı hatası");
    }
}

class MySqlKonulariGetir extends MySqlKonulariGetirTemplate {

    public function jsonHazirla() {

        if( $this->getSonucDiziEleman("sorguDurum") )
            $this->setSonucDiziAjaxEleman("data", $this->getSonucDiziEleman("data"));
        else 
            $this->setSonucDiziAjaxEleman("Hata", "Veri Tabanı Hatası");
    }
}

class MysqlYorumlariGetir extends MySqlYorumGetirTemplate {

    public function jsonHazirla() {

        if( $this->getSonucDiziEleman("sorguDurum") )
            $this->setSonucDiziAjaxEleman("data", $this->getSonucDiziEleman("data"));
        else 
            $this->setSonucDiziAjaxEleman("Hata", "Veri Tabanı Hatası");
    }
}
class MysqlYorumSil extends MySqlYorumSilTemplate {

    public function jsonHazirla() {

        if( $this->getSonucDiziEleman("sorguDurum") )
            $this->setSonucDiziAjaxEleman("Sonuc", "Yorum Silindi");
        else 
            $this->setSonucDiziAjaxEleman("Sonuc", "Veri Tabanı Hatası");
    }
}
class MySqlKonuSil extends MySqlKonuSilTemplate {

    public function jsonHazirla() {

        if( $this->getSonucDiziEleman("sorguDurum") )
            $this->setSonucDiziAjaxEleman("Sonuc", "Yorum Silindi");
        else 
            $this->setSonucDiziAjaxEleman("Sonuc", "Veri Tabanı Hatası");
    }
}


?>