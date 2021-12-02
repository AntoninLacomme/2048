
class Game {

    constructor () {
        this.dataMatrice = this.createEmptyDataMatrice (NBLINES, NBCOLUMNS);
        this.score = 0;

        this.defeat = false;
        this.score = 0;

        this.htmlscore = document.querySelector ("#affichageScore");

        for (let i=0; i<2; i++) {
            this.placeRandomValue (this.getRandomNumber ());
        }
    }

    getRandomNumber () {
        return Math.random() < 0.9 ? 2 : 4;
    }

    isDefeat () {
        for (let y=0; y<NBLINES; y++) {
            for (let x=0; x<NBCOLUMNS; x++) {
                if (this.dataMatrice[y][x] == 0) { this.defeat = false; return this.defeat; }
            }
        }

        // ouch, la grille est pleine...
        for (let y=0; y<NBLINES; y++) {
            for (let x=0; x<NBCOLUMNS; x++) {
                // on test sur les colonnes
                try {
                    if (this.dataMatrice[y][x] == this.dataMatrice[y+1][x]) { this.defeat=false; return this.defeat; }
                }
                catch (e) { /* out of range */ }
                // puis sur les lignes
                try {
                    if (this.dataMatrice[y][x] == this.dataMatrice[y][x+1]) { this.defeat=false; return this.defeat; }
                }
                catch (e) { /* out of range */ }
            }
        }
        this.defeat = true;
        return this.defeat;
    }

    moveFinished () {
        if (this.defeat) {
            alert ("Vous avez perdu");
            game = new Game ();
        }
    }

    deplaceOnLineLeft () {
      for (let y=0; y<NBCOLUMNS; y++) {
          for (let x=1; x<NBLINES; x++) {
                this.__translateLineLeft (x, y, this.dataMatrice[y][x]);
            }
        }
    }
    deplaceOnLineRight () {
        for (let y=0; y<NBCOLUMNS; y++) {
            for (let x=NBLINES -2; x>=0; x--) {
                this.__translateLineRight (x, y, this.dataMatrice[y][x]);
            }
        }
    }
    deplaceOnColumnTop () {
        for (let y=1; y<NBCOLUMNS; y++) {
            for (let x=0; x<NBLINES; x++) {
                this.__translateColumnTop (x, y, this.dataMatrice[y][x]);
            }
        }
    }
    deplaceOnColumnDown () {
        for (let y=NBCOLUMNS - 2; y>=0; y--) {
            for (let x=0; x<NBLINES; x++) {
                this.__translateColumnDown (x, y, this.dataMatrice[y][x]);
            }
        }
    }

    fusionLine (vecteur) {
        for (let y = 0; y < NBLINES; y++) {
            if (vecteur == 1) {
                for (let x = NBCOLUMNS -1; x >= 1; x--) {
                    if (this.dataMatrice[y][x] == this.dataMatrice[y][x-1]) {
                        this.dataMatrice[y][x] *= 2;
                        this.dataMatrice[y][x-1] = 0;
                    }
                }
            }
            if (vecteur == -1) {
                for (let x = 0; x < NBCOLUMNS - 1; x++) {
                    if (this.dataMatrice[y][x] == this.dataMatrice[y][x+1]) {
                        this.dataMatrice[y][x] *= 2;
                        this.dataMatrice[y][x+1] = 0;
                    }
                }
            }
        }
    }
    fusionColumn (vecteur) {
        for (let x = 0; x < NBCOLUMNS; x++) {
            if (vecteur == 1) {
                for (let y = NBLINES -1; y >= 1; y--) {
                    if (this.dataMatrice[y][x] == this.dataMatrice[y-1][x]) {
                        this.dataMatrice[y][x] *= 2;
                        this.dataMatrice[y-1][x] = 0;
                    }
                }
            }
            if (vecteur == -1) {
                for (let y = 0; y < NBLINES - 1; y++) {
                    if (this.dataMatrice[y][x] == this.dataMatrice[y+1][x]) {
                        this.dataMatrice[y][x] *= 2;
                        this.dataMatrice[y+1][x] = 0;
                    }
                }
            }
        }
    }

    translateLeft () {
      this.accDataMatrice = this.dataMatrice.map((line) => { return line.slice(); });
      this.deplaceOnLineLeft ();
      this.fusionLine (-1);
      this.deplaceOnLineLeft ();

      if (!matriceAreEquals (this.accDataMatrice, this.dataMatrice)) {
          this.placeRandomValue (this.getRandomNumber ());
      }

      this.moveFinished ();
    }
    translateRight () {
        this.accDataMatrice = this.dataMatrice.map((line) => { return line.slice(); });
        this.deplaceOnLineRight ();
        this.fusionLine (1);
        this.deplaceOnLineRight ();

        if (!matriceAreEquals (this.accDataMatrice, this.dataMatrice)) {
            this.placeRandomValue (this.getRandomNumber ());
        }

        this.moveFinished ();
    }
    translateTop () {
        this.accDataMatrice = this.dataMatrice.map((line) => { return line.slice(); });
        this.deplaceOnColumnTop ();
        this.fusionColumn (-1);
        this.deplaceOnColumnTop ();

        if (!matriceAreEquals (this.accDataMatrice, this.dataMatrice)) {
            this.placeRandomValue (this.getRandomNumber ());
        }

        this.moveFinished ();
    }
    translateDown () {
        this.accDataMatrice = this.dataMatrice.map((line) => { return line.slice(); });
        this.deplaceOnColumnDown ();
        this.fusionColumn (1);
        this.deplaceOnColumnDown ();

        if (!matriceAreEquals (this.accDataMatrice, this.dataMatrice)) {
            this.placeRandomValue (this.getRandomNumber ());
        }

        this.moveFinished ();
    }

