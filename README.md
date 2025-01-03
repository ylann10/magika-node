# MAGIKA-NODE

## Prerequisites
- Node v20.9.0 (LTS)
- Python 3.13.1
- Magika

## Install

### Magika
```
python -m pip install magika
```

### Modules
```
npm install
```

## Startup
By default, the server listens on port 3000
```
npm run start:prod
```

## Routes
* POST http://localhost:3000/upload
  * method: "**short**" or "**long**"
  * files: File List

## Bonus
A Dockerfile is present at the root if you want to deploy the project with Docker