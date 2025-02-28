# Stage 1: Build the React app
FROM node:22-alpine AS builder

WORKDIR /app

COPY ./training-calendar-react/package*.json ./

RUN npm install

COPY ./training-calendar-react/. .

RUN npm run build \
    && npx update-browserslist-db@latest

# Stage 2: Serve the app with Nginx
FROM nginx:1.27.3

# Remove the default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

COPY ./training-calendar-react/.dockerdev/nginx/ /etc/nginx/

# Lokalnie zakomentować linijkę poniżej:
# RUN nginx -t   
