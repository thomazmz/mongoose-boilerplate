# Specify the Docker image
FROM node:alpine

# Specify working directory
WORKDIR /usr/app

# Install Dependencies
COPY ./ ./
RUN npm install

# Default Command
CMD ["npm", "start"]