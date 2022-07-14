/**
 * ===========================================================================
 *      STEAM GAMES LIST FETCHER
 * ---------------------------------------------------------------------------
 *
 * Récupération de la liste des jeux d'un utilisateur Steam
 *
 * Informations concernant l'URL pour récupérer le json de la liste de jeux :
 *
 *      A. Prérequis :
 *          1. l'utilisateur doit connaitre son Steam ID —> https://store.steampowered.com/account/
 *          2. l'utilisateur doit avoir une clé d'authentification Steam —> https://steamcommunity.com/dev/apikey
 *          3. le profil de l'utilisateur doit être public —> https://steamcommunity.com/id/<steam_user>/edit/settings?snr=
 *
 *      B. API Steam
 *          1. Fonctionnement général —> https://partner.steamgames.com/doc/webapi_overview?l=french#2
 *              => https://api.steampowered.com/<interface>/<method>/v<version>/
 *          2. <interface> pour interagir avec un utilisateur Steam = " IPlayerService " —> https://partner.steamgames.com/doc/webapi/IPlayerService
 *          3. <method> pour récupérer la liste des jeux possédés par l'utilisateur = " GetOwnedGames " —> https://partner.steamgames.com/doc/webapi/IPlayerService#GetOwnedGames
 *          4. Paramètres obligatoires :
 *              1. " key " : clé d'authentification Steam
 *              2. " steamid " : le steam ID de l'utilisateur concerné
 *          5. Paramètres optionnels :
 *              1. " include_appinfo " : récupérer les infos de chaque jeu (sinon ne récupère que l'appid du jeu = son numéro dans le store Steam)
 *              2. " include_played_free_games " : inclure les jeux gratuits (qui sont retirés de cette liste par défaut, comme « Team Fortress 2 » par exemple)
 *          6. URL finale :
 *              => https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=27CD303AE57ABA07B62CBF1EE9DC4B4E&steamid=76561198024999321&format=json&include_appinfo=true&include_played_free_games=true
 *
 * ===========================================================================
 */

// définition des constantes et variables communes
const gamesCounterElement = document.getElementById("steam_games_counter");
const searchBar = document.getElementById("search_bar");
const individualGameList = document.getElementsByClassName("individual_game");
let gamesCounter = 0;

/**
 * ===========================================================================
 *      #1 : fetch the steam data
 * ---------------------------------------------------------------------------
 *
 * Récupération de la liste des jeux d'un utilisateur Steam donné
 *
 * ===========================================================================
 */

// on récup le json de 'Shinzitay' directement depuis Steam via API
// voir la doc ci-dessus pour le détail de l'URL suivante
// let url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=27CD303AE57ABA07B62CBF1EE9DC4B4E&steamid=76561198024999321&format=json&include_appinfo=true&include_played_free_games=true";
// fetch(url)

// test avec un json local 'test.json'
fetch("test.json")
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
        gamesCounter = gamesList.length;
        // puis on affiche le nb de jeux dans le <input> HTML 'games_counter'
        gamesCounterElement.value = gamesCounter;
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

// ===========================================================================
// ===========================================================================
// ===========================================================================

/**
 * ===========================================================================
 *      #2 : check the search bar
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

function searchBarCheck() {
    // on crée un second compteur qui s'incrémentera avec le nb de jeu(x) affiché(s) ...
    // ... au fur et à mesure des caractères entrés
    let updatedGamesCounter = 0;
    // on récupère la valeur du caractère entré
    let searchString = searchBar.value;
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
            // et on incrémente le second compteur ( = le nb de jeu(x) correspondant(s) à la recherche )
            updatedGamesCounter++;
        }
    }
    // puis on affiche le compteur mis à jour
    // console.log(updatedGamesCounter);
    gamesCounterElement.value = updatedGamesCounter;
}

// ===========================================================================
// ===========================================================================
// ===========================================================================

/**
 * ===========================================================================
 *      #2 : reset the search bar
 * ---------------------------------------------------------------------------
 *
 * Fonction qui vide les caractères de la barre de recherche,
 * remet le compteur de jeux au nb d'origine et réactualise la liste
 *
 * ===========================================================================
 */

function resetSearchBar() {
    // on vide la barre de recherche
    searchBar.value = "";
    // on reprend la valeur du compteur d'origine ( = liste complète )
    gamesCounterElement.value = gamesCounter;
    // on réactualise la liste de jeux
    searchBarCheck();
}
