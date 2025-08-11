# Official Node image to build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN  npm install

COPY . .
RUN npm run build

# Ngnix to serve the built app
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app to Ngnix to serve the built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for web access
EXPOSE 80

# Default Nginx command
CMD ["nginx", "-g", "daemon off;"]