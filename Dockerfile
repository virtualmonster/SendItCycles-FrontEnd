FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional && npm cache clean --force

COPY . .
RUN npm run build

FROM nginx:alpine

ENV API_UPSTREAM=http://server:5000

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/templates/default.conf.template

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
