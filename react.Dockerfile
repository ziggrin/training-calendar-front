# Stage 1: Build the React app
FROM node:22-alpine AS builder

ENV REACT_APP_API_BASE_URL=https://api.omega-next.online/api/v1

WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json ./

# So here I am installing ALL dependencies without audit and then 
# run audit without dev. I might check out adding : && \ npm audit --omit=dev
RUN npm ci --no-audit --quiet

COPY . .

RUN rm -rf .dockerdev nginx

# Update browserslist database before build
RUN npx update-browserslist-db@latest && \
    npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:1.27.3

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets with proper permissions
COPY --from=builder --chown=nginx:nginx /app/build /usr/share/nginx/html

COPY /nginx/ /etc/nginx/

# Validate Nginx configuration
RUN nginx -t