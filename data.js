/* ===================================================================
   TALEVOCA Kids — data.js
   Tüm ders, hikâye, satranç, oyun ve ödül verileri burada tutulur.
   Hiçbir dış kaynağa bağlanmaz (tamamen çevrimdışı).
=================================================================== */

const LESSONS = [
  { t: "Merhaba ve Selamlaşma", w: [["hello","merhaba"],["goodbye","hoşça kal"],["please","lütfen"],["thanks","teşekkürler"],["friend","arkadaş"]] },
  { t: "Sayılar 1-10", w: [["one","bir"],["three","üç"],["five","beş"],["seven","yedi"],["ten","on"]] },
  { t: "Sayılar 11-20", w: [["eleven","on bir"],["thirteen","on üç"],["fifteen","on beş"],["eighteen","on sekiz"],["twenty","yirmi"]] },
  { t: "Renkler", w: [["red","kırmızı"],["blue","mavi"],["yellow","sarı"],["green","yeşil"],["purple","mor"]] },
  { t: "Aile Üyeleri", w: [["mother","anne"],["father","baba"],["sister","kız kardeş"],["brother","erkek kardeş"],["grandmother","büyükanne"]] },
  { t: "Vücut Bölümleri", w: [["head","kafa"],["hand","el"],["foot","ayak"],["eye","göz"],["ear","kulak"]] },
  { t: "Hayvanlar (Evcil)", w: [["dog","köpek"],["cat","kedi"],["rabbit","tavşan"],["fish","balık"],["bird","kuş"]] },
  { t: "Hayvanlar (Vahşi)", w: [["lion","aslan"],["tiger","kaplan"],["elephant","fil"],["bear","ayı"],["monkey","maymun"]] },
  { t: "Yiyecekler - Meyveler", w: [["apple","elma"],["banana","muz"],["orange","portakal"],["grape","üzüm"],["strawberry","çilek"]] },
  { t: "Yiyecekler - Sebzeler", w: [["carrot","havuç"],["potato","patates"],["tomato","domates"],["onion","soğan"],["corn","mısır"]] },
  { t: "İçecekler", w: [["water","su"],["milk","süt"],["juice","meyve suyu"],["tea","çay"],["lemonade","limonata"]] },
  { t: "Giysiler", w: [["shirt","gömlek"],["shoes","ayakkabı"],["hat","şapka"],["socks","çorap"],["jacket","ceket"]] },
  { t: "Hava Durumu", w: [["sunny","güneşli"],["rainy","yağmurlu"],["snowy","karlı"],["windy","rüzgarlı"],["cloudy","bulutlu"]] },
  { t: "Mevsimler", w: [["spring","ilkbahar"],["summer","yaz"],["autumn","sonbahar"],["winter","kış"],["season","mevsim"]] },
  { t: "Haftanın Günleri", w: [["monday","pazartesi"],["wednesday","çarşamba"],["friday","cuma"],["saturday","cumartesi"],["sunday","pazar"]] },
  { t: "Aylar", w: [["january","ocak"],["march","mart"],["june","haziran"],["september","eylül"],["december","aralık"]] },
  { t: "Zaman (Saat)", w: [["hour","saat"],["minute","dakika"],["morning","sabah"],["afternoon","öğleden sonra"],["night","gece"]] },
  { t: "Ev Eşyaları", w: [["table","masa"],["chair","sandalye"],["bed","yatak"],["lamp","lamba"],["mirror","ayna"]] },
  { t: "Odalar", w: [["kitchen","mutfak"],["bathroom","banyo"],["bedroom","yatak odası"],["living room","oturma odası"],["garden","bahçe"]] },
  { t: "Okul Eşyaları", w: [["pencil","kalem"],["book","kitap"],["eraser","silgi"],["backpack","sırt çantası"],["ruler","cetvel"]] },
  { t: "Sınıfta", w: [["teacher","öğretmen"],["student","öğrenci"],["blackboard","kara tahta"],["desk","sıra"],["question","soru"]] },
  { t: "Meslekler 1", w: [["doctor","doktor"],["teacher","öğretmen"],["firefighter","itfaiyeci"],["police officer","polis"],["chef","aşçı"]] },
  { t: "Ulaşım Araçları", w: [["car","araba"],["bus","otobüs"],["train","tren"],["airplane","uçak"],["bicycle","bisiklet"]] },
  { t: "Şehirde Yerler", w: [["park","park"],["market","market"],["hospital","hastane"],["library","kütüphane"],["school","okul"]] },
  { t: "Spor Dalları", w: [["football","futbol"],["basketball","basketbol"],["swimming","yüzme"],["running","koşu"],["tennis","tenis"]] },
  { t: "Hobiler", w: [["drawing","resim yapma"],["reading","okuma"],["dancing","dans"],["singing","şarkı söyleme"],["cycling","bisiklete binme"]] },
  { t: "Duygular 1", w: [["happy","mutlu"],["sad","üzgün"],["angry","kızgın"],["scared","korkmuş"],["tired","yorgun"]] },
  { t: "Zıt Kelimeler", w: [["big","büyük"],["small","küçük"],["fast","hızlı"],["slow","yavaş"],["hot","sıcak"]] },
  { t: "Sıfatlar (Boyut/Şekil)", w: [["round","yuvarlak"],["square","kare"],["tall","uzun"],["short","kısa"],["thin","ince"]] },
  { t: "Alışveriş", w: [["money","para"],["price","fiyat"],["shop","dükkan"],["buy","satın almak"],["sell","satmak"]] },
  { t: "Para ve Sayılar", w: [["coin","madeni para"],["hundred","yüz"],["thousand","bin"],["cheap","ucuz"],["expensive","pahalı"]] },
  { t: "Vücut Sağlığı", w: [["healthy","sağlıklı"],["sick","hasta"],["strong","güçlü"],["exercise","egzersiz"],["sleep","uyku"]] },
  { t: "Doktor ve Sağlık", w: [["nurse","hemşire"],["medicine","ilaç"],["pain","ağrı"],["fever","ateş"],["bandage","sargı bezi"]] },
  { t: "Tatil ve Seyahat", w: [["holiday","tatil"],["suitcase","bavul"],["map","harita"],["ticket","bilet"],["passport","pasaport"]] },
  { t: "Plaj", w: [["sea","deniz"],["sand","kum"],["wave","dalga"],["shell","deniz kabuğu"],["sunscreen","güneş kremi"]] },
  { t: "Orman ve Doğa", w: [["tree","ağaç"],["forest","orman"],["leaf","yaprak"],["mountain","dağ"],["river","nehir"]] },
  { t: "Uzay (Temel)", w: [["star","yıldız"],["moon","ay"],["sun","güneş"],["planet","gezegen"],["sky","gökyüzü"]] },
  { t: "Hava Araçları", w: [["rocket","roket"],["helicopter","helikopter"],["balloon","balon"],["pilot","pilot"],["wing","kanat"]] },
  { t: "Müzik ve Enstrümanlar 1", w: [["song","şarkı"],["piano","piyano"],["guitar","gitar"],["drum","davul"],["violin","keman"]] },
  { t: "Sanat ve Renkler", w: [["paint","boya"],["brush","fırça"],["picture","resim"],["paper","kağıt"],["color","renk"]] },
  { t: "Teknoloji Temelleri", w: [["computer","bilgisayar"],["screen","ekran"],["button","düğme"],["robot","robot"],["battery","pil"]] },
  { t: "Bilgisayar", w: [["keyboard","klavye"],["mouse","fare"],["file","dosya"],["password","şifre"],["internet","internet"]] },
  { t: "Telefon ve İnternet", w: [["phone","telefon"],["message","mesaj"],["call","arama"],["video","video"],["website","web sitesi"]] },
  { t: "Yemek Yapma", w: [["cook","pişirmek"],["bake","fırınlamak"],["cut","kesmek"],["mix","karıştırmak"],["recipe","tarif"]] },
  { t: "Restoranda", w: [["menu","menü"],["waiter","garson"],["order","sipariş"],["plate","tabak"],["bill","hesap"]] },
  { t: "Havaalanında", w: [["airport","havaalanı"],["luggage","bagaj"],["gate","kapı"],["flight","uçuş"],["boarding","biniş"]] },
  { t: "Yönler", w: [["left","sol"],["right","sağ"],["straight","düz"],["near","yakın"],["far","uzak"]] },
  { t: "Sıra Sayıları", w: [["first","birinci"],["second","ikinci"],["third","üçüncü"],["fourth","dördüncü"],["fifth","beşinci"]] },
  { t: "Basit Fiiller 1", w: [["run","koşmak"],["jump","zıplamak"],["walk","yürümek"],["eat","yemek"],["drink","içmek"]] },
  { t: "Basit Fiiller 2 / Genel Tekrar", w: [["read","okumak"],["write","yazmak"],["play","oynamak"],["sleep","uyumak"],["listen","dinlemek"]] },
  // Ders 51-60 — yeni içerik seti
  { t: "Evcil Hayvan Bakımı", w: [["feed","beslemek"],["pet","evcil hayvan"],["leash","tasma"],["vet","veteriner"],["cage","kafes"]] },
  { t: "Hastanede", w: [["patient","hasta (kişi)"],["appointment","randevu"],["injection","iğne"],["x-ray","röntgen"],["waiting room","bekleme odası"]] },
  { t: "Uzay Yolculuğu", w: [["astronaut","astronot"],["spaceship","uzay gemisi"],["orbit","yörünge"],["galaxy","galaksi"],["gravity","yerçekimi"]] },
  { t: "Bilim Deneyi", w: [["experiment","deney"],["magnet","mıknatıs"],["reaction","tepkime"],["microscope","mikroskop"],["hypothesis","hipotez"]] },
  { t: "Müzik Aletleri 2", w: [["flute","flüt"],["trumpet","trompet"],["cello","çello"],["harp","arp"],["xylophone","ksilofon"]] },
  { t: "Duygular 2", w: [["proud","gururlu"],["nervous","gergin"],["surprised","şaşırmış"],["bored","sıkılmış"],["confident","kendine güvenen"]] },
  { t: "Meslekler 2", w: [["engineer","mühendis"],["scientist","bilim insanı"],["farmer","çiftçi"],["dentist","diş hekimi"],["pilot","pilot"]] },
  { t: "Doğa Koruma", w: [["recycle","geri dönüşüm"],["pollution","kirlilik"],["endangered","nesli tükenmekte olan"],["forest fire","orman yangını"],["habitat","yaşam alanı"]] },
  { t: "İnternette Güvenlik", w: [["password","şifre"],["stranger","yabancı"],["private","özel/gizli"],["report","şikayet etmek"],["safe","güvenli"]] },
  { t: "İlk Yardım", w: [["bandage","sargı bezi"],["help","yardım"],["emergency","acil durum"],["burn","yanık"],["call for help","yardım çağırmak"]] },
  { t: "Sayılar 21-30", w: [["twenty-one","yirmi bir"],["twenty-five","yirmi beş"],["twenty-eight","yirmi sekiz"],["thirty","otuz"],["twenty-nine","yirmi dokuz"]] },
  { t: "Sayılar 31-40", w: [["thirty-one","otuz bir"],["thirty-five","otuz beş"],["thirty-eight","otuz sekiz"],["forty","kırk"],["thirty-nine","otuz dokuz"]] },
  { t: "Sayılar 41-50", w: [["forty-one","kırk bir"],["forty-five","kırk beş"],["forty-eight","kırk sekiz"],["fifty","elli"],["forty-nine","kırk dokuz"]] },
  { t: "Sayılar Onluk (50-100)", w: [["sixty","altmış"],["seventy","yetmiş"],["eighty","seksen"],["ninety","doksan"],["hundred","yüz"]] },
  { t: "Renkler 2", w: [["pink","pembe"],["brown","kahverengi"],["gray","gri"],["black","siyah"],["white","beyaz"]] },
  { t: "Şekiller", w: [["circle","daire"],["triangle","üçgen"],["rectangle","dikdörtgen"],["star","yıldız"],["heart","kalp"]] },
  { t: "Zıt Kelimeler 2", w: [["open","açık"],["closed","kapalı"],["full","dolu"],["empty","boş"],["clean","temiz"]] },
  { t: "Zıt Kelimeler 3", w: [["young","genç"],["old","yaşlı"],["easy","kolay"],["difficult","zor"],["light","hafif"]] },
  { t: "Hayvanlar - Çiftlik", w: [["cow","inek"],["horse","at"],["sheep","koyun"],["chicken","tavuk"],["pig","domuz"]] },
  { t: "Hayvanlar - Kuşlar", w: [["eagle","kartal"],["owl","baykuş"],["parrot","papağan"],["duck","ördek"],["sparrow","serçe"]] },
  { t: "Hayvanlar - Böcekler", w: [["bee","arı"],["butterfly","kelebek"],["ant","karınca"],["spider","örümcek"],["ladybug","uğur böceği"]] },
  { t: "Hayvanlar - Deniz Canlıları", w: [["whale","balina"],["dolphin","yunus"],["shark","köpekbalığı"],["crab","yengeç"],["octopus","ahtapot"]] },
  { t: "Hayvanlar - Sürüngenler", w: [["snake","yılan"],["turtle","kaplumbağa"],["lizard","kertenkele"],["crocodile","timsah"],["frog","kurbağa"]] },
  { t: "Yiyecekler - Kahvaltı", w: [["egg","yumurta"],["cheese","peynir"],["bread","ekmek"],["honey","bal"],["butter","tereyağı"]] },
  { t: "Yiyecekler - Atıştırmalık", w: [["cookie","kurabiye"],["chips","cips"],["popcorn","patlamış mısır"],["nuts","kuruyemiş"],["crackers","kraker"]] },
  { t: "Yiyecekler - Tatlılar", w: [["cake","pasta"],["ice cream","dondurma"],["chocolate","çikolata"],["candy","şeker"],["pudding","muhallebi"]] },
  { t: "Yiyecekler - Fast Food", w: [["pizza","pizza"],["burger","hamburger"],["fries","patates kızartması"],["sandwich","sandviç"],["hot dog","sosisli"]] },
  { t: "Mutfak Eşyaları", w: [["pot","tencere"],["pan","tava"],["spoon","kaşık"],["fork","çatal"],["knife","bıçak"]] },
  { t: "Yemek Pişirme Fiilleri", w: [["boil","kaynatmak"],["fry","kızartmak"],["chop","doğramak"],["stir","karıştırmak"],["grill","ızgara yapmak"]] },
  { t: "Aile Üyeleri 2", w: [["aunt","teyze/hala"],["uncle","amca/dayı"],["cousin","kuzen"],["grandfather","büyükbaba"],["nephew","yeğen (erkek)"]] },
  { t: "Yüz İfadeleri", w: [["smile","gülümseme"],["frown","kaş çatma"],["laugh","gülmek"],["cry","ağlamak"],["wink","göz kırpma"]] },
  { t: "Duygular 3", w: [["excited","heyecanlı"],["worried","endişeli"],["calm","sakin"],["curious","meraklı"],["brave","cesur"]] },
  { t: "Fiziksel Özellikler", w: [["tall","uzun boylu"],["short","kısa boylu"],["curly hair","kıvırcık saç"],["straight hair","düz saç"],["glasses","gözlük"]] },
  { t: "Giysiler 2 - Aksesuarlar", w: [["scarf","atkı"],["gloves","eldiven"],["belt","kemer"],["watch","saat"],["bag","çanta"]] },
  { t: "Hava Şartlarına Göre Giyim", w: [["umbrella","şemsiye"],["raincoat","yağmurluk"],["boots","çizme"],["sunglasses","güneş gözlüğü"],["scarf","atkı"]] },
  { t: "Gökyüzü ve Uzay 2", w: [["comet","kuyruklu yıldız"],["satellite","uydu"],["telescope","teleskop"],["universe","evren"],["astronaut","astronot"]] },
  { t: "Okyanus", w: [["wave","dalga"],["coral","mercan"],["seaweed","deniz yosunu"],["island","ada"],["beach","plaj"]] },
  { t: "Orman 2", w: [["branch","dal"],["root","kök"],["nest","yuva"],["wood","odun"],["path","patika"]] },
  { t: "Dağlar", w: [["peak","zirve"],["valley","vadi"],["cave","mağara"],["rock","kaya"],["cliff","uçurum"]] },
  { t: "Bahçe", w: [["flower","çiçek"],["grass","çim"],["soil","toprak"],["fence","çit"],["bench","bank"]] },
  { t: "Bitkiler", w: [["seed","tohum"],["root","kök"],["stem","sap"],["petal","taç yaprağı"],["bush","çalı"]] },
  { t: "Günler ve Zaman İfadeleri", w: [["today","bugün"],["tomorrow","yarın"],["yesterday","dün"],["weekend","hafta sonu"],["weekday","hafta içi"]] },
  { t: "Takvim Kelimeleri", w: [["calendar","takvim"],["date","tarih"],["year","yıl"],["week","hafta"],["month","ay"]] },
  { t: "Zaman İfadeleri", w: [["now","şimdi"],["later","sonra"],["soon","yakında"],["always","her zaman"],["never","asla"]] },
  { t: "Ev Odaları 2", w: [["hallway","koridor"],["attic","tavan arası"],["basement","bodrum"],["balcony","balkon"],["closet","dolap"]] },
  { t: "Banyo Eşyaları", w: [["towel","havlu"],["soap","sabun"],["toothbrush","diş fırçası"],["shampoo","şampuan"],["mirror","ayna"]] },
  { t: "Bahçe Eşyaları", w: [["shovel","kürek"],["hose","hortum"],["ladder","merdiven"],["wheelbarrow","el arabası"],["rake","tırmık"]] },
  { t: "Temizlik", w: [["broom","süpürge"],["mop","paspas"],["vacuum","elektrikli süpürge"],["trash","çöp"],["clean","temizlemek"]] },
  { t: "Okul Dersleri", w: [["math","matematik"],["science","fen bilgisi"],["history","tarih"],["art class","resim dersi"],["music class","müzik dersi"]] },
  { t: "Okul Mekanları", w: [["gym","spor salonu"],["cafeteria","yemekhane"],["playground","oyun alanı"],["hallway","koridor"],["principal's office","müdür odası"]] },
  { t: "Sınıfta Sporlar", w: [["race","yarış"],["team","takım"],["win","kazanmak"],["lose","kaybetmek"],["score","skor"]] },
  { t: "Meslekler 3", w: [["artist","sanatçı"],["writer","yazar"],["singer","şarkıcı"],["actor","oyuncu"],["photographer","fotoğrafçı"]] },
  { t: "Meslekler 4", w: [["driver","şoför"],["cashier","kasiyer"],["waiter","garson"],["mechanic","tamirci"],["electrician","elektrikçi"]] },
  { t: "Ulaşım - Trafik İşaretleri", w: [["stop sign","dur işareti"],["traffic light","trafik ışığı"],["crosswalk","yaya geçidi"],["speed limit","hız limiti"],["sidewalk","kaldırım"]] },
  { t: "Tren İstasyonu", w: [["platform","peron"],["ticket office","bilet gişesi"],["timetable","tarife"],["track","ray"],["station","istasyon"]] },
  { t: "Yönler 2", w: [["north","kuzey"],["south","güney"],["east","doğu"],["west","batı"],["corner","köşe"]] },
  { t: "Şehirdeki Dükkanlar", w: [["bakery","fırın"],["bookstore","kitapçı"],["pharmacy","eczane"],["supermarket","süpermarket"],["toy store","oyuncakçı"]] },
  { t: "Binalar", w: [["apartment","apartman"],["tower","kule"],["bridge","köprü"],["factory","fabrika"],["church","kilise"]] },
  { t: "Restoranda 2", w: [["reservation","rezervasyon"],["tip","bahşiş"],["dessert","tatlı"],["appetizer","ön yemek"],["napkin","peçete"]] },
  { t: "Markette", w: [["cart","alışveriş arabası"],["basket","sepet"],["cashier","kasiyer"],["receipt","fiş"],["discount","indirim"]] },
  { t: "Vücut Sağlığı 2", w: [["cough","öksürük"],["headache","baş ağrısı"],["stomachache","karın ağrısı"],["cold (illness)","soğuk algınlığı"],["rest","dinlenmek"]] },
  { t: "Diş Hekiminde", w: [["tooth","diş"],["toothache","diş ağrısı"],["dentist chair","diş koltuğu"],["brush teeth","diş fırçalamak"],["cavity","çürük"]] },
  { t: "Egzersiz", w: [["stretch","esneme"],["push-up","şınav"],["jump rope","ip atlama"],["workout","antrenman"],["gym","spor salonu"]] },
  { t: "Acil Durum", w: [["emergency","acil durum"],["fire","yangın"],["ambulance","ambulans"],["police","polis"],["help","yardım"]] },
  { t: "Bilgisayar 2", w: [["folder","klasör"],["download","indirmek"],["upload","yüklemek"],["software","yazılım"],["printer","yazıcı"]] },
  { t: "Sosyal Medya Güvenliği", w: [["privacy","gizlilik"],["block","engellemek"],["share","paylaşmak"],["profile","profil"],["comment","yorum"]] },
  { t: "Robotlar", w: [["robot","robot"],["machine","makine"],["sensor","sensör"],["wire","kablo"],["program","program"]] },
  { t: "Bilim Araçları", w: [["magnifying glass","büyüteç"],["beaker","deney şişesi"],["scale","terazi"],["thermometer","termometre"],["magnet","mıknatıs"]] },
  { t: "Spor Dalları 2", w: [["volleyball","voleybol"],["baseball","beyzbol"],["golf","golf"],["skiing","kayak"],["skating","paten"]] },
  { t: "Müzik Aletleri 3", w: [["saxophone","saksafon"],["accordion","akordeon"],["clarinet","klarnet"],["triangle (instrument)","üçgen (çalgı)"],["tambourine","tef"]] },
  { t: "Sanat 2", w: [["sculpture","heykel"],["canvas","tuval"],["crayon","boya kalemi"],["sketch","kroki"],["gallery","galeri"]] },
  { t: "Okuma ve Kitaplar", w: [["story","hikaye"],["author","yazar"],["chapter","bölüm"],["page","sayfa"],["library card","kütüphane kartı"]] },
  { t: "Dans", w: [["dance move","dans hareketi"],["ballet","bale"],["rhythm","ritim"],["partner","dans partneri"],["stage","sahne"]] },
  { t: "Oyuncaklar", w: [["doll","bebek (oyuncak)"],["ball","top"],["puzzle","yapboz"],["kite","uçurtma"],["blocks","yapı blokları"]] },
  { t: "Uzay - Gezegenler", w: [["Mercury","Merkür"],["Venus","Venüs"],["Mars","Mars"],["Jupiter","Jüpiter"],["Saturn","Satürn"]] },
  { t: "Basit Makineler", w: [["lever","kaldıraç"],["pulley","makara"],["wheel","tekerlek"],["wedge","kama"],["screw","vida"]] },
  { t: "Fiiller 3", w: [["open","açmak"],["close","kapatmak"],["push","itmek"],["pull","çekmek"],["carry","taşımak"]] },
  { t: "Fiiller 4", w: [["build","inşa etmek"],["draw","çizmek"],["paint","boyamak"],["clean","temizlemek"],["fix","tamir etmek"]] },
  { t: "Fiiller 5", w: [["laugh","gülmek"],["cry","ağlamak"],["shout","bağırmak"],["whisper","fısıldamak"],["smile","gülümsemek"]] },
  { t: "Zıt Sıfatlar - Doku", w: [["soft","yumuşak"],["hard","sert"],["smooth","pürüzsüz"],["rough","pürüzlü"],["sticky","yapışkan"]] },
  { t: "Zıt Sıfatlar - Tat", w: [["sweet","tatlı"],["sour","ekşi"],["salty","tuzlu"],["bitter","acı"],["spicy","baharatlı"]] },
  { t: "Edatlar (In/On/Under)", w: [["in","içinde"],["on","üzerinde"],["under","altında"],["next to","yanında"],["between","arasında"]] },
  { t: "Yön Belirteçleri", w: [["up","yukarı"],["down","aşağı"],["forward","ileri"],["backward","geri"],["around","etrafında"]] },
  { t: "Nezaket İfadeleri", w: [["please","lütfen"],["thank you","teşekkür ederim"],["sorry","özür dilerim"],["excuse me","affedersiniz"],["you're welcome","rica ederim"]] },
  { t: "Resmi Selamlaşma", w: [["good morning","günaydın"],["good afternoon","tünaydın"],["good evening","iyi akşamlar"],["good night","iyi geceler"],["see you later","sonra görüşürüz"]] },
  { t: "Arkadaşlık", w: [["friendship","arkadaşlık"],["share","paylaşmak"],["help each other","birbirine yardım etmek"],["trust","güven"],["kind","nazik"]] },
  { t: "Doğum Günü", w: [["birthday","doğum günü"],["candle","mum"],["balloon","balon"],["present","hediye"],["party","parti"]] },
  { t: "Yılbaşı", w: [["new year","yeni yıl"],["countdown","geri sayım"],["fireworks","havai fişek"],["celebration","kutlama"],["wish","dilek"]] },
  { t: "Ulusal Bayramlar", w: [["flag","bayrak"],["anthem","marş"],["holiday","bayram/tatil"],["parade","geçit töreni"],["celebrate","kutlamak"]] },
  { t: "Kamp", w: [["tent","çadır"],["sleeping bag","uyku tulumu"],["campfire","kamp ateşi"],["backpack","sırt çantası"],["flashlight","el feneri"]] },
  { t: "Piknik", w: [["picnic basket","piknik sepeti"],["blanket","battaniye"],["sandwich","sandviç"],["park","park"],["sunny day","güneşli gün"]] },
  { t: "Yangın Güvenliği", w: [["fire","yangın"],["smoke","duman"],["exit","çıkış"],["extinguisher","yangın söndürücü"],["firefighter","itfaiyeci"]] },
  { t: "Trafik Güvenliği", w: [["seatbelt","emniyet kemeri"],["helmet","kask"],["crosswalk","yaya geçidi"],["look both ways","iki tarafa bak"],["careful","dikkatli"]] },
  { t: "Acil Numaralar", w: [["emergency number","acil numara"],["police","polis"],["ambulance","ambulans"],["fire department","itfaiye"],["call","aramak"]] },
  { t: "Hayvanat Bahçesi", w: [["zoo","hayvanat bahçesi"],["cage","kafes"],["keeper","bakıcı"],["visitor","ziyaretçi"],["feed the animals","hayvanları beslemek"]] },
  { t: "Akvaryum", w: [["aquarium","akvaryum"],["fish tank","balık tankı"],["seahorse","deniz atı"],["jellyfish","denizanası"],["penguin","penguen"]] },
  { t: "Sirk", w: [["circus","sirk"],["clown","palyaço"],["acrobat","akrobat"],["tent","çadır"],["show","gösteri"]] },
  { t: "Lunapark", w: [["roller coaster","hız treni"],["ferris wheel","dönme dolap"],["ticket","bilet"],["ride","oyuncak/tur"],["fun","eğlence"]] },
  { t: "Sinema", w: [["movie","film"],["screen","ekran"],["popcorn","patlamış mısır"],["ticket","bilet"],["seat","koltuk"]] },
  { t: "Tiyatro", w: [["stage","sahne"],["actor","oyuncu"],["audience","seyirci"],["curtain","perde"],["applause","alkış"]] },
  { t: "Kütüphane", w: [["library","kütüphane"],["book","kitap"],["shelf","raf"],["quiet","sessiz"],["borrow","ödünç almak"]] },
  { t: "Müze", w: [["museum","müze"],["exhibit","sergi"],["painting","tablo"],["history","tarih"],["guide","rehber"]] },
  { t: "Market Alışverişi", w: [["list","liste"],["aisle","reyon"],["basket","sepet"],["checkout","kasa"],["bag","poşet"]] },
  { t: "Giyim Mağazası", w: [["try on","denemek (giysi)"],["size","beden"],["fitting room","deneme kabini"],["mirror","ayna"],["price tag","fiyat etiketi"]] },
  { t: "Oyuncakçı", w: [["toy","oyuncak"],["shelf","raf"],["box","kutu"],["game","oyun"],["choose","seçmek"]] },
  { t: "Pastane", w: [["bakery","pastane"],["cake","pasta"],["bread","ekmek"],["oven","fırın"],["sweet","tatlı"]] },
  { t: "Kafe", w: [["coffee","kahve"],["cup","fincan"],["table","masa"],["menu","menü"],["waiter","garson"]] },
  { t: "Otel", w: [["hotel","otel"],["room key","oda anahtarı"],["reception","resepsiyon"],["suitcase","bavul"],["elevator","asansör"]] },
  { t: "Plajda Aktiviteler", w: [["swim","yüzmek"],["build a sandcastle","kum kalesi yapmak"],["sunbathe","güneşlenmek"],["surf","sörf yapmak"],["collect shells","kabuk toplamak"]] },
  { t: "Kışın Aktiviteler", w: [["snowman","kardan adam"],["sled","kızak"],["ice skating","buz pateni"],["snowball","kar topu"],["scarf","atkı"]] },
  { t: "Kar Oyunları", w: [["snowball fight","kar topu savaşı"],["snow angel","kar meleği"],["igloo","igloo"],["frost","kırağı"],["icicle","buz sarkıtı"]] },
  { t: "Yazın Aktiviteler", w: [["swimming pool","yüzme havuzu"],["ice cream","dondurma"],["sunscreen","güneş kremi"],["vacation","tatil"],["hot","sıcak"]] },
  { t: "Bahar Etkinlikleri", w: [["flowers bloom","çiçekler açar"],["picnic","piknik"],["rain shower","sağanak yağmur"],["garden","bahçe"],["butterfly","kelebek"]] },
  { t: "Sonbahar Etkinlikleri", w: [["leaves fall","yapraklar düşer"],["harvest","hasat"],["pumpkin","balkabağı"],["wind","rüzgar"],["cool weather","serin hava"]] },
  { t: "Doğa Yürüyüşü", w: [["trail","patika"],["backpack","sırt çantası"],["map","harita"],["compass","pusula"],["wildlife","yaban hayatı"]] },
  { t: "Kamp Ateşi", w: [["campfire","kamp ateşi"],["marshmallow","marşmelov"],["spark","kıvılcım"],["smoke","duman"],["story time","hikaye zamanı"]] },
  { t: "Yıldızları İzlemek", w: [["stargazing","yıldız gözlemi"],["telescope","teleskop"],["constellation","takımyıldız"],["night sky","gece gökyüzü"],["bright","parlak"]] },
  { t: "Gökkuşağı", w: [["rainbow","gökkuşağı"],["colorful","renkli"],["after rain","yağmurdan sonra"],["arc","kavis"],["sunlight","güneş ışığı"]] },
  { t: "Fırtına", w: [["storm","fırtına"],["thunder","gök gürültüsü"],["lightning","şimşek"],["heavy rain","şiddetli yağmur"],["shelter","sığınak"]] },
  { t: "Deprem Güvenliği", w: [["earthquake","deprem"],["safe place","güvenli yer"],["drop cover hold","çök kapan tutun"],["shake","sallanmak"],["exit","çıkış"]] },
  { t: "Sel Güvenliği", w: [["flood","sel"],["water level","su seviyesi"],["evacuate","tahliye etmek"],["high ground","yüksek zemin"],["safety","güvenlik"]] },
  { t: "Sağlıklı Beslenme", w: [["healthy food","sağlıklı yiyecek"],["vegetables","sebzeler"],["fruit","meyve"],["water","su"],["balanced diet","dengeli beslenme"]] },
  { t: "Vitaminlerin Önemi", w: [["vitamin","vitamin"],["energy","enerji"],["strong bones","güçlü kemikler"],["immune system","bağışıklık sistemi"],["nutrition","beslenme"]] },
  { t: "Diş Sağlığı", w: [["brush","fırçalamak"],["floss","diş ipi"],["cavity","çürük"],["dentist","diş hekimi"],["healthy teeth","sağlıklı dişler"]] },
  { t: "Uyku Düzeni", w: [["sleep","uyku"],["bedtime","yatma vakti"],["rest","dinlenme"],["dream","rüya"],["wake up","uyanmak"]] },
  { t: "Spor ve Sağlık", w: [["exercise","egzersiz"],["strong","güçlü"],["energy","enerji"],["healthy body","sağlıklı vücut"],["active","aktif"]] },
  { t: "Takım Oyunları", w: [["team","takım"],["teammate","takım arkadaşı"],["goal","gol/hedef"],["pass the ball","topu pas vermek"],["win","kazanmak"]] },
  { t: "Bireysel Sporlar", w: [["running","koşu"],["swimming","yüzme"],["gymnastics","jimnastik"],["cycling","bisiklet"],["archery","okçuluk"]] },
  { t: "Olimpiyatlar", w: [["Olympics","Olimpiyatlar"],["medal","madalya"],["athlete","sporcu"],["competition","yarışma"],["champion","şampiyon"]] },
  { t: "Satranç Terimleri", w: [["checkmate","şah mat"],["king","şah"],["queen","vezir"],["pawn","piyon"],["board","tahta"]] },
  { t: "Matematik Kelimeleri", w: [["add","toplamak"],["subtract","çıkarmak"],["multiply","çarpmak"],["divide","bölmek"],["equal","eşit"]] },
  { t: "Geometrik Şekiller", w: [["cube","küp"],["sphere","küre"],["cylinder","silindir"],["cone","koni"],["pyramid","piramit"]] },
  { t: "Ölçü Birimleri", w: [["meter","metre"],["kilogram","kilogram"],["liter","litre"],["centimeter","santimetre"],["weight","ağırlık"]] },
  { t: "Zaman Ölçüleri", w: [["second","saniye"],["minute","dakika"],["hour","saat"],["day","gün"],["century","yüzyıl"]] },
  { t: "Para Birimleri", w: [["money","para"],["coin","madeni para"],["bill (money)","kağıt para"],["wallet","cüzdan"],["price","fiyat"]] },
  { t: "Alışveriş Diyalogları", w: [["how much","ne kadar"],["I would like","isterim"],["do you have","var mı"],["that's all","hepsi bu"],["here you are","buyurun"]] },
  { t: "Telefon Görüşmesi", w: [["phone call","telefon görüşmesi"],["hello (on phone)","alo"],["hang up","telefonu kapatmak"],["number","numara"],["message","mesaj"]] },
  { t: "Mektup Yazma", w: [["letter","mektup"],["envelope","zarf"],["stamp","pul"],["address","adres"],["dear","sevgili"]] },
  { t: "E-posta", w: [["email","e-posta"],["subject","konu"],["send","göndermek"],["attachment","ek dosya"],["inbox","gelen kutusu"]] },
  { t: "Sunum Yapma", w: [["presentation","sunum"],["slide","slayt"],["audience","dinleyiciler"],["explain","açıklamak"],["practice","prova yapmak"]] },
  { t: "Sınavlar", w: [["exam","sınav"],["question","soru"],["answer","cevap"],["study","çalışmak (ders)"],["grade","not"]] },
  { t: "Ödevler", w: [["homework","ödev"],["assignment","görev"],["due date","teslim tarihi"],["notebook","defter"],["finish","bitirmek"]] },
  { t: "Tatil Planları", w: [["vacation","tatil"],["plan","plan"],["destination","varış yeri"],["book a trip","seyahat ayırtmak"],["pack","bavul hazırlamak"]] },
  { t: "Uçakta", w: [["airplane","uçak"],["seatbelt","emniyet kemeri"],["window seat","pencere kenarı koltuk"],["flight attendant","kabin memuru"],["takeoff","kalkış"]] },
  { t: "Gemide", w: [["ship","gemi"],["sailor","denizci"],["deck","güverte"],["anchor","çapa"],["captain","kaptan"]] },
  { t: "Otobüs Yolculuğu", w: [["bus stop","otobüs durağı"],["driver","şoför"],["fare","ücret"],["seat","koltuk"],["route","güzergah"]] },
  { t: "Tren Yolculuğu", w: [["train","tren"],["platform","peron"],["ticket","bilet"],["conductor","kondüktör"],["station","istasyon"]] },
  { t: "Harita Okuma", w: [["map","harita"],["legend (map)","harita açıklaması"],["scale","ölçek"],["compass","pusula"],["route","güzergah"]] },
  { t: "Dünya Ülkeleri", w: [["country","ülke"],["capital","başkent"],["continent","kıta"],["language","dil"],["flag","bayrak"]] },
  { t: "Genel Tekrar", w: [["review","tekrar"],["practice","alıştırma"],["remember","hatırlamak"],["learn","öğrenmek"],["congratulations","tebrikler"]] },
];

