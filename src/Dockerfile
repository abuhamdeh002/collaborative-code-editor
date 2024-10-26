# Start with a Node.js base image
FROM node:16-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from your project into the container
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start the server
CMD ["nginx", "-g", "daemon off;"]
