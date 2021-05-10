var canvasDiv;
var picker;
var context;
var scalaMappa;
var canvasWidth;
var canvasHeight;
var colorPalette = [[255,204,0,255],[238,68,68,255],[0,153,255,255],[153,204,0,255],[255,0,153,255],[153,51,153,255],[204,102,0,255],[51,153,102,255],[179,236,247,255]];
var paintColor = colorPalette[0];
var dati;
var Xoffset;
var Yoffset;

// Carico mappa
function mapLoad() {
	canvasDiv = document.getElementById('paintfill');
	
	// Color picker
	colorPicker();
	
	// Creo immagine temporanea per scalare bene dimensioni
	var tmpimg = new Image();
	tmpimg.src = mappa.src;
	tmpimg.style.position = "absolute";
	tmpimg.style.left = -9999;
	tmpimg.style.visibility = "hidden";
	
	tmpimg.onload = function() {
		// Raccolgo info mappa
		canvasWidth = canvasDiv.clientWidth;
		scalaMappa = canvasWidth / this.width;
		canvasHeight = Math.round(scalaMappa * this.height);
		document.body.removeChild(tmpimg);
		
		// Creo la tela con la mappa stampata
		canvasCreate();
	}
	
	// Rimuovo immagine temporanea
	document.body.appendChild(tmpimg);
}


// Funzione per creare la tela
canvasCreate = function () {	
	// Creo l'elemento canvas
	var canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'cnvs');
	canvasDiv.appendChild(canvas);
	
	// Disegno la mappa
	context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	clearCanvas();
	
	// Attivo listener del mouse
	canvas.addEventListener("click", function(e) { self.fillArea(e.clientX,e.clientY); }, false);
	
	// Bottone di download
	/*var b = document.createElement("a");
	b.innerHTML = 'Scarica mappa';
	
	b.addEventListener('click', function (e) {
		var dataURL = canvas.toDataURL('image/png');
		b.href = dataURL;
	});
	
	canvasDiv.appendChild(b);*/
}

// Funzione per pulire la tela
function clearCanvas() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.drawImage(mappa, 0, 0, canvasWidth, canvasHeight);
	
	// Prendo i dati della mappa
	dati = context.getImageData(0, 0, canvasWidth, canvasHeight);
}

function redraw() {
	context.putImageData(dati, 0, 0);
}

function matrix1Dto2D(z) {
	return { x: z%canvasWidth, y: Math.floor(z/canvasWidth)};
}

function matrix2Dto1D(x,y) {
	return y*canvasWidth + x;
}

function sameColor(colA,colB) {
	return (colA[0] == colB[0] && colA[1] == colB[1] && colA[2] == colB[2] && colA[3] == colB[3]);
}

// Funzione per catturare il colore di un pixel
function getColor(pos) {
	var d = 4*matrix2Dto1D(pos.x,pos.y);
	return [dati.data[d],dati.data[d+1],dati.data[d+2],dati.data[d+3]];
}

// Funzione per cambiare il colore ad un pixel
function setColor(pos,col) {
	var d = 4*matrix2Dto1D(pos.x,pos.y);
	dati.data[d] = col[0];
	dati.data[d+1] = col[1];
	dati.data[d+2] = col[2];
	dati.data[d+3] = col[3];
}

// Funzione che opera come il secchiello di Paint
function fillArea(posX,posY) {
	var canvasRect = document.getElementById('cnvs').getBoundingClientRect();
	var startPos = { x: Math.floor(posX-canvasRect.left), y: Math.floor(posY-canvasRect.top)};
	var oldColor = getColor(startPos);
	
	// Pila con i pixel da cambiare di colore
	var pilaPixel = new Array();
	pilaPixel.push(startPos);
	
	// Ciclo sugli elementi della pila
	while(pilaPixel.length) {
		pos = pilaPixel.pop();
		var currentColor = getColor(pos);
		
		// Lascio stare il nero e il trasparente
		if(sameColor(currentColor,[0,0,0,255]) || currentColor[3] == 0) continue;
		
		// Se il colore non è già quello nuovo
		if(!sameColor(currentColor, paintColor)) {
			// Cambio colore pixel
			setColor(pos,paintColor);
			
			// Guardo attorno
			for(var i = -1; i<=1; i++) {
				for(var j = -1; j <= 1; j++) {
					if (i == 0 && j == 0) continue;
					
					// Ricavo posizione e colore del pixel corrente
					currentPos = { x: pos.x+i, y: pos.y+j};
					currentColor = getColor(currentPos);
					
					// Aggiungo pixel
					if (sameColor(currentColor,oldColor)) {
						pilaPixel.push(currentPos);
					}
				}
			}
		}
	}
	
	// Scrivi modifiche
	redraw();
}

function colorPicker() {
	var txt = document.createElement('h3');
	txt.innerHTML = 'Seleziona un colore e poi clicca un punto della regione da riempire';
	canvasDiv.appendChild(txt);
	
	picker = document.createElement('div');
	picker.setAttribute('id', 'picker');
	canvasDiv.appendChild(picker);
	
	function paletteSet() {
		//Svuoto la tabella corrente
		while (picker.lastChild) {
			picker.removeChild(picker.firstChild);
		}
		
		function setColor(c) {
			paintColor = colorPalette[c];
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
		
		// Ciclo per creare i picker
		var N = colorPalette.length;
		for (var i = 0; i < N; i++) {
			var span = document.createElement("span");
			span.setAttribute("id", "color_" + i);
			span.setAttribute("style", "background-color:rgba(" + colorPalette[i][0] + "," + colorPalette[i][1] + "," + colorPalette[i][2] + "," + colorPalette[i][3]/255 + "); ");
			if (i == 0) { span.setAttribute("class", "active_color"); }
			span.addEventListener("click", colorToggle(i,N));
			picker.appendChild(span);
		}
	}
	
	paletteSet();
}

function init() {
	mapLoad();
}