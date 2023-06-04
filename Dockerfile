FROM node:16-alpine

#Creat app directory
RUN mkdir -p sae/sae_wa
WORKDIR /sae/sae_wa

#Install app dependencies
COPY package*.json /sae/sae_wa/
RUN npm install

#Bundle app source
COPY . /sae/sae_wa/

EXPOSE 4173

CMD [ "npm", "start"]