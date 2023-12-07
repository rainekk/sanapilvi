/*  Funktio päivittää sanapilven parametrin "button" perusteella.
    Jos parametri on
        - "add", lisätään sana sanapilveen, ja
        - "clear", tyhjennetään sanapilvi.
    Muutoin, eli kun parametria ei ole annettu,
        - laitetaan sanapilven sisällöksi oletussanat.

    Sanapilven sisältö perustuu listaan, eli päivitykset muuttavat
    listan "words" sisältöä. Sanalistaa pidetään sessionStoragessa,
    eli se säilyy tässä esimerkissä vain session ajan ja tyhjenee
    esimerkiksi käyttökertojen välissä (kun selain suljetaan).

    Itse sanapilven rakentamiseen käytetään wordcloud2-kirjastoa.
*/
function updateCloud(button) {
    const defaultWords =
        [
            /*
            ["nörtti", 6], ["kotikokki", 7], ["vilkas", 3], ["junantuoma", 6],
            ["soittaja", 2], ["urheilija", 6], ["yökyöpeli", 10], ["kuuntelija", 4],
            ["hiljainen", 6], ["ajattelija", 10], ["ahkera", 9], ["idealisti", 1],
            ["käytännöllinen", 4], ["huithapeli", 1], ["autoilija", 5], ["korjaaja", 4],
            ["kuvittaja", 1], ["täsmällinen", 5], ["itsenäinen", 3], ["somettaja", 1],
            ["ujo", 1], ["vilijonkka", 1], ["liikkuva", 1], ["ajoissa saapuva", 1],
            ["avuton", 1], ["vaeltaja", 1], ["yksityinen", 1], ["laulaja", 1],
            ["muusikko", 1], ["ikiliikkuja", 1], ["rauhallinen", 1], ["rento", 1],
            ["vilukissa", 1]
            */
            ["nörtti", 35], ["kotikokki", 50], ["vilkas", 20], ["junantuoma", 35],
            ["soittaja", 15], ["urheilija", 35], ["yökyöpeli", 55], ["kuuntelija", 25],
            ["hiljainen", 35], ["ajattelija", 55], ["ahkera", 50], ["idealisti", 10],
            ["käytännöllinen", 25], ["huithapeli", 10], ["autoilija", 30], ["korjaaja", 25],
            ["kuvittaja", 10], ["täsmällinen", 30], ["itsenäinen", 20], ["somettaja", 10],
            ["ujo", 10], ["vilijonkka", 10], ["liikkuva", 10], ["ajoissa saapuva", 10],
            ["avuton", 10], ["vaeltaja", 10], ["yksityinen", 10], ["laulaja", 10],
            ["muusikko", 10], ["ikiliikkuja", 10], ["rauhallinen", 10], ["rento", 10],
            ["vilukissa", 10]
        ];
    let words = [];

    // Sanalista päivitetään if-else if-else -rakenteessa
    if (button == "add") {
        newWord = [document.getElementById("word").value,
            document.getElementById("weight").value];
        words = sessionStorage.getItem("words");
        if (words == null) {
            words = [newWord];
        } else {
            words = JSON.parse(words);
            words.push(newWord);
        }
        sessionStorage.setItem("words", JSON.stringify(words));
    } else if (button == "clear") {
        words = [];
        sessionStorage.removeItem("words");
    } else {
        words = defaultWords;
        sessionStorage.setItem("words", JSON.stringify(words));
    }

    // Sanapilvi rakennetaan wordcloud2-kirjastoa käyttäen
    WordCloud(document.getElementById("canvas"),
        { list: words } );
}