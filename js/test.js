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
                $.CommandTest.BaseCommandTest5();
            });

        },
        BaseCommandTest5: function () {
            testNesne.testMiktari++;
            let data = 'BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != (testNesne.testArray[testNesne.testArrayIndex]) + "Hatasi") {
                    testNesne.basarisizTestler.push("Base Command Test 5 başarısız => " + testNesne.testArray[testNesne.testArrayIndex]);
                }

                else {
                    if (++testNesne.testArrayIndex == testNesne.testArray.length) {
                        testNesne.testArrayIndex = 0;
                        $.CommandTest.SqlNoSqlCommandTest1();
                    }
                    else
                        $.CommandTest.BaseCommandTest5();
                }
            });

        },


        SqlNoSqlCommandTest1: function () {
            testNesne.testMiktari++;
            let data = 'BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex] + '&Command=';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != (testNesne.testArray[testNesne.testArrayIndex]) + "Hatasi")
                    testNesne.basarisizTestler.push("SqlNoSqlCommandTest1 başarısız => " + testNesne.testArray[testNesne.testArrayIndex]);
                $.CommandTest.SqlNoSqlCommandTest2();
            });

        },
        SqlNoSqlCommandTest2: function () {
            testNesne.testMiktari++;
            let data = 'BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex] + '&Command=test';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != (testNesne.testArray[testNesne.testArrayIndex]) + "Hatasi")
                    testNesne.basarisizTestler.push("SqlNoSqlCommandTest2 başarısız => " + testNesne.testArray[testNesne.testArrayIndex]);
                $.CommandTest.SqlNoSqlCommandTest3();
            });

        },
        SqlNoSqlCommandTest3: function () {
            testNesne.testMiktari++;
            let data = 'BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != (testNesne.testArray[testNesne.testArrayIndex]) + "Hatasi")
                    testNesne.basarisizTestler.push("SqlNoSqlCommandTest3 başarısız => " + testNesne.testArray[testNesne.testArrayIndex]);
                $.CommandTest.SqlNoSqlCommandTest4();
            });

        },
        SqlNoSqlCommandTest4: function () {
            testNesne.testMiktari++;
            let data = 'BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex] + '&Command=yorumYap';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push("SqlNoSqlCommandTest4 başarısız => " + testNesne.testArray[testNesne.testArrayIndex]);
                $.CommandTest.SqlNoSqlCommandTest5();
            });

        },
        SqlNoSqlCommandTest5: function () {
            testNesne.testMiktari++;
            let data = 'BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex] + '&Komutum=yorumYap';
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != (testNesne.testArray[testNesne.testArrayIndex]) + "Hatasi")
                    testNesne.basarisizTestler.push("SqlNoSqlCommandTest5 başarısız => " + testNesne.testArray[testNesne.testArrayIndex]);
                else {
                    if (++testNesne.testArrayIndex == testNesne.testArray.length) {
                        testNesne.testArrayIndex = 0;
                        $.DatabasePostTest.DatabaseKullaniciKayit1();
                    }
                    else
                        $.CommandTest.SqlNoSqlCommandTest1();
                }
            });

        },
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
            let data = 'kullaniciAd=test&kullaniciSoyAd=test&Command=kayitYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Kullanici Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseKullaniciKayit3();
            });
        },
        DatabaseKullaniciKayit3: function () {
            testNesne.testMiktari++;
            let data = 'kullaniciAd=test&kullaniciSoyAd=&mail=&sifre=test&Command=kayitYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
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
            let data = 'kullaniciAd=test&sifre=&Command=girisYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
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
            let data = 'Test=&Test2=&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
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
            let data = 'konu=&yazilanMetin=test&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Kayit Test 3 başarısız");
                else
                    $.DatabasePostTest.DatabaseKonuKayit4();
            });
        },
        DatabaseKonuKayit4: function () {
            testNesne.testMiktari++;
            let data = 'konu=testMetin&yazilanMetin=testMetin&Command=konuAc&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
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
            let data = 'Test=&yazilanMetin=&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Kayit Test 1 başarısız");
                $.DatabasePostTest.DatabaseYorumKayit2();

            });
        },
        DatabaseYorumKayit2: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=&parentKey=&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Kayit Test 2 başarısız");
                $.DatabasePostTest.DatabaseYorumKayit3();
            });
        },
        DatabaseYorumKayit3: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=test&parentKey=&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Kayit Test 3 başarısız");
                $.DatabasePostTest.DatabaseYorumKayit4();
            });
        },
        DatabaseYorumKayit4: function () {
            testNesne.testMiktari++;
            let data = 'yazilanMetin=deneme1&parentKey=' + testNesne.konuAnahtar + '&Command=yorumYap&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Kayit Test 4 başarısız");
                else {
                    testNesne.yorumAnahtar = sonuc["anahtar"];
                }
                $.DatabasePostTest.DatabaseYorumGetir1();
            });
        },



        DatabaseYorumGetir1: function () {
            testNesne.testMiktari++;
            let data = 'aa=&Command=yorumlariGetir&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Getir Test 1 başarısız");
                $.DatabasePostTest.DatabaseYorumGetir2();

            });
        },
        DatabaseYorumGetir2: function () {
            testNesne.testMiktari++;
            let data = 'parentKey=&Command=yorumlariGetir&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Getir Test 2 başarısız");
                $.DatabasePostTest.DatabaseYorumGetir3();
            });
        },
        DatabaseYorumGetir3: function () {
            testNesne.testMiktari++;
            let data = 'parentKey=aa&Command=yorumlariGetir&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Getir Test 3 başarısız");
                $.DatabasePostTest.DatabaseYorumGetir4();
            });
        },
        DatabaseYorumGetir4: function () {
            testNesne.testMiktari++;
            let data = 'parentKey=' + testNesne.konuAnahtar + '&Command=yorumlariGetir&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Getir Test 4 başarısız");
                $.DatabasePostTest.DatabaseYorumSil1();
            });
        },




        DatabaseYorumSil1: function () {

            testNesne.testMiktari++;
            let data = 'aa=&bb=&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Sil Test 1 başarısız");
                $.DatabasePostTest.DatabaseYorumSil2();

            });
        },
        DatabaseYorumSil2: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=&parentKey=&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Sil Test 2 başarısız");
                $.DatabasePostTest.DatabaseYorumSil3();
            });
        },
        DatabaseYorumSil3: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=&parentKey=test&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Sil Test 3 başarısız");
                $.DatabasePostTest.DatabaseYorumSil4();
            });
        },
        DatabaseYorumSil4: function () {
            testNesne.testMiktari++;
            let data = 'yorumKey=' + testNesne.yorumAnahtar + '&parentKey=' + testNesne.konuAnahtar + '&Command=yorumSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Yorum Sil Test 4 başarısız");
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
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Sil Test 1 başarısız");
                $.DatabasePostTest.DatabaseKonuSil2();

            });
        },
        DatabaseKonuSil2: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Sil Test 2 başarısız");
                $.DatabasePostTest.DatabaseKonuSil3();
            });
        },
        DatabaseKonuSil3: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=a&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (!(sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Sil Test 3 başarısız");
                $.DatabasePostTest.DatabaseKonuSil4();
            });
        },
        DatabaseKonuSil4: function () {
            testNesne.testMiktari++;
            let data = 'konuKey=' + testNesne.konuAnahtar + '&Command=konuSil&BaseCommand=' + testNesne.testArray[testNesne.testArrayIndex];
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if ((sonuc.hasOwnProperty("Post_Hatasi")))
                    testNesne.basarisizTestler.push(testNesne.testArray[testNesne.testArrayIndex] + " Konu Sil Test 4 başarısız");
                else {
                    if (++testNesne.testArrayIndex == testNesne.testArray.length)
                        testNesne.yazdir();
                    else
                        $.DatabasePostTest.DatabaseKullaniciKayit1()
                }

            });
        },



    }

    let testNesne = new Test();
    testNesne.genelTest();


    //http://localhost/mongoMysql/index_Test.php
});