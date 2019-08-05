FROM nginx:alpine
COPY nginx/freebail.wedding.conf /etc/nginx/conf.d/freebail.wedding.conf
COPY public /usr/share/nginx/html