// Hikâyeler artık İngilizce. "gloss" sözlüğündeki kelimeler tıklanınca
// Türkçesi gösterilir. Tüm metin TTS (sesli okuma) ile okunabilir.
const STORIES = [
  {
    id: "pet_hospital",
    title: "Lumi's Sick Little Dragon",
    intro: "Lumi's little dragon Pufi does not feel well today. What should Lumi do to help?",
    gloss: { "sick":"hasta", "dragon":"ejderha", "cough":"öksürmek", "water":"su", "vet":"veteriner", "rest":"dinlenmek", "cold":"soğuk algınlığı" },
    nodes: {
      start: { text: "Pufi is coughing. What do you do first?",
        choices: [
          { label: "Give him some water", next: "water" },
          { label: "Take him to the vet", next: "vet" }
        ]},
      water: { text: "You gave him water, but the cough did not stop. Maybe he needs an expert.",
        choices: [{ label: "Take him to the vet", next: "vet" }] },
      vet: { text: "The vet checked Pufi and said: 'He just has a small cold. He needs to rest!'", end: true, quiz: { q: "Why was Pufi sick?", options: ["Because he was hungry","Because he had a cold","Because he was tired"], answer: 1 } }
    }
  },
  {
    id: "space_trip",
    title: "A Day in Space",
    intro: "Lumi is flying to the Moon in a spaceship!",
    gloss: { "spaceship":"uzay gemisi", "oxygen":"oksijen", "rocket":"roket", "moon":"ay", "stars":"yıldızlar", "check":"kontrol etmek" },
    nodes: {
      start: { text: "The ship is ready for takeoff. What should you check first?",
        choices: [
          { label: "The oxygen tanks", next: "oxygen" },
          { label: "The music playlist", next: "music" }
        ]},
      music: { text: "The music is nice, but you forgot to check the oxygen! Luckily you still have time.",
        choices: [{ label: "Check the oxygen tanks", next: "oxygen" }] },
      oxygen: { text: "The oxygen tanks are full. The rocket takes off and flies through the stars!", end: true, quiz: { q: "What did you check before the trip?", options: ["Music","The oxygen tanks","Food"], answer: 1 } }
    }
  },
  {
    id: "internet_safety",
    title: "A Mysterious Message",
    intro: "A stranger sent Lumi a message on the tablet. What should Lumi do?",
    gloss: { "stranger":"yabancı", "message":"mesaj", "address":"adres", "safe":"güvenli", "adult":"yetişkin", "share":"paylaşmak" },
    nodes: {
      start: { text: "The message says: 'Can you tell me your address?' What does Lumi do?",
        choices: [
          { label: "Type the address", next: "bad" },
          { label: "Tell an adult", next: "good" }
        ]},
      bad: { text: "This is not safe! Personal information should never be shared with strangers.",
        choices: [{ label: "Tell an adult", next: "good" }] },
      good: { text: "Lumi told mom about it. Mom blocked the message and was proud of Lumi.", end: true, quiz: { q: "What should you do if a stranger asks for personal information?", options: ["Tell them right away","Tell an adult","Ignore it and reply"], answer: 1 } }
    }
  },
  {
    id: "first_aid",
    title: "A Small Accident",
    intro: "While playing in the park, your friend cut their knee. How does Lumi help?",
    gloss: { "knee":"diz", "clean":"temizlemek", "bandage":"sargı bezi", "wound":"yara", "adult":"yetişkin", "help":"yardım" },
    nodes: {
      start: { text: "Your friend's knee is bleeding. What do you do first?",
        choices: [
          { label: "Clean the wound with water", next: "clean" },
          { label: "Keep running and playing", next: "run" }
        ]},
      run: { text: "If the wound is not cleaned, it can get infected. Helping first is better.",
        choices: [{ label: "Clean the wound with water", next: "clean" }] },
      clean: { text: "You cleaned the wound and put a bandage on it. You also told an adult. Well done!", end: true, quiz: { q: "What is the first step for a small wound?", options: ["Clean the wound","Ignore it","Keep running"], answer: 0 } }
    }
  },
  {
    id: "hospital_visit",
    title: "Lumi's Hospital Visit",
    intro: "Lumi has a fever and needs to visit the doctor today.",
    gloss: { "fever":"ateş", "doctor":"doktor", "nurse":"hemşire", "medicine":"ilaç", "appointment":"randevu", "patient":"hasta" },
    nodes: {
      start: { text: "At the hospital, the nurse asks Lumi to wait. What does Lumi do?",
        choices: [
          { label: "Wait quietly in the waiting room", next: "wait" },
          { label: "Run around the hospital", next: "loud" }
        ]},
      loud: { text: "Running in the hospital can disturb other patients. It is better to wait calmly.",
        choices: [{ label: "Wait quietly in the waiting room", next: "wait" }] },
      wait: { text: "The doctor checked Lumi and gave some medicine. Lumi felt better the next day!", end: true, quiz: { q: "What did the doctor give Lumi?", options: ["A toy","Medicine","A book"], answer: 1 } }
    }
  },
  {
    id: "science_fair",
    title: "The Science Experiment",
    intro: "Lumi wants to make a volcano experiment for the school science fair.",
    gloss: { "experiment":"deney", "volcano":"yanardağ", "mix":"karıştırmak", "safety":"güvenlik", "goggles":"koruyucu gözlük" },
    nodes: {
      start: { text: "Before mixing the chemicals, what should Lumi wear?",
        choices: [
          { label: "Safety goggles", next: "safe" },
          { label: "Nothing special", next: "unsafe" }
        ]},
      unsafe: { text: "Without safety goggles, the experiment could be dangerous for the eyes.",
        choices: [{ label: "Wear safety goggles", next: "safe" }] },
      safe: { text: "Lumi wore the goggles and made a wonderful volcano eruption. Everyone clapped!", end: true, quiz: { q: "What should you wear during an experiment?", options: ["Safety goggles","A hat","Sunglasses"], answer: 0 } }
    }
  },
  {
    id: "nature_protection",
    title: "Protecting the Forest",
    intro: "Lumi and friends are having a picnic in the forest.",
    gloss: { "forest":"orman", "trash":"çöp", "recycle":"geri dönüştürmek", "habitat":"yaşam alanı", "animals":"hayvanlar" },
    nodes: {
      start: { text: "After the picnic, there is trash on the ground. What should Lumi do?",
        choices: [
          { label: "Pick up the trash and recycle it", next: "good" },
          { label: "Leave it and go home", next: "bad" }
        ]},
      bad: { text: "Trash can hurt animals and pollute their habitat. That is not a good idea.",
        choices: [{ label: "Pick up the trash and recycle it", next: "good" }] },
      good: { text: "Lumi collected all the trash and recycled it. The forest stayed clean for the animals!", end: true, quiz: { q: "Why should we pick up trash in nature?", options: ["To protect animals","It looks nice","No reason"], answer: 0 } }
    }
  },
  {
    id: "chess_lesson",
    title: "Lumi Learns Chess",
    intro: "Lumi's grandfather is teaching Lumi how to play chess.",
    gloss: { "chess":"satranç", "king":"şah", "queen":"vezir", "checkmate":"şah mat", "practice":"pratik yapmak" },
    nodes: {
      start: { text: "Grandfather says the king is the most important piece. What should Lumi do to win?",
        choices: [
          { label: "Protect the king and attack carefully", next: "good" },
          { label: "Move pieces randomly", next: "bad" }
        ]},
      bad: { text: "Moving randomly is risky. A good plan protects the king.",
        choices: [{ label: "Protect the king and attack carefully", next: "good" }] },
      good: { text: "Lumi thought carefully and said 'Checkmate!' Grandfather was very proud.", end: true, quiz: { q: "What is the most important piece in chess?", options: ["The pawn","The king","The rook"], answer: 1 } }
    }
  },
  {
    id: "birthday_party",
    title: "Lumi's Birthday Party",
    intro: "Today is Lumi's birthday, and friends are coming to celebrate!",
    gloss: { "birthday":"doğum günü", "candle":"mum", "present":"hediye", "guest":"misafir", "share":"paylaşmak" },
    nodes: {
      start: { text: "Lumi has one cake but many guests. What should Lumi do?",
        choices: [
          { label: "Share the cake with everyone", next: "good" },
          { label: "Keep the cake for later", next: "bad" }
        ]},
      bad: { text: "The guests came to celebrate together. Sharing makes the party more fun.",
        choices: [{ label: "Share the cake with everyone", next: "good" }] },
      good: { text: "Everyone got a piece of cake and sang a happy song together!", end: true, quiz: { q: "What did Lumi do with the cake?", options: ["Kept it hidden","Shared it with guests","Ate it alone"], answer: 1 } }
    }
  },
  {
    id: "earthquake_safety",
    title: "Stay Safe!",
    intro: "Suddenly, the ground starts to shake at Lumi's school.",
    gloss: { "earthquake":"deprem", "shake":"sallanmak", "safe place":"güvenli yer", "drop":"çökmek", "cover":"kapanmak" },
    nodes: {
      start: { text: "The classroom starts shaking. What should Lumi do?",
        choices: [
          { label: "Drop, cover, and hold on under the desk", next: "good" },
          { label: "Run outside immediately", next: "bad" }
        ]},
      bad: { text: "Running during shaking can be dangerous. It is safer to drop and cover first.",
        choices: [{ label: "Drop, cover, and hold on under the desk", next: "good" }] },
      good: { text: "Lumi stayed calm, dropped under the desk, and waited until the shaking stopped. Well done!", end: true, quiz: { q: "What should you do first during an earthquake?", options: ["Run outside","Drop, cover, and hold on","Stand near a window"], answer: 1 } }
    }
  }
];

