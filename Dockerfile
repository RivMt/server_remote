FROM node:20-alpine
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY . .
RUN chmod +x ./init.sh
RUN ./init.sh
EXPOSE 3000
CMD /usr/local/bin/pm2 start npm --name "server_remote" --start
