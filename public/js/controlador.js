// Carga de usuarios
$(document).ready(function(){
cargarMemes();


		
	

$('#btnLogin').click(function(){
	var parametros='usuario='+$('#txtNombre').val()+'&contrasena='+$("#txtContrasena").val();

	$.ajax({
		url:"/loginUsuario",
		data:parametros,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			
			if (respuesta.length>0) {


			$("#form-login").fadeOut(50);
			
			$("#divRegistroMeme").fadeIn(50);
			
			$("#user-details").html("Bienvenido: "+respuesta[0].usuario);
			$("#txtCodigoUsuario").val(respuesta[0].codigo);
			$("#txtNombreUsuario").val(respuesta[0].usuario);
			$("#user-details").fadeIn(50);
			$("#user-details").prepend('<img src="'+respuesta[0].imagen+'" class="img-responsive img-circle"></label>')
			//$("#txt-codigo-usuario").val(respuesta[0].codigo);
			
			}
		},
		error: function(e){
			console.log(e);
		}

	});





});



/*
	$.ajax({
		url:"ajax/carga-usuarios.php",
		data:"",
		method:"POST",
		success:function(respuesta){
			$("#lista-usuarios").append(respuesta);
		},
		error: function(e){
			console.log(e);
		}

	});

	'<label>Goku<input id="rbt-goku" type="radio" value="Goku" name="rbt-foto"><img src="img/goku.jpg" class="img-responsive img-circle"></label>'
});

*/

// Guardar Meme
$("#btnGuardarRegistro").click(function(){
	var parametros = 
		"descripcion="+$("#txt-descripcion").val()+"&"+
		"usuario="+$("#txtCodigoUsuario").val()+"&"+
		"puntuacion="+$("#txt-puntuacion").val()+"&"+
		"imagen="+$("#slc-imagen").val();
	$.ajax({
		url:"/subirMeme",
		data:parametros,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			if(respuesta.affectedRows>0){


			$("#div-memes").append(
					 '<div class="col-lg-6 col-sm-12 col-xs-12 col-md-6">'+
					 '  <div class="well card">'+
					 '    <strong>'+$("#txtNombreUsuario").val()+'</strong>'+
					 '    <p>'+$("#txt-descripcion").val()+'</p>'+
					 '    <img src="'+$("#slc-imagen").val()+'" class="img-responsive">'+
					 '    <span class="badge">Calificación: '+agregarStart($("#txt-puntuacion").val())+'</span>'+
					 '    <span class="badge" id="cmt-'+respuesta.insertId+'">Comentarios: </span>'+
					 '    <p>'+
					 '      <hr>'+
					 '      <h4>Comentarios:</h4>'+
					 '      <div id="div-'+respuesta.insertId+'">'+
					 '		</div>'+
					 '<textarea class="form-control" placeholder="Nuevo comentario" id="textarea-'+respuesta.insertId+'"></textarea>'+
					 '<br>'+
					 '<div class="text-right">'+
					 '<input type = "button" value="Comentar" class="btn btn-primary" onclick="comentar(\''+respuesta.insertId+'\');">'+
					'</div>'+
					 '    </p>'+
					 '  </div>'+
					 '</div>'
					);
			}
			
		},
		error:function(e){
			alert("Error: "+e);
		}
	});
});





// Cargar Memes
function cargarMemes(){

	$.ajax({
		url:"/cargarMemes",
		data:"",
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length;i++){
			
				$("#div-memes").append(
					 '<div class="col-lg-6 col-sm-12 col-xs-12 col-md-6">'+
					 '  <div class="well card">'+
					 '    <strong>'+respuesta[i].usuario+'</strong>'+
					 '    <p>'+respuesta[i].descripcion+'</p>'+
					 '    <img src="'+respuesta[i].imagen+'" class="img-responsive">'+
					 '    <span class="badge">Calificación: '+agregarStart(respuesta[i].puntuacion)+'</span>'+
					 '    <span class="badge" id="cmt-'+respuesta[i].codigo+'">Comentarios: </span>'+
					 '    <p>'+
					 '      <hr>'+
					 '      <h4>Comentarios:</h4>'+
					 '      <div id="div-'+respuesta[i].codigo+'">'+
					 '		</div>'+
					 '<textarea class="form-control" placeholder="Nuevo comentario" id="textarea-'+respuesta[i].codigo+'"></textarea>'+
					 '<br>'+
					 '<div class="text-right">'+
					 '<input type = "button" value="Comentar" class="btn btn-primary" onclick="comentar(\''+respuesta[i].codigo+'\')">'+
					'</div>'+
					 '    </p>'+
					 '  </div>'+
					 '</div>'
					);
			
				cargarComentarios(respuesta[i].codigo);
				contarComentarios(respuesta[i].codigo);
			}
		},
		error:function(e){
			console.log("Error: "+e);
		}
		
	});
}


function cargarComentarios(idMeme){
	var parametro='idMeme='+idMeme;

	$.ajax({
		url:"/cargarMemesComentarios",
		data:parametro,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			for(var i=0; i<respuesta.length;i++){
				$("#div-"+idMeme).append(
					 '      <div>'+
					 '        <b>'+respuesta[i].usuario+'</b>'+
					 '        <p class="commentario">'+respuesta[i].contenido+'</p>  '+
					 '      </div>'
					 );
			}
		},
		error:function(e){
			alert("Error: "+e);
		}

	});




	

}


function agregarStart(puntuacion){
	var cadena=""

	for(var i=0;i<puntuacion;i++){
		cadena=cadena+'<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';
	}
	return cadena;

}

});

// Comentar Memes
function comentar(temp){
	//Comentario
	var usuario = $("#txtCodigoUsuario").val();
	var coment = $("#textarea-"+temp).val();
	if(coment!=""){
		var parametros = "codigoUsuario="+usuario+"&coment="+coment+"&id="+temp;
		$.ajax({
			url: "/guardarComentarios",
			method: "POST",
			data: parametros,
			success:function(respuesta){
				
				$("#div-"+temp).append(
					 '      <div>'+
					 '        <b>'+$("#txtNombreUsuario").val()+'</b>'+
					 '        <p class="commentario">'+coment+'</p>  '+
					 '      </div>'
					);
			
			},
			error:function(e){
				console.log(e);
			}
		});
		$("#textarea-"+temp).val("");
	}

	//Actualizar contador
	contarComentarios(temp);
}

function contarComentarios(idMeme){

	var parametro='idMeme='+idMeme;
	

	$.ajax({
		url:"/contarComentarios",
		data:parametro,
		method:"POST",
		dataType:"json",
		success:function(respuesta){

			$("#cmt-"+idMeme).append(respuesta[0].cantidad);
			
			
		},
		error:function(e){
			alert("Error: "+e);
		}

	});

}