<?php

	$usuario = $_POST["usuario"];
	$coment = str_replace("\n", "", $_POST["coment"]);
	$id = $_POST["id"];

	$archivo = fopen("../data/comentarios/comentarios-meme-".$id.".csv", "a+");
	fwrite($archivo, $usuario.",".$coment."\n");
	fclose($archivo);

	echo '      <div>';
	echo '        <b>'.$usuario.'</b>';
	echo '        <p class="commentario">'.$coment.'</p>  ';
	echo '      </div>';
?>