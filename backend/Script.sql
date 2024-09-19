CREATE TABLE Empleado (
  ID_Empleado SERIAL PRIMARY KEY,
  Cedula_Emp BIGINT,
  Nombre_Emp VARCHAR(100),
  Apellido_Emp VARCHAR(100),
  Telefono_Emp VARCHAR(100),
  Direccion_Emp VARCHAR(300),
  Correo_Emp VARCHAR(200)
);

CREATE TABLE Solicitud (
  ID_Solicitud SERIAL PRIMARY KEY,
  Estado_Solicitud VARCHAR(100)
);

CREATE TABLE Tipo_Contenido_Conversacion (
  ID_TipoCont_Conv SERIAL PRIMARY KEY,
  NombreContenidoConv VARCHAR(100)
);

CREATE TABLE Beneficiario (
  Cedula SERIAL PRIMARY KEY,
  Nombre VARCHAR(100),
  Apellido VARCHAR(100),
  Contraseña VARCHAR(100),
  Fecha_Nacimiento DATE,
  FK_CedulaAmigo BIGINT NOT NULL,
  FOREIGN KEY (FK_CedulaAmigo) REFERENCES Beneficiario(Cedula)
);

CREATE TABLE Cargo (
  ID_Cargo SERIAL PRIMARY KEY,
  Nombre_Cargo VARCHAR(100),
  Salario_Cargo VARCHAR(100)
);

CREATE TABLE Contrato (
  ID_Contrato SERIAL PRIMARY KEY,
  Fecha_Inicial_Con DATE,
  Fecha_Final_Con DATE,
  Estado_Con VARCHAR(50),
  Tipo_Con VARCHAR(100),
  FK_idEmpleado BIGINT NOT NULL,
  FK_idCargo BIGINT NOT NULL,
  FOREIGN KEY (FK_idEmpleado) REFERENCES Empleado(ID_Empleado),
  FOREIGN KEY (FK_idCargo) REFERENCES Cargo(ID_Cargo)
);

CREATE TABLE Empresa (
  ID_Empresa SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Contraseña VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE Notificaciones (
  ID_Notificaciones SERIAL PRIMARY KEY,
  Contenido VARCHAR(100) NOT NULL,
  Fecha_Generacion VARCHAR(100) NOT NULL,
  FK_CedulaBen BIGINT NOT NULL,
  FK_idEmpresa BIGINT NOT NULL,
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula),
  FOREIGN KEY (FK_idEmpresa) REFERENCES Empresa(ID_Empresa)
);

CREATE TABLE PublicacionDon (
  Id_Publicacion SERIAL PRIMARY KEY,
  Fecha_Publicacion DATE NOT NULL,
  Estado VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  Cantidad_Disponible INTEGER NOT NULL,
  Fecha_Cierre DATE NOT NULL,
  FK_idEmpresa BIGINT NOT NULL,
  FOREIGN KEY (FK_idEmpresa) REFERENCES Empresa(ID_Empresa)
);

--Antiguo nombre Material a Donar
CREATE TABLE Material_Donar (
  ID_Material SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Estado_Material VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  Imagen BYTEA,
  FK_idPublicacionDon BIGINT NOT NULL,
  FOREIGN KEY (FK_idPublicacionDon) REFERENCES PublicacionDon(Id_Publicacion)
);

CREATE TABLE Inscripcion (
  ID_Inscripcion SERIAL PRIMARY KEY,
  FK_idPublicacionDon BIGINT NOT NULL,
  FK_idSeguidor BIGINT NOT NULL,
  FOREIGN KEY (FK_idPublicacionDon) REFERENCES PublicacionDon(Id_Publicacion),
  FOREIGN KEY (FK_idSeguidor) REFERENCES Seguidor(ID_Seguidor)
);

CREATE TABLE Seguidor (
  ID_Seguidor SERIAL PRIMARY KEY,
  FK_idEmpresa BIGINT NOT NULL,
  FK_CedulaBen BIGINT NOT NULL,
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula),
  FOREIGN KEY (FK_idEmpresa) REFERENCES Empresa(ID_Empresa)
);

