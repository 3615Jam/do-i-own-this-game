// ###########################################################################

/**
 * ===========================================================================
 *      #0 : définition des constantes et variables communes
 * ===========================================================================
 */

// liste des plateformes dispo
const platformsList = ["Amazon", "Blizzard", "Epic", "GOG", "HumbleBundle", "IndieGala", "Origin", "Steam", "Ubisoft"];

// récupération de la search bar
const searchBarElement = document.getElementById("search_bar");
// récupération du compteur global du nombre de jeux
const globalTotalCounterElement = document.getElementById("global_total_counter");
// récupération du compteur de jeux correspondants à la recherche
const globalMatchingCounterElement = document.getElementById("global_matching_counter");

// définition des compteurs de jeux (total et correspondants à la recherche)
let globalTotalCounter = 0;
let globalMatchingCounter = 0;

// récupération de la liste de chaque jeu de chaque plateforme
const individualGameList = document.getElementsByClassName("individual_game");

// récupération de la liste des <input type="checkbox"> de chaque plateforme
// const platformElements = document.getElementsByClassName("platform");
// récupération de la liste des compteurs de jeux de chaque plateforme
// const gamesCounterElement = document.getElementsByClassName("games_counter");

// ###########################################################################

/**
 * ===========================================================================
 *      #1 : Building the platform selectors list + games lists
 * ---------------------------------------------------------------------------
 *
 * ℹ️ Mise en forme via BootStrap 5.1
 *
 * Pour chaque plateforme de jeux dispo qu'on récupère du tableau 'platformsList' (défini ci-dessus),
 * on crée un ensemble 'checkbox' (=  une <div> qui contient un <input> + <label>),
 * ainsi qu'une liste de jeux (= <section> de type 'accordion' BootStrap).
 *
 * ===========================================================================
 */

platformsList.forEach((platform) => {
    // sélecteurs de plateformes
    // let htmlPlatformSelector = '<div id="' + platform + '_checkbox_container" class="form-check"><input type="checkbox" class="form-check-input platform" id="' + platform + '_checkbox" checked /><label class="form-check-label" for="' + platform + '_checkbox">' + platform + ' (<span id="' + platform + '_checkbox_games_counter" class="checkbox_games_counter">0</span>)</label></div>';
    // document.getElementById("platform_selector").innerHTML += htmlPlatformSelector;

    // ----------[ ACCORDION STYLE ]----------
    let htmlGamesList = "<!-- ----------[ " + platform + ' section ]---------- --><div id="' + platform + '_section" class="accordion-item"><h3 class="accordion-header"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#' + platform + '_list" aria-expanded="true" aria-controls="' + platform + '_list"><div class="row my_row"><div class="col-8">' + platform + ' (<span id="' + platform + '_total_counter" class="">0</span>)</div><div class="col-2 text-center"><span id="' + platform + '_matching_counter" class="badge rounded-pill bg-dark mx-3">0</span></div></div></button></h3><div id="' + platform + '_list" class="accordion-collapse collapse multi-collapse show" aria-labelledby="' + platform + '_section"><div class="accordion-body my-accordion-body"><ul id="' + platform + '_games_list"></ul></div></div></div>';
    document.getElementById("all_platforms").innerHTML += htmlGamesList;

    // ----------[ TABLE STYLE ]----------
    // let htmlGamesList2 = '<tr class="table-secondary"><th scope="row"><input type="checkbox" id="' + platform + '"_checkbox" /></th><td>' + platform + '</td><td><span id="' + platform + '_total_counter" class="badge rounded-pill bg-dark mx-3">0</span></td><td><span id="' + platform + '_matching_counter" class="badge rounded-pill bg-dark mx-3">0</span></td><td>⏫</td></tr>';
    // document.getElementById("table_body").innerHTML += htmlGamesList2;
});

// ###########################################################################

/**
 * ===========================================================================
 *      #2 : Vanishing a platform games list when uncheck the corresponding platform checkbox
 * ---------------------------------------------------------------------------
 *
 * —> updatePlatformVisibility(event) :
 *
 * Fonction qui permet de faire disparaitre la div 'platformGamesList' correspondant à l'ID du selector cliqué,
 * en lui ajoutant la class '.vanish' (= 'display: none').
 * On se sert pour cela de l'argument 'event' qui permet de récupérer l'id de l'élément cliqué (via 'event.target.id').
 *
 * ---------------------------------------------------------------------------
 *
 * —> checkAll() et uncheckAll() :
 *
 * Fonctions qui cochent/décochent toutes les checkboxes en même temps.
 *
 * ===========================================================================
 */

