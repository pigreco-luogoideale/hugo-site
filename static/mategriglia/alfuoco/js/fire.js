/* COSTANTI */
var NB_VON_NEUMANN = [[1,0],[0,1],[-1,0],[0,-1]];
var NB_MOORE = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];

var TPL_TORUS = function(r,c) { return this.get(r-Math.floor(r/this.rows)*this.rows, c-Math.floor(c/this.cols)*this.cols); }
var TPL_KLEIN_BOTTLE = function(r,c) { //sx-dx sono lati incollati girati
	var tcol = Math.floor(c/this.cols);
	if (tcol%2 == 0) { return this.get(r-Math.floor(r/this.rows)*this.rows, c-tcol*this.cols); } else { return this.get((1+Math.floor(r/this.rows))*this.rows-r, c-tcol*this.cols); }
}
var TPL_RECTANGLE = function(r,c) { if (r < 0 || c < 0 || r >= this.rows || c >= this.cols) { return -1; } return this.get(r,c); }
var TPL_CYLINDER = function(r,c) { if (r < 0  || r >= this.rows) { return -1; } return this.get(r, c-Math.floor(c/this.cols)*this.cols); }
var TPL_MOEBIUS = function(r,c) {
	if (r < 0  || r >= this.rows) { return -1; }
	var tcol = Math.floor(c/this.cols);
	if (tcol%2 == 0) { return this.get(r, c-tcol*this.cols); } else { return this.get(this.rows-r, c-tcol*this.cols); }
}

// Colori
var COLORS = ["#AA7243", "#228b22", "#EA3911", "#000000"];
var IMAGES = ["land.png","green-tree.png","fire.png","carbonized-tree.png"]

/* PARAMETRI DEFAULT */
var rows = 200;
var cols = 250;
var density = 50;
var diffusivity = 100;
var nbhood = NB_VON_NEUMANN;
var topology = TPL_RECTANGLE;



/********************************************************/
/*** Qui finisce il codice che si dovrebbe modificare ***/
/********************************************************/



/* VARIABILI GLOBALI INTERNE AL SIMULATORE */
var nbhood_table = null;
var matrix = null;
var palette = null;
var handler = null;

// Classe intorno
var NBhood_Table = function(r, c, nb) {
	this.table = document.getElementById("nbtable");
	this.rows = r || 5;
	this.cols = c || 5;
	this.cx = Math.floor(this.rows/2);
	this.cy = Math.floor(this.cols/2);
	if (nb == undefined) { this.nbhood = NB_VON_NEUMANN; } else { this.nbhood = nb; }
		
	this.tableReset = function (tbl) {
		//Svuoto la tabella corrente
		while (tbl.table.lastChild) {
			tbl.table.removeChild(tbl.table.firstChild);
		}
		
		//Funzione per cambiare la singola cella
		function nbtoggle(i,j) {
			return function () {
				var flag = false;
				for (var k = 0; k < tbl.nbhood.length; k++) {
					flag = (i == tbl.cx-tbl.nbhood[k][0] && j == tbl.cy-tbl.nbhood[k][1]);
					if (flag) { break; }
				}
				if (flag) {
					tbl.nbhood.splice(k, 1);
				} else {
					tbl.nbhood.push([tbl.cx-i,tbl.cy-j]);
				}
				this.classList.toggle("nboff");
				this.classList.toggle("nbon");
			}
		}
		
		// Ciclo per creare tutte le celle dell'intorno
		for (var i = 0; i < tbl.rows; i++) {
			var div = document.createElement("div");
			for (var j = 0; j < tbl.cols; j++) {
				var span = document.createElement("span");
				if (i == tbl.cx && j == tbl.cy) {
					span.classList.add("nbcenter");
				} else {
					span.addEventListener("click", nbtoggle(i,j));
					span.classList.add("nboff");
					for (var k = 0; k < tbl.nbhood.length; k++) {
						if (i == tbl.cx+tbl.nbhood[k][0] && j == tbl.cy+tbl.nbhood[k][1]) {
							span.classList.add("nbon");
							span.classList.toggle("nboff");
							break;
						}
					}
				}
				div.appendChild(span);
			}
			tbl.table.appendChild(div);
		}
		var div = document.createElement("div");
		div.classList.add("clearer");
		tbl.table.appendChild(div);
	}
	
	// Inizializzazione appena creata
	this.tableReset(this);
}

