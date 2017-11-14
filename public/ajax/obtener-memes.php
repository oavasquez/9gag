<?php
	include "utils.php";

	$archivo = fopen("../data/memes.csv","r");	
	while ($linea=str_replace("\n", "", fgets($archivo))) {
		$partes = explode(",", $linea);
		//echo $linea;

		echo ' <div class="col-lg-6 col-sm-12 col-xs-12 col-md-6">';
		echo '  <div class="well card">';
		echo '    <strong>'.$partes[1].'</strong>';
		echo '    <p>'.$partes[0].'</p>';
		echo '    <img src="'.$partes[3].'" class="img-responsive">';
		echo '    <span class="badge">Calificación: '.stars($partes[2]).'</span>';
		echo '    <span class="badge" id="cmt-'.$partes[4].'">Comentarios: '.contarComentarios($partes[4]).'</span>';
		echo '    <p>';
		echo '      <hr>';
		echo '      <h4>Comentarios:</h4>';
		echo '      <div id="div-'.$partes[4].'">';

		$comentarios = fopen("../data/comentarios/comentarios-meme-".$partes[4].".csv", "r");
		// Comentarios
		while($coment = fgets($comentarios)){
			$info = explode(",", $coment);
			echo '      <div>';
			echo '        <b>'.$info[0].'</b>';
			echo '        <p class="commentario">'.$info[1].'</p>  ';
			echo '      </div>';
		}
		echo '</div>';
		echo '<textarea class="form-control" placeholder="Nuevo comentario" id="textarea-'.$partes[4].'"></textarea>';
		echo "<br>";
		echo "<div class='text-right'>";
		echo '<input type = "button" value="Comentar" class="btn btn-primary" onclick="comentar(\''.$partes[4].'\');">';
		echo"</div>";
		echo '    </p>';
		echo '  </div>';
		echo '</div>';
	}
	fclose($archivo);
?>