// // récupération de la div 'platform_selector' ...
// const platformSelector = document.getElementById("platform_selector");
// // ... pour lui brancher un écouteur d'évènements
// platformSelector.addEventListener("change", updatePlatformVisibility);
// // l'argument 'event' permet de récupérer l'id de la checkbox cliquée (via 'event.target.id')
// function updatePlatformVisibility(event) {
//     // vérif de l'id de l'élément cliqué
//     // console.log(event.target.id);
//     let platformCheckboxId = event.target.id;
//     // on récupère un id de type "<platform>_checkbox" qu'on veut changer en "<platform>_section" ...
//     // ... on remplace donc "checkbox" par "section" dans l'id récupéré
//     let platformSectionId = platformCheckboxId.replace("checkbox", "section");
//     // verif
//     // console.log(platformSectionId); // = "<platform>_section"
//     // on récupère la div '<platform>_section' correspondante ...
//     const platformSection = document.getElementById(platformSectionId);
//     // ... et on lui ajoute (ou retire) la classe "vanish"
//     // platformSection.classList.toggle("vanish");

//     // ===========================================================================
//     // [i] ligne précédente :
//     // au début, on utilisait "toggle" en partant du principe que la checkbox est cochée par défaut au chargement de la page.
//     // mais si ce comportement est amené à changer, on a finalement décidé de clarifier ce comportement avec un if/else :
//     // 'if (!checkbox.checked) —> classList.add("vanish")' / 'else —> classList.remove("vanish")'
//     // ===========================================================================

//     // on retire le list_counter du total_counter

//     // let checkedPlatformName = platformCheckboxId.replace("_checkbox", "");
//     // console.log(checkedPlatformName);
//     let checkedPlatformCheckbox = document.getElementById(platformCheckboxId);
//     // console.log(checkedPlatformCheckbox);
//     let checkedPlatformCounter = document.getElementById(platformCheckboxId + "_games_counter");
//     // console.log(checkedPlatformCounter);
//     // console.log(checkedPlatformCounter.innerText);
//     // let checkedPlatformCounterValue = checkedPlatformCounter.textContent;

//     // --------------------

//     // console.log(checkedPlatformCheckbox);
//     // let result = Number(globalMatchingCounterElement.textContent) - Number(checkedPlatformCounter.textContent);
//     // console.log("result AVANT : " + result);
//     // result < 0 ? (result = "0") : result;
//     // console.log("result APRES : " + result);

//     if (!checkedPlatformCheckbox.checked) {
//         globalTotalCounterElement.textContent = Number(globalTotalCounterElement.textContent) - Number(checkedPlatformCounter.textContent);
//         // let result = Number(globalMatchingCounterElement.textContent) - Number(checkedPlatformCounter.textContent);
//         // result < 0 ? (result = "0") : result;
//         // globalMatchingCounterElement.textContent = result;
//         platformSection.classList.add("vanish");
//         checkSearchBar();
//         // console.log("-> if");
//     } else {
//         globalTotalCounterElement.textContent = Number(globalTotalCounterElement.textContent) + Number(checkedPlatformCounter.textContent);
//         // globalMatchingCounterElement.textContent = Number(globalMatchingCounterElement.textContent) + Number(checkedPlatformCounter.textContent);
//         platformSection.classList.remove("vanish");
//         checkSearchBar();
//         // console.log("-> else");
//     }
// }

// function checkAll() {
//     Array.from(platformElements).forEach((platform) => {
//         if (!platform.checked) {
//             platform.click();
//         }
//     });
// }

// function uncheckAll() {
//     Array.from(platformElements).forEach((platform) => {
//         if (platform.checked) {
//             platform.click();
//         }
//     });
// }

// ###########################################################################

/**
 * ===========================================================================
 *      #3 : Opening or closing all the games lists
 * ---------------------------------------------------------------------------
 *
 * Fonction qui permet, via un bouton, de fermer tous les accordions si un ou plusieurs
 * sont ouverts (pour une meilleure visibilité), ou de tous les ouvrir sinon.
 *
 * ===========================================================================
 */

