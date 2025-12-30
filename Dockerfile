# Using Base image of Node.js
FROM node:18-alpine

# Set Working directory
WORKDIR /app

# Copy files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Export port 
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]