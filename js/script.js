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
        $.ajax(
            {
                url: "https://api.themoviedb.org/3/search/movie",
                method: "GET",
                data:{
                    api_key: "fc7c0e02622e256aa5848719a009286b",
                    query: valore,
                    language: "it-IT",
                },
                success: function (risposta) {
                    $(".lista-film").empty();
                    var results = risposta.results;
                    console.log(results);
                    var source = $('#entry-template').html();
 	                var template = Handlebars.compile(source);
                    for (var i = 0; i < results.length; i++) {
                        var film = results[i];
                        var context = {
                            title: film.title,
                            title: film.original_title,
                            language: film.original_language,
                            vote: film.vote_average
                        };
                        var html = template(context);
                        $(".lista-film").append(html);
                    }
                }

            }
        )
    })

})
