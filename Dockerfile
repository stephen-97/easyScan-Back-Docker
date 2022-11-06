FROM node:18-alpine

#working directory
WORKDIR /app

#Install app dependencies
COPY app/package.json /app/package.json
COPY app/package-lock.json /app/package-lock.json
COPY app/tsconfig.json /app/tsconfig.json
RUN npm install
RUN npm run-script

#bundle app source
COPY app .

CMD [ "npm", "run", "start.dev" ]