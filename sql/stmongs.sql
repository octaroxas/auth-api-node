CREATE EXTENSION IF NOT EXISTS "uuid-ossp" 
CREATE EXTENSION IF NOT EXISTS "pgcrypto" 

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);

CREATE TABLE IF NOT EXISTS UserType (
	type_id SERIAL NOT NULL,
	type_name VARCHAR(30),
	PRIMARY KEY (type_id)
);

CREATE TABLE IF NOT EXISTS Usuario (
	id uuid DEFAULT uuid_generate_v4(),
	name VARCHAR(45) NOT NULL,
	email CHARACTER VARYING NOT NULL,
	reg_number VARCHAR(14) NOT NULL,
	profile_pic VARCHAR(400) DEFAULT NULL,
	profile_cover VARCHAR(400) DEFAULT NULL,
	description_text VARCHAR(500) DEFAULT NULL,
	passwrd CHARACTER VARYING NOT NULL,
	user_type INT NOT NULL,
	PRIMARY KEY (id),
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
INSERT INTO usertype(type_name)values('P_FISICA');
INSERT INTO usertype(type_name)values('ONG');

/*INSERT INTO application_user(username, password)values('Octacilio',crypt('oct44','secret-hash'))*/

INSERT INTO Usuario(
        name, 
        email, 
        reg_number,
        profile_pic,
        profile_cover,
        description_text,
        passwrd,
        user_type
    )
    values(
        'Octacilio',
        'octa.oca44@gmail.com',
        '02485080222',
        'https://i.ibb.co/Jk3GHd7/git.jpg',
        'https://i.ibb.co/hy0T2BB/fundo-quiz.jpg',
        'Estudante de Ciência da Computação',
        crypt('octabebe','secret-hash'),
        1
    );

    INSERT INTO Usuario(
        name, 
        email, 
        reg_number,
        profile_pic,
        profile_cover,
        description_text,
        passwrd,
        user_type
    )
    values(
        'União Animal',
        'uniao@gmail.com',
        '40106854000171',
        'https://i.ibb.co/RcPq2XT/uniao-profile.png',
        'https://i.ibb.co/smwcFhg/uniao-cover.png',
        'Olá, somos a ONG União Animal, somos uma ONG que reune pessoas que adotam a causa dos animais e buscam cuidá-los e ajudar a encontrar um bom lar para eles. Recentemente resgatamos caezinhos ainda filhotes, mas precisamos ter ração suficiente para alimentá-los, junto aos demais que já estavam sob nossos cuidados. Agradecemos toda ajuda que puder oferecer.',
        crypt('uniao','secret-hash'),
        2
    );