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

        }

        genelTest() {
            $.CommandTest.BaseCommandTest1();
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
                if (sonuc != "MongoDCommandHatasi")
                    testNesne.basarisizTestler.push("MongoDb Command Test 1 başarısız");
                $.CommandTest.MongoDbCommandTest2();
            });

        },
        MongoDbCommandTest2: function () {
            testNesne.testMiktari++;
            let data = "BaseCommand=MongoDbCommand&Command=ari";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                if (sonuc != "MongoDCommandHatasi")
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
            });
        }
    }
    $.MongoDbTest = {

    }
    $.MySqlTest = {

    }

    let testNesne = new Test();
    testNesne.genelTest();
    console.log(testNesne.testMiktari);
    console.log(testNesne.basarisizTestler.length);
});