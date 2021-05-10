// Standard neighborhoods FIXME change (y,x) to (x,y)
var NB_VON_NEUMANN = [[0, -1], [-1, 0], [1, 0], [0, 1]];
var NB_MOORE = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

// Overridable functions providing custom behavior
// Functions prefixed by underscore are not meant to be called or overwritten by user

/*    This function has to return an integer representing the color of
    the cell (col, row) in the next */
function cell(mtx, col, row) {
    if (mtx.get(col, row) == 0) {
        return 1;
    }
    return 0;
}

/* This function is used when accessing the logical grid
     e.g. it's called by Matrix.nbcount() to count the number of
     neighbors with a certain value */
function at(mtx, col, row) {
    if (col < 0) { return 0; }
    if (row < 0) { return 0; }
    if (col >= mtx.cols) { return 0; }
    if (row >= mtx.rows) { return 0; }
    return mtx.get(col, row);
}

/* This function is called when initializing the matrix.
     User can provide specific initualization routine here */
function init(mtx) {
    mtx.randomize();
}

// Executed before cells are updated
function before(mtx) {
    return;
}

// Executed after all cells are updated
function after(mtx) {
    mtx.draw();
}

// Utility function: print message in the log window
function print(msg) {
    var el = document.getElementById("log");
    if (el) {
        el.value = el.value + msg + "\n";
    }
}

function getNBGrid() {
    var nbg = document.getElementById("nbgrid");
    var nb = [];
    for (var i = -2; i < 3; i += 1) {
        for (var j = -2; j < 3; j += 1) {
            if (nbg.children[i+2].children[j+2].classList.contains("nbor")) {
                nb.push([j, i]);
            }
        }
    }
    return nb;
}


function _getColorMap() {
    var numColors = parseInt(document.getElementById("colors").value, 10);
    var picks = document.getElementById("colorPickers");
    var colors = new Array(numColors);
    for (var i = 0; i < numColors; i += 1) {
        colors[i] = "#" + picks.children[i].lastChild.value;
    }
    return colors;
}

function _setColorMap(cmap) {
    document.getElementById("colors").value = cmap.length;
    _addColorPickers(cmap.length, cmap);
}

// Core function: perform one step of simulation
function _step(mtx, n) {
    before(mtx);
    var newData = new Array(mtx._data.length);
    for (var i = 0; i < mtx.rows; i += 1) {
        for (var j = 0; j < mtx.cols; j += 1) {
            newData[j + i * mtx.cols] = parseInt(cell(mtx, j, i), 10);
        }
    }
    mtx._data = newData;
    after(mtx);
}

var Matrix = function (cols, rows, cmap, nb) {
    this.cols = cols || 100;
    this.rows = rows || 100;
    this.neighbors = nb || NB_MOORE;
    // Define color map (values to color)
    this._cmap = cmap || ["#ff0000", "#00ff00", "#0000ff"];
    // Setup data
    this._data = new Array(rows * cols);
    for (var i = 0; i < rows * cols; i += 1) {
        this._data[i] = 0;
    }
    // Accessing functions
    this.get = function(c, r) { return this._data[c + r * cols]; };
    this.set = function(c, r, v) { this._data[c + r * cols] = v; };
    // Utilities
    this.nbcount = function(c, r, v) {
        var count = 0;
        for (var i = 0; i < this.neighbors.length; i += 1) {
            if (at(this, c + this.neighbors[i][0], r + this.neighbors[i][1]) == v) {
                count++;
            }
        }
        return count;
    };
    // Paint on canvas
    this.draw = function() {
        var canvas = document.getElementById("cnvs");
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.fillStyle = "#cccccc";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.scale(this._scale || 1, this._scale || 1);
        // Only integer coordinates
        for (var i = 0; i < this.rows; i += 1) {
            for (var j = 0; j < this.cols; j += 1) {
                ctx.fillStyle = this._cmap[this._data[j + i * cols]];
                ctx.fillRect(j, i, 1, 1);
            }
        }
        ctx.restore();
    };
	// Compute total number of cells
	this.stats	= function() {
		var nrs = Array.apply(null, Array(cmap.length)).map(Number.prototype.valueOf,0);
		for (var i = 0; i < this.rows; i += 1) {
            for (var j = 0; j < this.cols; j += 1) {
                nrs[this.get(j,i)] += 1;
            }
        }
		return nrs;
	};
    // Randomize matrix values using cmap indices and optional array of weights
    this.randomize = function(weights) {
        var max = this._cmap.length;
        // Create array of weights if undefined, truncate if too long
        if (weights == undefined) {
            weights = [];
            for (var i = 0; i < max; i += 1) {
                weights.push(1);
        }
            console.log("Nessun peso specificato: modello equiprobabile!");
        } else if (weights.length > max) {
            weights = weights.slice(0,max);
            console.log("Troppi pesi; ignorati quelli in eccesso!");
        }
        // Check weights constraints: if not ok, ignore the array
        var sum = 0;
        for (var i = 0; i < weights.length; i += 1) {
            if (weights[i] < 0) {
                weights[i] = 0;
                console.log("Il peso relativo al colore " + i +    "è negativo ed è stato riportato a 0!");
            }
            sum += weights[i];
        }
        // Fill eventually missing weights
        for (var i = weights.length; i < max; i += 1) {
            weights.push(0);
        }
        // Calculate cumulative function
        var cumsum = [weights[0]/sum];
        for (var i = 1; i < max; i += 1) {
            cumsum.push(cumsum[i-1]+weights[i]/sum);
        }
        // Fill matrix
        var r = 0;
        for (var i = 0; i < rows * cols; i += 1) {
            r = Math.random();
            for (var j = 0; j < max; j += 1) {
                if (cumsum[j] >= r) {
                    break;
                }
            }
            this._data[i] = j;
        }
    };
    this.fill = function(v) {
        for (var i = 0; i < rows * cols; i += 1) {
            this._data[i] = v;
    }
    };
    // Matrix to string for saving
    this.toString = function() {
        return JSON.stringify(this);
    };
    // Fill this matrix with data from the string
    this.fromString = function(s) {
        var obj = JSON.parse(s);
        this.cols = obj.cols;
        this.rows = obj.rows;
        this.neighbors = obj.neighbors;
        this._cmap = obj._cmap;
        _setColorMap(this._cmap);
        this._data = obj._data;
        this._scale = obj._scale;
    };
};

