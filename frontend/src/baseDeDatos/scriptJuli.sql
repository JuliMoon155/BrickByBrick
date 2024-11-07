drop schema public cascade;
create schema public;

create table beneficiario
(
    id               serial primary key,
    nombre           varchar(100),
    usuario          varchar(100),
    email            varchar(100),
    celular          varchar(100),
    cedula           varchar(100),
    password         varchar(100),
    fecha_nacimiento date
);

create table empresa
(
    id          serial primary key,
    nombre      varchar(100) not null,
    password    varchar(100) not null,
    descripcion varchar(100) not null,
    usuario     varchar(100) not null
);

create table publicacionben
(
    id                serial primary key,
    contenido         varchar(500) not null,
    fecha_publicacion date,
    fk_idbeneficiario integer      not null,
    foreign key (fk_idbeneficiario) references beneficiario (id)
);


create table imagen
(
    id                  serial primary key,
    nombre              varchar(100) not null,
    imagen              bytea,
    fk_idpublicacionben integer      not null,
    foreign key (fk_idpublicacionben) references publicacionben (id)
);

create table publicaciondon
(
    id_publicacion      serial primary key,
    titulo              varchar(100) not null,
    fecha_publicacion   date         not null,
    estado              varchar(100) not null,
    cantidad_disponible integer      not null,
    descripcion         varchar(100) not null,
    fecha_cierre        date         not null,
    fk_idempresa        integer      not null,
    foreign key (fk_idempresa) references empresa (id)
);

create table material_donar
(
    id_material         serial primary key,
    nombre              varchar(100) not null,
    cantidad            integer      not null, -- nueva columna para la cantidad
    estado_material     varchar(100) not null,
    descripcion         varchar(100) not null,
    categoria           varchar(100) not null,
    fk_idpublicaciondon integer      not null,
    foreign key (fk_idpublicaciondon) references publicaciondon (id_publicacion)
);


create table imagenes_material
(
    id_imagen      serial primary key,
    imagen         bytea   not null,
    fk_id_material integer not null,
    foreign key (fk_id_material) references material_donar (id_material),
    unique (fk_id_material, id_imagen) -- garantiza que cada imagen tenga un id único por material
);

create type publicacion_parcial as
(
    id                integer,
    titulo            varchar(100),
    descripcion       varchar(100),
    fecha_publicacion date,
    fecha_cierre      date
);

create type empresa_parcial as
(
    id          integer,
    nombre      varchar(100),
    descripcion varchar(100)
);

create type material_parcial as
(
    id          integer,
    nombre      varchar(100),
    descripcion varchar(100),
    categoria   varchar(100),
    estado      varchar(100),
    cantidad    integer
);

create type resultado_busqueda as
(
    publicacion publicacion_parcial,
    empresa     empresa_parcial,
    materiales  material_parcial[]
);

create function buscar(
    texto text,
    categorias text[],
    cantidad_minima integer,
    cantidad_maxima integer
)
    returns json
    language plpgsql
as
$$
declare
    resultado resultado_busqueda;
    resultados
              resultado_busqueda[] := array []::resultado_busqueda[];
    publicacion
              publicaciondon%rowtype;
    vempresa
              empresa_parcial;
    material
              material_donar%rowtype;
    materiales
              material_parcial[]   := array []::material_parcial[];
begin
    for publicacion in
        select *
        from publicaciondon
        where id_publicacion in (select distinct publicaciondon.id_publicacion
                                 from publicaciondon
                                          inner join material_donar
                                                     on (
                                                            publicaciondon.titulo ~* texto or
                                                            publicaciondon.descripcion ~* texto or
                                                            material_donar.nombre ~* texto or
                                                            material_donar.descripcion ~* texto)
                                                         and (
                                                            upper(material_donar.categoria) = any
                                                            (categorias) or
                                                            cardinality(categorias) = 0)
                                                         and (
                                                            material_donar.cantidad >= cantidad_minima or
                                                            cantidad_minima = -1)
                                                         and (
                                                            material_donar.cantidad <= cantidad_maxima or
                                                            cantidad_maxima = -1)
                                                         and publicaciondon.estado != 'false')
        order by fecha_publicacion
        limit 100
        loop
            materiales := array []::material_donar[];

            select id, nombre, descripcion
            into vempresa
            from empresa
            where id = publicacion.fk_idempresa;

            for material in
                select *
                from material_donar
                where fk_idpublicaciondon = publicacion.id_publicacion
                  and (
                    upper(material_donar.categoria) = any (categorias) or
                    cardinality(categorias) = 0)
                  and (
                    material_donar.cantidad >= cantidad_minima or
                    cantidad_minima = -1)
                  and (
                    material_donar.cantidad <= cantidad_maxima or
                    cantidad_maxima = -1)
                loop
                    materiales := array_append(materiales, (material.id_material, material.nombre, material.descripcion,
                                                            material.categoria, material.estado_material,
                                                            material.cantidad)::material_parcial);
                end loop;

            -- se asignan los valores al resultado
            resultado.publicacion
                := (publicacion.id_publicacion, publicacion.titulo, publicacion.descripcion,
                    publicacion.fecha_publicacion, publicacion.fecha_cierre)::publicacion_parcial;
            resultado.empresa
                := vempresa;
            resultado.materiales
                := materiales;

            -- se añade el resultado a la lista de resultados
            resultados
                := array_append(resultados, resultado);
        end loop;
    -- se retornan los resultados
    return to_json(resultados);
