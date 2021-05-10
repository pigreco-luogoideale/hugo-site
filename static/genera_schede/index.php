<?php

if (!isset($_POST["min"]) or !isset($_POST["max"]) or !isset($_POST["op"])) {

?><!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <title>Generatore di Schede Operazioni</title>
        <style>
            .container-fluid { max-width: 576px; }
            h1 { margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col"><h1 class="text-center">Crea la tua scheda!</h1></div>
            </div>
            <div class="row">
                <div class="col">
                    <form action="" method="POST">
                        <div class="form-group">
                            <label for="op">Operazione</label>
                            <select name="op" id="op" class="form-control">
                                <option value="+">Addizione</option>
                                <option value="-">Sottrazione</option>
                                <option value="*">Moltiplicazione</option>
                                <option value="/">Divisione</option>
                            </select>
                        </div>
                        <h4>Campo numerico</h4>
                        <div class="form-group row">
                            <label for="min" class="col-3">Minimo</label>
                            <input id="min" type="number" name="min" min="0" max="1000" class="form-control col-9">
                        </div>
                        <div class="form-group row">
                            <label for="min" class="col-3">Massimo</label>
                            <input id="max" type="number" name="max" min="0" max="1000" class="form-control col-9">
                        </div>
                        <button type="submit" class="btn btn-primary">Genera scheda</button>
                    </form>
                </div>
            </div>
        </div>
    </body>
</html><?php
} else { 
    require('fpdf182/fpdf.php');

    $min = intval($_POST["min"]);
    $max = intval($_POST["max"]);
    $op = $_POST["op"];

    $cols = 3;
    $count = 12; // Number of rows
    $col_h = 14;

    // Script
    $pdf = new FPDF();
    $pdf->AddPage();

    $b = 0;

    $pdf->SetFont('Arial', 'B', 26);
    $pdf->Cell(0, 20, 'Allenamento Operazioni!', $b, 0, 'R');
    $pdf->Ln(0);

    $pdf->SetFont('Arial', '', 12);
    $pdf->Cell(100, 12, 'Nome:', $b, 1);
    $pdf->Cell(100, 12, 'Data:', $b, 1);

    $pdf->SetFont('Arial', '', 16);
    $pdf->Cell(0, 20, "Svolgi le operazioni e scrivi il risultato", $b, 1, 'C');

    $w = $pdf->GetPageWidth();
    $col_w = $w / ($cols + 1);
    $margin = $col_w * 0.5;


    function compute($a, $op) {
        switch ($op) {
            default:
            case "+": return $a[0] + $a[1]; break;
            case "-": return $a[0] - $a[1]; break;
            case "*": return $a[0] * $a[1]; break;
            case "/": return round($a[0] / $a[1], 2); break;
        }
    }

    $numbers = [];

    for ($i = 0; $i < $count * $cols; $i++) {
        $numbers[$i] = [rand($min, $max), rand($min, $max)];
        if ($op == "-") {
            rsort($numbers[$i]);
        }
    }

    for ($r = 0, $i = 0; $r < $count; $r++) {
        $pdf->SetX($margin);
        for ($c = 0; $c < $cols; $c++, $i++) {
            $pdf->Cell($col_w, $col_h, $numbers[$i][0] . " " . $op . " " . $numbers[$i][1] . " = ........", $b, 0, 'C');
        }
        $pdf->Ln();
    }

    $pdf->AddPage();
    $pdf->SetFont('Arial', 'B', 32);
    $pdf->Cell(0, 30, 'Autocorrezione', $b, 1, 'C');

    $pdf->SetFont('Arial', '', 16);
    for ($r = 0, $i = 0; $r < $count; $r++) {
        $pdf->SetX($margin);
        for ($c = 0; $c < $cols; $c++, $i++) {
            $tot = compute($numbers[$i], $op);
            $pdf->Cell($col_w, $col_h, $numbers[$i][0] ." ". $op . " " . $numbers[$i][1] . " = " . $tot, $b, 0, 'C');
        }
        $pdf->Ln();
    }

    $pdf->Output("I", "scheda.pdf");
}
?>
