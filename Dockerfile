# stage build
FROM node:19-bullseye-slim AS build
RUN apt-get update; apt-get install -y --no-install-recommends curl;

WORKDIR /app

# copy everything to the container
COPY . .

# clean install all dependencies
RUN npm ci

# remove potential security issues
#RUN npm audit fix
RUN npx prisma generate
# build SvelteKit app
RUN npm run build

# stage run
FROM node:19-bullseye-slim AS deploy-node
RUN apt-get update; apt-get install -y --no-install-recommends curl;

WORKDIR /app

# remove all unnecessary files
RUN rm -fr ./*

# copy dependency list
COPY --from=build /app/package*.json ./

# clean install dependencies, no devDependencies, no prepare script
RUN npm ci --production --ignore-scripts

# remove potential security issues
#RUN npm audit fix

# copy built SvelteKit app to /app
COPY --from=build /app/build ./

# EXPOSE 443
EXPOSE 3000