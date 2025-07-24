# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code (termasuk .ts config)
COPY . .

# Build the Next.js app (Next.js akan handle ts config)
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine

WORKDIR /app

# Only production deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy necessary build outputs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Runtime env
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
