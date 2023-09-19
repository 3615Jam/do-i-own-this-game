let gamesListArray = [];

let test = document.getElementsByClassName("product-title__text");

// console.log(test);
// console.log(Array(test));
// console.log(Array.from(test));
// console.log(gamesListArray);

function exportGamesList() {
    Array.from(test).forEach((element) => {
        // console.log(element.innerHTML);
        gamesListArray.push(element.innerHTML);
    });
    console.log(JSON.stringify(gamesListArray));
    alert("Liste exportée avec succès");
}

function importGamesList() {
    if (gamesListArray.length == 0) {
        alert("Il n'y a rien à importer");
    } else {
        gamesListArray.forEach((gameName) => {
            let individualGame = document.createElement("li");
            individualGame.textContent = gameName;
            document.getElementById("imported_games_list").appendChild(individualGame);
        });
        document.getElementById("before_import").style.display = "none";
    }
}
