<?php

	include "utils.php";
	
	$archivo = fopen("../data/memes.csv", "a+");
	fwrite($archivo, 
		$_POST["txt-descripcion"].",".
		$_POST["rbt-foto"].",".
		$_POST["txt-puntuacion"].",".
		$_POST["slc-imagen"].",".
		$_POST["txt-id"]."\n"
	);
	fclose($archivo);

	$cmt = fopen("../data/comentarios/comentarios-meme-".$_POST["txt-id"].".csv", "w");
	fclose($cmt);


	echo ' <div class="col-lg-6 col-sm-12 col-xs-12 col-md-6">';
	echo '  <div class="well card">';
	echo '    <strong>'.$_POST["rbt-foto"].'</strong>';
	echo '    <p>'.$_POST["txt-descripcion"].'</p>';
	echo '    <img src="'.$_POST["slc-imagen"].'" class="img-responsive">';
	echo '    <span class="badge">Calificación: '.stars($_POST["txt-puntuacion"]).'</span>';
	echo '    <span class="badge" id="cmt-'.$_POST["txt-id"].'">Comentarios: '.contarComentarios($_POST["txt-id"]).'</span>';
	echo '    <p>';
	echo '      <hr>';
	echo '      <h4>Comentarios:</h4>';
	echo '      <div id="div-'.$_POST["txt-id"].'"></div>';
	echo '<textarea class="form-control" placeholder="Nuevo comentario" id="textarea-'.$_POST["txt-id"].'"></textarea>';
	echo "<br>";
	echo "<div class='text-right'>";
	echo '<input type = "button" value="Comentar" class="btn btn-primary" onclick="comentar(\''.$_POST["txt-id"].'\');">';
	echo"</div>";
	echo '      </div>';
	echo '    </p>';
	echo '  </div>';
	echo '</div>';
?>