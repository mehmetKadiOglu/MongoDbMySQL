<?php
require_once "VeriTabaniPhp/SqlDatabase/Veritabani_Islem.php";
require_once 'VeriTabaniPhp/SqlDatabase/Bind_Param.php';
require_once 'PostIslem/global.php';

class PrepareBind
{

    public function bindHazirla($dizim)
    {

        $bind = new BindParam();
        $bind->setBindDizi($dizim);
        $bind->setBind();
        $bind->setA_params();
        return $bind->getA_params();
    }

}

////////////////////
abstract class SqlTemplate extends BaseTemplate
{

    private $sorgu;

    public function __construct($sorgu)
    {

        $this->setSorgu($sorgu);
        $this->setDb();
        $this->setSonucDiziEleman("ajaxVeri", array());
    }

    protected function setDb()
    {$this->databaseBaglanti = new MysqliIslem();}

    protected function getSorgu()
    {return $this->sorgu;}
    private function setSorgu($sorgu)
    {$this->sorgu = $sorgu;}

    abstract public function template();
    abstract protected function sorguSonucuAlma();
    abstract public function jsonHazirla();

}

abstract class SqlNonBindTemplate extends SqlTemplate
{

    protected function veritaniIslem($sorgu)
    {

        $this->getDb()->veriTabaniExecute($sorgu);
    }

    public function template()
    {

        $this->veritaniIslem($this->getSorgu());
        $this->sorguSonucuAlma();
        $this->jsonHazirla();
        $this->ajaxGonder();

    }

}

abstract class MySqlKonulariGetirTemplate extends SqlNonBindTemplate
{

    public function __construct()
    {
        parent::__construct("SELECT * FROM konular ORDER BY tarih DESC");
    }
    protected function sorguSonucuAlma()
    {

        $this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());
        $this->setSonucDiziEleman("data", $this->getDb()->getData());

    }

}

////////////////////////////////////

abstract class SqlBindTemplate extends SqlTemplate
{

    protected function veritaniIslem($sorgu, $data)
    {

        if (!(is_array($data))) {
            $this->setSonucDiziEleman("Post_Hatasi", $data);
            $this->setSonucDiziAjaxEleman("Post_Hatasi", $data);
        } else {
            $bind = new PrepareBind();

            $this->getDb()->veriTabaniExecute($sorgu, $bind->bindHazirla($data));
        }

    }

    // abstract protected function veritabaniSorguData();
    // abstract protected function sorguSonucuAlma();
    public function template()
    {

        $this->veritaniIslem($this->getSorgu(), $this->veritabaniSorguData());
        if (!($this->getSonucDiziEleman("Post_Hatasi"))) {
            $this->sorguSonucuAlma();
            $this->jsonHazirla();
        }
        $this->ajaxGonder();
    }

}

abstract class MySqlKayitYapTemplate extends SqlBindTemplate
{

    public function __construct()
    {

        parent::__construct("INSERT INTO kayitlar(kullaniciAd,kullaniciSoyAd,mail,sifre) VALUES (?,?,?,?)");

    }

    protected function veritabaniSorguData()
    {
        PostKontrolData::KullaniciKayitData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {
            $array[] = $_POST['kullaniciAd'];
            $array[] = $_POST['kullaniciSoyAd'];
            $array[] = $_POST['mail'];
            $array[] = md5($_POST['sifre']);

            return $array;
        }

    }

    protected function sorguSonucuAlma()
    {
        $this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());

    }
}

abstract class MySqlGirisTemplate extends SqlBindTemplate
{

    public function __construct()
    {
        parent::__construct("SELECT kullaniciAd,kullaniciSoyAd FROM kayitlar WHERE mail=? and sifre=?");
    }

    protected function veritabaniSorguData()
    {

        PostKontrolData::KullaniciGirisData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {
            $array[] = $_POST['mail'];
            $array[] = md5($_POST['sifre']);

            return $array;
        }
    }

