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











CREATE TABLE Empleado (
  ID_Empleado SERIAL PRIMARY KEY,
  Cedula_Emp BIGINT,
  Nombre_Emp VARCHAR(100),
  Apellido_Emp VARCHAR(100),
  Telefono_Emp VARCHAR(100),
  Direccion_Emp VARCHAR(300),
  Correo_Emp VARCHAR(200)
);

CREATE TABLE PublicacionDon (
  Id_Publicacion SERIAL PRIMARY KEY,
  Fecha_Publicacion DATE NOT NULL,
  Estado VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  Cantidad_Disponible INTEGER NOT NULL,
  Fecha_Cierre DATE NOT NULL,
  FK_idEmpresa INTEGER NOT NULL,
  FOREIGN KEY (FK_idEmpresa) REFERENCES Empresa(ID_Empresa)
);

CREATE TABLE Material_Donar (
  ID_Material SERIAL PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Cantidad INTEGER NOT NULL, -- Nueva columna para la cantidad
  Estado_Material VARCHAR(100) NOT NULL,
  Descripcion VARCHAR(100) NOT NULL,
  FK_idPublicacionDon INTEGER NOT NULL,
  FOREIGN KEY (FK_idPublicacionDon) REFERENCES PublicacionDon(Id_Publicacion)
);


CREATE TABLE Imagenes_Material (
  ID_Imagen SERIAL PRIMARY KEY,
  Imagen BYTEA NOT NULL,
  FK_ID_Material INTEGER NOT NULL,
  FOREIGN KEY (FK_ID_Material) REFERENCES Material_Donar(ID_Material),
  UNIQUE (FK_ID_Material, ID_Imagen) -- Garantiza que cada imagen tenga un ID único por material
);


