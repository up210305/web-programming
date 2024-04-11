
USE todoApp;
CREATE DATABASE `todoApp`;

CREATE TABLE `user` (
    `idUser` INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(20) NOT NULL,
    `lastname` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL
);

CREATE TABLE `task` (
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    completed TINYINT(1) NOT NULL DEFAULT 0,
    idUser INT(11) NOT NULL,
    FOREIGN KEY (idUser) REFERENCES `user` (id)
);


INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`) VALUES (1, 'Rogelio', 'Trejo', 'trejo.rogeliogmail.com');