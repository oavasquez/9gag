<?php 
	
	function stars($n){
		$line = "";
		for ($i=0; $i <$n ; $i++) { 
			$line.='<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
		}
		return $line;
	}

	function contarComentarios($id){
		$f = fopen("../data/comentarios/comentarios-meme-".$id.".csv", "r");
		$c=0;
		while($linea=fgets($f)){
			$c++;
		}
		return $c;
	}
 ?>