// ============================================================
// DİYALOG HİKÂYELERİ — Duolingo'daki "Stories" bölümüne benzer format:
// iki karakter arasında konuşma + ara sıra anlama soruları + dinleme
// alıştırması. Mevcut STORIES (seçim yapmalı hikâyeler) hiç değişmedi,
// bu tamamen ek bir içerik seti.
// step types: "line" (konuşma balonu), "check" (anlama sorusu),
// "listen" (önce dinlenir, sonra doğru seçenek işaretlenir)
// ============================================================
const DIALOGUE_STORIES = [
  {
    id: "cafe_order",
    title: "At the Café",
    characters: { A:"Lumi 🐲", B:"Barista ☕" },
    gloss: { "menu":"menü", "order":"sipariş", "juice":"meyve suyu", "please":"lütfen", "here you are":"buyurun" },
    steps: [
      { type:"line", speaker:"A", text:"Hello! Can I see the menu, please?" },
      { type:"line", speaker:"B", text:"Of course! Here you are." },
      { type:"check", q:"What did Lumi ask for?", options:["The bill","The menu","A table"], answer:1 },
      { type:"line", speaker:"A", text:"I would like an apple juice, please." },
      { type:"line", speaker:"B", text:"Here you are! Enjoy your juice." },
      { type:"listen", audio:"Here you are! Enjoy your juice.", q:"What did you hear?", options:["Here you are! Enjoy your juice.","Here you go! Have a nice day.","Sorry, we are closed."], answer:0 },
    ]
  },
  {
    id: "new_friend",
    title: "Making a New Friend",
    characters: { A:"Lumi 🐲", B:"Mia 🦋" },
    gloss: { "name":"isim", "nice to meet you":"tanıştığımıza memnun oldum", "favorite":"favori", "too":"de/da" },
    steps: [
      { type:"line", speaker:"A", text:"Hi! What is your name?" },
      { type:"line", speaker:"B", text:"My name is Mia. Nice to meet you!" },
      { type:"check", q:"What is the girl's name?", options:["Lumi","Mia","Pufi"], answer:1 },
      { type:"line", speaker:"A", text:"What is your favorite color?" },
      { type:"line", speaker:"B", text:"My favorite color is blue. What about you?" },
      { type:"line", speaker:"A", text:"My favorite color is green too!" },
      { type:"listen", audio:"Nice to meet you!", q:"What did you hear?", options:["Nice to meet you!","See you later!","Good night!"], answer:0 },
    ]
  },
  {
    id: "zoo_visit",
    title: "A Day at the Zoo",
    characters: { A:"Lumi 🐲", B:"Dad 👨" },
    gloss: { "zoo":"hayvanat bahçesi", "lion":"aslan", "roar":"kükremek", "scared":"korkmuş", "gentle":"nazik/uysal" },
    steps: [
      { type:"line", speaker:"A", text:"Look, Dad! A big lion!" },
      { type:"line", speaker:"B", text:"Yes! Listen, it can roar very loudly." },
      { type:"check", q:"What animal did they see?", options:["An elephant","A lion","A monkey"], answer:1 },
      { type:"line", speaker:"A", text:"Is it scary?" },
      { type:"line", speaker:"B", text:"Don't worry, it is safe behind the glass. It's actually quite gentle here." },
      { type:"listen", audio:"It can roar very loudly.", q:"What did you hear?", options:["It can roar very loudly.","It can jump very high.","It can swim very fast."], answer:0 },
    ]
  },
  {
    id: "weather_talk",
    title: "What's the Weather Like?",
    characters: { A:"Lumi 🐲", B:"Mom 👩" },
    gloss: { "weather":"hava durumu", "umbrella":"şemsiye", "cloudy":"bulutlu", "rain":"yağmur" },
    steps: [
      { type:"line", speaker:"A", text:"Mom, what is the weather like today?" },
      { type:"line", speaker:"B", text:"It is cloudy, and it might rain later." },
      { type:"check", q:"What is the weather like?", options:["Sunny","Cloudy","Snowy"], answer:1 },
      { type:"line", speaker:"A", text:"Should I bring an umbrella?" },
      { type:"line", speaker:"B", text:"Yes, that's a good idea!" },
      { type:"listen", audio:"It might rain later.", q:"What did you hear?", options:["It might rain later.","It is very hot today.","It is windy outside."], answer:0 },
    ]
  },
  {
    id: "toy_store",
    title: "At the Toy Store",
    characters: { A:"Lumi 🐲", B:"Shopkeeper 🧸" },
    gloss: { "toy":"oyuncak", "price":"fiyat", "expensive":"pahalı", "cheap":"ucuz", "afford":"gücü yetmek" },
    steps: [
      { type:"line", speaker:"A", text:"Excuse me, how much is this toy?" },
      { type:"line", speaker:"B", text:"It is ten dollars." },
      { type:"check", q:"How much does the toy cost?", options:["Five dollars","Ten dollars","Twenty dollars"], answer:1 },
      { type:"line", speaker:"A", text:"That's great, it's not expensive!" },
      { type:"line", speaker:"B", text:"Would you like to buy it?" },
      { type:"line", speaker:"A", text:"Yes, please!" },
      { type:"listen", audio:"How much is this toy?", q:"What did you hear?", options:["How much is this toy?","Where is the toy store?","Do you have a bigger one?"], answer:0 },
    ]
  },
  {
    id: "weekend_plan",
    title: "Planning a Weekend",
    characters: { A:"Lumi 🐲", B:"Mia 🦋" },
    gloss: { "weekend":"hafta sonu", "plan":"plan", "park":"park", "movie":"film", "sounds good":"kulağa hoş geliyor" },
    steps: [
      { type:"line", speaker:"A", text:"What is your plan for the weekend?" },
      { type:"line", speaker:"B", text:"I want to go to the park. Do you want to come?" },
      { type:"check", q:"Where does Mia want to go?", options:["The park","The cinema","The zoo"], answer:0 },
      { type:"line", speaker:"A", text:"Sounds good! Can we also watch a movie later?" },
      { type:"line", speaker:"B", text:"Sure, that's a great idea!" },
      { type:"listen", audio:"Do you want to come?", q:"What did you hear?", options:["Do you want to come?","Where do you live?","What time is it?"], answer:0 },
    ]
  },
  {
    id: "airport_trip",
    title: "At the Airport",
    characters: { A:"Lumi 🐲", B:"Flight Attendant ✈️" },
    gloss: { "airport":"havaalanı", "ticket":"bilet", "gate":"kapı (havaalanı)", "flight":"uçuş", "boarding":"biniş" },
    steps: [
      { type:"line", speaker:"A", text:"Excuse me, where is gate number five?" },
      { type:"line", speaker:"B", text:"It's straight ahead, next to the café." },
      { type:"check", q:"Where is gate five?", options:["Next to the café","Next to the shop","Upstairs"], answer:0 },
      { type:"line", speaker:"A", text:"Thank you! When does boarding start?" },
      { type:"line", speaker:"B", text:"Boarding starts in twenty minutes." },
      { type:"listen", audio:"Boarding starts in twenty minutes.", q:"What did you hear?", options:["Boarding starts in twenty minutes.","The flight is cancelled.","Please show your passport."], answer:0 },
    ]
  },
  {
    id: "directions_help",
    title: "Asking for Directions",
    characters: { A:"Lumi 🐲", B:"Stranger 🧑" },
    gloss: { "library":"kütüphane", "straight":"düz", "left":"sol", "right":"sağ", "corner":"köşe" },
    steps: [
      { type:"line", speaker:"A", text:"Excuse me, how do I get to the library?" },
      { type:"line", speaker:"B", text:"Go straight, then turn left at the corner." },
      { type:"check", q:"Where should you turn left?", options:["At the corner","At the school","At the park"], answer:0 },
      { type:"line", speaker:"A", text:"Thank you so much!" },
      { type:"line", speaker:"B", text:"You're welcome. Have a nice day!" },
      { type:"listen", audio:"Turn left at the corner.", q:"What did you hear?", options:["Turn left at the corner.","Turn right at the light.","Go back the way you came."], answer:0 },
    ]
  },
  {
    id: "museum_trip",
    title: "A Trip to the Museum",
    characters: { A:"Lumi 🐲", B:"Guide 🧑‍🏫" },
    gloss: { "museum":"müze", "painting":"tablo", "history":"tarih", "quiet":"sessiz", "amazing":"harika" },
    steps: [
      { type:"line", speaker:"A", text:"Wow, this painting is amazing!" },
      { type:"line", speaker:"B", text:"Yes, it is very old. It shows an important moment in history." },
      { type:"check", q:"What does the painting show?", options:["A moment in history","A modern city","A cartoon"], answer:0 },
      { type:"line", speaker:"A", text:"Should we be quiet here?" },
      { type:"line", speaker:"B", text:"Yes, please. Other visitors are looking too." },
      { type:"listen", audio:"This painting is amazing!", q:"What did you hear?", options:["This painting is amazing!","This museum is closed.","Let's go home now."], answer:0 },
    ]
  },
  {
    id: "family_dinner",
    title: "Family Dinner",
    characters: { A:"Lumi 🐲", B:"Grandmother 👵" },
    gloss: { "dinner":"akşam yemeği", "delicious":"lezzetli", "table":"masa", "help":"yardım etmek" },
    steps: [
      { type:"line", speaker:"B", text:"Dinner is ready! Can you help me set the table?" },
      { type:"line", speaker:"A", text:"Of course, Grandma! What are we eating?" },
      { type:"check", q:"What did Lumi offer to do?", options:["Set the table","Wash the dishes","Cook the dinner"], answer:0 },
      { type:"line", speaker:"B", text:"We are having soup and bread. It smells delicious!" },
      { type:"line", speaker:"A", text:"I can't wait to try it!" },
      { type:"listen", audio:"It smells delicious!", q:"What did you hear?", options:["It smells delicious!","It looks very cold.","It tastes too salty."], answer:0 },
    ]
  },
];


