FROM node:22.9.0-slim
WORKDIR /usr/app

# Copy config files
COPY package*.json tsconfig.json ./
# Install dependencies, including those needed for build
RUN npm ci
# Now copy the entire 'src' folder into the container
COPY ./src ./src
RUN npm run build
# Strip out dev dependencies
RUN npm prune --production
# Also copy the static files
COPY ./public ./public

# Run the app
ENV NODE_ENV='production'
USER node
EXPOSE 3000
CMD ["node","dist/index.js"]
