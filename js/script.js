// https://api.themoviedb.org/3/search/movie?api_key=fc7c0e02622e256aa5848719a009286b&query=matrix&language=it-IT

// https://api.themoviedb.org/3/search/tv          serie


$(document).ready(function () {



    $(".click").click(function () {
        var valore = $(".ricerca").val();
        reset();
        trova(valore,"https://api.themoviedb.org/3/search/movie", "Film" );
        trova(valore, "https://api.themoviedb.org/3/search/tv", "Serie");

    });

    $(".ricerca").keydown(function(){
        if ( event.which == 13 || event.keycode == 13){
            var valore = $(".ricerca").val();
            reset();
            trova(valore,"https://api.themoviedb.org/3/search/movie", "Film" );
            trova(valore, "https://api.themoviedb.org/3/search/tv", "Serie");

        }
    });
});

// FUNZIONI

function trova(data, url, tipo) {
    $.ajax(
        {
            url: url,
            method: "GET",
            data:{
                api_key: "fc7c0e02622e256aa5848719a009286b",  //parametro obbligatorio
                query: data,                                  //parametro obbligatorio. Importante ai fini dell'esercizio in quanto sostituisco il valore con quello scri
                language: "it-IT"                             //parametro necessario per la consegna
            },
            success: function (risposta) {
                if (risposta.total_results > 0) {

                    print(risposta.results, tipo);
                } else {
                    noResults(data);
                }
                console.log(risposta.results);
            },
            error: function () {
                // alert("E' avvenuto un errore");
            }

        }
    )
}

function print(data, tipo) {
    var source = $('#entry-template').html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < data.length; i++) {
        var film = data[i];  //salvo in una variabile l' oggetto trovato ogni ciclo
        var context = {         //utilizzo le chiavi/valore che mi servono per compilare il template HB
            title: film.title ||  film.name, //la chiave è il segnaposto di HB il valore è riferito all'oggetto
            or_title: film.original_title || film.original_name,
            language: flag(film.original_language),
            vote: stars(film.vote_average),
            tipo: tipo
        };
        var html = template(context);
        $(".lista-film").append(html);
    }
}

// function trovaSerie(data) {
//     $.ajax(
//         {
//             url: "https://api.themoviedb.org/3/search/tv",
//             method: "GET",
//             data:{
//                 api_key: "fc7c0e02622e256aa5848719a009286b",  //parametro obbligatorio
//                 query: data,                                  //parametro obbligatorio. Importante ai fini dell'esercizio in quanto sostituisco il valore con quello scri
//                 language: "it-IT"                             //parametro necessario per la consegna
//             },
//             success: function (risposta) {
//                 if (risposta.total_results > 0) {
//                     printSerie(risposta.results);
//                 } else {
//                     noResults(data);
//                 }
//             },
//             error: function () {
//                 // alert("E' avvenuto un errore");
//             }
//
//         }
//     )
// }
//
// function printSerie(data) {
//     var source = $('#entry-template').html();
//     var template = Handlebars.compile(source);
//     for (var i = 0; i < data.length; i++) {
//         var film = data[i];  //salvo in una variabile l' oggetto trovato ogni ciclo
//         var context = {         //utilizzo le chiavi/valore che mi servono per compilare il template HB
//             title: film.name,  //la chiave è il segnaposto di HB il valore è riferito all'oggetto
//             or_title: film.original_name,
//             language: flag(film.original_language),
//             vote: stars(film.vote_average),
//             tipo: "Serie"
//         };
//         var html = template(context);
//         $(".lista-film").append(html);
//     }
// }

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
    return star; // deve ritornare ciò che ho costruito nelle righe precedenti della funzione
}

function flag(lingua) {
    var bandiere = [
        "en",
        "it"
    ];
    if (bandiere.includes(lingua)) {
        var flag = '<img class="flag" src="'+ "img/" + lingua + ".png" + '" alt="' + lingua + '">';
        return flag;
    }
    return lingua;
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
    $(".lista-film").html(html);
}
