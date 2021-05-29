CREATE DATABASE muestras_medicas_db;

CREATE TABLE `catalogos` (
  `codigo_catalogo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`codigo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `datos_catalogos` (
  `codigo_dato_catalogo` int NOT NULL AUTO_INCREMENT,
  `codigo_catalogo` int NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`codigo_dato_catalogo`),
  CONSTRAINT `codigo_catalogo_a` FOREIGN KEY (`codigo_catalogo`) REFERENCES `catalogos` (`codigo_catalogo`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 ;


CREATE TABLE `usuarios` (
  `nit_usuario` varchar(11) NOT NULL,
  `codigo_rol` int NOT NULL,
  `codigo_estado` int NOT NULL,
  `nombre_usuario` varchar(100) NOT NULL,
  `user_usuario` varchar(50) NOT NULL,
  `password_usuario` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`nit_usuario`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `clientes` (
  `nit_cliente` varchar(11) NOT NULL,
  `cdigo_tipo_solicitante` int NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `direccion_cliente` varchar(100) NOT NULL,
  `telefonos` varchar(100) NOT NULL,
  `codigo_estado` int NOT NULL,
  `email` varchar(50) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`nit_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `expedientes` (
  `no_expediente` varchar(21) NOT NULL,
  `nit_cliente` varchar(11) NOT NULL,
  `observaciones` varchar(100) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`no_expediente`),
  CONSTRAINT `nit_cliente_a` FOREIGN KEY (`nit_cliente`) REFERENCES `clientes` (`nit_cliente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `muestras` (
  `codigo_muestra` varchar(21) NOT NULL,
  `codigo_tipo_muestra` int NOT NULL,
  `unidad_medica` int NOT NULL,
  `presentacion` varchar(2000) NOT NULL, 
  `cantidadUnidades` int NOT NULL, 
  `cantidadMuestras` int,
  `itemsAsociados` varchar(10000), 
  `adjunto` blob null,
  `codigo_estado` int NOT NULL,
  `fecha_vencimiento` datetime NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`codigo_muestra`)
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `solicitudes_de_muestras` (
  `codigo_solicitud` varchar(21) NOT NULL,
  `codigo_tipo_solicitante` int NOT NULL,
  `codigo_tipo_solicitud` int NOT NULL,
  `no_expediente` varchar(21) NOT NULL,
  `codigo_tipo_soporte` int NOT NULL,
  `codigo_estado` int NOT NULL,  
  `usuario_asignacion` varchar(11),  
  `usuario_anterior` varchar(11), 
  `revisor_anterior` varchar(11),  
  `no_soporte` varchar(50) NOT NULL,
  `nit` varchar(11),  
  `cantidad_de_muestras` int,  
  `dias_de_items` int,
  `dias_vencimiento` int,
  `descripcion` varchar(2000),
  `telefonos` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`codigo_solicitud`),
  CONSTRAINT `no_expediente_a` FOREIGN KEY (`no_expediente`) REFERENCES `expedientes` (`no_expediente`),
  CONSTRAINT `usuario_asignacion_a` FOREIGN KEY (`usuario_asignacion`) REFERENCES `usuarios` (`nit_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;


CREATE TABLE `etiqueta_de_muestra` (
  `codigo_etiqueta` int NOT NULL AUTO_INCREMENT,
  `codigo_muestra` varchar(21) NOT NULL,
  `codigo_solicitud` varchar(21) NOT NULL,
  `no_expediente` varchar(21) NOT NULL,
  `codigo_qr` varchar(34) NOT NULL,
  `descripcion` varchar(500) NOT NULL,  
  `fecha_creacion` datetime NOT NULL,
  `codigo_estado` int NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  PRIMARY KEY (`codigo_etiqueta`),
  CONSTRAINT `no_expediente_fk` FOREIGN KEY (`no_expediente`) REFERENCES `expedientes` (`no_expediente`),
  CONSTRAINT `codigo_solicitud_fk` FOREIGN KEY (`codigo_solicitud`) REFERENCES `solicitudes_de_muestras` (`codigo_solicitud`),
  CONSTRAINT `codigo_muestra_fk` FOREIGN KEY (`codigo_muestra`) REFERENCES `muestras` (`codigo_muestra`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;

CREATE TABLE `historial_estados` (
  `codigo_historial` int NOT NULL AUTO_INCREMENT,
  `codigo_solicitud` varchar(21) NOT NULL,
  `codigo_estado` int NOT NULL,
  `observaciones_cambio_estado` varchar(500) NULL,
  `adjunto` blob null,
  `usuario` varchar(21) NOT NULL,  
  `fecha_creacion` datetime NOT NULL,
  `usuario_creacion` varchar(50) NOT NULL,
  `ip_usuario_creacion` varchar(20) NOT NULL,
  `fecha_modificacion` datetime NULL,
  `usuario_modificacion` varchar(50) NULL,
  `ip_usuario_modificacion` varchar(20) NULL,
  `duracion` varchar(20),
  `acumulado` varchar(20),
  PRIMARY KEY (`codigo_historial`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;