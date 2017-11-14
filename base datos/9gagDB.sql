-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 14-11-2017 a las 05:52:02
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `9gagDB`
--
CREATE DATABASE IF NOT EXISTS `9gagDB` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `9gagDB`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblComentarios`
--

CREATE TABLE IF NOT EXISTS `tblComentarios` (
  `idComentario` int(11) NOT NULL AUTO_INCREMENT,
  `contenido` varchar(45) DEFAULT NULL,
  `idMeme` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idComentario`,`idMeme`),
  KEY `fk_tblComentarios_tblMeme1_idx` (`idMeme`),
  KEY `fk_tblComentarios_tblUsuarios1_idx` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `tblComentarios`
--

TRUNCATE TABLE `tblComentarios`;
--
-- Volcado de datos para la tabla `tblComentarios`
--

INSERT INTO `tblComentarios` (`idComentario`, `contenido`, `idMeme`, `idUsuario`) VALUES
(1, 'jajajjajajjajaj', 1, 1),
(2, 'lol', 1, 1),
(3, 'muy gracioso', 3, 2),
(4, 'jajajja', 2, 1),
(5, 'muy gracioso', 2, 1),
(6, 'que graciosoasdsa', 2, 1),
(7, ':D', 1, 1),
(8, 'jajajjaj', 1, 1),
(9, 'lol', 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblMeme`
--

CREATE TABLE IF NOT EXISTS `tblMeme` (
  `idMeme` int(11) NOT NULL AUTO_INCREMENT,
  `descripcionMeme` varchar(45) DEFAULT NULL,
  `puntuacion` varchar(45) DEFAULT NULL,
  `urlImage` varchar(45) DEFAULT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idMeme`),
  KEY `fk_tblMeme_tblUsuarios_idx` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `tblMeme`
--

TRUNCATE TABLE `tblMeme`;
--
-- Volcado de datos para la tabla `tblMeme`
--

INSERT INTO `tblMeme` (`idMeme`, `descripcionMeme`, `puntuacion`, `urlImage`, `idUsuario`) VALUES
(1, 'Meme1', '5', 'img/memes/meme_01.jpg', 1),
(2, 'meme2', '3', 'img/memes/meme_02.jpg', 2),
(3, 'meme3', '4', 'img/memes/meme_03.jpg', 2),
(5, 'meme4', '4', 'img/memes/meme_04.jpg', 1),
(6, 'meme5', '3', 'img/memes/meme_05.jpg', 1),
(7, 'meme6', '5', 'img/memes/meme_06.jpg', 1),
(8, 'meme7', '5', 'img/memes/meme_07.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tblUsuarios`
--

CREATE TABLE IF NOT EXISTS `tblUsuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `imagenUsuario` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `tblUsuarios`
--

TRUNCATE TABLE `tblUsuarios`;
--
-- Volcado de datos para la tabla `tblUsuarios`
--

INSERT INTO `tblUsuarios` (`idUsuario`, `nombreUsuario`, `contrasena`, `imagenUsuario`) VALUES
(1, 'Goku', 'asd123', 'img/goku.jpg'),
(2, 'Vegueta', 'asd123', 'img/vegeta.jpg');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tblComentarios`
--
ALTER TABLE `tblComentarios`
  ADD CONSTRAINT `fk_tblComentarios_tblMeme1` FOREIGN KEY (`idMeme`) REFERENCES `tblMeme` (`idMeme`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tblComentarios_tblUsuarios1` FOREIGN KEY (`idUsuario`) REFERENCES `tblUsuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tblMeme`
--
ALTER TABLE `tblMeme`
  ADD CONSTRAINT `fk_tblMeme_tblUsuarios` FOREIGN KEY (`idUsuario`) REFERENCES `tblUsuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
