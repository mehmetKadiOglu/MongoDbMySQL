<?php include_once("header.php"); ?>

<section id="girisKonuBolum"  class="bolum-boy">
    <div class="konu_GirisContent-boyut konu_GirisContent-gorsel konu_GirisContent-hizalama">
        <div id="konular" class="sakla">
        </div>
        <div id="giris" class="giris-gorsel giris-boyut giris-hizalama">
            <input type="text" name="kullaniciMail" placeholder="Mail" class="girisInput-gorsel girisInput-boyut">
            <input type="password" name="kullaniciSifre" placeholder="Sifre" class="girisInput-gorsel girisInput-boyut">
            <button onclick="$.PhpIslem.IslemYap('kullaniciGiris')" id="giris" class="girisButton-gorsel girisButton-boyut">
                Giris Yap
            </button>
        </div>
    </div>
    <footer class="konuFooter-boyut konuFooter-gorsel konuFooter-hizalama">
        <div id="konuFooter_ic" class="sakla">
            <form id="konuForm" class="sakla">
                <div>
                    <span>Konu Giriniz</span>
                    <span><input id="konuInput" type="text"> </span>
                </div>
                <div>
                    <textarea id="konuMetin" name="konuMetin" cols="85%" rows="3" style="resize:none;"></textarea>
                </div>
            </form>
            <form id="kullaniciKayitForm" class="sakla">
                <div>
                    <span class="kayitFormText-boyut kayitFormText-hizalama">Ad Giriniz</span>
                    <span class="kayitFormInput-hizalama"><input name="adText" type="text"> </span>
                    <span class="kayitFormText-boyut kayitFormText-hizalama">Soyad Giriniz</span>
                    <span class="kayitFormInput-hizalama"><input name="soyAdText" type="text"></span>
                </div>
                <div class="kayitFormAltDiv-hizalama">
                    <span class="kayitFormText-boyut kayitFormText-hizalama">Mail Giriniz</span>
                    <span class="kayitFormInput-hizalama"><input name="mailText" type="text"> </span>
                    <span class="kayitFormText-boyut kayitFormText-hizalama">Şifre Giriniz</span>
                    <span class="kayitFormInput-hizalama"><input name="sifreText" type="password"></span>
                </div>
            </form>
            <button id="kaydetButton" onclick="$.PhpIslem.IslemYap('kullaniciKayit')" class="kayitButton-hizalama kayitButton-gorsel">Kaydet</button>
        </div>
    </footer>
</section>

<section id="yorumBolum" class="sakla">
    <div class="yorumContent-boyut yorumContent-gorsel yorumContent-hizalama">
        <div id="yorumAnaKutu" class="yorumGenelDiv-boyut yorumGenelDiv-gorsel yorumGenelDiv-hizalama"> 
            <div key="" id="yorumKonuDiv" class="konularTextKutu-boyut konularTextKutu-hizalama konularTextKutu-gorsel">
            </div>
            <div id="yorumlarinKutusu" class="yorumKutusu-boyut yorumKutusu-hizalama">
                <div class="yorum-boyut yorum-hizalama yorum-gorsel">
                    <div>
                        <span class="yorumTextSpan-hizalama">Yazan</span>
                        <span class="yorumTextSpan-hizalama">sadasdasdas</span>
                        <span class="yorumTextSpan-hizalama">Tarih</span>
                        <span class="yorumTextSpan-hizalama">asdasdas</span>
                    </div>
                    <div class="yorumText-boyut yorumText-gorsel yorumText-hizalama">
                        .çöd.föds dşfksdşkf sşşdskşf dsşkfş dskşf kşdsk
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="yorumFooter-boyut yorumFooter-gorsel yorumFooter-hizalama">
        <div class="yorumFooter_ic-boyut yorumFooter_ic-gorsel  yorumFooter_ic-hizalama">


            <textarea id="yorumText"  cols="85%" rows="3" style="resize:none;"></textarea>
            <button onclick="$.PhpIslem.IslemYap('yorumYap')" class="geriGelButton-gorsel geriGelButton-boyut"> Yorum Kaydet </button>
            <button onclick="$.Yonlendirici.YorumKonuSayfasiGecis( '#yorumBolum', '#girisKonuBolum' )" class="geriGelButton-gorsel geriGelButton-boyut"> Geri Gel </button>


        </div>
    </footer>
</section>


</body>

</html>