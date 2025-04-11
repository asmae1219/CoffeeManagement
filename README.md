# ☕ CoffeeManagement

CoffeeManagement est une application web conçue pour gérer et personnaliser différents types de cafés. Elle utilise **TypeScript** et **IndexedDB** pour une gestion efficace des données côté client, avec une architecture modulaire et évolutive.

---

## 📌 Sommaire

- [🧾 Description du projet](#-description-du-projet)
- [🚀 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture du projet](#️-architecture-du-projet)
- [🛠️ Technologies utilisées](#️-technologies-utilisées)
- [📦 Installation](#-installation)
- [💡 Exemple d'utilisation](#-exemple-dutilisation)
- [📈 Améliorations futures](#-améliorations-futures)
- [👩‍💻 Auteur](#-auteur)

---

## 🧾 Description du projet

CoffeeManagement est une application de gestion de cafés permettant de :

- Créer des cafés personnalisés avec des options comme le sucre, le lait, la crème, etc.
- Enregistrer ces cafés dans une base de données locale (IndexedDB).
- Gérer la liste des commandes et affichages dynamiques (à venir).

---

## 🚀 Fonctionnalités

- ✅ Création de cafés standards (Espresso, Cappuccino, etc.)
- ✅ Ajout d’options personnalisées (ex. : sucre, crème, etc.)
- ✅ Stockage des données dans le navigateur avec IndexedDB
- 🔄 Affichage des cafés sauvegardés
- 📊 (À venir) Gestion des statistiques et commandes

---

## 🏗️ Architecture du projet

CoffeeManagement/ │ ├── models/ # Modèles de données (Coffee, Customization) ├── dao/ # Accès aux données (IndexedDB) ├── services/ # Logique métier ├── factory/ # Génération automatique de types de café ├── utils/ # Fonctions utilitaires └── main.ts # Point d’entrée principal



## 📌 Diagramme visuel de l’architecture :

![Diagramme de l'architecture](C:\Users\amina\Downloads\bLLTZjem47wFb3kCzWLs2wZF4OeMKLL2wdPfTti0Rp94be9DROD4gzwdd8EBTHmxZfDTLlG5uV4tus---SczDaoP_RPEapGPmR9cMgE6dUAYu3jMeqwJmXfXAJSRHFYT9W1J46oB6MX3kCfPoAKWazXlNr0vKx7NHcxvBsQu53g3BroR-J8svXRu0LXPzipZdcS6lSlR30wIbywpGlCi3Q.png)

---

## 🛠️ Technologies utilisées

- **TypeScript** — typage statique et POO
- **IndexedDB** — base de données locale côté client
- **Modular Architecture** — séparation claire des responsabilités

---

## 📦 Installation


# 1. Cloner le projet
git clone https://github.com/aminamahrour/CoffeeManagement.git

# 2. Ouvrir dans votre éditeur (ex. VS Code)

# 3. Lancer un serveur local (Live Server ou autre)
## 💡 Exemple d'utilisation


// Création d’un cappuccino avec crème
const cappuccino = coffeeFactory.createCoffee("Cappuccino");
cappuccino.addCustomization(new Customization("Crème", 0.4));
await coffeeDAO.save(cappuccino);
## 📈 Améliorations futures
 Interface graphique HTML/CSS/JS

 Système de commande complet

 Authentification utilisateur

 Export PDF ou Excel des commandes

## 👩‍💻 Auteur
Amina Mahrour
Asmae erragragy