// Basit satranç bulmacaları — tam kurallı motor yerine, her bulmacanın
// doğru "başlangıç" ve "hedef" karesi tanımlıdır.
const CHESS_PUZZLES = [
  { id:1, tag:"Çatal (Fork)", desc:"Beyaz atı ile hem şahı hem veziri aynı anda tehdit edebilir. Atı doğru kareye sürükle!",
    board: ["........","........","..k.....","........","..N.....","........","...K....","........"],
    from:"c4", to:"e5", explain:"At e5 karesine gidince hem şahı hem de diğer taşı çatallar!" },
  { id:2, tag:"Çatal (Fork)", desc:"At, iki taşı birden tehdit edecek kareye gitmeli.",
    board: ["........","..q.....","........","....N...","........","..k.....","........","........"],
    from:"e5", to:"d7", explain:"At d7 karesinden hem vezire hem şaha yakın bir çatal kurar." },
  { id:3, tag:"Açmaz (Pin)", desc:"Fil, rakip taşı şahın önünde açmaza alacak kareye gitmeli.",
    board: ["....k...","........","........","........","..B.....","........","........","....K..."],
    from:"c4", to:"f7", explain:"Fil, şahla aynı çizgideki taşı hareket edemez hale getirir — buna açmaz denir." },
  { id:4, tag:"Açmaz (Pin)", desc:"Kale, şah ile aynı sütuna girerek açmaz kurabilir.",
    board: ["...k....","........","........","........","...R....","........","........","...K...."],
    from:"d4", to:"d6", explain:"Kale aynı sütuna girince şahın önündeki taş kilitlenir." },
  { id:5, tag:"Şiş (Skewer)", desc:"Kale, değerli bir taşı öne çıkarıp arkasındakini de tehdit eder.",
    board: ["........","...k....","........","...R....","........","........","........","...K...."],
    from:"d5", to:"d6", explain:"Kale ilerleyip şahı ve arkasındaki taşı sırayla tehdit eder — şiş taktiği!" },
  { id:6, tag:"Şiş (Skewer)", desc:"Fil, çapraz çizgide iki taşı şişe geçirecek kareye gitmeli.",
    board: [".....k..","........","........",".B......","........","........","........","....K..."],
    from:"b5", to:"d7", explain:"Fil çaprazda ilerleyip arkadaki taşı da tehdit eder." },
  { id:7, tag:"Şah Mat", desc:"Bir hamlede şah matı bul! Vezirini doğru kareye sürükle.",
    board: ["...k....","........","........","........","........","........","...Q....","...K...."],
    from:"d2", to:"d7", explain:"Vezir d7'ye gidince şah, kralın yanındaki kaleyle desteklenip mat olur." },
  { id:8, tag:"Şah Mat", desc:"Kale ile bir hamlede şah matı bul.",
    board: ["k.......","........","........","........","........","........","........","R..K...."],
    from:"a1", to:"a8", explain:"Kale a sütununda ilerleyip şahı köşede mat eder." },
  { id:9, tag:"Çatal (Fork)", desc:"At iki taşı birden tehdit edecek kareye gitmeli.",
    board: [".....k..","........","...q....","........",".....N..","........","........","....K..."],
    from:"f4", to:"d5", explain:"At d5'e gidince hem şahı hem veziri çatallar!" },
  { id:10, tag:"Çatal (Fork)", desc:"At rakip taşları çatallayacak kareyi bulmalı.",
    board: ["........","...k....","........","........","..N.....","........","..q.....","...K...."],
    from:"c4", to:"b6", explain:"At b6'ya sıçrayınca hem şah hem vezir tehdit altında kalır." },
  { id:11, tag:"Açmaz (Pin)", desc:"Fil rakip taşı şaha karşı açmaza alacak kareye gitmeli.",
    board: [".....k..","........","........","........","...B....","........","........","......K."],
    from:"d4", to:"g7", explain:"Fil çaprazda ilerleyip şahın önündeki taşı açmaza alır." },
  { id:12, tag:"Açmaz (Pin)", desc:"Kale şahla aynı satıra girerek açmaz kurmalı.",
    board: ["........","........","....k...","........","R.......","........","........","....K..."],
    from:"a4", to:"a6", explain:"Kale aynı satıra girince şahın önündeki taş kilitlenir." },
  { id:13, tag:"Şiş (Skewer)", desc:"Kale ilerleyip iki taşı sırayla tehdit etmeli.",
    board: ["...k....","........","...q....","........","........","........","...R....","...K...."],
    from:"d2", to:"d5", explain:"Kale ilerleyince önce şahı, o kaçınca arkadaki veziri tehdit eder." },
  { id:14, tag:"Şiş (Skewer)", desc:"Fil çaprazda iki taşı şişe geçirmeli.",
    board: [".......k","........","......q.","........","...B....","........","........","....K..."],
    from:"d4", to:"g7", explain:"Fil çaprazda ilerleyip şahı ve vezirini sırayla tehdit eder." },
  { id:15, tag:"Şah Mat", desc:"Vezir ile bir hamlede şah matı bul.",
    board: ["k.......","........","........","........","........","........","Q.......","..K....."],
    from:"a2", to:"a7", explain:"Vezir a7'ye gidince şah köşede mat olur." },
  { id:16, tag:"Şah Mat", desc:"Kale ile bir hamlede şah matı bul.",
    board: [".......k","........","........","........","........","........","........","R......K"],
    from:"a1", to:"a8", explain:"Kale sütun boyunca ilerleyip şahı kenarda mat eder." }
];

