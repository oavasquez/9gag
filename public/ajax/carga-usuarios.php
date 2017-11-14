<?php 
	$path = "../data/usuarios.csv";
	$file = fopen($path, "r");
	while($linea = fgets($file)){
		$info = explode(",", $linea);
		echo '<label>'.$info[0].'<input id="rbt-'.$info[0].'" type="radio" value="'.$info[0].'" name="rbt-foto"><img src="'.$info[1].'" class="img-responsive img-circle"></label>';
	}
?>