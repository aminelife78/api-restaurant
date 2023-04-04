Prérequis
Node.js doit être installé sur votre machine
NPM (Node Package Manager) doit être installé sur votre machine

Installation

1. Clonez ce repository sur votre machine
2. Ouvrez un terminal dans le dossier du projet
3. Exécutez la commande npm install pour installer les dépendances du projet

Configuration de la base de données

1. Assurez-vous que MySQL est installé sur votre machine et qu'il est en cours d'exécution
2. Créez une base de données avec le nom restaurant dans MySQL
3. Ouvrez le fichier config.js dans le dossier config
4. Modifiez les valeurs des champs DB_HOST, DB_USERNAME, DB_DATABASE, DB_PASSWORD,BASE_URL,JWT_SECRET_KEY,JWT_EXPIRATION,CLOUD_NAME,API_KEY,API_SECRET,EMAIL_HOST,EMAIL_PORT,EMAIL_USER,EMAIL_PASSWORD pour correspondre à votre configuration MySQL

Création d'un administrateur pour le back-office de l'application web

1. Lancez l'application en local en exécutant la commande npm start
2. Connectez-vous à l'application en visitant http://localhost:5000
3. Cliquez sur le lien "S'inscrire" et créez un compte
4. Connectez-vous à la base de données avec un client MySQL et recherchez le nouvel utilisateur que vous venez de créer dans la table users
5. Modifiez le champ role de l'utilisateur à la valeur admin

Exécution de l'application

1. Lancez l'application en local en exécutant la commande npm start
2. Connectez-vous à l'application en visitant http://localhost:5000
   L'application devrait maintenant être en cours d'exécution sur votre machine locale.
