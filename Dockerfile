FROM node:lts-bullseye

WORKDIR /app
COPY ./dist /app
COPY ./package.json /app

RUN apt update && apt install -y python3 python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install magika
RUN npm install

EXPOSE 3000

CMD ["node", "main"]