// Classe "palette"
var Palette = function() {
	this.palette = document.getElementById("colorchoice");
	//this.colors = COLORS;
	this.imgs = IMAGES;
	this.activecolor = 0;
	
	this.paletteSet = function () {
		//Svuoto la tabella corrente
		while (this.palette.lastChild) {
			this.palette.removeChild(this.palette.firstChild);
		}
		
		function setColor(c) {
			this.palette.activecolor = c;
		}
		
		// Funzione per cambiare il singolo colore attivo
		function colorToggle(c,N) {
			return function() {
				for (var i = 0; i < N; i++) {
					var el = document.getElementById("color_" + i);
					if (el.classList.contains("active_color")) {
						el.classList.toggle("active_color");
						break;
					}
				}
				document.getElementById("color_" + c).classList.toggle("active_color");
				setColor(c);
			}
		}
		
		// Funzione per cambiare la singola immagine attiva
		function imageToggle(img,N) {
			return function() {
				for (var i = 0; i < N; i++) {
					var el = document.getElementById("img_" + i);
					if (el.classList.contains("active_color")) {
						el.classList.toggle("active_color");
						break;
					}
				}
				document.getElementById("img_" + img).classList.toggle("active_color");
				setColor(img);
			}
		}
		
		// Ciclo per creare i picker
		/*var N = this.colors.length;
		for (var i = 0; i < N; i++) {
			var span = document.createElement("span");
			span.setAttribute("id", "color_" + i);
			span.setAttribute("style", "background-color: " + this.colors[i]);
			if (i == 0) { span.setAttribute("class", "active_color"); }
			span.addEventListener("click", colorToggle(i,N));
			this.palette.appendChild(span);
		}*/
		var N = this.imgs.length;
		for (var i = 0; i < N; i++) {
			var span = document.createElement("span");
			span.setAttribute("id", "img_" + i);
			span.setAttribute("style", "background-color: #FFFFFF; background-image: url(img/" + this.imgs[i] + "); background-size: contain; background-position: center; background-repeat: no-repeat;");
			if (i == 0) { span.setAttribute("class", "active_color"); }
			span.addEventListener("click", imageToggle(i,N));
			this.palette.appendChild(span);
			
			var imm = document.createElement("img");
			imm.setAttribute("id",this.imgs[i]);
			imm.setAttribute("src","img/" + this.imgs[i]);
			imm.setAttribute("style","display: none;");
			this.palette.appendChild(imm);
		}
	}
	
	this.paletteSet();
}