    protected function sorguSonucuAlma()
    {

        $this->setSonucDiziEleman("data", $this->getDb()->getData());
        $this->setSonucDiziEleman("dataSayi", $this->getDb()->getDataSayisi());

    }

}

abstract class MySqlKonuAcTemplate extends SqlBindTemplate
{

    public function __construct()
    {
        $this->setSonucDiziEleman("tarih", Tarih::tarihHazirla());
        $this->setSonucDiziEleman("key", VeriTabaniKey::keyHazirla());
        parent::__construct("INSERT INTO konular(yazanKullanici,metin,anahtar,konu,tarih) VALUES (?,?,?,?,?)");
    }

    protected function veritabaniSorguData()
    {

        PostKontrolData::KonuAcData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {
            $array[] = $_SESSION['kullanici']->getKullaniciAd() . " " . $_SESSION['kullanici']->getKullaniciSoyAd(); // yazanKullanici
            $array[] = $_POST['yazilanMetin'];
            $array[] = $this->getSonucDiziEleman("key");
            $array[] = $_POST['konu'];
            $array[] = $this->getSonucDiziEleman("tarih");

            return $array;
        }
    }
    protected function sorguSonucuAlma()
    {$this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());}
}

abstract class MySqlYorumYapTemplate extends SqlBindTemplate
{

    public function __construct()
    {
        $this->setSonucDiziEleman("tarih", Tarih::tarihHazirla());
        parent::__construct("INSERT INTO altyorum(yazanKullanici,metin,anahtar,tarih,parent) VALUES (?,?,?,?,?)");
    }

    protected function veritabaniSorguData()
    {
        PostKontrolData::YorumYapData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {

            $array[] = $_SESSION['kullanici']->getKullaniciAd() . " " . $_SESSION['kullanici']->getKullaniciSoyAd(); // yazanKullanici
            $array[] = $_POST['yazilanMetin'];
            $array[] = VeriTabaniKey::keyHazirla();
            $array[] = $this->getSonucDiziEleman("tarih");
            $array[] = $_POST['parentKey'];

            return $array;
        }
    }
    protected function sorguSonucuAlma()
    {$this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());}

}

abstract class MySqlYorumGetirTemplate extends SqlBindTemplate
{

    public function __construct()
    {
        parent::__construct("SELECT yazanKullanici,metin,anahtar,tarih FROM altyorum WHERE parent=?");
    }

    protected function veritabaniSorguData()
    {
        PostKontrolData::YorumGetirData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {
            $array[] = $_POST['parentKey'];
            return $array;
        }
    }
    protected function sorguSonucuAlma()
    {
        $this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());
        $this->setSonucDiziEleman("data", $this->getDb()->getData());
    }
}

abstract class MySqlYorumSilTemplate extends SqlBindTemplate
{

    public function __construct()
    {

        parent::__construct("DELETE FROM altyorum WHERE anahtar=?");
    }

    protected function veritabaniSorguData()
    {
        PostKontrolData::YorumSilData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {
            $array[] = $_POST['yorumKey'];
            return $array;
        }
    }
    protected function sorguSonucuAlma()
    {
        $this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());
    }
}

abstract class MySqlKonuSilTemplate extends SqlBindTemplate
{

    public function __construct()
    {

        parent::__construct("DELETE FROM konular WHERE anahtar=?");
    }

    protected function veritabaniSorguData()
    {
        PostKontrolData::KonuSilData();
        $kontrolArray = $this->post_Kontrol(PostKontrolData::getKey_Array());

        if ($kontrolArray[0]) {
            return $kontrolArray["Post_Hatasi"];
        } else {
            $array[] = $_POST['konuKey'];
            return $array;
        }
    }
    protected function sorguSonucuAlma()
    {
        $this->setSonucDiziEleman("sorguDurum", $this->getDb()->getSorguDurumu());
    }
}