// Satrançta hamle öğretici kartlar — her taşın nasıl hareket ettiğini
// gösteren basit ve görsel bir rehber.
const CHESS_TUTORIAL = [
  { piece:"Piyon (Pawn)", symbol:"♙", desc:"Piyon düz ileri bir kare gider (ilk hamlede iki kare gidebilir). Karşı taşı almak için çapraz ilerler." },
  { piece:"Kale (Rook)", symbol:"♖", desc:"Kale düz çizgide, yatay veya dikey olarak istediği kadar kare gidebilir." },
  { piece:"At (Knight)", symbol:"♘", desc:"At 'L' şeklinde hareket eder: iki kare bir yöne, sonra bir kare dik açıyla. Taşların üzerinden atlayabilir." },
  { piece:"Fil (Bishop)", symbol:"♗", desc:"Fil çapraz çizgide istediği kadar kare gidebilir, ama her zaman aynı renk karede kalır." },
  { piece:"Vezir (Queen)", symbol:"♕", desc:"Vezir en güçlü taştır: düz veya çapraz her yöne istediği kadar kare gidebilir." },
  { piece:"Şah (King)", symbol:"♔", desc:"Şah her yöne sadece bir kare gidebilir. Şah tehdit altındaysa (şah çekilmişse) kurtarılmalıdır — kurtarılamazsa şah mat olur." }
];