// on récupère tous les éléments actuellement ouverts ('class' contient "show")
let shownElementList = document.getElementsByClassName("show");
function collapseAllOrNot() {
    // si au moins 1 élément est déjà ouvert, on ferme tout
    if (shownElementList.length > 0) {
        Array.from(shownElementList).forEach((shownElement) => {
            // on utilise le constructeur 'bootsrap.Collapse' pour pouvoir récupérer la méthode 'hide()' associée
            let shownElementToHide = new bootstrap.Collapse(shownElement);
            shownElementToHide.hide();
        });
        // on met l'icone "flèche vers le bas" pour + de compréhension
        // document.getElementById("btn_collapse_all").textContent = "⏬";
    } else {
        // sinon on ouvre tout
        let hiddenElementList = document.getElementsByClassName("accordion-collapse");
        Array.from(hiddenElementList).forEach((hiddenElement) => {
            let hiddenElementToShow = new bootstrap.Collapse(hiddenElement);
            hiddenElementToShow.show();
        });
        // et on remet l'icone "flèche vers le haut"
        // document.getElementById("btn_collapse_all").textContent = "⏫";
    }
}

// test fermeture <table>
function testCollapseTableRow() {
    let tableRowToClose = document.getElementById("test_to_hide");
    new bootstrap.Collapse(tableRowToClose);
    tableRowToClose.hide();
}

// ===========================================================================
// /!\ la fonctionnalité suivante n'est finalement pas utilisée par manque de clarté :
// en effet, elle inverse l'état d'un 'accordion' (s'il est fermé, il s'ouvre et inversement).
// le but recherché était de tout fermer ou tout ouvrir, mais pas juste inverser l'état.

// permet de toggle tous les accordions en même temps (si ouverts —> se ferment et inversement)
// buttonToggleAll.setAttribute("aria-controls", platformsList.join("_list "));
// ===========================================================================

// ###########################################################################

/**
 * ===========================================================================
 *      #4 : fetching the games data for each platform
 * ---------------------------------------------------------------------------
 *
 * Fonction qui va récupérer la liste de jeux d'une plateforme.
 *
 * On lui passe le nom de la plateforme et elle va :
 *      - récupérer le json associé
 *      - le fetcher
 *      - compter le nb de jeux
 *      - mettre à jour les compteur à côté des checkbox et des listes
 *      - classer les jeux par ordre alphabétique
 *      - créer un <li> par jeu
 *      - lui donner son nom
 *      - lui donner une classe
 *      - le rattacher à son <ul> de référence
 *
 * ===========================================================================
 */

function fetchGamesPlatforms(platform) {
    let dataToFetch = "library-" + platform + ".json";
    fetch(dataToFetch)
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
            let platformGamesList = data.response.games;
            // on crée un compteur de jeux = à la longueur de la liste de jeux reçue précédemment
            let platformTotalCounter = platformGamesList.length;
            // on met à jour le compteur de jeux total de la plateforme
            document.getElementById(platform + "_total_counter").textContent = platformTotalCounter;
            // on incrémente le compteur global avec le compteur de plateforme
            globalTotalCounter += platformTotalCounter;
            // on met à jour l'affichage du compteur global
            document.getElementById("global_total_counter").textContent = globalTotalCounter;
            // la liste de jeux retournée n'est pas classée par ordre alphabétique (mais par ID de jeu) ...
            // ... on prépare donc un tableau qu'on va remplir avec la liste des jeux puis la classer par ordre alphabétique
            let gamesListArray = [];
            // on push dans le tableau 'gamesListArray' le nom des jeux de la liste de la plateforme ...
            platformGamesList.forEach((game) => {
                gamesListArray.push(game.name);
            });
            // ... puis on les classe par ordre alphhabétique
            gamesListArray.sort();
            // on verif le tableau trié
            // console.log(gamesListArray);
            // puis pour chaque jeu, on crée un 'li' qu'on rajoutera au 'ul' existant
            gamesListArray.forEach((gameName) => {
                let individualGame = document.createElement("li");
                individualGame.textContent = gameName;
                individualGame.className = platform + "_individual_game";
                individualGame.classList.add("individual_game");
                document.getElementById(platform + "_games_list").appendChild(individualGame);
            });
        })
        .catch(function (err) {
            console.log("Oups ! Nom d'une bistoukette ! ", err);
        });
}

// Pour chaque plateforme de jeux dispo qu'on récupère du tableau 'platformsList' (défini ci-dessus),
// on fait appel à notre fonction 'fetchGamesPlatforms()' en lui passant le nom de la plateforme
platformsList.forEach((platform) => {
    fetchGamesPlatforms(platform);
});

// ###########################################################################

/**
 * ===========================================================================
 *      #5 : checking the search bar
 * ---------------------------------------------------------------------------
 *
 * Fonction qui permet la mise à jour de la liste des jeux en fonction
 * des caractères saisis dans la barre de recherche.
 *
 * Au lieu d'utiliser un eventlistener, on utilise la propriété 'onkeyup'
 * directement dans le <input> HTML.
 *
 * ===========================================================================
 */

