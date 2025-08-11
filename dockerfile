# BUILD STAGE
# Use Node.js version 20 on Alpine Linux to build the frontend
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy dependency files first to take advantage of Docker layer caching
COPY package*.json ./

# Install dependencies (including dev dependencies for build tools)
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the frontend for production (output goes to /app/dist)
RUN npm run build


# SERVE STAGE 
# Use Nginx to serve the static files 
FROM nginx:alpine

# Copy built files from build stage into Nginx's default public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Document that Nginx will listen on port 80
EXPOSE 80

# Start Nginx in the foreground (required for Docker containers)
CMD ["nginx", "-g", "daemon off;"]