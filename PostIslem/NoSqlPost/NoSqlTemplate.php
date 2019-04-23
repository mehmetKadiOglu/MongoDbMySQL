<?php
require_once("VeriTabaniPhp/NoSqlDatabase/Veritabani_Islem.php");
require_once('PostIslem/global.php');

abstract class NoSqlTemplate extends BaseTemplate {

    function __construct() {
        $this->setDb();
        $this->collectionSec();
        $this->setSonucDiziEleman("ajaxVeri", array());
    }

    protected function setDb() { $this->databaseBaglanti = new MongoDbIslem(); }

    abstract public function jsonHazirla();
    abstract protected function veritabaniSorguData();
    abstract protected function veritabaniIslem($data);
    abstract protected function collectionSec();

    public function template() {

        $data = $this->veritabaniSorguData();
        $this->veritabaniIslem($data);
        $this->jsonHazirla();
        $this->ajaxGonder();

    }
}

abstract class KullaniciCollection extends NoSqlTemplate {
    protected function collectionSec(){
        $this->getDb()->mongoDbHazirla($this->getDb()->getBaglanti()->admin->kullaniciler);
    }
}


abstract class MongoDbGirisTemplate extends KullaniciCollection {

    protected function veritabaniSorguData() {

        $array[0] = array("mail" => $_POST['mail'], "sifre"=> md5($_POST['sifre']) );
        $array[1] = array();
        return $array;

    }

    protected function veritabaniIslem($data) {

        $this->setSonucDiziEleman("data", $this->getDb()->getData($data[0],  $data[1]));
        $this->setSonucDiziEleman("dataSayi", $this->getDb()->getDataUzunlugu());

    }
}

abstract class  MongoDbKayitYapTemplate extends KullaniciCollection {

    protected function veritabaniSorguData() {

        $array = array("mail" => $_POST['mail'], "sifre"=> md5($_POST['sifre']), "kullaniciAd"=> $_POST['kullaniciAd'], "kullaniciSoyAd"=> $_POST['kullaniciSoyAd'] );
        return $array;

    }
    protected function veritabaniIslem($data) {

        $this->kayitMailKontrol();

        if( $this->getSonucDiziEleman("mailKayitSayisi") == 0 )
            $this->setSonucDiziEleman("BasariDurum", $this->getDb()->insert($data));
        else
            $this->setSonucDiziEleman("BasariDurum", "Kayit Var");
    
    }

    private function kayitMailKontrol(){
        $this->getDb()->getData(array("mail"=> $_POST['mail']),  array());
        $this->setSonucDiziEleman("mailKayitSayisi", $this->getDb()->getDataUzunlugu());
    }
}

////////////////////////////////////////////////////////////////////

abstract class MetinCollection extends NoSqlTemplate{
    protected function collectionSec(){
        $this->getDb()->mongoDbHazirla($this->getDb()->getBaglanti()->admin->konular);
    }
}


abstract class  MongoDbKonulariGetirTemplate extends MetinCollection {
    
    protected function veritabaniSorguData() {

        $array["aranan"] = array();
        $array["kisitlayici"] =  ['sort' => ['tarih' => -1],'projection' => ['altYorum' => false]];
        return $array;

    }
    protected function veritabaniIslem($data) {

        $this->setSonucDiziEleman("data", $this->getDb()->getData($data["aranan"],  $data["kisitlayici"]));

    }

}

abstract class  MongoDbYorumlariGetirTemplate extends MetinCollection {
    protected function veritabaniSorguData() {

        $array["aranan"] = ['_id'=> $_POST['parentKey']];
        $array["kisitlayici"] =  ['projection' => ['altYorum' => 1, '_id'=>0]];
        return $array;

    }
    protected function veritabaniIslem($data) {
        
        $this->setSonucDiziEleman("data", array_reverse($this->getDb()->getData($data["aranan"],  $data["kisitlayici"])) );

    }
}

abstract class MongoDbKonuSilTemplate extends MetinCollection {
    protected function veritabaniSorguData() {

        $array["dataId"] = ['_id'=> $_POST['konuKey']];
        return $array;

    }
    protected function veritabaniIslem($data) {

        $this->setSonucDiziEleman("basariDurum", $this->getDb()->delete($data["dataId"]));

    }
}

abstract class MongoDbYorumSilTemplate extends MetinCollection {
    protected function veritabaniSorguData() {

        $array["dataId"] = ['_id'=> $_POST['parentKey']];
        $array["secici"] = ['$pull'=>['altYorum'=> ['_id'=> $_POST['yorumKey'] ]]];
        return $array;

    }
    protected function veritabaniIslem($data) {

        $this->setSonucDiziEleman("basariDurum", $this->getDb()->update($data["dataId"], $data["secici"]));

    }
}




abstract class MongoDbKonuYorumAcTemplate extends MetinCollection {

    protected function veritabaniSorguData() {

        $yazanKullanici = $_SESSION['kullanici']->getKullaniciAd() ." ". $_SESSION['kullanici']->getKullaniciSoyAd();
        $array = array('_id'=>VeriTabaniKey::keyHazirla(), 'yazanKullanici'=>$yazanKullanici,'metin'=>$_POST['yazilanMetin'],'tarih'=> Tarih::tarihHazirla(), 'altYorum'=>array());
        $this->setSonucDiziEleman("ortakArray",  $array);

    }

}

abstract class  MongoDbKonuAcTemplate extends MongoDbKonuYorumAcTemplate {

    protected function veritabaniSorguData() {

        parent::veritabaniSorguData();
        $data = $this->getSonucDiziEleman("ortakArray");

        $data["konu"]=$_POST['konu'];
        return $data;
    }

    protected function veritabaniIslem($data) {
        
        $this->setSonucDiziEleman("key", $this->getDb()->insert($data));

    }

}
abstract class  MongoDbYorumYapTemplate extends MongoDbKonuYorumAcTemplate {

    protected function veritabaniSorguData() {

        parent::veritabaniSorguData();

        $data = $this->getSonucDiziEleman("ortakArray");

        $data["eklencek_Veri"] = array('$push' => array('altYorum' => $data ));
        $data["aranan"] = [ '_id' => $_POST['parentKey'] ];

        return $data;

    }
    protected function veritabaniIslem($data) {
       
        $this->setSonucDiziEleman("key", $this->getDb()->update($data["aranan"], $data["eklencek_Veri"]));

    }
}


?>