INSERT INTO `catalogos` VALUES (1, 'Tipo Muestra', 'Tipos de muestras medicas.', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
    							(2, 'Unidad Medica', 'Unidades medicas.', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                (3, 'Estados Solicitud', 'Estados en los que puede estar una solicitud', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                (4, 'Tipo Soporte', 'Tipos de soporte que puede tener una solicitud.', '2021-03-03', 'master', '0.0.0.0', null, '',''),
                                (5, 'Tipo solicitud', 'Tipos que puede ser una soliciud', '2021-03-03', 'master', '0.0.0.0', null, '',''),
                                (6, 'Tipo solicitante', 'Tipos de solicitantes que pueden crear una solicitud.', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
				(7, 'Tipo solicitante', 'Tipos de solicitantes que pueden crear una solicitud.', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
				(8, 'Tipo Soporte Interno', 'Tipos de soporte cuando se selecciona interno.', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
				(9, 'Tipo Soporte Externo', 'Tipos de soporte cuando se selecciona externo.', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
				(10, 'Estados generales', 'Estados generales', '2021-03-03', 'master', '0.0.0.0', null, '', '');


INSERT INTO `datos_catalogos` VALUES (1, 1, 'Cultivo', 'Cultivo', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (2, 1, 'Plaquetas', 'Plaquetas', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (3, 1, 'Eses', 'Eses', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (4, 1, 'Orina', 'Orina', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (5, 2, 'Mililitros', 'Mililitros', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (6, 2, 'Gramos', 'Gramos', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (7, 2, 'Miligramos', 'Miligramos', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (8, 3, 'Creado', 'Creado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (9, 3, 'Enviado', 'Enviado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (10, 3, 'Asignado', 'Asignado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (11, 3, 'Analisis', 'Analisis', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (12, 3, 'Revision', 'Revision', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (13, 3, 'Espera', 'Espera', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (14, 3, 'Rechazado', 'Rechazado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (15, 3, 'Autorizado', 'Autorizado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (16, 3, 'Finalizado', 'Finalizado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (17, 3, 'Eliminado', 'Eliminado', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (18, 4, 'SM-Solicitud Medica', 'SM-Solicitud Medica', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (19, 4, 'ET- Examén externo', 'ET- Examén externo', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (20, 4, 'FP-FCTURA', 'FP-FCTURA', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (21, 4, 'HO-Hoja de oficio', 'HO-Hoja de oficio', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (22, 5, 'MM-Muestra medica', 'MM-Muestra medica', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (23, 5, 'LQ-Laboratorio', 'LQ-Laboratorio', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (24, 6, 'IN-Usuario interno', 'IN-Usuario interno', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (25, 6, 'EX-Usuario externo', 'EX-Usuario externo', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (26, 7, 'rolUsuario', 'rolUsuario', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (27, 7, 'rolCentralizador', 'rolCentralizador', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (28, 7, 'rolAnalista', 'rolAnalista', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
                                        (29, 7, 'rolRevisor', 'rolRevisor', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(30, 7, 'rolAutorizador', 'rolAutorizador', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(31, 8, 'SM-Solicitud Medica', 'SM-Solicitud Medica', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(32, 8, 'ET- Examen externo', 'ET- Examen externo', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(33, 9, 'FP-FCTURA', 'FP-FCTURA', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(34, 9, 'HO-Hoja de oficio', 'HO-Hoja de oficio', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(35, 10, 'Activo', 'Activo', '2021-03-03', 'master', '0.0.0.0', null, '', ''),
					(36, 10, 'Inactivo', 'Inactivo', '2021-03-03', 'master', '0.0.0.0', null, '', '');


INSERT INTO `clientes` VALUES ('45185954845', 24, 'Jeissy Dariela Castellanos Hernandez', 'San Juan Sacatepequez', '12458495/65152458', 35, 'dariela@gmail.com', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `clientes` VALUES ('95854565123', 24, 'Juan Carlos Estrada Aguirre', 'San Raymundo', '45958584/52002556', 35, 'juancarlos@gmail.com', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `clientes` VALUES ('18545986565', 24, 'Martha Nineth Lopez Urizar', 'Lo de Mejia', '12348595', 35, 'martha@gmail.com', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `clientes` VALUES ('64584568489', 25, 'Pahola Marin Catalan', 'Zona 7, Guatemala', '45985875/78945858', 35, 'pahola@gmail.com', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `clientes` VALUES ('49548984954', 25, 'Rodolfo Bartolome Juarez Rojas', 'Zona 14', '52465859', 35, 'rodolfo@gmail.com', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `clientes` VALUES ('19584958756', 25, 'Mael Rosalio Rosales Rosas', 'Amatitlan', '49585946/95858485', 35, 'mael@gmail.com', '2021-03-03', 'master', '0.0.0.0', null, '', '');

INSERT INTO `expedientes` VALUES('4589-85-95-47-7845958', '45185954845', 'Expediente activo.', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `expedientes` VALUES('9858-59-45-71-4565848', '95854565123', 'Expediente activo.', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `expedientes` VALUES('9851-75-15-45-4598545', '18545986565', 'Expediente activo.', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `expedientes` VALUES('8495-77-55-66-1234567', '64584568489', 'Expediente activo.', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `expedientes` VALUES('4859-77-95-59-1595498', '49548984954', 'Expediente activo.', '2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `expedientes` VALUES('7895-45-89-45-4958548', '19584958756', 'Expediente activo.', '2021-03-03', 'master', '0.0.0.0', null, '', '');

INSERT INTO `usuarios` VALUES ('100255426', 26, 35, 'Elio Isai Raymundo Diaz', 'usuario', '1234','2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `usuarios` VALUES ('100255427', 27, 35, 'Lester Raul Toj', 'centralizador', '1234','2021-03-03', 'master', '0.0.0.0', '2021-05-27 07:59:51', '', '');
INSERT INTO `usuarios` VALUES ('97845688595', 28, 35, 'Diego Sebastian Mijangos Flores', 'analista','1234','2021-03-03', 'master', '0.0.0.0', '2021-05-27 07:59:51', '', '');
INSERT INTO `usuarios` VALUES ('98511544899', 29, 35, 'Denis Ivan Santizo Pocon', 'disantizo', '1234','2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `usuarios` VALUES ('44880459848', 30, 35, 'Madeline Yocary Coronado ', 'mycoronado', '1234','2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `usuarios` VALUES ('94587585888', 28, 35, 'Jorge Alberto Catalan Lopez ', 'analista1', '1234','2021-03-03', 'master', '0.0.0.0', '2021-05-27 08:59:51', '', '');
INSERT INTO `usuarios` VALUES ('10054887855', 26, 35, 'Rodrigo Saravia Saens ', 'usuario1', '1234','2021-03-03', 'master', '0.0.0.0', null, '', '');
INSERT INTO `usuarios` VALUES ('85245689424', 27, 35, 'Manuel Perez Corrales ', 'centralizador1', '1234','2021-03-03', 'master', '0.0.0.0', '2021-05-27 08:59:51', '', '');
