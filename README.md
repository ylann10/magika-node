# MAGIKA-NODE

## Prérequis
- Node v20.9.0 (LTS)
- Python 3.13.1
- Magika

## Installation

### Magika
```
python -m pip install magika
```

### Modules
```
npm install
```

## Démarrage
Par défaut, le serveur écoute sur le port 3000
```
npm run start:prod
```

## Routes
* POST http://localhost:3000/upload
  * method: "**short**" ou "**long**"
  * files: Liste de fichiers

## Bonus
Un Dockerfile est présent à la racine si vous voulez déployer le projet avec Docker