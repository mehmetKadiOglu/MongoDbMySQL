<?php
abstract class BaseTemplate
{

    protected $databaseBaglanti;
    private $sonucDizi;
    protected function getDb()
    {return $this->databaseBaglanti;}
    abstract protected function setDb();

    protected function getSonucDiziEleman($key)
    {
        if (isset($this->sonucDizi[$key])) {
            return $this->sonucDizi[$key];
        } else {
            return false;
        }

    }
    protected function setSonucDiziEleman($key, $value)
    {$this->sonucDizi[$key] = $value;}
    protected function setSonucDiziAjaxEleman($key, $value)
    {$this->sonucDizi["ajaxData"][$key] = $value;}

    abstract public function template();
    protected function ajaxGonder()
    {echo json_encode($this->getSonucDiziEleman("ajaxData"));}

    protected function post_Kontrol($key_Array)
    {
        $kontrol[] = false;
        for ($i = 0; $i < count($key_Array); $i++) {
            if (!(isset($_POST[$key_Array[$i]]))) {
                $kontrol[0] = true;
                $kontrol["Post_Hatasi"] = "Post Eksikliği";
                break;
            } else if (!(strlen($_POST[$key_Array[$i]]) >= 4)) {
                $kontrol[0] = true;
                $kontrol["Post_Hatasi"] = "Post İçerik Eksikliği";
                break;
            }
        }
        return $kontrol;
    }
}
class Kullanici
{

    private $kullaniciAd;
    private $kullaniciSoyAd;
    private $kullaniciMail;

    public function setKullaniciAd($kullaniciAd)
    {
        $this->kullaniciAd = $kullaniciAd;
    }
    public function getKullaniciAd()
    {
        return $this->kullaniciAd;
    }
    public function setKullaniciSoyAd($kullaniciSoyAd)
    {
        $this->kullaniciSoyAd = $kullaniciSoyAd;
    }
    public function getKullaniciSoyAd()
    {
        return $this->kullaniciSoyAd;
    }
    public function setKullaniciMail($kullaniciMail)
    {
        $this->kullaniciMail = $kullaniciMail;
    }
    public function getKullaniciMail()
    {
        return $this->kullaniciMail;
    }

}
class Tarih
{
    public static function tarihHazirla()
    {
        date_default_timezone_set('Europe/Istanbul');
        return $tarih = date("Y") . '-' . date("m") . '-' . date("d") . ' ' . date("H") . ':' . date("i") . ':' . date("s");
    }
}
class VeriTabaniKey
{
    public static function keyHazirla()
    {
        return md5(rand(0, 1000) . time() . rand(0, 1000));
    }
}

class PostKontrolData
{
    private static $key_Array;

    public static function KullaniciKayitData()
    {
        PostKontrolData::$key_Array = [0 => "mail", 1 => "sifre", 2 => "kullaniciAd", 3 => "kullaniciSoyAd"];
    }
    public static function KullaniciGirisData()
    {
        PostKontrolData::$key_Array = [0 => "mail", 1 => "sifre"];
    }
    public static function KonuSilData()
    {
        PostKontrolData::$key_Array = [0 => "konuKey"];
    }
    public static function YorumSilData()
    {
        PostKontrolData::$key_Array = [0 => "yorumKey", 1 => "parentKey"];
    }
    public static function KonuAcData()
    {
        PostKontrolData::$key_Array = [0 => "konu", 1 => "yazilanMetin"];
    }
    public static function YorumYapData()
    {
        PostKontrolData::$key_Array = [0 => "parentKey", 1 => "yazilanMetin"];
    }
    public static function YorumGetirData()
    {
        PostKontrolData::$key_Array = [0 => "parentKey"];
    }

    public static function getKey_Array()
    {
        return PostKontrolData::$key_Array;
    }
}
