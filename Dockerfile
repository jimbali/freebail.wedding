# Stage 1
FROM node:12-alpine as react-build

RUN apk add --no-cache --update python2 make g++

WORKDIR /app
COPY . ./

RUN yarn --network-timeout 100000
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
