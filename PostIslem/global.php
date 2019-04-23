<?php
abstract class BaseTemplate {

    protected $databaseBaglanti;
    private $sonucDizi;
    protected function getDb() { return $this->databaseBaglanti;  }
    abstract protected function setDb();

    protected function getSonucDiziEleman($key) { return $this->sonucDizi[$key]; }
    protected function setSonucDiziEleman($key, $value) { $this->sonucDizi[$key] = $value; }
    protected function setSonucDiziAjaxEleman($key, $value) { $this->sonucDizi["ajaxData"][$key] = $value; }

    abstract public function template();
    protected function ajaxGonder(){ echo json_encode($this->getSonucDiziEleman("ajaxData")); }
}
class Kullanici{

    private $kullaniciAd;
    private $kullaniciSoyAd;
    private $kullaniciMail;

    public function setKullaniciAd($kullaniciAd){
        $this->kullaniciAd = $kullaniciAd;
    }
    public function getKullaniciAd(){
        return $this->kullaniciAd;
        }
    public function setKullaniciSoyAd($kullaniciSoyAd){
        $this->kullaniciSoyAd = $kullaniciSoyAd;
    }
    public function getKullaniciSoyAd(){
        return $this->kullaniciSoyAd;
    }
    public function setKullaniciMail($kullaniciMail){
        $this->kullaniciMail = $kullaniciMail;
    }
    public function getKullaniciMail(){
        return $this->kullaniciMail;
    }

}
class Tarih {
    public static function tarihHazirla() {
        date_default_timezone_set('Europe/Istanbul');
        return $tarih = date("Y").'-'.date("m").'-'.date("d").' '.date("H").':'.date("i").':'.date("s");
    }
}
class VeriTabaniKey {
    public static function keyHazirla() {
        return md5(rand(0,1000).time().rand(0,1000));
    }
}


?>