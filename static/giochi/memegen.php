<?php

function decodeHash($str) {
	return urldecode(base64_decode(urldecode($str)));
}

function imageQuery($hashStr) {
	$info = explode("\n", decodeHash($hashStr));
	if (count($info) < 3)
		return "?iw=300"; // Can't process
	$rinfo = array_reverse($info);
	if ($rinfo[0][0] == '#') {
		$bgcol = '&bc=' . substr($rinfo[0], 1);
		$bas = 1;
	}
	else {
		$bgcol = "";
		$bas = 0;
	}
	$sz2 = intval($rinfo[$bas]);
	$sz1 = intval($rinfo[$bas + 2]);
	$frac = ($sz1 != 0 && $sz2 != 0) ? $sz1 / ($sz1 + $sz2) : 0.5;
	$pfl = 'fl=' . urlencode($info[0]);
	$psl = 'sl=' . urlencode($info[1]);
	return "?$pfl&$psl&sp=$frac$bgcol&iw=300";
}

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link href="http://pigreco.luogoideale.org/images/favicon.ico" rel="icon" type="image/x-icon" />
		<meta property="og:image" content="http://wow.luogoideale.org/sss/memegen/meme.png<?php if (isset($_GET['id'])) { echo imageQuery($_GET['id']); } ?>" />
		<title>Come To The Math Side - PiGreco - il Luogo Ideale</title>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans+Condensed:300|Open+Sans+Condensed:700' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Bad+Script' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Poiret+One|Lobster|Maven+Pro:700' rel='stylesheet' type='text/css'>
		<link href='http://fonts.googleapis.com/css?family=Amatic+SC:700' rel='stylesheet' type='text/css'>
		<link href="http://pigreco.luogoideale.org/pigreco.css" rel="stylesheet" type="text/css" >
		<link href='fonts.css' rel='stylesheet' type='text/css' />
		<link href='memegen/memegen.css' rel='stylesheet' type='text/css' />
		<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
		<script type="text/javascript" src="memegen/jquery.query-object.js"></script>
		<script type="text/javascript" src="memegen/snap.svg-min.js"></script>
		<script type="text/javascript" src="memegen/memegen.js"></script>

	</head>
	<body>
		<!-- Facebook API -->
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1685311211716861&version=v2.0";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>

		<!-- Header -->
		<section id="header">
			<div id="banner">
				<div>
					<h1>PiGreco - il Luogo Ideale</h1>
				</div>
			</div>
			<div id="logo">
				<a href="http://pigreco.luogoideale.org/#home"><img src="http://pigreco.luogoideale.org/images/logo.png" alt="PiGreco - il Luogo Ideale"/></a>
			</div>
			<!-- Menu -->
			<div id="menu" class="horizontal">
				<ul>
					<li><a href="http://pigreco.luogoideale.org/#news">News</a></li>
					<li><a href="http://pigreco.luogoideale.org/#who">Chi siamo</a></li>
					<li><a href="http://pigreco.luogoideale.org/#activity">Attività</a></li>
					<li><a href="http://pigreco.luogoideale.org/#contacts">Contatti</a></li>
				</ul>
			</div>
			<!-- Social links -->
			<div id="social">
				<a href="http://www.facebook.com/pigreco.luogoideale"><img src="http://pigreco.luogoideale.org/images/social/facebook.png" alt="Seguici su facebook" /></a>
				<a href="http://www.twitter.com/Pi_luogoideale"><img src="http://pigreco.luogoideale.org/images/social/twitter.png" alt="Seguici su twitter" /></a>
			</div>
		</section>

		<section class="contContainer">
			<div id='meme-container'>
				<div id='control-panel'>
					<form>
						<div>
							<h1>Color</h1>
							<ul>
								<li id="col-red" class='bg-color'></li>
								<li id="col-orange" class='bg-color'></li>
								<li id="col-yellow" class='bg-color'></li>
								<li id="col-green" class='bg-color'></li>
								<li id="col-azure" class='bg-color'></li>
								<li id="col-blue" class='bg-color'></li>
								<li id="col-magenta" class='bg-color'></li>
							</ul>
						</div>
						<div>
							<h1>First line</h1>
							<div>
								<label for="first_line">Text</label>
								<input id="first_line" value="WE HAVE" maxlength="128" />
							</div>
							<div>
								<label for="l1_y">Position</label>
								<input id="l1_y" type="range" min="340" max="500">
							</div>
							<div>
								<label for="l1_size">Size</label>
								<input id="l1_size" type="range" min="100" max="3000">
							</div>
						</div>
						<div>
							<h1>Second line</h1>
							<div>
								<label for="second_line">Text</label>
								<input id="second_line" value="π" maxlength="128" />
							</div>
							<div>
								<label for="l2_y">Position</label>
								<input id="l2_y" type="range" min="350" max="500">
							</div>
							<div>
								<label for="l2_size">Size</label>
								<input id="l2_size" type="range" min="100" max="3000">
							</div>
						</div>
						<div class='done-container'>
							<input id='done-button' type="button" value="Ready to share?" />
						</div>
					</form>

					<!-- Facebook button -->
					<div id='share-container'>
						<div class='url-container'>
							<label for="page-url">Copy URL</label>
							<input id='page-url' value='' />
						</div>
						<div id="fb-button-container">
							<label>...or share on facebook</label>
							<div id='fb-button' class="fb-like" data-href="http://pigreco.luogoideale.org/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
						</div>
					</div>
				</div>
				<div id='meme-image'>
					<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
					   width="375" height="500" id="meme_template">
						<path id='logo-shadow' d="m 199.87942,65.46812 c 0,-1.953171 -5.54537,-3.537561 -12.38341,-3.537561 -6.84,0 -12.38537,1.58439 -12.38537,3.537561 0,1.715122 4.26732,3.14439 9.93268,3.469268 l 0.81171,0.663415 1.64098,1.340488 1.63902,-1.340488 0.81171,-0.663415 c 5.66536,-0.324878 9.93268,-1.754146 9.93268,-3.469268" style="opacity:0.2;fill:#000000" />
						<path id='logo-shape' d="m 187.5,7.24744 c -13.80975,0 -25,11.19024 -25,25 0,12.11415 8.60976,22.21463 20.04878,24.5122 l 1.63415,4.70731 3.31707,9.46342 3.31708,-9.46342 1.63414,-4.70731 C 203.88927,54.46207 212.5,44.36159 212.5,32.24744 c 0,-13.80976 -11.19024,-25 -25,-25 z m -7.34146,18.26829 14.68293,0 0,3.04878 -2.34147,0 0,11.21952 -3.51219,0 0,-11.21952 -2.97561,0 0,11.21952 -3.5122,0 0,-11.21952 -2.34146,0 0,-3.04878 z" />
						<text x="187.5" y="146.68817" style="font-size:91.16168213px">COME</text>
						<text x="188.05664" y="180.77765" style="font-size:40px">TO THE</text>
						<text x="187.47957" y="245.35028" style="font-size:83.68703461px">MATH</text>
						<text x="187.85536" y="315.42169" style="font-size:90.97385406px">SIDE</text>
						<text x="188.78253" y="393.94281" class='custom_text' id="text_first_line" style="font-size:79.59429169px">WE HAVE</text>
						<text x="188.23561" y="484.1554" class='custom_text' id="text_second_line" style="font-size:158.58157349px">π</text>
					</svg>
				</div>
			</div>
		</section>

		<section id="footer" style="z-index: -1">
			Associazione PiGreco - il Luogo Ideale C.F. 91584930159 Sede legale: via Tagliamento 25, Vimodrone (Milano)<br/>
			pigreco@luogoideale.org
		</section>
	</body>
</html>
