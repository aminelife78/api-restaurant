CREATE DATABASE restaurant;

CREATE TABLE categories(
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL UNIQUE,
  create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE plats(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL UNIQUE,
    descreption TEXT NOT NULL,
    prix DECIMAL(5,2) NOT NULL,
    image VARCHAR(500) NOT NULL,
    categories_id INT NOT NULL,
    FOREIGN KEY (categories_id) REFERENCES categories(id) ON DELETE CASCADE
     
);


CREATE TABLE menus(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE
    );


CREATE TABLE formules(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    descreption TEXT NOT NULL,
    prix DECIMAL(5,2) NOT NULL,
    menus_id INT NOT NULL,
    FOREIGN KEY (menus_id) REFERENCES menus(id) ON DELETE CASCADE

    );



CREATE TABLE users(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(250) NOT NULL UNIQUE,
    phone CHAR(15),
    password VARCHAR(25) NOT NULL,
    nombre_convives INT,
    allergies TEXT,
    role ENUM('admin','client') NOT NULL DEFAULT 'client',
    passwordResetCode VARCHAR(255),
    passwordResetExpires DATETIME,
    passwordResetVirified BOOLEAN DEFAULT false,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP

);


CREATE TABLE galerie(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    image TEXT NOT NULL,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP
    
);

CREATE TABLE horaires_ouverture(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    jours VARCHAR(25) NOT NULL UNIQUE,
    heure_matin VARCHAR(100)NOT NULL,
    heure_soir VARCHAR(100) NOT NULL
       
);


CREATE TABLE tables(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nbr_convive INT NOT NULL,
    time TIME NOT NULL,
    temps ENUM("midi","soir") NOT NULL
    
);



    CREATE TABLE reservations(  
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) not null,
    email VARCHAR(150) not null,
    phone VARCHAR(15) not null,
    date DATE NOT NULL,
    heure TIME NOT NULL,
    nombre_couverts INT NOT NULL DEFAULT 2,
    allergies TEXT,
    clients_id INT,
    tables_id INT,
    FOREIGN KEY (clients_id) REFERENCES users(id),
    FOREIGN KEY (tables_id) REFERENCES tables(id)
);






INSERT INTO `horaires_ouverture`( `jours`, `heure_matin`, `heure_soir`) VALUES 
('Lundi','12:00-14:00','19:00-22:00'),
('Mardi','12:00-14:00','19:00-22:00'),
('Mercredi','12:00-14:00','19:00-22:00'),
('Jeudi','12:00-14:00','19:00-22:00'),
('Vendredi','Fermé',''),
('Samedi','12:00-14:00','19:00-23:00'),
('Dimanche','12:00-14:00','');













