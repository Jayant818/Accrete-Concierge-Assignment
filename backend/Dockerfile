# --- Stage 1: Building the app ---
FROM node:21 AS build

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.build.json ./

# Install all dependencies according to the lock file (including dev ones for building)
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build


# --- Stage 2: Production image ---
FROM node:21-slim

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

ENV NODE_ENV=production

CMD ["pnpm", "start:prod"]
