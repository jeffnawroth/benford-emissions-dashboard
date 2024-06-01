FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN ["chmod", "+x", "./start.sh"]

EXPOSE 8080
CMD ["./start.sh"]
