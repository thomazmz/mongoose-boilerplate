# Specify the Docker base image
FROM node

# Specify working directory
WORKDIR /usr/app

# Copy only package json to prevent docker to rebuild it everytime
COPY package.json .

# Install all the application dependencies
RUN npm install

# Copy everything else to the working directory
COPY . .

# Default Command
CMD ["npm", "start"]