    __translateLineLeft (x, y, val) {
        if (x-1 >= 0 && this.dataMatrice[y][x-1] != 0) { return true; }
        if (x == 0) {
            if (this.dataMatrice[y][x] == 0) { return true; }
            return false;
        }

        this.dataMatrice[y][x] = 0;
        if (this.__translateLineLeft (x-1, y, val)) { this.dataMatrice[y][x-1] = val; }
        return false;
    }
    __translateLineRight (x, y, val) {
        if (x+1 < NBCOLUMNS && this.dataMatrice[y][x+1] != 0) { return true; }
        if (x == NBCOLUMNS - 1) {
            if (this.dataMatrice[y][x] == 0) { return true; }
            return false;
        }

        this.dataMatrice[y][x] = 0;
        if (this.__translateLineRight (x+1, y, val)) { this.dataMatrice[y][x+1] = val; }
        return false;
    }
    __translateColumnTop (x, y, val) {
        if (y-1 >= 0 && this.dataMatrice[y-1][x] != 0) { return true; }
        if (y == 0) {
            if (this.dataMatrice[y][x] == 0) { return true; }
            return false;
        }

        this.dataMatrice[y][x] = 0;
        if (this.__translateColumnTop (x, y-1, val)) { this.dataMatrice[y-1][x] = val; }
        return false;
    }
    __translateColumnDown (x, y, val) {
        if (y+1 < NBLINES && this.dataMatrice[y+1][x] != 0) { return true; }
        if (y >= NBLINES -1) {
            if (this.dataMatrice[y][x] == 0) { return true; }
            return false;
        }

        this.dataMatrice[y][x] = 0;
        if (this.__translateColumnDown (x, y+1, val)) { this.dataMatrice[y+1][x] = val; }
        return false;
    }

    // fonction générant une matrice n*m
    createEmptyDataMatrice (n, m) {
        let matrice = [];
        let line = [];
        for (let j=0; j<m; j++) {
            line.push (0);
        }
        for (let i=0; i<n; i++) {
            matrice.push (line.slice ());
        }
        return matrice;
    }

    // fonction retournant une liste de coordonnées
    // correspondant à les cellules vides
    getEmptyEmplacements () {
        let listEmplacements = [];
        this.dataMatrice.forEach ((line, y) => {
            line.forEach ((value, x) => {
                if (value == 0) {
                    listEmplacements.push({"x": x, "y": y});
                }
            });
        });
        return listEmplacements;
    }

    // fonction plaçant de façon aléatoire un 2 ou un 4 sur la grille
    // à un emplacement vide
    placeRandomValue (n) {
        let coords = this.getEmptyEmplacements ();
        let coord = coords[(Math.random() * coords.length) | 0];

        this.dataMatrice[coord.y][coord.x] = n;
        this.score += n;
        this.htmlscore.innerHTML = this.score;
    }

    // fonction de dessin
    draw (ctx) {
        ctx.save ();
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        let colorBg = "grey";
        let colorText = "black";
        this.dataMatrice.forEach ((line, y) => {
            line.forEach ((value, x) => {
                switch (value) {
                    case 0:
                        colorBg = "rgba(238, 228, 218, 0.35)";
                        colorText = "black";
                        break;

                    case 2:
                        colorBg = "#eee4da";
                        colorText = "black";
                        break;

                    case 4:
                        colorBg = "#ede0c8";
                        colorText = "black";
                        break;

                    case 8:
                        colorBg = "#f2b179";
                        colorText = "ivory";
                        break;

                    case 16:
                        colorBg = "#f59563";
                        colorText = "ivory";

                    case 32:
                        colorBg = "#f67c5f";
                        colorText = "ivory";

                    case 64:
                        colorBg = "#f65e3b";
                        colorText = "ivory";

                    case 128:
                        colorBg = "#edcf72";
                        colorText = "ivory";

                    case 256:
                        colorBg = "#edcc61";
                        colorText = "ivory";

                    default:
                        colorBg = "#edc950";
                        colorText = "ivory";
                }
                ctx.fillStyle = colorBg;
                ctx.fillRect (MARGE * (x+1) + WIDTHCELLULE * x, MARGE * (y+1) + WIDTHCELLULE * y, WIDTHCELLULE, WIDTHCELLULE);
                ctx.strokeRect (MARGE * (x+1) + WIDTHCELLULE * x, MARGE * (y+1) + WIDTHCELLULE * y, WIDTHCELLULE, WIDTHCELLULE);
                if (value > 0) {
                    ctx.fillStyle = colorText;
                    ctx.fillText (value, MARGE * (x+1) + WIDTHCELLULE * x + WIDTHCELLULE / 2, MARGE * (y+1) + WIDTHCELLULE * y + 2.5 * WIDTHCELLULE / 4);
                }
            });
        });
        ctx.restore ();
    }
}
