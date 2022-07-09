/**
 * ===========================================================================
 * JAM STEAM GAMES RECUPERATOR
 * ---------------------------------------------------------------------------
 *
 * Récupération de la liste des jeux d'un utilisateur Steam
 *
 * ===========================================================================
 */

// test avec un json local
// fetch("test.json")
// on récup le json de 'Shinzitay' directement depuis Steam via API
let url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=27CD303AE57ABA07B62CBF1EE9DC4B4E&steamid=76561198024999321&format=json&include_appinfo=true&include_played_free_games=true";
fetch(url)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log("Shit happens !!");
        }
    })
    .then(function (data) {
        // verif des données recup :
        // console.log(data);
        // console.log(data.response.games);
        // console.log(data.response.games[0].name);
        let gamesList = data.response.games;
        // la liste de jeux retournée n'est pas classée par ordre alphabétique (mais par ID de jeu) ...
        // ... on prépare donc un tableau qu'on va remplir avec la liste des jeux puis la classer par ordre alphabétique
        let gamesListArray = [];
        for (let i = 0; i < gamesList.length; i++) {
            gamesListArray.push(gamesList[i].name);
        }
        gamesListArray.sort();
        // on verif le tableau trié
        // console.log(gamesListArray);
        // puis pour chaque jeu, on crée un 'li' qu'on rajoutera au 'ul' existant
        gamesListArray.forEach((gameName) => {
            let individualGame;
            individualGame = document.createElement("li");
            individualGame.textContent = gameName;
            document.getElementById("game_list").appendChild(individualGame);
        });
    })
    .catch(function (err) {
        console.log("Oups ! Nom d'une bistoukette !", err);
    });
