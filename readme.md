# CRUD SIMPLE - NO FRONT

## DB Conection:
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'dbnotas'

## Tables:
    CREATE TABLE IF NOT EXISTS estudiante (
        id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        escuela VARCHAR(50) NOT NULL
    );
   
    CREATE TABLE IF NOT EXISTS notas (
        id INT NOT NULL AUTO_INCREMENT UNIQUE PRIMARY KEY,
        lengua VARCHAR(50) NOT NULL,
        mate VARCHAR(50) NOT NULL,
        estudiante_id INT NOT NULL,
        FOREIGN KEY (estudiante_id) REFERENCES estudiante(id)
    );



> https://youtu.be/xZp5kvpAcIg
