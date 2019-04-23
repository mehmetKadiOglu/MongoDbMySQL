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


    class Test{
        constructor() {

            this.testMiktari = 0;
            this.basarisizTestler = [];

        }
        
        genelTest(){
            $.GenelTestler.BaseCommandTest1();
        }
    }



    $.GenelTestler = {

        BaseCommandTest1:function () {
            testNesne.testMiktari++;
            let data =  "BaseCommand=";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                console.log(sonuc)
                if(sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 1 başarısız");
                    
            });

            $.GenelTestler.BaseCommandTest2();
        },
        BaseCommandTest2:function () {
            testNesne.testMiktari++;
            let data =  "BaseCommand=mongo";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                console.log(sonuc)
                if(sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 2 başarısız");
            });

            $.GenelTestler.BaseCommandTest3();
        },
        BaseCommandTest3:function () {
            testNesne.testMiktari++;
            let data =  "";
            $.PhpIslem.AjaxIslem(data).then(function (sonuc) {
                console.log(sonuc)
                if(sonuc != "BaseCommandHatasi")
                    testNesne.basarisizTestler.push("Base Command Test 3 başarısız");
            });
        }
    }
    $.MongoDbTest = {

    }
    $.MySqlTest = {

    }

    let testNesne = new Test();
    testNesne.genelTest();
});