// Classe "griglia"
var Matrix = function (r, c, nb, pal, tpl, dens, diff) {
    this.rows = r || 100;
	this.cols = c || 100;
	this.cells = this.rows * this.cols;
	this.palette = pal;
	if (nb == undefined) { this.neighbours = NB_VON_NEUMANN; } else { this.neighbours = nb; }
	if (tpl == undefined) { this.at = TPL_RECTANGLE; } else { this.at = tpl; }
	if (dens == undefined) { this.density = 50; } else { this.density = dens; }
	if (diff == undefined) { this.diffusivity = 100; } else { this.diffusivity = diff; }
	this.stillburning = false;
	this.speed = 20;
	this.draw = true;
	this.firefront = true;
	this.nrsteps = 0;
	this.nrsoil = 0;
	this.nralive = 0;
	this.nrfire = 0;
	this.nrburned = 0;
	
	this.canvas = document.getElementById("cnvs");
	this.ctx = this.canvas.getContext("2d");
	
	// Lato quadrato
    this.cellsize = this.canvas.width/this.cols;
    var hsize = this.canvas.height/this.rows;
    if (hsize < this.cellsize) {
        this.cellsize = hsize;
    }
	this.vshift = (this.canvas.height-this.cellsize*this.rows)/2;
	this.hshift = (this.canvas.width-this.cellsize*this.cols)/2;
	
	// Fattore di scala tra la cella e il suo lato
	this.scale = 0.9;
	
	// Dati
	this.data = new Array(this.cells);
    for (var i = 0; i < this.cells; i++) {
        this.data[i] = 0;
    }
	
	// Funzioni di accesso alla griglia
    this.get = function(r, c) { return this.data[r + c * this.rows]; };
    this.set = function(r, c, v) { this.data[r + c * this.rows] = v; };
	
	// Funzione di conteggio dei vicini
	this.nbcount = function(r, c, v) {
        var count = 0;
        for (var i = 0; i < this.neighbours.nbhood.length; i++) {
            if (this.at(r + this.neighbours.nbhood[i][0], c + this.neighbours.nbhood[i][1]) == v) {
                count++;
            }
        }
        return count;
    };
	
	// Regole
	this.cellrules = function(row, col) {
		var v = this.get(row, col);
		if (v == 1 && 100*Math.random() < this.diffusivity) { // Se un albero è vivo e ha qualche vicino in fiamme, allora brucia con prob. data dalla diffusività
			// Numero di vicini in fiamme
			var n = this.nbcount(row, col, 2);
			if (n > 0) {
				this.stillburning = true;
				return 2;
			}
		} else if (v == 2) { // Invece, se un albero è in fiamme, allora diventa un albero bruciato
			return 3;
		}
		return v;
	};
	
	// Griglia casuale (con densità)
	this.randomize = function(d) {
		// Fronte di fiamma se impostato, altrimenti no
		var offset = 0;
		if (this.firefront) {
			offset = this.rows;
		}
        // Se la densità non è definita uso la proprietà della classe
		var p;
        if (d == undefined) {
            p = this.density/100;
        } else {
			p = d/100;
		}
		
        // Numero di alberi vivi
		var nrvivi = Math.max(0,Math.round(p*this.cells)-offset);
		var i = 0;
		// Se è offset non è zero riempio offset celle di alberi incendiati
        while (i < offset) {
			this.data[i++] = 2;
        }
		// Poi le celle vuote
		while (i < this.cells-nrvivi) {
			this.data[i++] = 0;
        }
		// E poi ci sono gli alberi vivi
		while (i < this.cells) {
			this.data[i++] = 1;
        }
		
		// Mescolo a caso alberi vivi e celle vuote
		shuffle(this.data,offset);
	};
	
	// Riempi griglia
	this.fill = function(v) {
		for (var i = 0; i < this.cells; i++) {
			this.data[i] = v;
		}
    };
	
	// Prima dello step
	this.before = function() {
		this.stillburning = false;
	};
	
	// Dopo lo step
	this.after = function() {
		this.updateDrawing();
		this.nrsteps++;
		updateStats();
		if (!this.stillburning) { stop(); this.nrsteps--; }
	};
	
	// Passo
	this.step = function() {
		this.before();
		var newData = new Array(this.cells);
		for (var r = 0; r < this.rows; r++) {
			for (var c = 0; c < this.cols; c++) {
				newData[r + c * this.rows] = this.cellrules(r,c);
			}
		}
		this.data = newData;
		this.after();
	};
	
	// Aggiorna velocità
	this.updateSpeed = function () {
		var val = document.getElementById("val_speed").value;
		var speed = parseFloat(val || 1);
		if (speed < 0.01) { speed = 0.01; } else if (speed > 100) { speed = 100; }
		this.speed = speed;
	};
	
	// Disegno a mano libera
	this.freeHand = function() {
		// Disegna mouse
		this.mousePaint = function(X,Y) {
			var rect = this.canvas.getBoundingClientRect();
			var c = Math.floor((X - rect.left - this.hshift) / this.cellsize);
			var r = Math.floor((Y - rect.top - this.vshift) / this.cellsize);
			if (r >= 0 && c >= 0 && r < this.rows && c < this.cols) {
				this.set(r,c, this.palette.activecolor);
				this.drawCell(r,c);
				updateStats();
			}
		};
		
		var self = this;		
		this.canvas.addEventListener("click", function(e) { self.mousePaint(e.clientX,e.clientY); }, false);
		this.canvas.addEventListener("mousemove", function(e) { if (e.buttons == 1) { self.mousePaint(e.clientX,e.clientY); } }, false);
	};
	
	// Disegna la cella in posizione r,c
	this.drawCell = function(r,c) {
		//this.ctx.fillStyle = this.palette.colors[this.get(r,c)];
		//this.ctx.fillRect(this.hshift+this.cellsize*c,this.vshift+this.cellsize*r,this.cellsize*this.scale,this.cellsize*this.scale);
		var img = document.getElementById(this.palette.imgs[this.get(r,c)]);
		this.ctx.drawImage(img,this.hshift+this.cellsize*c,this.vshift+this.cellsize*r,this.cellsize*this.scale,this.cellsize*this.scale);
	};
	
	// Disegna tutte le celle
    this.updateDrawing = function() {
		if (this.draw) {
			this.ctx.fillStyle = "#000000";
			this.ctx.fillRect(this.hshift, this.vshift, this.canvas.width-2*this.hshift, this.canvas.height-2*this.vshift);
			for (var r = 0; r < this.rows; r++) {
				for (var c = 0; c < this.cols; c++) {
					this.drawCell(r,c);
				}
			}
		}
    };
	
	// Riempi del colore attivo
    this.fill = function() {
		for (var r = 0; r < this.rows; r++) {
			for (var c = 0; c < this.cols; c++) {
				this.set(r,c, this.palette.activecolor);
			}
		}
		this.updateDrawing();
    };
	
	// Pulisci disegno
	this.cleanDrawing = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
	
	this.stats = function() {
		//var tmp = Array.apply(null, Array(this.palette.colors.length)).map(Number.prototype.valueOf,0);
		var tmp = Array.apply(null, Array(this.palette.imgs.length)).map(Number.prototype.valueOf,0);
		for (var r = 0; r < this.rows; r++) {
			for (var c = 0; c < this.cols; c++) {
				tmp[this.get(r,c)]++;
			}
		}
		this.nrsoil = tmp[0];
		this.nralive = tmp[1];
		this.nrfire = tmp[2];
		this.nrburned = tmp[3];
	}
	
	// Procedura di inizializzazione di default
	this.init = function(firsttimeflag) {
		if(firsttimeflag) { this.freeHand(); }
		this.updateSpeed();

		this.randomize();
		updateStats();
		
		this.cleanDrawing();
		this.updateDrawing();
	};
}

