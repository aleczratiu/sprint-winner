FROM node:12.9-alpine as sprint-man
ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /code
COPY . .
ADD package*.json .env.example config-overrides.js ./code/
RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY --from=sprint-man /code/build /usr/share/nginx/html
COPY --from=sprint-man /code/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
