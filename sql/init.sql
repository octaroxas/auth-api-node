CREATE EXTENSION IF NOT EXISTS "uuid-ossp" 
CREATE EXTENSION IF NOT EXISTS "pgcrypto" 

CREATE TABLE IF NOT EXISTS application_user(
    uuid uuid DEFAULT uuid_generate_v4(),
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY (uuid)
);
/*
    a função cript é nativa do postgres e recebe como parametro a senha e uma string para fazer 
    o hash, posteriormente devemos usar essa string hash para gerar a critografia novamente para
    comparar a senha informada com a senha do banco, já que não podemos reverter a criptografia
*/
INSERT INTO application_user(username, password)values('Octacilio',crypt('oct44','secret-hash'))