CREATE TABLE DatosInsc (
  ID_Datos SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Apellido VARCHAR(100) NOT NULL,
  celular VARCHAR(100) NOT NULL,
  Correo VARCHAR(100) UNIQUE NOT NULL,
  FK_idInscripcion BIGINT NOT NULL,
  FOREIGN KEY (FK_idInscripcion) REFERENCES Inscripcion(ID_Inscripcion)
);

CREATE TABLE Evento (
  ID_Evento SERIAL PRIMARY KEY,
  Fecha_Publicacion DATE NOT NULL,
  Fecha_Reunion DATE NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  FK_idEmpresa BIGINT NOT NULL,
  FOREIGN KEY (FK_idEmpresa) REFERENCES Empresa(ID_Empresa)
);

CREATE TABLE Detalle_Evento (
  ID_Detalle SERIAL PRIMARY KEY,
  FK_CedulaBen BIGINT NOT NULL,
  FK_idEvento BIGINT NOT NULL,
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula),
  FOREIGN KEY (FK_idEvento) REFERENCES Evento(ID_Evento)
);

CREATE TABLE Grupos (
  ID_Grupo SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Motivo VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  Tipo VARCHAR(100) NOT NULL
);

--Nombre anterior Miembros del Grupo
CREATE TABLE Miembros_Grupos (
  ID_Grupo SERIAL PRIMARY KEY,
  FK_idEmpresa BIGINT NOT NULL,
  FK_CedulaBen BIGINT NOT NULL,
  FK_idGrupo BIGINT NOT NULL,
  FOREIGN KEY (FK_idGrupo) REFERENCES Grupos(ID_Grupo),
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula),
  FOREIGN KEY (FK_idEmpresa) REFERENCES Empresa(ID_Empresa)
);

CREATE TABLE ContenidoBeneficiario (
  ID_ContenidoBen SERIAL PRIMARY KEY,
  Descripcion VARCHAR(250)
);

CREATE TABLE TipoCont (
  ID_TipoCont SERIAL PRIMARY KEY,
  Nombre_TipoCont VARCHAR(100),
  FK_idContenidoBen BIGINT NOT NULL,
  FOREIGN KEY (FK_idContenidoBen) REFERENCES ContenidoBeneficiario(ID_ContenidoBen)
);

CREATE TABLE Interaccion (
  ID_Interaccion SERIAL PRIMARY KEY,
  FK_CedulaBen BIGINT NOT NULL,
  FK_idContenidoBen BIGINT NOT NULL,
  FOREIGN KEY (FK_idContenidoBen) REFERENCES ContenidoBeneficiario(ID_ContenidoBen),
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula)
);

CREATE TABLE Tipo (
  ID_Tipo SERIAL PRIMARY KEY,
  Nombre_Tipo VARCHAR(100),
  FK_idInteraccion BIGINT NOT NULL,
  FOREIGN KEY (FK_idInteraccion) REFERENCES Interaccion(ID_Interaccion)
);

CREATE TABLE Comentario (
  ID_Comentario SERIAL PRIMARY KEY,
  Contenido VARCHAR(250),
  FK_idInteraccion BIGINT NOT NULL,
  FOREIGN KEY (FK_idInteraccion) REFERENCES Interaccion(ID_Interaccion)
);

CREATE TABLE Conversacion (
  ID_Conversacion SERIAL PRIMARY KEY,
  FK_CedulaBen BIGINT NOT NULL,
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula)
);

CREATE TABLE Contenido (
  ID_Contenido SERIAL PRIMARY KEY,
  FK_idTipoContenConver BIGINT NOT NULL,
  FK_idConversacion BIGINT NOT NULL,
  FOREIGN KEY (FK_idTipoContenConver) REFERENCES Tipo_Contenido_Conversacion(ID_TipoCont_Conv),
  FOREIGN KEY (FK_idConversacion) REFERENCES Conversacion(ID_Conversacion)
);

CREATE TABLE Amigo_Solicitud (
  ID_AmigoSolicitud SERIAL PRIMARY KEY,
  Tipo_Solicitud VARCHAR(100),
  FK_CedulaBen BIGINT NOT NULL,
  FK_idSolicitud BIGINT NOT NULL,
  FOREIGN KEY (FK_CedulaBen) REFERENCES Beneficiario(Cedula),
  FOREIGN KEY (FK_idSolicitud) REFERENCES Solicitud(ID_Solicitud)
);
