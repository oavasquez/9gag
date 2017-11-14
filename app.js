var express=require('express');
var mysql=require('mysql');
var bodyParser=require('body-parser');
var app=express();


var conexion=mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"9gagDB"
});



app.use(express.static("public"));

var urlencodedParser =bodyParser.urlencoded({extended:true});






app.get('/',function(peticion,respuesta){
	respuesta.send("public/index.html");

});

app.post('/loginUsuario',urlencodedParser,function(peticion,respuesta){


	conexion.query(
			"SELECT nombreUsuario as usuario, idUsuario as codigo, imagenUsuario as imagen "+
			"FROM tblUsuarios "+
			"WHERE nombreUsuario= ? AND contrasena= ?",
			[peticion.body.usuario,peticion.body.contrasena], 
			function(err, filas, campos){
		if(err) throw err;
		respuesta.send(JSON.stringify(filas));

		
	});

});

app.post('/subirMeme',urlencodedParser,function(peticion,respuesta){
	

	conexion.query(
			'INSERT INTO tblMeme (idMeme, descripcionMeme, puntuacion, urlImage, idUsuario) '+
			'VALUES (null, ?, ?, ?, ?)',
			[peticion.body.descripcion,peticion.body.puntuacion,peticion.body.imagen,peticion.body.usuario], 
			function(err, filas, campos){
		if(err) throw err;

		respuesta.send(JSON.stringify(filas));
		
		
		
	});

});



app.post('/cargarMemes',urlencodedParser,function(peticion,respuesta){
	

	conexion.query(
			'SELECT A.idMeme as codigo, A.descripcionMeme as descripcion, A.puntuacion, '+ 
				   'A.urlImage as imagen, B.nombreUsuario as usuario, B.imagenUsuario as imagenUsuario '+
			'FROM tblMeme AS A '+
			'INNER JOIN tblUsuarios AS B '+
			'ON(A.idUsuario=B.idUsuario)',
			function(err, filas, campos){
		if(err) throw err;

		respuesta.send(JSON.stringify(filas));
         	
		
	});

});

app.post('/cargarMemesComentarios',urlencodedParser,function(peticion,respuesta){
	

	conexion.query(
			'SELECT A.idMeme as idMeme, A.contenido, C.nombreUsuario as usuario '+   
			'FROM tblComentarios A '+
			'INNER JOIN tblUsuarios C '+ 
			'ON(A.idUsuario=C.idUsuario) '+
			'WHERE A.idMeme=?',
			[peticion.body.idMeme],
			function(err, filas, campos){
		if(err) throw err;

		respuesta.send(JSON.stringify(filas));
         	
		
	});

});


app.post('/contarComentarios',urlencodedParser,function(peticion,respuesta){
	

	conexion.query(
			'SELECT count(idComentario) as cantidad '+
			'FROM tblComentarios '+
			'WHERE idMeme=?',
			[peticion.body.idMeme],
			function(err, filas, campos){
		if(err) throw err;

		respuesta.send(JSON.stringify(filas));
         	
		
	});

});


app.post('/guardarComentarios',urlencodedParser,function(peticion,respuesta){
	

	conexion.query(
			'INSERT INTO tblComentarios (idComentario, contenido, idMeme, idUsuario) VALUES (NULL, ?, ?, ?)',
			[peticion.body.coment,peticion.body.id,peticion.body.codigoUsuario],
			function(err, filas, campos){
		if(err) throw err;

		respuesta.send(JSON.stringify(filas));
         	
		
	});

});




app.listen(3000,function(){

	console.log('Servidor levantado en el puerto 3000');
});






