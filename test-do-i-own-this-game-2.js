/**
 * ===========================================================================
 *      # DIOTG - Object Oriented :
 * ---------------------------------------------------------------------------
 *
 * Après avoir tenté la méthode procédurale, nous tentons ici d'obtenir le même résultat
 * avec une orientation objet pour chaque plateforme.
 *
 * ===========================================================================
 */

// liste des plateformes dispo
const gamesPlatforms = ["Amazon", "Blizzard", "Epic", "GOG", "HumbleBundle", "IndieGala", "Origin", "Steam", "Ubisoft"];

/**
 * ===========================================================================
 *      IndividualGamingPlatform()
 * ---------------------------------------------------------------------------
 *
 * Objet représentant une plateforme de gaming.
 *
 * @constructor
 * @param {string} platformName                     le nom de la plateforme
 * @param {boolean} platformSelector                la checkbox associée à la plateforme
 * @param {number} platformTotalGamesCounter        le nombre total de jeu(x) de la plateforme
 * @param {number} platformMatchingGamesCounter     le nombre de jeu(x) correspondant(s) à une recherche
 *
 * ===========================================================================
 */

function IndividualGamingPlatform(platformName, platformSelector, platformTotalGamesCounter, platformMatchingGamesCounter) {
    this.platformName = platformName;
    this.platformSelector = platformSelector;
    this.platformTotalGamesCounter = platformTotalGamesCounter;
    this.platformMatchingGamesCounter = platformMatchingGamesCounter;

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
            .then(function (data) {});
    }
}
