$(function name() {

    $.PhpIslem = {

        AjaxIslem: function (veri) {
            return $.ajax({
                url: "Post_Index.php",
                type: "POST",
                data: veri,
                dataType: "json",
            });
        },

        AjaxIslem2: function (veri) {
            $.ajax({
                url: "Post_Index.php",
                type: "POST",
                data: veri,
                dataType: "json",
                error: function (a) {
                    console.log(a);
                    console.log(a.responseText);
                    alert("hata var");
                },
                success: function (cevap) {
                    console.log(cevap);
                }
            });
        }
    }


    class Test {
        constructor() {

            this.testMiktari = 0;
            this.basarisizTestler = [];
            this.konuAnahtar = "";
            this.yorumAnahtar = "";

        }

        genelTest() {
            $.CommandTest.BaseCommandTest1();
        }

        yazdir() {
            console.log(testNesne.testMiktari);
            console.log(testNesne.basarisizTestler);
        }
    }



    $.CommandTest = {

        BaseCommandTest1: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {

                if (sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 1 başarısız");

                $.CommandTest.BaseCommandTest2();
            });

        },
        BaseCommandTest2: function () {

            testNesne.testMiktari++;
            let data = "BaseCommand=mongo";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {

                if (sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 2 başarısız");
                $.CommandTest.BaseCommandTest3();
            });

        },
        BaseCommandTest3: function () {
            testNesne.testMiktari++;
            let data = "";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 3 başarısız");
                $.CommandTest.BaseCommandTest4();
            });

        },
        BaseCommandTest4: function () {
            testNesne.testMiktari++;
            let data = "Command=MongoDbCommand";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {

                if (sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 4 başarısız");
                $.CommandTest.MongoDbCommandTest1();
            });

        },


        MongoDbCommandTest1: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MongoDbCommand&Command=";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MongoDbCommandHatasi")
                    testNesne.basarisizTestler.push("MongoDb Command Test 1 başarısız");
                $.CommandTest.MongoDbCommandTest2();
            });

        },
        MongoDbCommandTest2: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MongoDbCommand&Command=ari";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MongoDbCommandHatasi")
                    testNesne.basarisizTestler.push("MongoDb Command Test 2 başarısız");
                $.CommandTest.MongoDbCommandTest3();
            });

        },
        MongoDbCommandTest3: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MongoDbCommand";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MongoDCommandHatasi")
                    testNesne.basarisizTestler.push("MongoDb Command Test 3 başarısız");
                $.CommandTest.MongoDbCommandTest4();
            });

        },
        MongoDbCommandTest4: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MongoDbCommand&Komutum=kayit";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MongoDCommandHatasi")
                    testNesne.basarisizTestler.push("MongoDb Command Test 4 başarısız");
                $.CommandTest.MySqlCommandTest1();
            });

        },


        MySqlCommandTest1: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MysqlCommand&Command=";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MySqlCommandHatasi")
                    testNesne.basarisizTestler.push("MySql Command Test 1 başarısız");
                $.CommandTest.MySqlCommandTest2();
            });

        },
        MySqlCommandTest2: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MysqlCommand&Command=ari";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MySqlCommandHatasi")
                    testNesne.basarisizTestler.push("MySql Command Test 2 başarısız");
                $.CommandTest.MySqlCommandTest3();
            });

        },
        MySqlCommandTest3: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MysqlCommand";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MySqlCommandHatasi")
                    testNesne.basarisizTestler.push("MySql Command Test 3 başarısız");
                $.CommandTest.MySqlCommandTest4();
            });

        },
        MySqlCommandTest4: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MysqlCommand&Komutum=kayit";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MySqlCommandHatasi")
                    testNesne.basarisizTestler.push("MySql Command Test 4 başarısız");
                $.MongoDbTest.MongoDbKullaniciKayit1();
            });
        }
    }
    $.MongoDbTest = {

        MongoDbKullaniciKayit1: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&mail=&sifre=&Command=kayitYap&BaseCommand=MongoDbCommand'
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Kayit Test 1 başarısız");
                $.MongoDbTest.MongoDbKullaniciKayit2()
            });
        },
        MongoDbKullaniciKayit2: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=aaa&kullaniciSoyAd=bbb&mail=ccc&Command=kayitYap&BaseCommand=MongoDbCommand'
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Kayit Test 2 başarısız");
                $.MongoDbTest.MongoDbKullaniciKayit3();
            });
        },
        MongoDbKullaniciKayit3: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=aaa&kullaniciSoyAd=bbb&mail=ccc&sifre=&Command=kayitYap&BaseCommand=MongoDbCommand'
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Kayit Test 3 başarısız");
                $.MongoDbTest.MongoDbKullaniciKayit4();
            });
        },
        MongoDbKullaniciKayit4: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=Test&kullaniciSoyAd=test&mail=test@test&sifre=test&Command=kayitYap&BaseCommand=MongoDbCommand'
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Kayit Test 4 başarısız");
                $.MongoDbTest.MongoDbKullaniciGiris1();
            });
        },


        MongoDbKullaniciGiris1: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&Command=girisYap&BaseCommand=MongoDbCommand'
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Giris Test 1 başarısız");
                $.MongoDbTest.MongoDbKullaniciGiris2();

            });
        },
        MongoDbKullaniciGiris2: function () {
            testNesne.testMiktari++;
            let data = 'mail=&sifre=&Command=girisYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Giris Test 2 başarısız");
                $.MongoDbTest.MongoDbKullaniciGiris3();
            });
        },
        MongoDbKullaniciGiris3: function () {
            testNesne.testMiktari++;
            let data = 'mail=&sifre=test&Command=girisYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Giris Test 3 başarısız");
                $.MongoDbTest.MongoDbKullaniciGiris4();
            });
        },
        MongoDbKullaniciGiris4: function () {
            testNesne.testMiktari++;
            let data = 'mail=test@test&sifre=test&Command=girisYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Kullanici Giris Test 4 başarısız");

                $.MongoDbTest.MongoDbKonuKayit1();
            });
        },




        MongoDbKonuKayit1: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&Command=konuAc&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 1 başarısız");
                $.MongoDbTest.MongoDbKonuKayit2();

            });
        },
        MongoDbKonuKayit2: function () {
            testNesne.testMiktari++;
            let data = 'konu=&yazilanMetin=&Command=konuAc&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 2 başarısız");
                $.MongoDbTest.MongoDbKonuKayit3();
            });
        },
        MongoDbKonuKayit3: function () {
            testNesne.testMiktari++;
            let data = 'konu=&yazilanMetin=jhjhj&Command=konuAc&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 3 başarısız");
                else
                    $.MongoDbTest.MongoDbKonuKayit4();
            });
        },
        MongoDbKonuKayit4: function () {
            testNesne.testMiktari++;
            let data = 'konu=deneme12&yazilanMetin=deneme12&Command=konuAc&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 4 başarısız");
                else {
                    testNesne.konuAnahtar = sonuc["anahtar"];
                    $.MongoDbTest.MongoDbYorumKayit1();
                }
            });
        },



        MongoDbYorumKayit1: function () {

            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&Command=yorumYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 1 başarısız");
                $.MongoDbTest.MongoDbYorumKayit2();

            });
        },
        MongoDbYorumKayit2: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=&parentKey=&Command=yorumYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 2 başarısız");
                $.MongoDbTest.MongoDbYorumKayit3();
            });
        },
        MongoDbYorumKayit3: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=sadsa&parentKey=&Command=yorumYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 3 başarısız");
                $.MongoDbTest.MongoDbYorumKayit4();
            });
        },
        MongoDbYorumKayit4: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=deneme123&parentKey=' + testNesne.konuAnahtar + '&Command=yorumYap&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 4 başarısız");
                else {
                    testNesne.yorumAnahtar = sonuc["anahtar"];
                }
                $.MongoDbTest.MongoDbYorumSil1();
            });
        },




        MongoDbYorumSil1: function () {

            testNesne.testMiktari++;
            let data = 'aa=&bb=&Command=yorumSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 1 başarısız");
                $.MongoDbTest.MongoDbYorumSil2();

            });
        },
        MongoDbYorumSil2: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=&parentKey=&Command=yorumSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 2 başarısız");
                $.MongoDbTest.MongoDbYorumSil3();
            });
        },
        MongoDbYorumSil3: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=&parentKey=aaaa&Command=yorumSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 3 başarısız");
                $.MongoDbTest.MongoDbYorumSil4();
            });
        },
        MongoDbYorumSil4: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=' + testNesne.yorumAnahtar + '&parentKey=' + testNesne.konuAnahtar + '&Command=yorumSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 4 başarısız");
                else {

                }
                $.MongoDbTest.MongoDbKonuSil1();
            });
        },




        MongoDbKonuSil1: function () {

            testNesne.testMiktari++;
            let data = 'aa=&Command=konuSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 1 başarısız");
                $.MongoDbTest.MongoDbKonuSil2();

            });
        },
        MongoDbKonuSil2: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=&Command=konuSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 2 başarısız");
                $.MongoDbTest.MongoDbKonuSil3();
            });
        },
        MongoDbKonuSil3: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=a&Command=konuSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 3 başarısız");
                $.MongoDbTest.MongoDbKonuSil4();
            });
        },
        MongoDbKonuSil4: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=' + testNesne.konuAnahtar + '&Command=konuSil&BaseCommand=MongoDbCommand';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("MongoDb Konu Kayit Test 4 başarısız");
                else {

                }
                testNesne.yazdir();
            });
        },



    }
    $.MySqlTest = {

    }

    let testNesne = new Test();
    testNesne.genelTest();

    //http://localhost/mongoMysql/index_Test.php
});