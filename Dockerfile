FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 10000

RUN apt-get update && apt-get install -y wait-for-it

# Set the script to be executable
RUN chmod +x /usr/bin/wait-for-it
# CMD ["wait-for-it", "postgres:5432", "--", "npm", "run", "typeorm:migration:run"]
CMD ["wait-for-it", "postgres:5432"]

CMD [ "sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start; else npm run dev; fi" ]