var _mtx;
//var _scale;

function _compile() {
    // Run user's code
    var el = editor.getValue();
    globalEval(el); // pre-code
    //var el = document.getElementById("source");
    //eval(el.textContent); // pre-code
}

function _cmd() {
    // Run command line
    var el = document.getElementById("cmd");
    globalEval(el.value); // pre-code
}

function _setup() {
    _compile();
    // Clear canvas
    var canvas = document.getElementById("cnvs");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Clear the log
    document.getElementById("log").innerText = "";
    // Build the matrix
    var numColors = parseInt(document.getElementById("colors").value || "2", 10);
    var numRows = parseInt(document.getElementById("gridrows").value || "20", 10);
    var numCols = parseInt(document.getElementById("gridcols").value || "10", 10);
    var colors = _getColorMap();
    _mtx = new Matrix(numCols, numRows, colors.slice(0, numColors));
    // Compute scaling factor
    _mtx._scale = Math.floor(canvas.width / numCols);
    var hscale = Math.floor(canvas.height / numRows);
    if (hscale < _mtx._scale) {
        _mtx._scale = hscale;
    }
    // Call the initialization
    init(_mtx);
    _mtx.draw();

    var mousePaint = function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = Math.floor((e.clientX - rect.left) / _mtx._scale);
        var y = Math.floor((e.clientY - rect.top) / _mtx._scale);
        var selRad = document.querySelector("input[name=\"currentColor\"]:checked");
        if (selRad == null) {
            return; // Can't color with no color selected
        }
        var selIdx = parseInt(selRad.getAttribute("data-idx"), 10);
        _mtx.set(x, y, selIdx); // Set the value
        _mtx.draw();
    };

    // TO DO: clean listeners before setting these
    canvas.addEventListener("click", mousePaint, false);
    canvas.addEventListener("mousemove", function(e) { if (e.buttons == 1) { mousePaint(e); } }, false);
}

function single_step() {
    _step(_mtx, -1);
}

var _sim_handler = null;
function _sim_start() {
    var val = document.getElementById("sim_speed").value;
    var speed = parseFloat(val || 1);
    if (speed < 0.01) { speed = 0.01; }
    if (speed > 100) { speed = 100; }
    // Note: if single_Step takes more than the specified time, javascript will wait
    _sim_handler = setInterval(single_step, 1000 / speed);
    document.getElementById("btn_start").disabled = true;
    document.getElementById("btn_stop").disabled = false;
}

function _sim_stop() {
    if (_sim_handler != null) {
        clearInterval(_sim_handler);
        _sim_handler = null;
        document.getElementById("btn_start").disabled = false;
        document.getElementById("btn_stop").disabled = true;
    }
}

