# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files & install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy the rest of the app
COPY . .

# Expose the port your app runs on (misalnya 4000)
EXPOSE 4000

# Set NODE_ENV and start command
ENV NODE_ENV=production
CMD ["node", "src/index.js"]
