# Use the official Playwright image with Chromium installed
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Expose the port (match your server.js port)
EXPOSE 3000

# Start the Node.js server
CMD ["node", "server.js"]
