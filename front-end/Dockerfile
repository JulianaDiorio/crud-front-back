FROM node:14-alpine
WORKDIR /front
COPY . /front
RUN npm install -g http-server
EXPOSE 3001
CMD ["http-server", "-p", "80"]