function _setup_nbgrid() {
    var el;
    var subel;
    var nbg = document.getElementById("nbgrid");
    function nbor() {
        this.classList.toggle("nbor");
    }
    for (var i = -2; i < 3; i += 1) {
        el = document.createElement("div");
        for (var j = -2; j < 3; j += 1) {
            subel = document.createElement("span");
            el.appendChild(subel);
            // Central button is not clickable
            if (i != 0 || j != 0) {
                subel.classList.add("on");
                subel.onclick = nbor;
            }
        }
        nbg.appendChild(el);
    }
}

function _addColorPickers(num, cmap) {
    // Get color pickers and color palette
    var picks = document.getElementById("colorPickers");
    var palet = document.getElementById("colorPalette");

    // Remove all children
    while (picks.hasChildNodes()) {
        picks.removeChild(picks.lastChild);
    }
    while (palet.hasChildNodes()) {
        palet.removeChild(palet.lastChild);
    }

    // Add pickers
    var radioName; var palDiv; var rad;
    var pickDiv; var btn; var pkr
    for (var i = 0; i < num; i += 1) {
        // Create radio for palette
        radioName = "radio_color_" + i;
        palDiv = document.createElement("div");
        palDiv.setAttribute("id", "d_" + radioName);
        rad = document.createElement("input");
        rad.setAttribute("id", radioName);
        rad.setAttribute("data-idx", i);
        rad.setAttribute("type", "radio");
        rad.setAttribute("name", "currentColor");
        palDiv.appendChild(rad);
        palet.appendChild(palDiv);

        // Create input as color picker
        pickDiv = document.createElement("div");
        btn = document.createElement("input");
        pkr = new jscolor(btn);
        if (cmap) {
            pkr.fromString(cmap[i]);
            palDiv.style.backgroundColor = pkr.toHEXString();
        } else {
            pkr.fromHSV(360 / num * i, 100, 100);
            palDiv.style.backgroundColor = pkr.toHEXString();
        }
        btn.onchange = function() {
            palDiv.style.backgroundColor = pkr.toHEXString();
        };
        pickDiv.appendChild(document.createTextNode(i + " "));
        pickDiv.appendChild(btn);
        picks.appendChild(pickDiv);
    }
}

/*
function _addColorPickers(num, cmap) {
    var picks = document.getElementById("colorPickers");
    // Remove all children
    while (picks.hasChildNodes())
        picks.removeChild(picks.lastChild);
    // Add pickers
    for (var i = 0; i < num; i++) {
        // Radio button
        var radioName = "radio_color_" + i;
        var div = document.createElement("div");
        var rad = document.createElement("input");
        rad.setAttribute("id", radioName);
        rad.setAttribute("data-idx", i);
        rad.setAttribute("type", "radio");
        rad.setAttribute("name", "currentColor");
        // Label for the radio
        var lab = document.createElement("label");
        lab.setAttribute("for", radioName);
        // Button for picking color
        var btn = document.createElement("input");
        var pkr = new jscolor(btn);
        if (cmap) {
            pkr.fromString(cmap[i]);
        } else {
            pkr.fromHSV(360 / num * i, 100, 100);
        }
        div.appendChild(rad);
        div.appendChild(lab);
        div.appendChild(btn);
        picks.appendChild(div);
    }
}
*/

function _main() {
    _setup_nbgrid();
    var colors = document.getElementById("colors");
    colors.addEventListener("input", function(e) {
        var val = parseInt(colors.value, 10);
        if (val > 1 && val < 10) {
            _addColorPickers(val, false);
        }
    }, false);
}

function _state_save() {
    var area = document.getElementById("savestate");
    area.value = LZString.compressToBase64(_mtx.toString());
}

function _state_load() {
    _setup();
    var area = document.getElementById("savestate");
    var data = LZString.decompressFromBase64(area.value);
    _mtx.fromString(data);
    document.getElementById("gridrows").value = _mtx.rows;
    document.getElementById("gridcols").value = _mtx.cols;
    _mtx.draw();
}

function _mt_rand() {
    _mtx.randomize();
    _mtx.draw();
}

function _mt_fill() {
    var selIdx = 0;
    var selRad = document.querySelector("input[name=\"currentColor\"]:checked");
    if (selRad != null) {
        selIdx = parseInt(selRad.getAttribute("data-idx"), 10);
    }
    _mtx.fill(selIdx);
    _mtx.draw();
}

function clean() {
    var el = document.getElementById("log");
    el.value = "";
}