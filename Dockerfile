FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma db push

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
