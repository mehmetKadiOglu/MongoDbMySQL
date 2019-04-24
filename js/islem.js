$(function name() {


    //websocket ile konu gönderimi tamamlandı
    //websocket ile yorum gönderimi tamamlandı
    // websocket ile konu silme tamamlandı. Kullanici odaklı yapıldı.
    // websocket ile yorum silme tamamlandı. Kullanici odaklı yapıldı.

    // Guncelleme yapılmadı
    // yorum divin keyini değiştir


    /*
    !! Mysql veri tabanı için BaseCommand = MysqlCommand 
    !! MongoDB veri tabanı için BaseCommand = MongoDbCommand 


    !! Kullanici kayit için command = kayitYap
    !! Kullanici giris için command = girisYap
    !! Yorumları getirmek için command = yorumlariGetir
    !! Konuları getirmek için command = konulariGetir
    !! Konu acmak için command = konuAc
    !! Yorum yapmak için command = yorumYap
    !! Yorum silmek için command = yorumSil
    !! Konu silmek için command = konuSil
    */

    class KullaniciKayit {

        islemBaslat() {


            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (sonuc) {
                if (sonuc["Basarili"])
                    alert(sonuc["Basarili"]);
                else
                    alert(sonuc["Hata"]);
            });
        }
        ajaxPostDataHazirla() {

            let ad = $.SayfaIslem.FormValue("[name=adText]");
            let soyad = $.SayfaIslem.FormValue("[name=soyAdText]");
            let mail = $.SayfaIslem.FormValue("[name=mailText]");
            let sifre = $.SayfaIslem.FormValue("[name=sifreText]");
            let data = "kullaniciAd=" + ad + "&kullaniciSoyAd=" + soyad + "&mail=" + mail + "&sifre=" + sifre + "&Command=kayitYap&BaseCommand=MongoDbCommand";
            $.SayfaIslem.ValueSifirla("[name=sifreText],[name=mailText],[name=soyAdText],[name=adText]");

            return data;
        }
    }
    class KullaniciGiris {

        islemBaslat() {

            //$.PhpIslem.AjaxIslem2(data);
            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (sonuc) {

                console.log(sonuc);
                if (sonuc["Hata"])
                    alert(sonuc["Hata"]);
                else
                    $.Yonlendirici.BasariliGirisIslem(sonuc["kullanici"]);
            });
        }
        ajaxPostDataHazirla() {

            let kullaniciMail = $.SayfaIslem.FormValue("[name=kullaniciMail]");
            let sifre = $.SayfaIslem.FormValue("[name=kullaniciSifre]");
            let data = "mail=" + kullaniciMail + "&sifre=" + sifre + "&Command=girisYap&BaseCommand=MysqlCommand";

            $.SayfaIslem.ValueSifirla("[name=kullaniciMail],[name=kullaniciSifre]");

            return data;
        }
    }
    class YorumlariGetir {

        islemBaslat() {

            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (data) {

                $.Yonlendirici.YorumDivBas(data["data"]);
            });
        }
        ajaxPostDataHazirla() {
            // let parentKey = $.SayfaIslem.AttrValue("#yorumKonuDiv", "key");
            let data = "parentKey=" + GLOBAL_YORUMLARIN_KONU_KEYI + "&Command=yorumlariGetir&BaseCommand=MongoDbCommand";
            return data;
        }

    }
    class KonulariGetir {

        islemBaslat() {

            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (sonuc) {
                if (sonuc["Hata"])
                    alert(sonuc["Hata"]);
                else
                    $.Yonlendirici.KonuDivBas(sonuc["data"]);
            });
        }
        ajaxPostDataHazirla() {
            return "Command=konulariGetir&BaseCommand=MongoDbCommand";
        }

    }
    class KonuAc {

        islemBaslat() {

            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (veri) {
                if (veri["Hata"])
                    alert(veri["Hata"]);
                else
                    $.WebSocketIslem.SocketKonuMetniGonder(veri);

            });
        }
        ajaxPostDataHazirla() {

            let konu = $.SayfaIslem.FormValue("#konuInput");
            let konuText = $.SayfaIslem.FormValue("#konuMetin");

            $.SayfaIslem.ValueSifirla("#konuInput,#konuMetin");

            let data = "konu=" + konu + "&yazilanMetin=" + konuText + "&Command=konuAc&BaseCommand=MongoDbCommand";

            return data;
        }

    }
    class YorumYap {

        islemBaslat() {

            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (veri) {
                if (veri["Hata"])
                    alert(veri["Hata"]);
                else
                    $.WebSocketIslem.SocketYorumMetniGonder(veri);
            });
        }
        ajaxPostDataHazirla() {

            let metin = $.SayfaIslem.FormValue("#yorumText");
            let parentKey = $.SayfaIslem.AttrValue("#yorumKonuDiv", "key");
            $.SayfaIslem.ValueSifirla("#yorumText");

            let data = "yazilanMetin=" + metin + "&parentKey=" + parentKey + "&Command=yorumYap&BaseCommand=MongoDbCommand";

            return data;
        }
    }
    class YorumSil {
        islemBaslat(yorumDiv) {

            let data = this.ajaxPostDataHazirla(yorumDiv);
            $.PhpIslem.AjaxIslem(data["ajaxVeri"]).then(function (veri) {
                if (veri["Basarili"]) {
                    $.WebSocketIslem.SocketYorumSilmeGonder(GLOBAL_YORUMLARIN_KONU_KEYI, data["yorumKey"]);
                    alert(veri["Basarili"]);
                }
                else {
                    alert(veri["Hata"]);
                }
            });
        }
        ajaxPostDataHazirla(yorumDiv) {

            let array = {};
            array["yorumKey"] = $.SayfaIslem.AttrValue(yorumDiv, "key");
            // let parentKey = $.SayfaIslem.AttrValue("#yorumKonuDiv", "key");
            array["ajaxVeri"] = "yorumKey=" + array["yorumKey"] + "&parentKey=" + GLOBAL_YORUMLARIN_KONU_KEYI + "&Command=yorumSil&BaseCommand=MongoDbCommand";

            return array;
        }
    }
    class KonuSil {

        islemBaslat() {

            $.PhpIslem.AjaxIslem(this.ajaxPostDataHazirla()).then(function (veri) {
                if (veri["Basarili"]) {
                    $.WebSocketIslem.SocketKonuSilmeGonder(GLOBAL_YORUMLARIN_KONU_KEYI);
                    alert(veri["Basarili"]);
                }
                else {
                    alert(veri["Hata"]);
                }

            });
        }
        ajaxPostDataHazirla() {

            //let parentKey = $.SayfaIslem.AttrValue("#yorumKonuDiv", "key");
            let data = "konuKey=" + GLOBAL_YORUMLARIN_KONU_KEYI + "&Command=konuSil&BaseCommand=MongoDbCommand";

            return data;
        }
    }
    class Command {

        constructor() {

            this.nesneDizisi = {};
            this.nesneDizisiDoldur();

        }
        nesneDizisiDoldur() {
            this.nesneDizisi["kullaniciKayit"] = new KullaniciKayit();
            this.nesneDizisi["kullaniciGiris"] = new KullaniciGiris();
            this.nesneDizisi["konuGetir"] = new KonulariGetir();
            this.nesneDizisi["yorumYap"] = new YorumYap();
            this.nesneDizisi["konuAc"] = new KonuAc();
            this.nesneDizisi["yorumlariGetir"] = new YorumlariGetir();
            this.nesneDizisi["yorumSil"] = new YorumSil();
            this.nesneDizisi["konuSil"] = new KonuSil();
        }
        calistir(key) {
            this.nesneDizisi[key].islemBaslat();
        }
        calistir(key, data) {
            this.nesneDizisi[key].islemBaslat(data);
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    class BaseYorumKonuTagHazirla {

        privateGetTagHazirlamaDataEleman(key) {
            return this.tagHazirlamaData[key];
        }

        privateSetTagHazirlamaData(data) {
            this.tagHazirlamaData = data;
        }
        tagDataHazirlaTemplate(data) {
            this.privateSetTagHazirlamaData(data);
            this.privateSpanMetinTemizle();
            this.privateSpanMetinHazirla();
        }
        privateSpanMetinHazirla() {

            this.privateSetSpanMetin("Tarih", this.privateGetTagHazirlamaDataEleman("tarih"));
            this.privateSetSpanMetin("Yazan", this.privateGetTagHazirlamaDataEleman("yazanKullanici"));

        }
        privateSpanMetinTemizle() {
            this.spanMetin = {};
        }

        privateSetSpanMetin(key, value) {
            this.spanMetin[key] = value;
        }
        privateGetSpanMetinArray() {
            return this.spanMetin;
        }
        privateGetSpanMetinValue(key) {
            return this.spanMetin[key];
        }

    }
    class KonuTag extends BaseYorumKonuTagHazirla {

        privateSpanMetinHazirla() {

            this.privateSetSpanMetin("Konu", this.privateGetTagHazirlamaDataEleman("konu"));
            super.privateSpanMetinHazirla();

        }

        tagHazirla() {

            let kaplayiciDivAcili = '<div konuKey=' + this.privateGetTagHazirlamaDataEleman("anahtar") + ' class="konularTextKutu-boyut konularTextKutu-hizalama konularTextKutu-gorsel">';
            let kaplayiciDivKapanis = '</div>';

            let htmlTag = kaplayiciDivAcili + this.privateKonuUstDiv() + this.privateKonuAltDiv() + kaplayiciDivKapanis;

            return htmlTag;
        }

        privateKonuUstDiv() {

            let divAcilis = '<div>';
            let divKapanis = '</div>';
            let spanKapanis = '</span>';
            let metinAyrintiSpan = '<span class="konuTextSpan-hizalama">';
            let spanlar = '';

            for (var key in this.privateGetSpanMetinArray())
                spanlar += (metinAyrintiSpan + key + spanKapanis) + (metinAyrintiSpan + this.privateGetSpanMetinValue(key) + spanKapanis);

            return divAcilis + spanlar + divKapanis;
        }

        privateKonuAltDiv() {

            let divAcilis = '<div class="konuText-boyut konuText-gorsel konuText-hizalama">';
            let divKapanis = '</div>';
            let metin = '<p>' + this.privateGetTagHazirlamaDataEleman("metin") + '</p>';

            return divAcilis + metin + divKapanis;

        }
    }
    class YorumTag extends BaseYorumKonuTagHazirla {

        tagHazirla() {

            let kaplayiciDivAcili = '<div key="' + this.privateGetTagHazirlamaDataEleman("anahtar") + '"  class="yorum-boyut yorum-hizalama yorum-gorsel">';
            let kaplayiciDivKapanis = '</div>';

            let htmlTag = kaplayiciDivAcili + this.privateKonuUstDiv() + this.privateKonuAltDiv() + kaplayiciDivKapanis;

            return htmlTag;
        }

        privateKonuUstDiv() {

            let divAcilis = '<div>';
            let divKapanis = '</div>';
            let spanKapanis = '</span>';
            let metinAyrintiSpan = '<span class="yorumTextSpan-hizalama">';
            let spanlar = '';

            for (var key in this.privateGetSpanMetinArray())
                spanlar += (metinAyrintiSpan + key + spanKapanis) + (metinAyrintiSpan + this.privateGetSpanMetinValue(key) + spanKapanis);

            return divAcilis + spanlar + divKapanis;
        }

        privateKonuAltDiv() {

            let divAcilis = '<div class="yorumText-boyut yorumText-gorsel yorumText-hizalama">';
            let divKapanis = '</div>';
            let metin = '<p>' + this.privateGetTagHazirlamaDataEleman("metin") + '</p>';

            return divAcilis + metin + divKapanis;

        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $.WebSocket = {
        socketAc: function () {
            websocket_server.onopen = function (e) {
            };

        },

        socketHata: function () {

            websocket_server.onerror = function (e) {

            }

        },

        socketDinle: function () {

            websocket_server.onmessage = function (e) {
                var json = JSON.parse(e.data);
                switch (json.type) {
                    case 'konu':
                        let nesnem2 = new KonuTag();
                        nesnem2.tagDataHazirlaTemplate(json);
                        $("#konular").prepend(nesnem2.tagHazirla());
                        break;
                    case 'yorum':
                        let nesnem = new YorumTag();
                        nesnem.tagDataHazirlaTemplate(json);
                        $("#yorumlarinKutusu").prepend(nesnem.tagHazirla());
                        break;
                    case 'konuSil':
                        $.Yonlendirici.KonuSilme(json.konuKey);
                        break;
                    case 'yorumSil':
                        $.Yonlendirici.YorumSime(json.yorumKey, json.konuKey);
                        break;

                }
            }

        }
    }
    $.WebSocketIslem = {
        SocketKonuMetniGonder: function (veri) {

            websocket_server.send(
                JSON.stringify({
                    'type': 'konu',
                    // 'user_id': kullaniciMail,
                    'konu': veri.konu,
                    'kullanici': veri.kullanici,
                    'metin': veri.metin,
                    'tarih': veri.tarih,
                    'anahtar': veri.anahtar
                })
            );
        },
        SocketYorumMetniGonder: function (veri) {

            websocket_server.send(
                JSON.stringify({
                    'type': 'yorum',
                    // 'user_id': kullaniciMail,
                    'anahtar': veri.anahtar,
                    'kullanici': veri.kullanici,
                    'metin': veri.metin,
                    'tarih': veri.tarih,
                })
            );
        },
        SocketKonuSilmeGonder: function (konuKey) {
            websocket_server.send(
                JSON.stringify({
                    'type': 'konuSil',
                    'konuKey': konuKey,
                })
            );
        },
        SocketYorumSilmeGonder: function (konuKey, yorumKey) {
            websocket_server.send(
                JSON.stringify({
                    'type': 'yorumSil',
                    'konuKey': konuKey,
                    'yorumKey': yorumKey
                })
            );
        }
    }
    $.PhpIslem = {

        IslemYap: function (id) {
            commandGlobalNesne.calistir(id);
        },

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
    $.SayfaIslem = {

        AttrValue: function (id, attrId) {
            return $(id).attr(attrId);
        },

        FormValue: function (id) {

            return $(id).val();

        },

        ValueSifirla: function (id) {

            $(id).val("");

        },

        HtmlSifirla: function (id) {
            $(id).html("");
        },

        TagSetAttr: function (id, attr, deger) {
            $(id).attr(attr, deger);
        },

        TagAppent: function (id, data) {
            $(id).append(data)
        },

    }
    $.Yonlendirici = {

        YorumlarKonuYaz: function (yorumKonuDivKeyAttr, konuHtml) {

            $.SayfaIslem.HtmlSifirla("#yorumlarinKutusu, #yorumKonuDiv");
            $.SayfaIslem.TagAppent("#yorumKonuDiv", konuHtml);
            $.SayfaIslem.TagSetAttr("#yorumKonuDiv", "key", yorumKonuDivKeyAttr)
            GLOBAL_YORUMLARIN_KONU_KEYI = yorumKonuDivKeyAttr;
        },
        YorumDivBas: function (data) {

            let yorumNesne = new YorumTag();

            for (let index = 0; index < data.length; index++) {
                yorumNesne.tagDataHazirlaTemplate(data[index]);
                $.SayfaIslem.TagAppent("#yorumlarinKutusu", yorumNesne.tagHazirla())
            }
        },
        KonuDivBas: function (data) {

            let konuNesne = new KonuTag();
            for (let index = 0; index < data.length; index++) {

                konuNesne.tagDataHazirlaTemplate(data[index]);
                $.SayfaIslem.TagAppent("#konular", konuNesne.tagHazirla())

            }
        },
        SocketBaslat: function () {
            $.WebSocket.socketAc();
            $.WebSocket.socketHata();
            $.WebSocket.socketDinle();
        },
        FormSayfasiHazirla: function () {

            $.SayfaIslem.TagSetAttr("#giris", "class", "sakla");
            $.SayfaIslem.TagSetAttr("#konular", "class", "konular-boyut konular-gorsel konular-hizalama");
            $.SayfaIslem.TagSetAttr("#konuFooter_ic", "class", "konuFooter_Ic-boyut konuFooter_Ic-gorsel konuFooter_Ic-hizalama");
        },
        KullaniciGirisTipiIslem: function (kullanici) {

            if (kullanici == "1") {
                $.SayfaIslem.TagSetAttr("#kaydetButton", "onclick", "$.PhpIslem.IslemYap('kullaniciKayit')");
                $.SayfaIslem.TagSetAttr("#kullaniciKayitForm", "class", "kayitForm-hizalama");
                $.Yonlendirici.SilmeClickFonksiyon();

            }
            else {
                $.SayfaIslem.TagSetAttr("#kaydetButton", "onclick", "$.PhpIslem.IslemYap('konuAc')");
                $.SayfaIslem.TagSetAttr("#konuForm", "class", "konuForm-hizalama");
            }
        },
        SilmeClickFonksiyon: function () {

            $("#yorumKonuDiv").dblclick(function () {
                commandGlobalNesne.calistir("konuSil");
            });

            $("#yorumlarinKutusu").on("dblclick", "[class='yorum-boyut yorum-hizalama yorum-gorsel']", function () {
                commandGlobalNesne.calistir("yorumSil", this)
            });
        },
        KonuSilme: function (konuKey) {

            $.SayfaIslem.TagSetAttr($("[konuKey=" + konuKey + "]"), "class", "sakla");
            if (GLOBAL_YORUMLARIN_KONU_KEYI == konuKey)
                $.Yonlendirici.YorumKonuSayfasiGecis('#yorumBolum', '#girisKonuBolum');
        },
        YorumSime: function (yorumKey, konuKey) {

            if (GLOBAL_YORUMLARIN_KONU_KEYI == konuKey)
                $.SayfaIslem.TagSetAttr($("[key=" + yorumKey + "]"), "class", "sakla");


        },
        BasariliGirisIslem: function (kullanici) {

            $.PhpIslem.IslemYap("konuGetir");
            $.Yonlendirici.FormSayfasiHazirla();
            $.Yonlendirici.KullaniciGirisTipiIslem(kullanici);
        },
        YorumKonuSayfasiGecis: function (SaklaId, GosterId) {
            if (GLOBAL_YORUMLARIN_KONU_KEYI != "1") GLOBAL_YORUMLARIN_KONU_KEYI = "1";
            $.SayfaIslem.TagSetAttr(SaklaId, "class", "sakla");
            $.SayfaIslem.TagSetAttr(GosterId, "class", "bolum-boy");
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $("#konular").on("click", "[class='konularTextKutu-boyut konularTextKutu-hizalama konularTextKutu-gorsel']", function () {

        $.Yonlendirici.YorumKonuSayfasiGecis("#girisKonuBolum", "#yorumBolum");
        $.Yonlendirici.YorumlarKonuYaz($.SayfaIslem.AttrValue(this, "konuKey"), $(this).html());

        commandGlobalNesne.calistir("yorumlariGetir");

    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let GLOBAL_YORUMLARIN_KONU_KEYI = "1";
    let commandGlobalNesne = new Command();
    let websocket_server = new WebSocket("ws://localhost:8080/");
    $.Yonlendirici.SocketBaslat();




});