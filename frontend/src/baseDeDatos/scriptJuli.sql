CREATE TABLE Beneficiario (
  ID SERIAL PRIMARY KEY,
  Nombre VARCHAR(100),
  Usuario VARCHAR(100),
  Email VARCHAR(100),
  Celular VARCHAR(100),
  Cedula VARCHAR(100),
  password VARCHAR(100),
  Fecha_Nacimiento DATE
);

CREATE TABLE Empresa (
  ID SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  Usuario VARCHAR(100) NOT NULL
);

CREATE TABLE PublicacionBen (
  ID SERIAL PRIMARY KEY,
  Contenido VARCHAR(500) NOT NULL,
  fecha_publicacion DATE 
);


CREATE TABLE Imagen (
  ID SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Imagen BYTEA,
  FK_idPublicacionBen INTEGER NOT NULL,
  FOREIGN KEY (FK_idPublicacionBen) REFERENCES PublicacionBen(ID)
);
