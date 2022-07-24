// ###########################################################################

/**
 * ===========================================================================
 *      #x : fetch the steam data
 * ---------------------------------------------------------------------------
 *
 * Récupération de la liste des jeux d'un utilisateur Steam donné
 *
 * ===========================================================================
 */

function fetchGamesPlatforms() {
    // on récup le json de 'Shinzitay' directement depuis Steam via API
    // voir la doc ci-dessus pour le détail de l'URL suivante
    // let url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=27CD303AE57ABA07B62CBF1EE9DC4B4E&steamid=76561198024999321&format=json&include_appinfo=true&include_played_free_games=true";
    // fetch(url)

    // test avec un json local
    fetch("local-test.json")
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

            // on récupère la liste des jeux
            let gamesList = data.response.games;
            // on crée un compteur de jeux = à la longueur de la liste de jeux reçue précédemment
            let gamesCounter = gamesList.length;
            // puis on affiche le nb de jeux dans le <input> HTML 'games_counter'
            gamesCounterElement.textContent = gamesCounter;
            // la liste de jeux retournée n'est pas classée par ordre alphabétique (mais par ID de jeu) ...
            // ... on prépare donc un tableau qu'on va remplir avec la liste des jeux puis la classer par ordre alphabétique
            let gamesListArray = [];
            // on récup la liste des jeux et on la push dans le tableau 'gamesListArray' pour le classer par ordre alphhabétique
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
                individualGame.className = "individual_game";
                document.getElementById("steam_games_list").appendChild(individualGame);
            });
        })
        .catch(function (err) {
            console.log("Oups ! Nom d'une bistoukette ! ", err);
        });
}

// ###########################################################################

// ###########################################################################

/**
 * ===========================================================================
 *      #x : checking the search bar
 * ---------------------------------------------------------------------------
 *
 * Fonction qui permet la mise à jour de la liste des jeux en fonction
 * des caractères tapés dans la barre de recherche.
 *
 * Au lieu d'utiliser un eventlistener, on utilise la propriété 'onkeyup'
 * directement dans le <input> HTML.
 *
 * ===========================================================================
 */

function checkSearchBar() {
    // on crée un second compteur qui s'incrémentera avec le nb de jeu(x) affiché(s) ...
    // ... au fur et à mesure des caractères entrés
    let updatedGamesCounter = 0;
    // on récupère la valeur du caractère entré
    let searchString = searchBarElement.value;
    // on passe tout en minuscule
    searchString = searchString.toLowerCase();
    // on boucle sur la liste des jeux pour comparer les caractères entrés avec le nom des jeux
    for (i = 0; i < individualGameList.length; i++) {
        if (!individualGameList[i].innerHTML.toLowerCase().includes(searchString)) {
            // quand on ne trouve pas de correspondance, on ajoute un "display = none" au <li> du jeu en question
            individualGameList[i].style.display = "none";
        } else {
            // sinon on ajoute un "display = list-item" au <li> du jeu en question
            individualGameList[i].style.display = "list-item";
            // et on incrémente le second compteur (= le nb de jeu(x) correspondant(s) à la recherche)
            updatedGamesCounter++;
        }
    }
    // puis on met à jour le compteur de jeux correspondants
    console.log(updatedGamesCounter);
    matchingGamesCounterElement.textContent = updatedGamesCounter;
    // puis on met à jour le compteur de chaque liste séparément
    gamesPlatforms.forEach((platform) => {
        let platformListGamesCounter = document.getElementById(platform + "_list_games_counter");
        platformListGamesCounter.textContent = updatedGamesCounter;
    });
}

// ###########################################################################
