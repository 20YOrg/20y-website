FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

FROM node:20-alpine
COPY ./package.json package-lock.json /app/
COPY --from=build-env /app/.next/standalone /app/
COPY --from=build-env /app/.next/static /app/.next/static
COPY --from=build-env /app/public /app/public
WORKDIR /app
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
