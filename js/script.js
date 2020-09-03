// https://api.themoviedb.org/3/search/movie?api_key=fc7c0e02622e256aa5848719a009286b&query=matrix&language=it-IT

// "results": [
//         {
//             "popularity": 50.295,
//             "vote_count": 17663,
//             "video": false,
//             "poster_path": "/jcD6c5vCv5Y5hjneYfjpi7LjKWL.jpg",
//             "id": 603,
//             "adult": false,
//             "backdrop_path": "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
//             "original_language": "en",
//             "original_title": "The Matrix",
//             "genre_ids": [
//                 28,
//                 878
//             ],
//             "title": "Matrix",
//             "vote_average": 8.1,
//             "overview": "Seguendo un tatuaggio sulla spalla di una ragazza, l'hacker Neo scopre che la cosiddetta \"realtà\" è solo un impulso elettrico fornito al cervello degli umani da un'intelligenza artificiale. Per sopravvivere alla catastrofe l'umanità ha infatti avuto bisogno delle macchine, ma queste hanno vinto e necessitano degli uomini come fonte di energia. L'illusione in cui li fanno vivere è quindi finalizzata a \"coltivarli\" meglio. Nessuno è a conoscenza del tempo che è passato da quando il neurosimulatore ha assegnato una data fittizia al tempo. Solo Neo, con l'aiuto del pirata informatico Morpheus e della bella Trinity, può tentare di scoprire la verità, ma non sarà un'impresa facile.",
//             "release_date": "1999-03-30"
//         },

$(document).ready(function () {

    $(".click").click(function () {

            var valore = $(".ricerca").val();
            trovaFilm(valore);
            reset();

    })

})

// FUNZIONI

function trovaFilm(data) {
    $.ajax(
        {
            url: "https://api.themoviedb.org/3/search/movie",
            method: "GET",
            data:{
                api_key: "fc7c0e02622e256aa5848719a009286b",  //parametro obbligatorio
                query: data,                                  //parametro obbligatorio. Importante ai fini dell'esercizio in quanto sostituisco il valore con quello scri
                language: "it-IT"                             //parametro necessario per la consegna
            },
            success: function (risposta) {
                if (risposta.total_results > 0) {
                    printFilm(risposta.results);
                } else {                    
                    noResults(data);
                }
            },
            error: function () {
                // alert("E' avvenuto un errore");
            }

        }
    )
}

function printFilm(data) {
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
        var film = data[i];  //salvo in una variabile l' oggetto trovato ogni ciclo
        var context = {         //utilizzo le chiavi/valore che mi servono per compilare il template HB
            title: film.title,  //la chiave è il segnaposto di HB il valore è riferito all'oggetto
            or_title: film.original_title,
            language: film.original_language,
            vote: stars(film.vote_average)
        };
        var html = template(context);
        $(".lista-film").append(html);
    }
}

function stars(num) {
    var arr = Math.ceil(num / 2); //arrotondo per eccesso la metà del voto
    var star = "";
    for (var i = 0; i < 5; i++) { //inserisco 5 stelle col ciclo
        if (i < arr) {  //mentre cicla, se "i" è minore del risultato dell'arrotondamento mette una stella piena
            star += '<i class="fas fa-star"></i>';
        } else {        //mentre cicla, se "i" è maggiore del risultato dell'arrotondamento mette una stella vuota
            star += '<i class="far fa-star"></i>';
        }
    }
    return star;
}

function reset() {
    $(".lista-film").empty();
    $(".ricerca").val("");
}

function noResults(val) {
    var source = $('#nullo-template').html();
    var template = Handlebars.compile(source);
    var context = {
        not_found: val
    };
    var html = template(context);
    $(".lista-film").append(html);
}
