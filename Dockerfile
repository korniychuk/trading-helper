FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html
COPY dist /usr/share/nginx/html

закончил на том что бы скопировать конфиг
