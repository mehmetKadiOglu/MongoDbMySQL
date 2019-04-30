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

            this.testArrayIndex = 0;
            this.testMiktari = 0;
            this.basarisizTestler = [];
            this.testArray = [];
            this.testArray.push("MongoDbCommand");
            this.testArray.push("MysqlCommand");
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
                else {
                    $.DatabasePostTest.DatabaseKullaniciKayit1();
                }

            });
        }
    }
    $.DatabasePostTest = {

        DatabaseKullaniciKayit1: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&mail=&sifre=&Command=kayitYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Kayit Test 1 başarısız");
                $.DatabasePostTest.DatabaseKullaniciKayit2()
            });
        },
        DatabaseKullaniciKayit2: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=aaa&kullaniciSoyAd=bbb&mail=ccc&Command=kayitYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseKullaniciKayit3();
            });
        },
        DatabaseKullaniciKayit3: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=aaa&kullaniciSoyAd=bbb&mail=ccc&sifre=&Command=kayitYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Kayit Test 3 başarısız");
                $.DatabasePostTest.DatabaseKullaniciKayit4();
            });
        },
        DatabaseKullaniciKayit4: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=Test&kullaniciSoyAd=test&mail=test@test&sifre=test&Command=kayitYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Kayit Test 4 başarısız");
                $.DatabasePostTest.DatabaseKullaniciGiris1();
            });
        },


        DatabaseKullaniciGiris1: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&Command=girisYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Giris Test 1 başarısız");
                $.DatabasePostTest.DatabaseKullaniciGiris2();

            });
        },
        DatabaseKullaniciGiris2: function () {
            testNesne.testMiktari++;
            let data = 'mail=&sifre=&Command=girisYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Giris Test 2 başarısız");
                $.DatabasePostTest.DatabaseKullaniciGiris3();
            });
        },
        DatabaseKullaniciGiris3: function () {
            testNesne.testMiktari++;
            let data = 'mail=&sifre=test&Command=girisYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Giris Test 3 başarısız");
                $.DatabasePostTest.DatabaseKullaniciGiris4();
            });
        },
        DatabaseKullaniciGiris4: function () {
            testNesne.testMiktari++;
            let data = 'mail=test@test&sifre=test&Command=girisYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Giris Test 4 başarısız");

                $.DatabasePostTest.DatabaseKonuKayit1();
            });
        },




        DatabaseKonuKayit1: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 1 başarısız");
                $.DatabasePostTest.DatabaseKonuKayit2();

            });
        },
        DatabaseKonuKayit2: function () {
            testNesne.testMiktari++;
            let data = 'konu=&yazilanMetin=&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseKonuKayit3();
            });
        },
        DatabaseKonuKayit3: function () {
            testNesne.testMiktari++;
            let data = 'konu=&yazilanMetin=jhjhj&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 3 başarısız");
                else
                    $.DatabasePostTest.DatabaseKonuKayit4();
            });
        },
        DatabaseKonuKayit4: function () {
            testNesne.testMiktari++;
            let data = 'konu=deneme12&yazilanMetin=deneme12&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 4 başarısız");
                else {
                    testNesne.konuAnahtar = sonuc["anahtar"];
                    $.DatabasePostTest.DatabaseYorumKayit1();
                }
            });
        },



        DatabaseYorumKayit1: function () {

            testNesne.testMiktari++;
            let data = 'kullaniciAd=&kullaniciSoyAd=&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 1 başarısız");
                $.DatabasePostTest.DatabaseYorumKayit2();

            });
        },
        DatabaseYorumKayit2: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=&parentKey=&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseYorumKayit3();
            });
        },
        DatabaseYorumKayit3: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=sadsa&parentKey=&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 3 başarısız");
                $.DatabasePostTest.DatabaseYorumKayit4();
            });
        },
        DatabaseYorumKayit4: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=deneme123&parentKey=' + testNesne.konuAnahtar + '&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 4 başarısız");
                else {
                    testNesne.yorumAnahtar = sonuc["anahtar"];
                }
                $.DatabasePostTest.DatabaseYorumSil1();
            });
        },




        DatabaseYorumSil1: function () {

            testNesne.testMiktari++;
            let data = 'aa=&bb=&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 1 başarısız");
                $.DatabasePostTest.DatabaseYorumSil2();

            });
        },
        DatabaseYorumSil2: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=&parentKey=&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseYorumSil3();
            });
        },
        DatabaseYorumSil3: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=&parentKey=aaaa&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 3 başarısız");
                $.DatabasePostTest.DatabaseYorumSil4();
            });
        },
        DatabaseYorumSil4: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=' + testNesne.yorumAnahtar + '&parentKey=' + testNesne.konuAnahtar + '&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 4 başarısız");
                else {

                }
                $.DatabasePostTest.DatabaseKonuSil1();
            });
        },




        DatabaseKonuSil1: function () {

            testNesne.testMiktari++;
            let data = 'aa=&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 1 başarısız");
                $.DatabasePostTest.DatabaseKonuSil2();

            });
        },
        DatabaseKonuSil2: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseKonuSil3();
            });
        },
        DatabaseKonuSil3: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=a&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 3 başarısız");
                $.DatabasePostTest.DatabaseKonuSil4();
            });
        },
        DatabaseKonuSil4: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=' + testNesne.konuAnahtar + '&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 4 başarısız");
                else {
                    if (++testNesne.testArrayIndex == testNesne.testArray.length)
                        testNesne.yazdir();
                    else
                        $.DatabasePostTest.DatabaseKullaniciKayit1()
                }

            });
        },



    }
    $.MySqlTest = {

    }

    let testNesne = new Test();
    testNesne.genelTest();
    function hirrrim(params) {
        console.log(params);
    }
    let a = hirrrim


    //http://localhost/mongoMysql/index_Test.php
});