function checkSearchBar() {
    // on crée 2 compteurs : le premier pour mettre à jour le compteur de jeux total (toutes plateformes confondues) ...
    // ... le second pour compter le nb de jeux correspondants au fur et à mesure des caractères saisis
    let updatedMatchingCounter = 0;
    let updatedTotalCounter = 0;
    // on récupère la valeur du caractère saisi
    let searchString = searchBarElement.value;
    // on passe tout en minuscule
    searchString = searchString.toLowerCase();
    // si la barre de recherche est vidée (suppression des caractères saisis via la touche 'retour' du clavier) ...
    if (searchString == "") {
        // ... on re-affiche la liste complète de jeux pour toutes les plateformes
        Array.from(individualGameList).forEach((game) => {
            game.style.display = "list-item";
        });
        // ... et on remet '<platform>_matching_counter' à 0
        platformsList.forEach((platform) => {
            document.getElementById(platform + "_matching_counter").textContent = 0;
        });
    } else {
        // sinon, pour chaque plateforme, on vérifie les correspondances entre le caractère saisi et les jeux de la liste des plateformes visibles (checkbox cochée √)
        platformsList.forEach((platform) => {
            const platformSection = document.getElementById(platform + "_section");
            // récupération du compteur de jeux de chaque plateforme
            // const checkboxGamesCounter = document.getElementById(platform + "_matching_counter");
            // on ne récupère que la liste des jeux des plateformes visibles (checkbox cochée √)
            if (!platformSection.classList.contains("vanish")) {
                // récupération de la liste des jeux de la plateforme en question
                const individualGameListByPlatform = document.getElementsByClassName(platform + "_individual_game");
                // on boucle sur la liste de jeux de la plateforme en question
                Array.from(individualGameListByPlatform).forEach((game) => {
                    if (!game.innerHTML.toLowerCase().includes(searchString)) {
                        game.style.display = "none";
                        // console.log("correspond ;)");
                    } else {
                        // console.log("correspond PAS");
                        // sinon on ajoute un "display = list-item" au <li> du jeu en question
                        game.style.display = "list-item";
                        // on incrémente le compteur de jeux de la plateforme en question
                        updatedTotalCounter++;
                        // et on incrémente le compteur global de jeux correspondants
                        updatedMatchingCounter++;
                    }
                });
            }
            // on met à jour le compteur de jeux de la plateforme en question
            document.getElementById(platform + "_matching_counter").textContent = updatedTotalCounter;
            // puis on le remet à zéro pour recompter les jeux de la plateforme suivante
            updatedTotalCounter = 0;
        });
    }
    // puis on met à jour le compteur de jeux correspondants
    // console.log(updatedMatchingCounter);
    // globalMatchingCounterElement.textContent = updatedMatchingCounter;
    // ?????????????????? pourquoi la ligne précédente ne fonctionne pas alors que la suivante oui ?????????????????????????????????????
    document.getElementById("global_matching_counter").textContent = updatedMatchingCounter;
    // et on passe le background du compteur en vert si 1 seul jeu correspond (en switchant la propriété "bg" de BootStrap de "dark" à "success" et vice-versa)
    if (updatedMatchingCounter === 1) {
        // globalMatchingCounterElement.classList.add("one-match");
        // globalMatchingCounterElement.classList.replace("bg-dark", "bg-success");
        document.getElementById("global_matching_counter").classList.replace("bg-dark", "bg-success");
    } else {
        // globalMatchingCounterElement.classList.remove("one-match");
        document.getElementById("global_matching_counter").classList.replace("bg-success", "bg-dark");
    }
}

// ###########################################################################

/**
 * ===========================================================================
 *      #6 : reset the search bar
 * ---------------------------------------------------------------------------
 *
 * Fonction qui vide les caractères de la barre de recherche,
 * remet le compteur de jeux au nb d'origine et réactualise la liste
 *
 * ===========================================================================
 */

function resetSearchBar() {
    // on vide la barre de recherche
    searchBarElement.value = "";
    // on reprend la valeur du compteur d'origine (= liste complète)
    globalTotalCounterElement.textContent = globalTotalCounter;
    // on réactualise la liste de jeux
    checkSearchBar();
    // on remet à zéro le compteur de jeux correspondants
    // globalMatchingCounterElement.textContent = 0;
    document.getElementById("global_matching_counter").textContent = 0;
}

// ###########################################################################
