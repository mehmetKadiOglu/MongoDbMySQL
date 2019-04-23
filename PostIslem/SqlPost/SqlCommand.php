<?php
require_once "MySqlPost_Islem.php";

class MysqlCommand
{

    private $komutDizisi;

    public function __construct()
    {

        $this->setKomutDizisi("kayitYap", new MySqlKayitYap());
        $this->setKomutDizisi("girisYap", new MySqlGiris());
        $this->setKomutDizisi("cikisYap", new MySqlCikis());
        $this->setKomutDizisi("konulariGetir", new MySqlKonulariGetir());
        $this->setKomutDizisi("konuAc", new MySqlKonuAc());
        $this->setKomutDizisi("yorumYap", new MySqlYorumYap());
        $this->setKomutDizisi("yorumlariGetir", new MysqlYorumlariGetir());
        $this->setKomutDizisi("yorumSil", new MysqlYorumSil());
        $this->setKomutDizisi("konuSil", new MySqlKonuSil());

    }

    private function setKomutDizisi($key, $komutDizisi)
    {
        $this->komutDizisi[$key] = $komutDizisi;
    }

    public function execute()
    {

        if (isset($_POST['Command'])) {
            if (array_key_exists($_POST['Command'], $this->komutDizisi)) {
                $this->komutDizisi[$_POST['Command']]->template();
            } else {
                echo json_encode("MySqlCommandHatasi");
            }
        } else {
            echo json_encode("MySqlCommandHatasi");
        }

    }

}
