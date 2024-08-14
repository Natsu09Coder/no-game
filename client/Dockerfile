FROM bitnami/nginx:1.27.1

#RUN rm /etc/nginx/conf.d/default.conf
COPY sites-available/no-game.conf /opt/bitnami/nginx/conf/server_blocks/

COPY ./src /var/www/html