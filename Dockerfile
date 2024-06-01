FROM node:22

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

RUN cp .env build/

WORKDIR /app/build

RUN npm ci --omit=dev

EXPOSE 3333

CMD [ "node", "bin/server.js" ]
