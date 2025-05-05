-- Création de la base de données
CREATE DATABASE IF NOT EXISTS the_pearl;
USE the_pearl;

-- Table des clients
CREATE TABLE IF NOT EXISTS clients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL
);

-- Table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL
);

-- Table des plats
CREATE TABLE IF NOT EXISTS plats (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL,
    categorie_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (categorie_id) REFERENCES categories(id)
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS commandes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'en_preparation', 'terminee', 'annulee') DEFAULT 'en_attente',
    total DECIMAL(10,2) NOT NULL,
    client_id INT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
);

-- Table des détails de commande
CREATE TABLE IF NOT EXISTS details_commande (
    id INT PRIMARY KEY AUTO_INCREMENT,
    commande_id INT,
    plat_id INT,
    quantite INT NOT NULL,
    prix_unitaire DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (plat_id) REFERENCES plats(id)
);

-- Insertion des catégories
INSERT INTO categories (nom) VALUES
('Entrées'),
('Plats Principaux'),
('Desserts');

-- Insertion des plats
INSERT INTO plats (nom, description, prix, categorie_id) VALUES
-- Entrées
('Salade César', 'Laitue romaine, poulet grillé, parmesan, croûtons, sauce césar', 12.90, 1),
('Soupe à l''oignon', 'Soupe traditionnelle gratinée au fromage', 8.90, 1),
('Terrine de foie gras', 'Terrine maison, confiture d''oignons, pain toasté', 16.90, 1),

-- Plats Principaux
('Filet de boeuf', 'Filet de boeuf, sauce au poivre, pommes de terre', 28.90, 2),
('Saumon grillé', 'Pavé de saumon, légumes de saison, sauce hollandaise', 24.90, 2),
('Risotto aux champignons', 'Risotto crémeux aux champignons de Paris', 19.90, 2),

-- Desserts
('Crème brûlée', 'Crème brûlée à la vanille de Madagascar', 8.90, 3),
('Tarte Tatin', 'Tarte Tatin traditionnelle, crème fraîche', 9.90, 3),
('Mousse au chocolat', 'Mousse au chocolat noir, chantilly', 8.90, 3); 