// Boşluk doldurma / cümle tamamlama oyunu için cümleler
const BLANK_SENTENCES = [
  { sentence:"I ___ a red apple.", answer:"have", options:["have","is","are"], tr:"Kırmızı bir elmam var." },
  { sentence:"She ___ to school every day.", answer:"goes", options:["goes","go","going"], tr:"O her gün okula gider." },
  { sentence:"The cat is ___ the table.", answer:"under", options:["under","up","open"], tr:"Kedi masanın altında." },
  { sentence:"We ___ happy today.", answer:"are", options:["are","is","am"], tr:"Bugün mutluyuz." },
  { sentence:"He can ___ very fast.", answer:"run", options:["run","runs","running"], tr:"O çok hızlı koşabilir." },
  { sentence:"This is ___ favorite color.", answer:"my", options:["my","me","I"], tr:"Bu benim favori rengim." },
  { sentence:"They ___ playing in the park.", answer:"are", options:["are","is","be"], tr:"Onlar parkta oynuyorlar." },
  { sentence:"I like to ___ books.", answer:"read", options:["read","reads","reading"], tr:"Kitap okumayı severim." },
  { sentence:"The sun is very ___ today.", answer:"bright", options:["bright","dark","cold"], tr:"Bugün güneş çok parlak." },
  { sentence:"My mother ___ a doctor.", answer:"is", options:["is","are","am"], tr:"Annem bir doktor." },
  { sentence:"We should ___ our teeth every day.", answer:"brush", options:["brush","eat","wash"], tr:"Her gün dişlerimizi fırçalamalıyız." },
  { sentence:"Please ___ the door.", answer:"close", options:["close","closed","closing"], tr:"Lütfen kapıyı kapat." },
];

