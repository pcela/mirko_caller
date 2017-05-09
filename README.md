# mirko_caller

##Opis skryptu

Skrypt powstał na potrzeby tagu #randomanimeshit na serwisie Wykop.pl, po to aby ułatwić wołanie ludzi do wpisów z wybranymi przez nich tagami.
Jego instalacja spowoduje wyświetlanie się przycisku "mirko caller" na formularzu do tworzenia/edycji wpisu na mikroblogu (obok ikonki aparatu używanej do dodawania obrazków/filmów do wpisu).
Po kliknięciu przycisku we wpisie zostaną znalezione wszystkie użyte tagi, a następnie na ich podstawie zostanie na końcu doklejona lista wołanych użytkowników.

Dane odnośnie wołania są pobierane na bieżąco z lokalizacji:

[Arkusz mirko caller](https://docs.google.com/spreadsheets/d/1pJOE-61smYpsabKIQBLJdsrGr2bZa4-8tPINtv1EfQQ/pubhtml)

##Instalacja

Aby móc korzystać ze skryptu, wymagany jest dodatek w przeglądarce pozwalający na instalację skryptów użytkownika. Przykładowo dla przeglądarki Firefox jest to [Greasemonkey](https://addons.mozilla.org/pl/firefox/addon/greasemonkey/), a dla Chrome [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo).
Skrypt można pobrać z następującej lokalizacji:

[Pobieranie skryptu](https://raw.githubusercontent.com/toussaint1/mirko_caller/master/Mirko_caller.user.js)

##Changelog

###v. 1.05 (09.05.2017)
- dostosowanie skryptu po wprowadzeniu https na wykopie

###v. 1.04 (23.08.2016)
- poprawienie błędu powodującego brak przycisku przy edycji komentarza

###v. 1.03 (21.08.2016)
- dodano sprawdzanie aktualnie zalogowanego użytkownika i ignorowanie go przy wołaniu (nie wołaj siebie)

###v. 1.02 (20.08.2016)
- wprowadzono animację ładowania listy użytkowników

###v. 1.01 (20.08.2016)
- dodano obsługę dla strony "Mój wykop"

###v. 1.00 (18.08.2016)
- pierwsza wersja skryptu
