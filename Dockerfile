FROM node:22.9.0-slim
WORKDIR /usr/app

COPY package*.json ./
RUN npm ci --omit=dev

#INSTALL ALL DEPS FIRST< THEN BUILD< THEN PRUNE DEV DEPS

COPY src/ ./
RUN npm run build

ENV NODE_ENV='production'
USER node
EXPOSE 3000
CMD ["ls"]