end;
$$;

insert into beneficiario
values (default, 'andrés moreno', 'andmoreduro', 'safic913@gmail.com', '3045879324', '1193228375', 'contravivir',
        '2002-05-10');
insert into beneficiario
values (default, 'Pul', 'teo', 'spdpsdad', '2313131', '1000101', '1234', '');

insert into empresa
values (default, 'basureros del centro', 'centro', 'recogemos basura, adivinado dónde, en el centro', 'centro');
insert into empresa
values (default, 'basureros del norte', 'norte', 'recogemos basura, adivina dónde, en el norte', 'norte');
insert into empresa
values (default, 'basureros del sur', 'sur', 'recogemos basura, adivina dónde, en el sur', 'sur');
insert into empresa
values (default, 'basureros del este', 'este', 'recogemos basura, adivina dónde, en el este', 'este');
insert into empresa
values (default, 'basureros del oeste', 'oeste', 'recogemos basura, adivina dónde, en el oeste', 'oeste');
insert into empresa
values (default, 'Paulo', '1234', 'Una empresa feliz', 'Juan');

insert into publicaciondon
values (default, 'ladrillos de varios colores', now(), 'ok', 10, 'esta es la primera publicación',
        now() + interval '10 day', 1);
insert into material_donar
values (default, 'ladrillo rojo', floor(random() * 25 - 10 + 1) + 10, 'nuevo', 'como los ladrillos grises, pero rojo',
        'AGLOMERADOS', 1);
insert into material_donar
values (default, 'ladrillo azul', floor(random() * 25 - 10 + 1) + 10, 'nuevo', 'como los ladrillos grises, pero azul',
        'AGLOMERADOS', 1);
insert into material_donar
values (default, 'ladrillo verde', floor(random() * 25 - 10 + 1) + 10, 'nuevo', 'como los ladrillos grises, pero verde',
        'AGLOMERADOS', 1);
insert into material_donar
values (default, 'ladrillo morado', 20, 'nuevo', 'como los ladrillos grises, pero morado', 'AGLOMERADOS', 1);

insert into publicaciondon
values (default, 'ladrillos de colores varios', now(), 'ok', 10, 'esta es la segunda publicación',
        now() + interval '20 day', 2);
insert into material_donar
values (default, 'ladrillo plateado', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero plateado', 'AGLOMERADOS', 2);
insert into material_donar
values (default, 'ladrillo dorado', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero dorado', 'AGLOMERADOS', 2);
insert into material_donar
values (default, 'ladrillo carmesí', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero carmesí', 'AGLOMERADOS', 2);
insert into material_donar
values (default, 'ladrillo rosado', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero rosado', 'AGLOMERADOS', 2);


insert into publicaciondon
values (default, 'más ladrillos', now(), 'ok', 10, 'esta es la tercera publicación', now() + interval '30 day', 3);
insert into material_donar
values (default, 'ladrillo plateado', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero plateado', 'AGLOMERADOS', 2);
insert into material_donar
values (default, 'ladrillo dorado', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero dorado', 'AGLOMERADOS', 2);
insert into material_donar
values (default, 'ladrillo carmesí', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero carmesí', 'AGLOMERADOS', 2);
insert into material_donar
values (default, 'ladrillo rosado', floor(random() * 25 - 10 + 1) + 10, 'nuevo',
        'como los ladrillos grises, pero rosado', 'AGLOMERADOS', 2);