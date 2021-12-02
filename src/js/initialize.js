
window.onload = init;
window.onkeyup = keypress;

var canvas, ctx;
var game;

// pour éviter des problème de compatibilité avec les browsers,
// ces variables ne seront pas des variables statiques de la classe Game
var NBLINES = 4;
var NBCOLUMNS = 4;
var WIDTHCELLULE = 50;
var MARGE = 3;

// fonction d'initialisation
function init () {
    // set up des variables canvas et ctx
    canvas = document.querySelector ("#canvasMain2048");
    ctx = canvas.getContext("2d");

    canvas.width = NBLINES * WIDTHCELLULE + (NBLINES + 1) * MARGE;
    canvas.height = NBCOLUMNS * WIDTHCELLULE + (NBCOLUMNS + 1) * MARGE;

    document.querySelector ("#main").style.width = canvas.width + 10 + "px";

    // set up de la variable game;
    game = new Game ();

    run ();
}

function keypress (event) {
    try {
        switch (event.keyCode) {
            case 37:
                // flèche de gauche
                game.translateLeft ();
                break;
            case 38:
                // flèche du haut
                game.translateTop ();
                break;
            case 39:
                // flèche de droite
                game.translateRight ();
                break;
            case 40:
                // flèche du bas
                game.translateDown ();
                break;

            default:
                // do nothing
        }
    }
    catch (e) { console.log(e); }
}


// fonction appelée 60x/s
function run () {
    // dessin
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);

    requestAnimationFrame (run);
}

function matriceAreEquals (m1, m2) {
    try {
        if (m1.length != m2.length) { return false; }

        for (let y = 0; y < m1.length; y++) {
            if (m1[y].length != m2[y].length) { return false; }

            for (let x = 0; x<m1[y].length; x++) {
                if (m1[y][x] != m2[y][x]) { return false; }
            }
        }
    }
    catch (e) { return false; }

    return true;
}