// Inizializzazione
var matrix;
var firsttimeflag = true;
function init() {
	// Carico righe, colonne e densità
	var rows = parseInt(document.getElementById("nr_rows").value || "100", 10);
    var cols = parseInt(document.getElementById("nr_cols").value || "100", 10);
	var density = parseFloat(document.getElementById("perc_density").value.replace(",",".") || "50");
	//var diffusivity = parseFloat(document.getElementById("perc_diffusivity").value.replace(",",".") || "100");
	var diffusivity = 100;
	
	topology_set(document.getElementById("topology").value);
	
	if (firsttimeflag) { matrix = new Matrix(rows,cols,nbhood_table,palette,topology,density,diffusivity); }
	
	matrix.rows = rows;
	matrix.cols = cols;
	matrix.neighbours = nbhood_table;
	matrix.palette = palette;
	matrix.at = topology;
	matrix.density = density;
	matrix.diffusivity = diffusivity;
	
	//if (document.getElementById("draw_updates").classList.contains("red")) { draw_updates(); }
	matrix.firefront = document.getElementById("firefront").classList.contains("green");
	
	matrix.init(firsttimeflag);
	document.getElementById("init").disabled = false;
	document.getElementById("fill").disabled = false;
	//document.getElementById("draw_updates").disabled = false;
	document.getElementById("step").disabled = false;
	document.getElementById("start").disabled = false;
	document.getElementById("stop").disabled = true;
}

// Caricamento iniziale
function load() {
	nbhood_table = new NBhood_Table(5,5,nbhood);
	palette = new Palette();
}

function step() {
	matrix.step();
}

function start() {
	matrix.updateSpeed();
    handler = setInterval(step, 1000/matrix.speed);
    document.getElementById("init").disabled = true;
	document.getElementById("fill").disabled = true;
	document.getElementById("step").disabled = true;
	document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
}

function stop() {
	if (handler != null) {
		clearInterval(handler);
		handler = null;
		document.getElementById("init").disabled = false;
		document.getElementById("fill").disabled = false;
		document.getElementById("step").disabled = false;
		document.getElementById("start").disabled = false;
		document.getElementById("stop").disabled = true;
	}
}

function topology_set(tpl) {
	if (tpl == 'Torus') { topology = TPL_TORUS; }
	else if (tpl == 'KleinBottle') { topology = TPL_KLEIN_BOTTLE; }
	else if (tpl == 'Cylinder') { topology = TPL_CYLINDER; }
	else if (tpl == 'Moebius') { topology = TPL_MOEBIUS; }
	else { topology = TPL_RECTANGLE; }
}

function fill() {
	matrix.fill();
}

function firefront() {
	document.getElementById("firefront").classList.toggle("green");
	document.getElementById("firefront").classList.toggle("red");
	if (matrix !== null) { matrix.firefront = !matrix.firefront; }
}

function draw_updates() {
	matrix.draw = document.getElementById("draw_updates").classList.toggle("green");
	document.getElementById("draw_updates").classList.toggle("red");
}

function updateStats() {
	matrix.stats();
	document.getElementById("nrsteps").innerHTML = matrix.nrsteps;
	document.getElementById("nrsoil").innerHTML = matrix.nrsoil + " (" + roundNumber(100*matrix.nrsoil/matrix.cells,2) + "%)";
	document.getElementById("nralive").innerHTML = matrix.nralive + " (" + roundNumber(100*matrix.nralive/matrix.cells,2) + "%)";
	document.getElementById("nrfire").innerHTML = matrix.nrfire + " (" + roundNumber(100*matrix.nrfire/matrix.cells,2) + "%)";
	document.getElementById("nrburned").innerHTML = matrix.nrburned + " (" + roundNumber(100*matrix.nrburned/matrix.cells,2) + "%)";
}

/* Fisher-Yates shuffle */
function shuffle(array,offset) {
	var i = array.length, j=0, temp=0;
	while (i-- > offset) {
		j = offset+Math.floor(Math.random() * (i+1-offset));
		// swap randomly chosen element with current element
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}