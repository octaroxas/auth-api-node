CREATE EXTENSION IF NOT EXISTS "uuid-ossp" 
CREATE EXTENSION IF NOT EXISTS "pgcrypto" 

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS Usuario (
  uuid uuid DEFAULT uuid_generate_v4(),
  username VARCHAR(45) NOT NULL,
  email CHARACTER VARYING NOT NULL,
  reg_number VARCHAR(14) NOT NULL,
  password VARCHAR NOT NULL,
  user_type INT NOT NULL,
  PRIMARY KEY (uuid),
  FOREIGN KEY (user_type) REFERENCES UserType(type_id)
);

CREATE TABLE IF NOT EXISTS UserType (
	type_id SERIAL NOT NULL,
	type_name VARCHAR(30),
	PRIMARY KEY (type_id)
);

/*
    a função cript é nativa do postgres e recebe como parametro a senha e uma string para fazer 
    o hash, posteriormente devemos usar essa string hash para gerar a critografia novamente para
    comparar a senha informada com a senha do banco, já que não podemos reverter a criptografia
*/

/* Tipos de usuarios inseridos no banco de dados*/
INSERT INTO UserType(
    type_id, 
    type_name
    )
    values(
        1,
        'FISIC'
    );

    INSERT INTO UserType(
    type_id, 
    type_name
    )
    values(
        2,
        'ONG'
    );

/*INSERT INTO application_user(username, password)values('Octacilio',crypt('oct44','secret-hash'))*/

INSERT INTO Usuario(
        username, 
        email, 
        reg_number,
        password,
        user_type
    )
    values(
        'Octacilio',
        'octa.oca44@gmail.com',
        '02485080222',
        crypt('octabebe','secret-hash'),
        1
    )

    INSERT INTO Usuario(
        username, 
        email, 
        reg_number,
        password,
        user_type
    )
    values(
        'União Animal',
        'uniao@gmail.com',
        '84213898000189',
        crypt('uniao','secret-hash'),
        2
    )