const USER_CREDENTIALS = { TALHA:"54321", ZEYNEP:"190344" };

const BADGES = [
  { id:"first_lesson", name:"İlk Adım", desc:"İlk dersini tamamladın!", cond:(s)=>s.lessonsDone.length>=1 },
  { id:"ten_lessons", name:"Kelime Kâşifi", desc:"10 ders tamamladın!", cond:(s)=>s.lessonsDone.length>=10 },
  { id:"fifty_lessons", name:"Kelime Ustası", desc:"50 ders tamamladın!", cond:(s)=>s.lessonsDone.length>=50 },
  { id:"hundred_lessons", name:"Dil Kahramanı", desc:"100 ders tamamladın!", cond:(s)=>s.lessonsDone.length>=100 },
  { id:"all_lessons", name:"Dil Ustası", desc:"Tüm dersleri tamamladın!", cond:(s)=>s.lessonsDone.length>=LESSONS.length },
  { id:"first_story", name:"Hikâye Kâşifi", desc:"İlk hikâyeni okudun!", cond:(s)=>s.storiesDone.length>=1 },
  { id:"all_stories", name:"Usta Anlatıcı", desc:"Tüm hikâyeleri tamamladın!", cond:(s)=>s.storiesDone.length>=(STORIES.length+DIALOGUE_STORIES.length) },
  { id:"dialogue_master", name:"Diyalog Ustası", desc:"Tüm diyalog hikâyelerini tamamladın!", cond:(s)=>DIALOGUE_STORIES.every(ds=>s.storiesDone.includes(ds.id)) },
  { id:"first_chess", name:"Satranç Çırağı", desc:"İlk satranç bulmacanı çözdün!", cond:(s)=>s.chessDone.length>=1 },
  { id:"chess_master", name:"Satranç Ustası", desc:"Tüm satranç bulmacalarını çözdün!", cond:(s)=>s.chessDone.length>=CHESS_PUZZLES.length },
  { id:"beat_lumi", name:"Lumi'yi Yendin!", desc:"Lumi'ye karşı ilk maçını kazandın!", cond:(s)=>(s.lumiWins||0)>=1 },
  { id:"beat_lumi_5", name:"Satranç Şampiyonu", desc:"Lumi'ye karşı 5 maç kazandın!", cond:(s)=>(s.lumiWins||0)>=5 },
  { id:"hundred_diamonds", name:"Elmas Avcısı", desc:"100 elmasa ulaştın!", cond:(s)=>s.diamonds>=100 },
  { id:"level5", name:"Yükselen Yıldız", desc:"Seviye 5'e ulaştın!", cond:(s)=>levelFromXP(s.xp)>=5 },
  { id:"level10", name:"Parlayan Yıldız", desc:"Seviye 10'a ulaştın!", cond:(s)=>levelFromXP(s.xp)>=10 },
  { id:"gamer", name:"Oyun Sever", desc:"5 oyun tamamladın!", cond:(s)=>s.gamesDone>=5 },
  { id:"chest_collector", name:"Sandık Avcısı", desc:"5 sandık açtın!", cond:(s)=>(s.chestInventory||[]).filter(c=>c.opened).length>=5 },
];

const LUMI_COSTUMES = ["Klasik Lumi","Uzaylı Lumi","Şövalye Lumi","Ressam Lumi","Kaşif Lumi"];
const AVATAR_FRAMES = ["Basit Çerçeve","Altın Çerçeve","Yıldızlı Çerçeve","Ejderha Çerçeve","Gökkuşağı Çerçeve"];
const PET_DRAGONS = ["Pufi (Yeşil)","Ateş (Kırmızı)","Bulut (Mavi)","Işık (Sarı)"];

function levelFromXP(xp){ return Math.floor(xp/100)+1; }
